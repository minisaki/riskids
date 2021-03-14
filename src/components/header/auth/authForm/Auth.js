import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register, login } from '../../../redux/userSlice';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { useSnackbar } from 'notistack';
import { onClickClose } from '../../../redux/closeFormSlice';

function Auth(props) {

    const dispatch = useDispatch()

    const [toggleFrom, setToggleFrom] = useState(true);

    const { enqueueSnackbar } = useSnackbar();

    const handleCloseForm = () => {
    const action = onClickClose();
        dispatch(action)
    }
    const handleSubmitRegister = async (data) => {
        // auto set username
        const instantData = {}
        instantData.email = data.textEmail
        instantData.username = data.textEmail
        instantData.fullName = 'Easy Frontend'
        instantData.password = data.textPassword
        try {            
            const action = register(instantData)
            const resultAction = await dispatch(action)
            const user = unwrapResult(resultAction)

            console.log("new user: ", user)
            
            enqueueSnackbar('Dang ki thanh cong', {variant: 'success',});

            handleCloseForm()

        } catch (error) {
            console.log("failed to register: ", error)
            enqueueSnackbar(error.message, {variant: 'error',});
        }
        
    }

    const handleSubmitLogin = async (data) => {
        // auto set username
        const instantData = {}
        instantData.identifier = data.textEmail
        instantData.password = data.textPassword
        console.log(instantData)
        try {            
            const action = login(instantData)
            const resultAction = await dispatch(action)
            const user = unwrapResult(resultAction)

            console.log("new user: ", user)
            enqueueSnackbar('Dang nhap thanh cong', {variant: 'success',});

            handleCloseForm()

        } catch (error) {
            console.log("failed to register: ", error)
            enqueueSnackbar(error.message, {variant: 'error',});
        }
        
    }
    return (
        <>  
        {toggleFrom ? 
            <LoginForm
                onToggleFrom={(bool) => setToggleFrom(bool)}
                onSubmitFormLogin={handleSubmitLogin}
            /> : 
            <RegisterForm 
                
                onSubmitFormRegister={handleSubmitRegister}
                onToggleFrom={(bool) => setToggleFrom(bool)}

            />
                
        }
        </>
    )
}

Auth.propTypes = {
    
}

export default Auth

