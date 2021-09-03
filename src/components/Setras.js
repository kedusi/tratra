import { Fragment, useState } from 'react';
import NewSetraForm from './NewSetraForm';
import SetrasList from './SetrasList';

const Setras = (props) => {
	return (
		<Fragment>
			<NewSetraForm onAddSetra={props.onAddUnit} />
			<SetrasList
				setras={props.setras}
				onRemoveSetra={props.onRemoveUnit}
			/>
		</Fragment>
	);
};

export default Setras;
