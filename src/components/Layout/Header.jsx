import React, { Fragment } from "react";

import mealsImage from "../../assets/images/meals.jpg";
import classes from "./Header.module.css";
const Header = props => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Food Order App</h1>
        <button>Cart</button>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="Algumas opções" />
      </div>
    </Fragment>
  );
};

export default Header;
