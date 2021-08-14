import React from 'react';

import classes from './MealItem.module.css';
import MealItemFrom from './MealItemForm';

const MealItem = props => {
  const price = `R$ ${props.price.toFixed(2)}`;
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <p className={classes.price}>{price}</p>
      </div>
      <div>
        <MealItemFrom id={props.id} />
      </div>
    </li>
  );
};

export default MealItem;