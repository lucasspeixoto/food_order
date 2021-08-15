import { useContext } from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
	const cartContext = useContext(CartContext);

	const numberOfCartItems = cartContext.items.reduce((currentNumber, item) => {
		return currentNumber + item.amount;
	}, 0);

	return (
		<button className={classes.button} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Meu Carrinho</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
