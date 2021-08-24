import Button from '../ui/Button';
import Card from '../ui/Card';
import classes from './Settings.module.css';

const NewSettingPage = (props) => {
	// const changeHandler = (settingName, event) => {
	// 	const newSettings = settings.map((el) => {
	// 		return {
	// 			name: el.name,
	// 			value: el.name === settingName ? event.target.value : el.value,
	// 		};
	// 	});
	//     setSettings(newSettings);
	// };

	// const settingsList = props.setras[0].settings.map((el) => {
	// 	return (
	// 		<li key={el.name}>
	// 			<label>{el.name}</label>
	// 			<input
	// 				type='text'
	// 				onBlur={(event) => {
	// 					props.onEditSetting.bind(null, [
	// 						props.setraName,
	// 						el.name,
	// 						event.target.value,
	// 					]);
	// 				}}
	// 			></input>
	// 		</li>
	// 	);
	// });

	const addSettingHandler = () => {
		const newSettingName = prompt('What shall we call the new setting?');
		props.onAddSetting(newSettingName);
	};

	return (
		<Card title={props.setraName}>
            <input onBlur={event => 
                props.onEditSetting.bind(null, [
                    props.setraName,
                    'Alarm Threshold',
                    '123'
                ])
            } />
		</Card>
	);
};

export default NewSettingPage;
