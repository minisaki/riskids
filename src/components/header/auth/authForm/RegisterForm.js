import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import Button from '../../../Button';
import InputField from '../../../fromControl/InputField';
import PasswordField from '../../../fromControl/PasswordField';
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
  // css
  const classes = useStyles();
  // validation filed
  const schema = yup.object().shape({
    textEmail: yup.string()
      .required('Vui lòng nhập trường này!')
      .email('Vui lòng nhập dúng Email'),
    textPassword: yup.string()
      .min(8, "Tối thiểu 8 kí tự")
      .required("Vui lòng nhập trường này!"),
    reTextPassword: yup.string()
      .oneOf([yup.ref("textPassword")], "Password bạn nhập chưa khớp")
      .required("Vui lòng nhập trường này!")
  });

  

  const form = useForm({
    defaultValues: {
      textEmail: '',
      textPassword: '',
      reTextPassword: '',
    },
    resolver: yupResolver(schema),
  });

  // toggle form register and login
  const ToggleFrom = () => {
    props.onToggleFrom(true);
  }

  // disoatch action on redux
  const dispatch = useDispatch()
  const handleCloseForm = () => {
  const action = onClickClose();
      dispatch(action)
  }

  
  const handleSubmitForm =  async (data) => {
    const {onSubmitFormRegister} = props
    
    if (onSubmitFormRegister) {
      await onSubmitFormRegister(data)
    }
    
    // props.onSubmitForm(data)
  }

  const {isSubmitting} = form.formState

  return (
    <form className="auth-form" onSubmit={form.handleSubmit(handleSubmitForm)}>
      {isSubmitting && <LinearProgress className={classes.progress} color="secondary"/>}
      <div className="auth__header">
        <h3 className='auth__header--switch'>
          Đăng kí
        </h3>
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
        
          <PasswordField
            name="reTextPassword"
            label="Nhap lai Mật Khẩu"
            labelWidth={130}
            form={form}
          ></PasswordField>
        
      </div>

      <div className="auth__policy">
        <p className="auth__policy--link" onClick={ToggleFrom}>          
            <span>
              Bạn đã có tài khoản,{' '}
              <Link to="/" className="auth__policy--link-switch">
                Đi đến đăng nhập
              </Link>
            </span>
          
        </p>
      </div>

      <div className="auth__btn">
        <Button
          btnStyle="btn-primary"
          btnSize="btn-large"
          btnContent='Đăng kí'
          isDisabled={isSubmitting}
        />
      </div>
    </form>
  );
}

RegisterForm.propTypes = {};

export default RegisterForm;
