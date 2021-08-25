import { useState } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import classes from './NewSetraForm.module.css';

const NewSetraForm = (props) => {
	const [commonName, setCommonName] = useState('');
    const [location, setLocation] = useState('');

	const newSetraHandler = (event) => {
		event.preventDefault();
		
		props.onAddSetra(commonName, location);
	};

	return (
		<Card title='Add a SETRA'>
			<form className={classes.form} onSubmit={newSetraHandler}>
				<label>Common Name</label>
				<input
					type='text'
					value={commonName}
					onChange={(event) => setCommonName(event.target.value)}
				></input>
                <br />
				<label>Location</label>
				<input
					type='text'
					value={location}
					onChange={(event) => setLocation(event.target.value)}
				></input>
                <br />
				<Button type='submit' label='Submit' />
			</form>
		</Card>
	);
};

export default NewSetraForm;
