import { Fragment } from 'react';
import NewSetraForm from './NewSetraForm';
import classes from './Setras.module.css';
import SetrasList from './SetrasList';

const Setras = (props) => {
    return (
		<Fragment>
			<NewSetraForm />
            <SetrasList />
		</Fragment>
	);
};

export default Setras;