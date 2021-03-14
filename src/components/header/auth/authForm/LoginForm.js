import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Button from '../../../Button';
import InputField from '../../../fromControl/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PasswordField from '../../../fromControl/PasswordField';
import { useDispatch } from 'react-redux';
import { onClickClose } from '../../../redux/closeFormSlice';
import { LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
  },
  progress: {
    position: 'absolute',
    top: 77,
    right: 21,
    left: 20
  }
});

function RegisterForm(props) {
  const schema = yup.object().shape({
    textEmail: yup.string().required('Vui lòng nhập trường này!').email('Vui lòng nhập dúng Email'),
    textPassword: yup.string().min(8, 'Tối thiểu 8 kí tự').required('Vui lòng nhập trường này!'),
    
  });

  const classes = useStyles();

  // redux close form
  const dispatch = useDispatch();
  const handleCloseForm = () => {
    const action = onClickClose();
    dispatch(action);
  };
  const form = useForm({
    defaultValues: {
      textEmail: '',
      textPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const convertRegister = () => {
    props.onToggleFrom(false);
  };

  const handleSubmitForm =  async (data) => {
    const {onSubmitFormLogin} = props
    if (onSubmitFormLogin) {
       await onSubmitFormLogin(data)
    }
  };

  // check isSubmitting
  const {isSubmitting} = form.formState
  
  return (
    <form className="auth-form" onSubmit={form.handleSubmit(handleSubmitForm)}>
      {isSubmitting && <LinearProgress color="secondary" className={classes.progress} />}
      <div className="auth__header">       
        <h3 className="auth__header--switch">Đăng nhập</h3>
        <i className="fas fa-times icon-close" onClick={handleCloseForm}></i>
      </div>
      <div className="auth__input">
        <InputField name="textEmail" label="Email" labelWidth={40} form={form}></InputField>
        <PasswordField
          name="textPassword"
          label="Mật Khẩu"
          labelWidth={70}
          form={form}
        ></PasswordField>
        <div className="auth__input-wrap">
          <p className="auth-form--link">Quên mật khẩu?</p>
        </div>
      </div>

      <div className="auth__policy">
        <p className="auth__policy--link" onClick={convertRegister}>
          <span>
            Bạn chưa có tài khoản,{' '}
            <Link to="/" className="auth__policy--link-switch">
              Đăng ký tài khoản mới
            </Link>
          </span>
        </p>
      </div>

      <div className="auth__btn">
        <Button 
          btnStyle="btn-primary" 
          btnSize="btn-large" 
          btnContent="Đăng nhập"
          isDisabled={isSubmitting}
          />
      </div>
    </form>
  );
}

RegisterForm.propTypes = {};

export default RegisterForm;
