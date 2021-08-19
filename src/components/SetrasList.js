import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import classes from './SetrasList.module.css';

const Item = (props) => {
    const path = '/' + props.title.replaceAll(' ', '');

    return (
		<li>
			<p>***</p>
			<Link to={path}>
				<h3>{props.title}</h3>
				<p>{props.location}</p>
			</Link>
		</li>
	);
};

const SetrasList = (props) => {
	const setrasList = props.setras.map((el) => (
		<Item key={el.name} title={el.name} location={el.location} />
	));

	return (
		<Card title='Setras'>
			<ul className={classes.list}>{setrasList}</ul>
		</Card>
	);
};

export default SetrasList;
