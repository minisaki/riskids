import React from 'react';
import CardItems from '../cardItem/CardItems';
import './Card.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";


Card.propTypes = {
  data: PropTypes.array,
};

Card.defaultProps = {
  data: [],
};

function Card(props) {
  const {data, text, sort} = props
  let history = useHistory();

  if (sort === 4) {
    data.sort(function(a, b){
      return b.originalPrice - a.originalPrice
    })
  }
  if (sort === 3) {
    data.sort(function(a, b){
      return a.originalPrice - b.originalPrice
    })
  }
  if (sort === 2) {
    data.sort(function(a, b){
      console.log(Date.parse(a.created_at))
      console.log(Date.parse(b.created_at))
      return Date.parse(a.created_at) - Date.parse(b.created_at)
    })
    
  }
  const navigationCtegory = () => {
    history.push("/categories", {text});
    console.log(history)
  }
  return (
    <>
      <div className="container__title">
        <div className="container__title-wrapper">
          <i className="fas fa-tshirt container__icon"></i>
          <h2 className="container__text" onClick={navigationCtegory}>{text}</h2>
        </div>
      </div>
      <div className="row">
        {data.map((product) => (
          <CardItems
            key={product.id}
            cardStyle="l-3 m-6 c-12"
            product = {product}     
          /> 
          ))}
      </div>        
    </>
  )
}

export default Card
