import React, { useContext } from 'react';
import CartContext from '../../../store/cart-context';

import classes from './MealItem.module.css';
import MealItemFrom from './MealItemForm';

const MealItem = props => {
	const cartContext = useContext(CartContext);
	const price = `R$ ${props.price.toFixed(2)}`;

	const addToCartHandler = amount => {
		cartContext.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    })
	};
	return (
		<li className={classes.meal}>
			<div>
				<h3>{props.name}</h3>
				<div className={classes.description}>{props.description}</div>
				<p className={classes.price}>{price}</p>
			</div>
			<div>
				<MealItemFrom id={props.id} onAddToCart={addToCartHandler} />
			</div>
		</li>
	);
};

export default MealItem;
