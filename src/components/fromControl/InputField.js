import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { FormControl, InputLabel, OutlinedInput, FormHelperText } from '@material-ui/core';


InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  lable: PropTypes.string,
  disable: PropTypes.bool,
  labelWidth: PropTypes.number,
};

function InputField(props) {
  const { form, name, label, disable, labelWidth } = props;
  const { errors } = form;
  const hasError = !!errors[name]

  return (
    // <Controller
    // name={name}
    // control={from.control}
    // as = {TextField}
    // variant="outlined"
    // label={label}
    // disabled={disable}
    // fullWidth
    // margin="normal"
    // size="small"
    // inputProps={{style: {fontSize: 16}}}
    // // InputLabelProps={{ style: { fontSize: 16 }}}
    // color='secondary'
    // sử dụng render với mauã tự code
    // render={({onChange}) => (
    //   <div className="auth__input-wrap">
    //     <input
    //       className="auth__input--user"
    //       type="text"
    //       placeholder={label}
    //       disabled={disable}
    //       onChange={(e) => onChange(e.target.value)}
    //     />
    //     <p>{formState.errors[name]?.message}</p>
    //   </div>
    // )}
    // ></Controller>
    <FormControl error={hasError} variant="outlined" size="small" margin="normal" fullWidth color="secondary">
      <InputLabel htmlFor="outlined-adornment-password" style={{ fontSize: 16 }}>
        {label}
      </InputLabel>
      <Controller
        name={name}
        control={form.control}
        as={OutlinedInput}
        id={name}
        type="text"
        // value={password}
        // onChange={handleChange('password')}

        labelWidth={labelWidth}
        inputProps={{ style: { fontSize: 16 } }}
        disabled={disable}
        
      />
      <FormHelperText 
        error={!!hasError}
        style={{fontSize: 14}}
      >{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

export default InputField;
