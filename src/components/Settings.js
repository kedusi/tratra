// TODO: Rewrite this page to accept single unit data and work
//       with the new schema

import React, { useEffect, useState } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import classes from './Settings.module.css';

const Settings = (props) => {
	// const [inputsState, setInputsState] = useState([]);
	const [inputsState, setInputsState] = useState(props.setra.settings);

	const blurHandler = (unitName, setting, event) => {
		props.onEditSetting(unitName, setting, event.target.value);
	};

	const changeHandler = (propertyName, event) => {
		// console.log(event.target.value);
		setInputsState((prev) =>
			Object.assign({}, prev, { [propertyName]: event.target.value })
		);
	};

	const settingsList = Object.getOwnPropertyNames(props.setra.settings).map((prop) => ( // props.setra.settings to re-render when a setting is added because it is added in App and sent as a prop to Settings
		<li key={prop}>
			<label>{prop}</label>
			<input
				type='text'
				value={inputsState[prop] || ''} // || '' so it will not give uncontrolled/controlled error
				onBlur={blurHandler.bind(null, props.setra.name, prop)}
				onChange={changeHandler.bind(null, prop)}
			/>
		</li>
	));

	const addSettingHandler = () => {
		const newSettingName = prompt('What shall we call the new setting?');
		props.onAddSetting(newSettingName);
	};

	return (
		<Card title={props.setraName}>
			<Button label='Add a Setting' onClick={addSettingHandler} />
			<ul className={classes.details}>{settingsList}</ul>
		</Card>
	);
};

export default Settings;
