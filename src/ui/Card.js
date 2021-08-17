import classes from './Card.module.css';

const Card = (props) => {
	return (
		<div className={classes.card}>
            <p>---</p>
			<h2>{props.title}</h2>
			{props.children}
            <p>---</p>
		</div>
	);
};

export default Card;