import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import categoryApi from '../../../../../api/categoryApi';
import CategorySkeletonList from '../../CategorySkeletonList';

function FilterByCategory(props) {

    const [categories, setCategories] = useState([])

    const [loadingCategory, setLoadingCategory] = useState(false);

    const onClickCategory = (category) => {
        
        if (props.onChange) {
            props.onChange(category)
        }
    }

    useEffect(() => {
        (async ()=> {
            try {
                const list = await categoryApi.getAll()
                setCategories(list.map((cate) => {
                    return {id: cate.id, name: cate.name}
                }))
            } catch(error) {
                console.log('Failed to fetch category list', error);
            }
            setLoadingCategory(true)

        })()
    },[])

    
  return (
    <>
       {!loadingCategory ? <CategorySkeletonList/> : 
       <>
      <h3 className="category_aside-title">DANH MỤC SẢN PHẨM</h3>
      <ul className="category_aside-list">
          {categories.map((category, index)=> {
              return <li 
                        key={index} 
                        className="category_aside-item"
                        onClick={()=>onClickCategory(category)}
                        >
                            {category.name}
                    </li>
          })}
        
        
      </ul></>} 
    </>
  );
}

FilterByCategory.propTypes = {
    onChange: PropTypes.func,
};

export default FilterByCategory;
