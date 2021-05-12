import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, FormControlLabel, Checkbox, makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: '1.6rem',
      padding: '1rem 1rem',
      borderTop: '1px solid #e4dddd',
    },
    title: {
        fontSize: '1.6rem',
        color: 'var(--text-color)',
        fontWeight: 300,
    },
    ul : {
        margin:0,
        padding: 0,
        listStyle: 'none',
        '& > li > label > span ': {
            fontSize: '1.2rem',
            fontWeight: 500,
            color: 'var(--text-color)',
        }
    }
   
  }));

function FilterByService(props) {
    const classes = useStyles()
  const { filters={}, onChangeService } = props;
  const services = [
    // { value: 'isPromotion', label: 'Có khuyến mãi' },
    { value: 'is_freeship', label: 'Vẫn chuyển miễn phí' },
  ];

  const handleChange = (event) => {
      if (!onChangeService) return;
      console.log(event.target.name,  event.target.checked)
      onChangeService({ [event.target.name]: event.target.checked })
  };

  return (
    <Box className={classes.root}>
      <Typography className={classes.title}>DỊCH VỤ</Typography>
      <ul className={classes.ul}>
        {services.map((service, index) => {
          return (
            <li key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Boolean(filters[service.value])}
                    onChange={handleChange}
                    name={service.value}
                    color="primary"
                  />
                }
                label={service.label}
              />
            </li>
          );
        })}
      </ul>
    </Box>
  );
}

FilterByService.propTypes = {
    filters: PropTypes.object,
    onChangeService: PropTypes.func,
};

export default FilterByService;
