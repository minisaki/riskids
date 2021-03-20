import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';

import './cart.css';

function Cart(props) {
  const { cart } = props;  
  
  
  
  return (
    <>
      {!!cart.id ? (
        <div className="cart-item">
          <ul className="cart-item__list">
            
            <li className="cart-item__detail">
              <img className="cart-item__img" src="/image/1.jpg" alt="hinh san pham"></img>
              <div className="cart-item__content">
                <p className="cart-item__description">
                  {cart.product.name}
                </p>
                <p className="cart-item__price">{cart.quantity} x {cart.product.salePrice} đ</p>
              </div>
              <div className="cart-item__close">
                <i className="far fa-times-circle icon-close-cart__product"></i>
              </div>
            </li>
            <li className="cart-item__detail">
              <img className="cart-item__img" src="/image/1.jpg" alt="hinh san pham"></img>
              <div className="cart-item__content">
                <p className="cart-item__description">
                  Chân Váy Bé Gái Voan Lưới In Hoa Cúc Tiểu Thư Xinh Xắn (1 - 8 tuổi)
                </p>
                <p className="cart-item__price">1 x 129.000 đ</p>
              </div>
              <div className="cart-item__close">
                <i className="far fa-times-circle icon-close-cart__product"></i>
              </div>
            </li>
            <li className="cart-item__detail">
              <img className="cart-item__img" src="/image/1.jpg" alt="hinh san pham"></img>
              <div className="cart-item__content">
                <p className="cart-item__description">
                  Chân Váy Bé Gái Voan Lưới In Hoa Cúc Tiểu Thư Xinh Xắn (1 - 8 tuổi)
                </p>
                <p className="cart-item__price">1 x 129.000 đ</p>
              </div>
              <div className="cart-item__close">
                <i className="far fa-times-circle icon-close-cart__product"></i>
              </div>
            </li>
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
