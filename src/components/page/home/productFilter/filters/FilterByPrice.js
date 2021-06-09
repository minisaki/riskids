import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, TextField, Button, makeStyles } from '@material-ui/core';
import './FilterByPrice.css';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 6,
    '& > div': {
      width: 90,
      '& > div > input': {
        fontSize: '1.4rem',
      },
    },
  },
  button: {
    margin: '6px 15px 6px 21px',
    '& > span': {
      fontSize: 10,
    },
  },
}));

function FilterByPrice(props) {
  const classes = useStyles();

  const [values, setValues] = useState({
    product_discount_price__gte: 0,
    product_discount_price__lte: 0,
  });
  const currencyPrice = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value) {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: parseInt(value.replaceAll(',', '')),
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: 0,
      }));
    }
  };

  const handleSubmit = () => {
    if (props.onClickByFilterPrice) {
      props.onClickByFilterPrice(values);
    }
    // setValues({'product_discount_price__gte': 0, 'product_discount_price__lte': 0})
  };
  const handleSubmitClose = () => {
    if (props.onClickByFilterPrice) {
      props.onClickByFilterPrice();
    }
    setValues({ product_discount_price__gte: 0, product_discount_price__lte: 0 });
  };
  const abc = values.product_discount_price__gte;
  console.log(abc.toString().replace(/(.)(?=(\d{3})+$)/g, '$1,'));
  return (
    <>
      <p className="filter-price-title">Chọn khoảng giá</p>
      <Box className={classes.root}>
        <TextField
          name="product_discount_price__gte"
          value={values.product_discount_price__gte.toString().replace(/(.)(?=(\d{3})+$)/g, '$1,')}
          onChange={handleChange}
        />
        <span className="input-midd">-</span>
        <TextField
          name="product_discount_price__lte"
          value={values.product_discount_price__lte.toString().replace(/(.)(?=(\d{3})+$)/g, '$1,')}
          onChange={handleChange}
        />
      </Box>

      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        size="medium"
        onClick={handleSubmit}
      >
        Áp dụng
      </Button>
      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        size="medium"
        onClick={handleSubmitClose}
      >
        Xóa
      </Button>
    </>
  );
}

FilterByPrice.propTypes = {};

export default FilterByPrice;
