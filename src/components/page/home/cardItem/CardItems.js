import React from 'react';
import {Link} from 'react-router-dom';
import './CardItems.css';
import PropTypes from 'prop-types';
import {STATIC_HOST, THUMBNAIL_PLACEHOLDER, STATIC_HOST_LOCAL} from '../../../../constants/conmon';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

CardItems.propTypes = {
  product: PropTypes.object,
};


function CardItems(props) {

  const { product } = props
  // const thumbnailUrl = product.image ? `${STATIC_HOST_LOCAL}${product.image?.url}` : THUMBNAIL_PLACEHOLDER;
  const thumbnailUrl = product.image
  const STYLE = ["l-3 m-6 c-12", "col-product c-12"]
  const cardCheckStyle = STYLE.includes(props.cardStyle) ? props.cardStyle : STYLE[0]
  return (
    <>
      <div className={`col ${cardCheckStyle}`}>
        <Link to={`/product/${product.id}`} className="card-link" >
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
        </Link>
      </div>
      
    </>
  )
}

export default CardItems
