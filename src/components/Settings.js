// TODO: Rewrite this page to accept single unit data and work
//       with the new schema

import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Card from '../ui/Card';
import classes from './Settings.module.css';

const Settings = (props) => {
	const unitChoice = useParams().id;
	const setra = props.setras.filter(
		(unit) => unit.name.replace(' ', '') === unitChoice
	)[0];
	const [inputsState, setInputsState] = useState(setra.settings);

	const blurHandler = (unitName, setting, event) => {
		props.onEditSetting(unitName, setting, event.target.value);
	};

	const changeHandler = (propertyName, event) => {
		// console.log(event.target.value);
		setInputsState((prev) =>
			Object.assign({}, prev, { [propertyName]: event.target.value })
		);
	};

	const settingsList = Object.getOwnPropertyNames(setra.settings).map(
		(
			prop // props.setra.settings to re-render when a setting is added because it is added in App and sent as a prop to Settings
		) => (
			<li key={prop}>
				<label>{prop}: </label>
				<input
					type='text'
					value={inputsState[prop] || ''} // || '' so it will not give uncontrolled/controlled error
					onBlur={blurHandler.bind(null, setra.name, prop)}
					onChange={changeHandler.bind(null, prop)}
				/>
			</li>
		)
	);

	const addSettingHandler = () => {
		const newSettingName = prompt('What shall we call the new setting?');
		props.onAddSetting(newSettingName);
	};

	return (
		<Fragment>
			<Link to='/'>
				<Button label='Back' />
			</Link>
			<Card title={setra.name}>
				<Button label='Add a Setting' onClick={addSettingHandler} />
				<ul className={classes.details}>{settingsList}</ul>
			</Card>
		</Fragment>
	);
};

export default Settings;
