import React from 'react';
import PropTypes from 'prop-types';
import FilterByCategory from './filters/FilterByCategory';
import FilterByPrice from './filters/FilterByPrice';
import FilterByService from './filters/FilterByService';

function ProductFilter(props) {
  const onChange = (categories) => {
    if (props.onChange) {
      const newFilters = {
        'category.id': categories.id,
      };
      const CategoryName = categories.name;
      props.onChange(newFilters, CategoryName);
    }
  };
  const HandleSubmit = (newFilters) => {
    if (props.onClickByFilterPrice) {
      props.onClickByFilterPrice(newFilters);
    }
  };
  const onChangeService = (services) => {
    console.log(services)
    if (!props.onChangeService) return;
    props.onChangeService(services)
  };
  return (
    <div className="category_aside-wrapper">
      <FilterByCategory onChange={onChange} />
      <FilterByPrice onClickByFilterPrice={HandleSubmit} />
      <FilterByService filters={props.filters} onChangeService={onChangeService} />
    </div>
  );
}

ProductFilter.propTypes = {
  onChange: PropTypes.func,
  filters: PropTypes.object,
  onChangeService: PropTypes.func,
  onClickByFilterPrice: PropTypes.func,
};

export default ProductFilter;
