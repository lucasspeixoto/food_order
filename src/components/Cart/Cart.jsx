import React, { useContext } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import toast, { Toaster } from 'react-hot-toast';
import CartItem from './CartItem';

const Cart = props => {
	const cartContext = useContext(CartContext);

	const totalAmount = cartContext.totalAmount.toFixed(2);

	const removeCartItemHandler = id => {
		cartContext.removeItem(id);
	};

	const addCartItemHandler = item => {
		cartContext.addItem({ ...item, amount: 1 });
	};

	const cartItems = (
		<ul className={classes['cart-items']}>
			{cartContext.items.map(item => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={removeCartItemHandler.bind(null, item.id)}
					onAdd={addCartItemHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	const orderHandler = () => {
		props.onHideCart();
		setTimeout(() => {
			toast.success('Pedido Realizado', {
				style: { background: '#3f3f3f', color: '#fff' },
				duration: 1500,
			});
			return;
		}, 500);
	};
	return (
		<Modal onClose={props.onHideCart}>
			{cartItems}
			<Toaster position='top-center' reverseOrder={false} />
			<div className={classes.total}>
				<span>Total</span>
				<span>R$ {totalAmount}</span>
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
