import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '../card/Card';
import { Link } from 'react-router-dom';
import productApi from '../../../../api/productApi';
import ProductSkeletonList from '../ProductSkeletonList';
import categoryApi from '../../../../api/categoryApi';

function Homepage(props) {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    (async () => {
      try {
        const data  = await categoryApi.getAll();
        setCategories(data);
        
        
        setLoading(false)
      } catch (error) {
        console.log('Failed to fetch product list: ', error);
      }
    })();
  }, []);

  
    
  return (
    <div className="container">
      <div className="grid wide">
        {loading && <ProductSkeletonList length={9} />}
            
         { !loading && categories.map((category, index) => {          
            return   <Card key={index} text={category.name} data = {category.products.filter((product,index) => {return index < 8})}/>
                    
        })})
     
      
      </div>
    </div>
  );
}

Homepage.propTypes = {};

export default Homepage;