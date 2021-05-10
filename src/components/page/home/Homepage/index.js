import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '../card/Card';
import { Link } from 'react-router-dom';
import productApi from '../../../../api/productApi';
import categoryApi from '../../../../api/categoryApi';
import ProductSkeletonList from '../ProductSkeletonList';
import {useSelector} from 'react-redux';

function Homepage(props) {
  
  const categories = useSelector((state) => state.categories.current)
  const  loading = useSelector((state) => state.categories.loading)
  return (
    <div className="container">
      <div className="grid wide">
        {loading && <ProductSkeletonList length={9} />}
            
         { !loading && categories.map((category, index) => {          
            return   <Card 
                        key={index} 
                        CategoryName={category.title} 
                        data = {category.products.filter((product,index) => {return index < 8})}
                        CategoryId={category.id}
                        />
                    
        })})
     
      
      </div>
    </div>
  );
}

Homepage.propTypes = {};

export default Homepage;
