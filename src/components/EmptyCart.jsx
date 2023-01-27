import React from "react";
import { Link } from "react-router-dom";
import emptyLogo from '../assets/img/empty-cart.png';

const EmptyCart = () => {
  return (
    <div className="cart__empty">
      <div className="cart cart--empty">
        <h2>
          Empty Cart <icon>😕</icon>
        </h2>
        <p>
          Perhaps, you didn't order pizza.
          <br />
          Go to main page if you want to order something.
        </p>
        <img src={emptyLogo} alt="Empty cart" />
        <Link to='/' className="button button--black">
          <span>Get back</span>
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
