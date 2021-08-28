import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Card from '../ui/Card';
import classes from './SetrasList.module.css';

const Item = (props) => {
    const path = '/' + props.title.replaceAll(' ', '');

    return (
		<li>
			<p className={classes.topBorder}>***</p>
			<Link to={path}>
				<h3>{props.title}</h3>
				<p>{props.location}</p>
                <Button onClick={props.remove} label='Remove' />
			</Link>
		</li>
	);
};

const SetrasList = (props) => {
    const removeHandler = (name) => {
        props.onRemoveSetra(name.replaceAll(' ', ''));
    };

	const setrasList = props.setras.map((el) => (
		<Item key={el.name} title={el.name} location={el.location} remove={removeHandler.bind(null, el.name)} />
	));

	return (
		<Card title='Setras'>
			<ul className={classes.list}>{setrasList}</ul>
		</Card>
	);
};

export default SetrasList;
