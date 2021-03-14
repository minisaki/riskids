import React from 'react';
import PropTypes from 'prop-types';

function SelectColor(props) {
  return (
    <div className="product-container__list-color">
      <p className="product-container__list-color__text">
        Chọn màu
        <i className="far fa-question-circle question-icon"></i>:<span> *</span>
      </p>
      <ul className="product-container__list-img">
        <li className="product-container__item-img active">
          <img className="product-container__item-picture" src="./image/2.jpg" alt="anh"></img>
        </li>
        <li className="product-container__item-img ">
          <img className="product-container__item-picture" src="./image/3.jpg" alt="anh"></img>
        </li>
      </ul>
    </div>
  );
}

SelectColor.propTypes = {};

export default SelectColor;
