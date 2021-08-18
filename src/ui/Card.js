import classes from './Card.module.css';

const Card = (props) => {
	return (
		<div className={classes.card}>
            <p>______________________________________</p>
			<h2>{props.title}</h2>
			{props.children}
		</div>
	);
};

export default Card;