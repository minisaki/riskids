import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';



PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  lable: PropTypes.string,
  disable: PropTypes.bool,
};

function PasswordField(props) {
  const { form, name, label, disable, labelWidth } = props;
  const { errors } = form;
  const hasError = !!errors[name]
  const [showPassword, setShowPassword] = useState();


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  

  return (
    
    //   render={({onChange}) => (
    //     <div className="auth__input-wrap">
    //       <input
    //         className="auth__input--password"
    //         type="password"
    //         placeholder={label}
    //         disabled={disable}
    //         onChange={(e) => onChange(e.target.value)}
    //       />
    //       <p className="messages-error">{formState.errors[name]?.message}</p>
    //     </div>
    //   )}

    // />

    <FormControl error={hasError} variant="outlined" size="small" margin="normal" fullWidth color="secondary">
      <InputLabel htmlFor="outlined-adornment-password" style={{ fontSize: 16 }}>
        {label}
      </InputLabel>
      <Controller
        name={name}
        control={form.control}
        as={OutlinedInput}
        id={name}
        type={showPassword ? 'text' : 'password'}
        // value={password}
        // onChange={handleChange('password')}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              //   onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={labelWidth}
        inputProps={{ style: { fontSize: 16 } }}
        disabled={disable}
      />
    <FormHelperText 
      error={!!hasError} 
      variant="outlined"
      style={{fontSize: 14}}
      >{errors[name]?.message} </FormHelperText>
    </FormControl>
  );
}

export default PasswordField;
