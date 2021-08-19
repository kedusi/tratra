import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import classes from './SetrasList.module.css';

const setras = [
	{ name: 'Fill Suite Gowning', location: 'V2038-V2033' },
	{ name: 'Fill Suite De-Gowning', location: 'V2039-V2033' },
	{ name: 'Fill Suite Entrance', location: 'V2038-V2039' },
];

const Item = (props) => {
    const path = '/' + props.title.replaceAll(' ', '');

    return (
		<li key={props.title}>
			<p>***</p>
			<Link to={path}>
				<h3>{props.title}</h3>
				<p>{props.location}</p>
			</Link>
		</li>
	);
};

const SetrasList = (props) => {
	const setrasList = setras.map((el) => (
		<Item title={el.name} location={el.location} />
	));

	return (
		<Card title='Setras'>
			<ul className={classes.list}>{setrasList}</ul>
		</Card>
	);
};

export default SetrasList;
