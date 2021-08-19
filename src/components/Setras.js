import { Fragment, useState } from 'react';
import NewSetraForm from './NewSetraForm';
import SetrasList from './SetrasList';

const setras = [
	{ name: 'Fill Suite Gowning', location: 'V2038-V2033' },
	{ name: 'Fill Suite De-Gowning', location: 'V2039-V2033' },
	{ name: 'Fill Suite Entrance', location: 'V2038-V2039' },
];

const Setras = (props) => {
	const [setrasList, setSetrasList] = useState(setras);

	const addHandler = (setraObj) => {
		const {commonName, location} = setraObj;
		const name = commonName;
		const newSetra = {name, location};
		setSetrasList((prevState) => [...prevState, newSetra]);
	};

	return (
		<Fragment>
			<NewSetraForm onAddSetra={addHandler} />
			<SetrasList setras={setrasList} />
		</Fragment>
	);
};

export default Setras;
