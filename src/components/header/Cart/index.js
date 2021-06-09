import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';

import './cart.css';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER, STATIC_HOST_LOCAL } from '../../../constants/conmon';
import { removeCartItem } from '../../redux/cartSlice';
import { useDispatch } from 'react-redux';
import { Link } from '@material-ui/core';
import { useHistory } from 'react-router-dom';



function Cart(props) {
  const { carts, onclickClose } = props;
  console.log(carts.length)
  const dispatch = useDispatch()
  const onRemoveCart = (cartId) => {
    const action = removeCartItem(cartId)
    dispatch(action)
  }
  let history = useHistory();
  const handleLinkCart = () => {
    history.push('/cart/')
    onclickClose()
  }
  return (
    <>
      {carts.length > 0 ? (
        <div className="cart-item">
          <ul className="cart-item__list">
            {carts.map((cart, index) => {
              return (
                <li key={index} className="cart-item__detail">
                  <img className="cart-item__img" src={cart.product.image ? `${STATIC_HOST_LOCAL}${cart.product.image}` :THUMBNAIL_PLACEHOLDER } alt={cart.product.product_name||'hinh loi'}></img>
                  <div className="cart-item__content">
                    <p className="cart-item__description">{cart.product.name}</p>
                    <p className="cart-item__price">
                      {cart.quantity} x {cart.product.product_discount_price} đ
                    </p>
                  </div>
                  <div className="cart-item__close" onClick={()=>onRemoveCart(cart.id)}>
                    <i className="far fa-times-circle icon-close-cart__product"></i>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="cart-item__btn">            
            <Button btnStyle="btn-primary" btnSize="btn-medium" btnContent="Chi tiết" onClick={handleLinkCart} />
            
          </div>
        </div>
      ) : (
        <div className="cart-emtry">
          <h1 className="cart-emtry__noti">Bạn chưa thêm sản phẩm vào Giỏ</h1>
        </div>
      )}
    </>
  );
}

Cart.propTypes = {};

export default Cart;
