import React from 'react';
import CardItems from '../cardItem/CardItems';
import './Card.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

Card.propTypes = {
  data: PropTypes.array,
};

Card.defaultProps = {
  data: [],
};

function Card(props) {
  const { data, CategoryName, CategoryId } = props;
  let history = useHistory();

  const navigationCtegory = () => {
    // history.push("/categories", {id: CategoryId, name:CategoryName});
    if (CategoryId) {
      let filters = {
        category_id: CategoryId,
        is_freeship: false,
        page: 1,
      };
      history.push(
        {
          pathname: `/categories/`,
          search: queryString.stringify(filters),
        },
        { name: CategoryName }
      );
    }
  };
  return (
    <>
      <div className="container__title">
        <div className="container__title-wrapper">
          <i className="fas fa-tshirt container__icon"></i>
          <h2 className="container__text" onClick={navigationCtegory}>
            {CategoryName}
          </h2>
        </div>
      </div>
      <div className="row">
        {data.map((product) => (
          <CardItems key={product.id} cardStyle="l-3 m-6 c-12" product={product} />
        ))}
      </div>
    </>
  );
}

export default Card;
