import { useEffect, useState } from 'react';
import './App.css';
import Settings from './components/Settings';
import Setras from './components/Setras';

import Button from './ui/Button';
import { Route, Switch, useParams } from 'react-router';

const fetchURL = 'https://tratra-6792d-default-rtdb.firebaseio.com/.json';

function App() {
	const [setraSettingsTemplate, setSetraSettingsTemplate] = useState([]);
	const [setraUnits, setSetraUnits] = useState([{name: '', location:'', settings:{}}]);
    const [fetchingData, setFetchingData] = useState(false);
    const [fetchingError, setFetchingError] = useState(false);

    const loadData = async () => {
        setFetchingData(true);
        try {
            const response = await fetch(fetchURL);
            const data = await response.json();
            setSetraUnits(data.units);
            setSetraSettingsTemplate(data.template);
            console.log(data);
        } catch (e) {
            setFetchingData(false);
            setFetchingError(true);
            console.log(e);
        }
        setFetchingData(false);
    };

    useEffect(() => {
        loadData();
    }, []);

	// simply add new setting name to the template array
	const addSettingHandler = (newSettingName) => {
		setSetraSettingsTemplate((prevState) => [...prevState, newSettingName]);
	};

	// update all units' settings to have properties to match all template properties
	// occurs when the template is changed
	useEffect(() => {
		setSetraUnits((prevState) => 
			prevState.map((unit) => {
                return {
                    ...unit,
                    settings: setraSettingsTemplate.reduce((acc, curr) => {
                        acc[curr] = unit.settings[curr] || '';
                        return acc;
                    }, {}),
				};
			})
		);
	}, [setraSettingsTemplate]);

	// map through units
	const editSettingHandler = (setraName, settingName, settingValue) => {
		setSetraUnits((prevState) =>
			prevState.map((unit) =>
				unit.name !== setraName
					? // if not given unit name, return unit unchanged
					  unit
					: // otherwise rebuild unit...
					  {
							// keep all properties
							...unit,
							// overwrite settings...
							settings: {
								// keep all properties...
								...unit.settings,
								// overwrite just the one to edit
								[settingName]: settingValue,
							},
					  }
			)
		);
	};

    const addUnitHandler = (name, location) => {
        setSetraUnits((prev) =>
			[...prev, {
                name,
                location,
                settings: setraSettingsTemplate.reduce((acc, curr) => {acc[curr] = ''; return acc}, {})
            }]
		);
    }
    // // log settings of all units to console
	// useEffect(() => {
    //     console.log('---');
	// 	for (let i = 0; i < setraUnits.length; i++) {
	// 		for (let setting of Object.getOwnPropertyNames(setraUnits[i].settings)) {
	// 			console.log(setraUnits[i].name, setting, setraUnits[i].settings[setting]);
	// 		}
	// 	}
	// }, [setraUnits]);

	return (
		<div className='App'>
			<Switch>
				<Route path='/:id'>
					<Settings
						setras={setraUnits}
						onAddSetting={addSettingHandler}
						onEditSetting={editSettingHandler}
					/>
				</Route>
				<Route path='/'>
					<Setras setras={setraUnits} onAddUnit={addUnitHandler} />
					<p>
						{fetchingData && 'Loading...'}
						{fetchingError && 'Error...'}
					</p>
				</Route>
			</Switch>
			<Button
				label='Show Units'
				onClick={() => {
					console.log(setraUnits);
				}}
			/>
		</div>
	);
}

export default App;
