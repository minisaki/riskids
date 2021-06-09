import React, { useMemo, useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

// @material-ui/icons
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import FormOderCart from './formOrderCart';
import CartItem from './cartItem';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
// core components

import { useSelector, useDispatch } from 'react-redux';
import shoppingCartStyle from './shoppingCartStyle.js';

import {
  increaseCartQuantity,
  decreaseCartQuantity,
  removeCartItem,
  editQuantityCartItem,
  deleteCartOrder,
} from '../../../redux/cartSlice.js';
import { create } from '../../../redux/orderSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import orderApi from '../../../../api/orderApi';
import CartSkeleton from './CartSteleton';
import { Breadcrumbs, Link } from '@material-ui/core';

const useStyles = makeStyles(shoppingCartStyle);

function ShoppingCart(props) {
  const classes = useStyles();
  const carts = useSelector((state) => state.cartItem.current);
  const [customer, setCustomer] = useState('');
  const [loading, setLoading] = useState(true);
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

  const deleteCart = () => {
    try {
      const action = deleteCartOrder();

      dispatch(action);
    } catch (error) {
      enqueueSnackbar('có lỗi khi xóa', { variant: 'error' });
    }
  };

  const onChangeQuantity = (value, cartId) => {
    const payload = { quantity: value, id: cartId };
    dispatch(editQuantityCartItem(payload));
    enqueueSnackbar('Sửa số lượng thành công', { variant: 'success' });
  };

  const total = useMemo(() => {
    if (carts.length > 0) {
      if (carts.length > 1) {
        return carts.reduce((a, b) => a + b.quantity * b.product.price, 0);
      } else {
        return carts[0].quantity * carts[0].product.price;
      }
    }
  }, [carts]);

  const handleSubmitForm = async (data) => {
    const idBrowser = localStorage.getItem('idbrowser');
    const instantData = {};
    instantData.username = data.nameOrder + idBrowser;
    instantData.password = data.phoneOrder;
    instantData.customeruser = {
      phone: data.phoneOrder,
      address: data.addressOrder,
      name: data.nameOrder,
    };
    instantData.codeOrder = idBrowser;
    instantData.carts = carts;
    try {
      const action = create(instantData);
      const resultAction = await dispatch(action);
      const order = unwrapResult(resultAction);

      console.log('new order: ', order);

      enqueueSnackbar('tạo đơn hàng thanh cong', { variant: 'success' });
      if (order.code) {
        deleteCart();
      }
    } catch (error) {
      console.log('failed to register: ', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const customer = await orderApi.get();
        setCustomer(customer['data']);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log('Failed to fetch product: ', error);
      }
    })();
  }, []);

  const currencyPrice = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'VND',
  }).format(total);
  return (
    <Fragment>
      {!loading && carts.length && (
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <div className="grid wide">
              <Breadcrumbs 
                separator={<NavigateNextIcon fontSize="large" />}
                aria-label="breadcrumb"
                className={classes.breadcrumb}
              >
                <Link color="inherit" to="/">
                  Trang chủ
                </Link>
                <Link color="inherit" href="/getting-started/installation/">
                  Chi tiết giỏ hàng
                </Link>
              </Breadcrumbs>

              <div className="row">
                <div className="col l-9 m-12 c-12">
                  <div className={classes.asideTitle}>Sản Phẩm Trong Giỏ</div>
                  <CartItem
                    classes={classes}
                    carts={carts}
                    decreaseQuantity={decreaseQuantity}
                    icreaseQuantity={icreaseQuantity}
                    removeCart={removeCart}
                    onChangeQuantity={onChangeQuantity}
                  />
                </div>
                <div className="col l-3 m-12 c-12">
                  <div className={classes.asideWrapper}>
                    <h3 className={classes.asideTitle}>Thành Tiền</h3>
                    <div className={classes.asideCheckout}>
                      <span>Tạm tính</span>
                      <span>{currencyPrice}</span>
                    </div>
                    <div className={classes.asideCheckout}>
                      <span>Thành tiền</span>
                      <span>{currencyPrice}</span>
                    </div>
                  </div>
                  <FormOderCart
                    classes={classes}
                    handleSubmitForm={handleSubmitForm}
                    customer={customer}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!loading && !carts.length && (
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <div className="grid wide">
              <div className={classes.cartTitle}>Giỏ hàng trống</div>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <CartSkeleton length={6} />
          </div>
        </div>
      )}
    </Fragment>
  );
}

ShoppingCart.propTypes = {};

export default ShoppingCart;
