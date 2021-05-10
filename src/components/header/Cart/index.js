import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';

import './cart.css';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../constants/conmon';
import { removeCartItem } from '../../redux/cartSlice';
import { useDispatch } from 'react-redux';

function Cart(props) {
  const { carts } = props;
  console.log(carts.length)
  const dispatch = useDispatch()
  const onRemoveCart = (cartId) => {
    const action = removeCartItem(cartId)
    dispatch(action)
  }
  return (
    <>
      {carts.length > 0 ? (
        <div className="cart-item">
          <ul className="cart-item__list">
            {carts.map((cart, index) => {
              return (
                <li key={index} className="cart-item__detail">
                  <img className="cart-item__img" src={cart.product.thumbnail ? `${STATIC_HOST}${cart.product.thumbnail?.url}` :THUMBNAIL_PLACEHOLDER } alt={cart.product.thumbnail?.name||'hinh loi'}></img>
                  <div className="cart-item__content">
                    <p className="cart-item__description">{cart.product.name}</p>
                    <p className="cart-item__price">
                      {cart.quantity} x {cart.product.salePrice} đ
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
            <Button btnStyle="btn-primary" btnSize="btn-medium" btnContent="Đặt hàng" />
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
