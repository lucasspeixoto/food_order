import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import toast from "react-hot-toast";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = props => {
	const [isCheckout, setIsCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);
	const cartContext = useContext(CartContext);

	const totalAmount = cartContext.totalAmount.toFixed(2);

	const hasItems = cartContext.items.length > 0;

	const removeCartItemHandler = id => {
		cartContext.removeItem(id);
	};

	const addCartItemHandler = item => {
		cartContext.addItem({ ...item, amount: 1 });
	};

	const cartItems = (
		<ul className={classes["cart-items"]}>
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
		setIsCheckout(true);
	};

	const submitOrderHandler = async userData => {
		setIsSubmitting(true);
		const response = await fetch(
			"https://react-http-cacd1-default-rtdb.firebaseio.com/orders.json",
			{
				method: "POST",
				body: JSON.stringify({
					user: userData,
					orderedItems: cartContext.items,
				}),
			},
		);

		if (response.ok) {
			setIsSubmitting(false);
			setDidSubmit(true);
			cartContext.clearCart();
			props.onHideCart();
			if (didSubmit) {
				toast.success("Pedido Realizado com Sucesso", {
					style: { background: "#3f3f3f", color: "#fff" },
					duration: 2000,
				});
			}

			return;
		}
	};

	const modalActions = (
		<div className={classes.actions}>
			<button className={classes["button--alt"]} onClick={props.onHideCart}>
				Fechar
			</button>
			{hasItems && (
				<button className={classes.button} onClick={orderHandler}>
					Pedido
				</button>
			)}
		</div>
	);

	const cartModalContent = (
		<React.Fragment>
			{cartItems}
			<div className={classes.total}>
				<span>Total</span>
				<span>R$ {totalAmount}</span>
			</div>
			{isCheckout && hasItems && (
				<Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart} />
			)}
			{!isCheckout && modalActions}
		</React.Fragment>
	);

	const isSubmittingModalContent = <p>Sending order data...</p>;

	return (
		<Modal onClose={props.onHideCart}>
			{!isSubmitting && cartModalContent}
			{isSubmitting && isSubmittingModalContent}
		</Modal>
	);
};

export default Cart;
