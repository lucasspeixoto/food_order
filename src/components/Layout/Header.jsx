import React, { Fragment, useContext } from 'react';
import mealsImage from '../../assets/images/meals.jpg';
import CartContext from '../../store/cart-context';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';
import toast, { Toaster } from 'react-hot-toast';

const Header = props => {
	const cartContext = useContext(CartContext);

	const CartModalHandler = () => {
		if (cartContext.items.length === 0) {
			toast.error('Carrinho Vazio', {
				style: { background: '#3f3f3f', color: '#fff' },
				duration: 1500,
			});
			return;
		}
		props.onShowCart();
	};

	return (
		<Fragment>
			<Toaster position='top-center' reverseOrder={false} />
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
