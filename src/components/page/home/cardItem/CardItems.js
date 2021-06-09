import React, { useMemo } from 'react';
import {Link, useHistory} from 'react-router-dom';
import './CardItems.css';
import PropTypes from 'prop-types';
import {STATIC_HOST, THUMBNAIL_PLACEHOLDER, STATIC_HOST_LOCAL} from '../../../../constants/conmon';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import storagekeys from '../../../../constants/storageKeys';
import queryString from 'query-string';


CardItems.propTypes = {
  product: PropTypes.object,
};


function CardItems(props) {

  const { product } = props
  // const thumbnailUrl = product.image ? `${STATIC_HOST_LOCAL}${product.image?.url}` : THUMBNAIL_PLACEHOLDER;
  const thumbnailUrl = product.image
  const STYLE = ["l-3 m-6 c-12", "col-product c-12"]
  const cardCheckStyle = STYLE.includes(props.cardStyle) ? props.cardStyle : STYLE[0]
  let history = useHistory();
  
  
  const addProductView = (e, product) => {
    let productViewList = JSON.parse(localStorage.getItem(storagekeys.LISTVIEW)) || []
    console.log(productViewList.length)
    e.preventDefault();
    history.push(`/products/${product.url_slug}/`)
    if (productViewList.length === 0) {
      productViewList.push({
        id: product.id,
        url_slug: product.url_slug,
        product_name : product.product_name,
        product_discount_price : product.product_discount_price,
        is_stock_total: product.is_stock_total,
        is_freeship: product.is_freeship,
        image : product.image,
        product_varients: product.product_varients,
        product_max_price: product.product_max_price
      })
      localStorage.setItem(storagekeys.LISTVIEW, JSON.stringify(productViewList))
    } else {
      const check = productViewList.findIndex((item) => item.id === product.id)
      check === -1 && productViewList.push({
        id: product.id,
        url_slug: product.url_slug,
        product_name : product.product_name,
        product_discount_price : product.product_discount_price,
        is_stock_total: product.is_stock_total,
        is_freeship: product.is_freeship,
        image : product.image,
        product_varients: product.product_varients,
        product_max_price: product.product_max_price
      })
      localStorage.setItem(storagekeys.LISTVIEW, JSON.stringify(productViewList))
    }
    
  }
  return (
    <>
      <div className={`col ${cardCheckStyle}`}>
        <div className="card-link" onClick={(e) => addProductView(e, product)}>
          <div className="card-item">
            <div className="card-item__image" data-category={product.get_per_product_discount_price > 0 ? ` -${product.get_per_product_discount_price}%` : 'New'} >
              <img src={thumbnailUrl} alt="hinh sp" className="card-item__img"></img>
            </div>
              <p className="card-item__description" title={product.product_name}>{product.product_name}</p>
              <p className="card-item__price">
                <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.product_discount_price)}</span>
                <span className="card-item__promotion-percent">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.product_max_price)}</span>  
                <span className="icon-eye">{product.view_product}<VisibilityOutlinedIcon/></span>
                </p>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default CardItems
