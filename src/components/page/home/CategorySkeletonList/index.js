import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

CategorySkeletonList.propTypes = {
  length: PropTypes.number,
};

const variants = ['h1', 'h3', 'body1', 'caption'];
function CategorySkeletonList() {
  return (
    <div>
      {variants.map((variant) => (
        <Typography component="div" key={variant} variant={variant}>
          <Skeleton />
        </Typography>
      ))}
    </div>
  );
}


export default CategorySkeletonList;
