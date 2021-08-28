import { useEffect, useState } from 'react';
import './App.css';
import Settings from './components/Settings';
import Setras from './components/Setras';

import Button from './ui/Button';
import { Route, Switch, useParams } from 'react-router';

const fetchURL = 'https://tratra-6792d-default-rtdb.firebaseio.com/tratra.json';

function App() {
	const [tratra, setTratra] = useState({ template: [], units: [] });
	const [fetchingData, setFetchingData] = useState(false);
	const [fetchingError, setFetchingError] = useState(false);
	const [sendingData, setSendingData] = useState(false);
	const [sendingError, setSendingError] = useState(false);

	const loadData = async () => {
		setFetchingData(true);
		try {
			const response = await fetch(fetchURL);
			const data = await response.json();
			setTratra((prev) => (data ? data : prev));
		} catch (e) {
			setFetchingData(false);
			setFetchingError(true);
			console.log(e);
		}
		setFetchingData(false);
	};

	const sendData = async () => {
		setSendingData(true);
		try {
			const response = await fetch(fetchURL, {
				method: 'PUT',
				body: JSON.stringify(tratra),
				headers: {
					'Content-Type': 'application/json',
				},
			});
		} catch (e) {
			setSendingError(true);
			console.log(e.message);
		}
		setSendingData(false);
	};

	useEffect(() => {
		loadData();
	}, []);

	const addSettingHandler = (newSettingName) => {
		setTratra((prev) => {
			return {
				template: [...prev.template, newSettingName],
				units: prev.units.map((unit) => {
					return {
						...unit,
						settings: {
							...unit.settings,
							[newSettingName]: '',
						},
					};
				}),
			};
		});
	};

	// map through units
	const editSettingHandler = (setraName, settingName, settingValue) => {
		setTratra((prev) => {
			const newState = { ...prev };
			newState.units = prev.units.map((unit) =>
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
			);
			return newState;
		});
	};

	const addUnitHandler = (name, location) => {
		setTratra((prev) => {
			const newState = { ...prev };
			newState.units.push({
				name,
				location,
				settings: prev.template.reduce((acc, curr) => {
					acc[curr] = '';
					return acc;
				}, {}),
			});
			return newState;
		});
	};

	const removeUnitHandler = (name) => {
        console.log(name);
		setTratra((prev) => {
			const newState = { ...prev };
			newState.units = prev.units.filter((unit) => unit.name !== name);
			return newState;
		});
	};

	return (
		<div className='App'>
			<Switch>
				<Route path='/:id'>
					<Settings
						setras={tratra.units}
						onAddSetting={addSettingHandler}
						onEditSetting={editSettingHandler}
					/>
				</Route>
				<Route path='/'>
					<Setras
						setras={tratra.units}
						onAddUnit={addUnitHandler}
						onRemoveUnit={removeUnitHandler}
					/>
					<p>
						{fetchingData && !fetchingError && 'Loading...'}
						{fetchingError && 'Error...'}
						{!fetchingData && !fetchingError && '<>'}
					</p>
				</Route>
			</Switch>
			<Button label='Update' onClick={sendData} />
			<p>
				{sendingData && !sendingError && 'Sending...'}
				{sendingError && 'Sending error...'}
				{!sendingData && !sendingError && '<>'}
			</p>
		</div>
	);
}

export default App;
