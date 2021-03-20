import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, TextField, Button, makeStyles } from '@material-ui/core';
import './FilterByPrice.css';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 10,
    '& > div': {
      width: 90,
      '& > div > input': {
        fontSize: '1.4rem',
      }
    }
  },
  button: {
    margin: '6px 10px 6px 10px',
    '& > span': {
      fontSize: 10,
    }
  }
}));


function FilterByPrice(props) {

  const classes = useStyles();

  const [values, setValues] = useState({'salePrice_gte': 0, 'salePrice_lte': 0})

  const handleChange = (e) => {  
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  
  };

  const handleSubmit = () => {
      if (props.onClickByFilterPrice) {
        props.onClickByFilterPrice(values)
      }
      setValues({'salePrice_gte': 0, 'salePrice_lte': 0})
  }

  return (
    <>
      <p className="filter-price-title">Chọn khoảng giá</p>
      <Box className={classes.root}>
        <TextField  name="salePrice_gte" value={values.salePrice_gte} onChange={handleChange} />
        <span className="input-midd">-</span>
        <TextField  name="salePrice_lte" value={values.salePrice_lte} onChange={handleChange} />
      </Box>

      <Button className={classes.button} variant="outlined" color="primary" size="medium" onClick={handleSubmit}>
        Áp dụng
      </Button>
    </>
  );
}

FilterByPrice.propTypes = {};

export default FilterByPrice;
