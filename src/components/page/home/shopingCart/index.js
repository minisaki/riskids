import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
// @material-ui/icons

import Close from '@material-ui/icons/Close';
import Remove from '@material-ui/icons/Remove';
import Add from '@material-ui/icons/Add';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// core components

import Card from './Card/Card.js';
import CardBody from './Card/CardBody.js';
import { useSelector, useDispatch } from 'react-redux';
import shoppingCartStyle from './shoppingCartStyle.js';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../../constants/conmon.js';
import { ButtonGroup, Button, TextField, Input } from '@material-ui/core';
import {
  increaseCartQuantity,
  decreaseCartQuantity,
  removeCartItem,
  editQuantityCartItem,
} from '../../../redux/cartSlice.js';

const useStyles = makeStyles(shoppingCartStyle);

function ShoppingCart(props) {
  const classes = useStyles();
  const carts = useSelector((state) => state.cartItem.current);
  const message = useSelector((state) => state.cartItem.message);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const icreaseQuantity = (cartId) => {
    const action = increaseCartQuantity(cartId);
    dispatch(action);
    enqueueSnackbar(message, { variant: 'success' });
  };
  const decreaseQuantity = (cartId) => {
    const action = decreaseCartQuantity(cartId);
    const result = dispatch(action);
    console.log(result);
    enqueueSnackbar(message, { variant: 'success' });
  };
  const removeCart = (cartId) => {
    try {
      const action = removeCartItem(cartId);

      dispatch(action);
      enqueueSnackbar('xóa thành công', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('có lỗi khi xóa', { variant: 'error' });
    }
  };

  const onChangeQuantity = (value, cartId) => {
    const payload = { quantity: value, id: cartId };
    dispatch(editQuantityCartItem(payload));
    enqueueSnackbar('Sửa số lượng thành công', { variant: 'success' });
  };

  return (
    <div className={classNames(classes.main, classes.mainRaised)}>
      <div className={classes.container}>
        <Card plain>
          <CardBody plain>
            {carts.length && (
              <div className="grid wide">
                <div className={classes.cartTitle}>Giỏ hàng</div>
                <div className="row">
                  <div className="col l-9 m-12 c-12">
                    <ul className={classes.resetUl}>
                      {carts.map((cart, index) => (
                        <li key={index} className={classes.cartItemDetail}>
                          <img
                            className={classes.cartItemImg}
                            src={
                              cart.product.thumbnail
                                ? `${STATIC_HOST}${cart.product.thumbnail?.url}`
                                : THUMBNAIL_PLACEHOLDER
                            }
                            alt={cart.product.thumbnail?.name||'hinh loi'}
                          ></img>
                          <div className={classNames(classes.cartContent, 'cart-item__content')}>
                            <p className={classes.cartItemDescription}>{cart.product.name}</p>
                            <p className={classes.cartItemPrice}>
                              {cart.quantity} x {cart.product.salePrice} đ
                            </p>
                            <p className={classes.cartItemPrice}>Màu: Trắng</p>
                            <p className={classes.cartItemPrice}>Size: L</p>
                          </div>
                          <div className={classes.cartItemContent}>
                            <p className={classes.cartItemDescription}>
                              {cart.quantity * cart.product.salePrice} đ
                            </p>
                          </div>
                          <div className={classes.cartItemContent}>
                            <Button
                              variant="outlined"
                              color="primary"
                              size="medium"
                              className={classes.buttonLeft}
                              onClick={() => decreaseQuantity(cart.id)}
                              disabled = {cart.quantity > 1 ? false : true}
                              classes= {{ disabled: classes.disabledButton }}
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
                          <div
                            className={classes.cartItemClose}
                            onClick={() => removeCart(cart.id)}
                          >
                            <Close></Close>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col l-3">
                    <div className={classes.asideWrapper}>
                      <h3 className={classes.asideTitle}>Giỏ hàng của bạn đang có</h3>
                      <div className={classes.asideCheckout}>
                        <span>Tạm tính</span>
                        {carts.length > 1 && (
                          <span>
                            {carts.reduce(
                              (a, b) =>
                                a.quantity * a.product.salePrice + b.quantity * b.product.salePrice
                            )}
                            đ
                          </span>
                        )}
                        {carts.length <= 1 && (
                          <span>{carts[0].quantity * carts[0].product.salePrice}đ</span>
                        )}
                      </div>
                      <div className={classes.asideCheckout}>
                        <span>Thành tiền</span>
                        {carts.length > 1 && (
                          <span>
                            {carts.reduce(
                              (a, b) =>
                                a.quantity * a.product.salePrice + b.quantity * b.product.salePrice
                            )}
                            đ
                          </span>
                        )}
                        {carts.length <= 1 && (
                          <span>{carts[0].quantity * carts[0].product.salePrice}đ</span>
                        )}
                      </div>
                      <Button className={classes.buttonCart} variant="contained" color="secondary">
                        Đặt hàng
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!carts.length && (
              <div className="grid wide">
                <div className={classes.cartTitle}>
                  Không có sản phẩm nào trong giỏ hàng của bạn.
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

ShoppingCart.propTypes = {};

export default ShoppingCart;
