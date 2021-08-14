import React, { Fragment } from 'react';
import mealsImage from '../../assets/images/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = props => {
	const CartModalHandler = () => {
		props.onShowCart();
	};

	return (
		<Fragment>
			<header className={classes.header}>
				<h1>Food Order App</h1>
				<HeaderCartButton onClick={CartModalHandler} />
			</header>
			<div className={classes['main-image']}>
				<img src={mealsImage} alt='Algumas opções' />
			</div>
		</Fragment>
	);
};

export default Header;
