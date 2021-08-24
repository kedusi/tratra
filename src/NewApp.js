import { useEffect, useState } from 'react';

const setras = {
	template: ['Alarm Timeout', 'Alarm Threshold'],
	units: [
		{
			name: 'Elephant Ballroom',
			location: 'V2036-V2033',
			settings: [
				{ name: 'Alarm Timeout', value: '60s' },
				{ name: 'Alarm Threshold', value: '.02' },
			],
		},
	],
};

const Settings = (props) => {
	const [input, setInput] = useState(
		setras.units[0].settings.map((setting) => setting.value)
	);
    const [updated, updater] = useState({});

	return (
		<input
			type='text'
			value={input[1]}
			onChange={(e) => {
				setInput((prev) => {
                    const newArr = prev;
					newArr[1] = e.target.value;
					return newArr;
				});
                updater({});
            }}
			onBlur={(e) => props.onEdit(e.target.value)}
		/>
	);
};

const NewApp = () => {
	const [setraUnits, setSetraUnits] = useState(setras.units);

	const editSettingHandler = (value) => {
		setSetraUnits((prev) =>
			prev.map((unit) =>
				unit.name !== 'Elephant Ballroom'
					? unit
					: {
							name: unit.name,
							location: unit.location,
							settings: unit.settings.map((setting) =>
								setting.name !== 'Alarm Threshold'
									? setting
									: { name: setting.name, value }
							),
					  }
			)
		);
	};

	useEffect(() => {
		console.log(setraUnits[0].settings[1].value);
	}, [setraUnits]);

	return <Settings onEdit={editSettingHandler} />;
};

export default NewApp;
