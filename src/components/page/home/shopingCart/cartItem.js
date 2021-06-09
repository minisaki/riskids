import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import classNames from 'classnames';
import { THUMBNAIL_PLACEHOLDER, STATIC_HOST_LOCAL } from '../../../../constants/conmon.js';

import Close from '@material-ui/icons/Close';
import Remove from '@material-ui/icons/Remove';
import Add from '@material-ui/icons/Add';

function CartItem(props) {
  const { classes, carts } = props;

  const decreaseQuantity = (id) => {
    const { decreaseQuantity } = props;
    if (decreaseQuantity) {
      decreaseQuantity(id);
    }
  };

  const onChangeQuantity = (value, id) => {
    const { onChangeQuantity } = props;
    if (onChangeQuantity) {
      onChangeQuantity(value, id);
    }
  };

  const icreaseQuantity = (id) => {
    const { icreaseQuantity } = props;
    if (icreaseQuantity) {
      icreaseQuantity(id);
    }
  };
  const removeCart = (id) => {
    const { removeCart } = props;
    if (removeCart) {
      removeCart(id);
    }
  };
  const currencyPrice = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' });
  return (
    <ul className={classes.resetUl}>
      {carts.map((cart, index) => (
        <li key={index} className={classes.cartItemDetail}>
          <img
            className={classes.cartItemImg}
            src={
              cart.product.image
                ? `${STATIC_HOST_LOCAL}${cart.product.image}`
                : THUMBNAIL_PLACEHOLDER
            }
            alt={cart.product.image?.name || 'hinh loi'}
          ></img>
          <div className={classNames(classes.cartContent, 'cart-item__content')}>
            <p className={classes.cartItemDescription}>{cart.product.name}</p>
            <p className={classes.cartItemPrice}>
              {cart.quantity} X {currencyPrice.format(cart.product.price)}
            </p>
            {cart.product.product_varients.map((element, index) => {
              if (index.toString() === cart.color) {
                return (
                  <p key={index} className={classes.cartItemPrice}>
                    Màu: {element.color.title}
                  </p>
                );
              }
              return '';
            })}
            {cart.product.product_varients.map((element, index) => {
              if (index.toString() === cart.size) {
                return (
                  <p key={index} className={classes.cartItemPrice}>
                    Size: {element.size.title}
                  </p>
                );
              }
              return '';
            })}
          </div>
          <div className={classes.cartItemContent}>
            <p className={classes.cartItemDescription}>
              {currencyPrice.format(cart.quantity * cart.product.price)}
            </p>
          </div>
          <div className={classes.cartItemContent}>
            <Button
              variant="outlined"
              color="primary"
              size="medium"
              className={classes.buttonLeft}
              onClick={() => decreaseQuantity(cart.id)}
              disabled={cart.quantity > 1 ? false : true}
              classes={{ disabled: classes.disabledButton }}
            >
              <Remove />
            </Button>
            <input
              className={classes.input}
              value={cart.quantity}
              onChange={(e) => onChangeQuantity(e.target.value, cart.id)}
              type={'text'}
            />

            <Button
              className={classes.buttonRight}
              variant="outlined"
              color="primary"
              size="medium"
              onClick={() => icreaseQuantity(cart.id)}
            >
              <Add />
            </Button>
          </div>
          <div className={classes.cartItemClose} onClick={() => removeCart(cart.id)}>
            <Close></Close>
          </div>
        </li>
      ))}
    </ul>
  );
}

CartItem.propTypes = {};

export default CartItem;
