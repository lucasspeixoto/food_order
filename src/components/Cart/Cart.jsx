import React from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';

const Cart = props => {
	const cartItems = (
		<ul className={classes['cart-items']}>
			{[{ id: 'c1', name: 'Sushi', amount: 2, price: 12.99 }].map(item => (
				<li>{item.name}</li>
			))}
		</ul>
	);

	const orderHandler = () => {
		props.onHideCart();
		setTimeout(() => {
			alert('Pedido feito!');
		}, 500);
	};
	return (
		<Modal onClose={props.onHideCart}>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>R$ 35.62</span>
			</div>
			<div className={classes.actions}>
				<button className={classes['button--alt']} onClick={props.onHideCart}>
					Fechar
				</button>
				<button className={classes.button} onClick={orderHandler}>
					Pedido
				</button>
			</div>
		</Modal>
	);
};

export default Cart;
