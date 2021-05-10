import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import CategorySkeletonList from '../../CategorySkeletonList';

function FilterByCategory(props) {
  const categories = useSelector((state) => state.categories.current);
  const loadingCategory = useSelector((state) => state.categories.loading);
  const onClickCategory = (category) => {
    if (props.onChange) {
      props.onChange(category);
    }
  };

  return (
    <>
      {loadingCategory ? (
        <CategorySkeletonList />
      ) : (
        <>
          <h3 className="category_aside-title">DANH MỤC SẢN PHẨM</h3>
          
          <ul className="category_aside-list">
            <div  className="category_aside-item">Tất cả sản phẩm</div>
            {categories?.map((category, index) => {
              return (
                <li
                  key={index}
                  className="category_aside-item"
                  onClick={() => onClickCategory(category)}
                >
                  {category.title}
                </li>               
               
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

export default FilterByCategory;
