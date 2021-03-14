import React from 'react';
import {Link} from 'react-router-dom';
import './CardItems.css';
import PropTypes from 'prop-types';
import {STATIC_HOST, THUMBNAIL_PLACEHOLDER} from '../../../../constants/conmon';

CardItems.propTypes = {
  product: PropTypes.object,
};


function CardItems(props) {

  const { product } = props
  const thumbnailUrl = product.thumbnail ? `${STATIC_HOST}${product.thumbnail?.url}` : THUMBNAIL_PLACEHOLDER;
  const STYLE = ["l-3 m-6 c-12", "col-product c-12"]
  const cardCheckStyle = STYLE.includes(props.cardStyle) ? props.cardStyle : STYLE[0]
  return (
    <>
      <div className={`col ${cardCheckStyle}`}>
        <Link to={`/product/${product.id}`} className="card-link" >
          <div className="card-item">
            <div className="card-item__image" data-category="new" >
              <img src={thumbnailUrl} alt="hinh sp" className="card-item__img"></img>
            </div>
              <p className="card-item__description" title={product.name}>{product.name}</p>
              <p className="card-item__price">
                <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.salePrice)}</span>
                <span className="card-item__promotion-percent">{product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ''}</span>  
                </p>
              
          </div>
        </Link>
      </div>
      
    </>
  )
}

export default CardItems
