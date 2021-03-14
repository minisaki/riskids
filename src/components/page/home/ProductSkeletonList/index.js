import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';

ProductSkeletonList.propTypes = {
  length: PropTypes.number,
};

function ProductSkeletonList({ length }) {
  return (
    <div className="row">
      {Array.from(new Array(length)).map((x, index) => (
        <div key={index} className="col l-3 m-6 c-12">
          <Skeleton variant="rect" width="100%" height={200} />
          <Skeleton />
          <Skeleton width="60%" />
        </div>
      ))}
    </div>
  );
}

ProductSkeletonList.defaultProps = {
  length: 6,
};

export default ProductSkeletonList;
