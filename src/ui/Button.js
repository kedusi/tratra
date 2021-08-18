import classes from './Button.module.css';

const Button = (props) => {
    const clickHandler = (event) => {
        console.log('clicked submit');
    };

	return (
		<button className={classes.button} onClick={clickHandler}>
			[{props.label}]
		</button>
	);
};

export default Button;