import { useState } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import classes from './Details.module.css';

const settings = [
	{
		name: 'IP Address',
		value: '1.1.1.123',
	},
	{
		name: 'Connection Speed',
		value: 'Normal',
	},
	{
		name: 'Alarm Time',
		value: '60s',
	},
];

const Details = (props) => {
	const [details, setDetails] = useState(settings);

	const changeHandler = (settingName, event) => {
        const newDetails = details.map((el) => {
			return {
				name: el.name,
				value: el.name === settingName ? event.target.value : el.value,
			};
		});
		setDetails(newDetails);
	};

	const detailsList = details.map((el) => {
		return (
			<li key={el.name}>
				<label>{el.name}</label>
				<input
					type='text'
					value={el.value}
					onChange={changeHandler.bind(null, el.name)}
				></input>
			</li>
		);
	});

    const addSettingHandler = () => {
        const newSettingName = prompt('What shall we call the new setting?', 'unnamed setting');
        setDetails(prevState => [
            ...prevState,
            {
                name: newSettingName,
                value: ''
            }
        ]);
    };

	return (
		<Card title={props.setraName}>
			<h2>{details.name}</h2>
            <Button label='Add a Setting' onClick={addSettingHandler} />
			<ul className={classes.details}>{detailsList}</ul>
		</Card>
	);
};

export default Details;
