import { useEffect, useState } from 'react';
import './App.css';
import Settings from './components/Settings';
import Setras from './components/Setras';

import NewSettingPage from './components/NewSettingPage';
import Button from './ui/Button';

const setras = {
	template: ['Alarm Threshold', 'Alarm Timeout'],
	units: [
		{
			name: 'Elephant Ballroom',
			location: 'V2036-V2033',
			settings: {
				'Alarm Threshold': '.04',
				'Alarm Timeout': '30s',
			},
		},
		{
			name: 'Elephant Bathtub',
			location: 'V2036-V2038',
			settings: {
				'Alarm Threshold': '.03',
				'Alarm Timeout': '45s',
			},
		},
	],
};

function App() {
	const [setraSettingsTemplate, setSetraSettingsTemplate] = useState(
		setras.template
	);
	const [setraUnits, setSetraUnits] = useState(setras.units);

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

	useEffect(() => {
        console.log('---');
		for (let i = 0; i < setraUnits.length; i++) {
			for (let setting of Object.getOwnPropertyNames(setraUnits[i].settings)) {
				console.log(setraUnits[i].name, setting, setraUnits[i].settings[setting]);
			}
		}
	}, [setraUnits]);

	return (
		<div className='App'>
			<Setras setras={setraUnits} onAddUnit={addUnitHandler} />
			<Settings
				setra={
					setraUnits.filter(
						(unit) => unit.name === 'Elephant Ballroom'
					)[0]
				}
				onAddSetting={addSettingHandler}
				onEditSetting={editSettingHandler}
			/>
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
