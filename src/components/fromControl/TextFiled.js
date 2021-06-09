import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { FormControl, InputLabel, FormHelperText, Input } from '@material-ui/core';



TextFieldCustom.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  lable: PropTypes.string,
  disable: PropTypes.bool,
  labelWidth: PropTypes.number,
};

function TextFieldCustom(props) {
  const { form, name, label, disable, className, defaultValues } = props;
  const { errors } = form;
  const hasError = !!errors[name]
  return (
    <FormControl error={hasError}  size="medium" fullWidth className={className} color="primary">
    <InputLabel htmlFor="my-input">{label}</InputLabel>
    <Controller
        name={name}
        control={form.control}
        as={Input}
        id={name}
        type="text"
        inputProps={{ style: { fontSize: 12 } }}
        disabled={disable}
        value='123'
      />
    <FormHelperText 
        error={!!hasError}
        style={{fontSize: 10}}
      >{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

export default TextFieldCustom;