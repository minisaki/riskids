import React from 'react';
import Auth from './authForm/Auth';
import './Modal.css';

const Modal = (props) => {

    return (
    <>
      <div className="modal">
        <div className="modal__overlay"></div>
        <div className="modal__body">
          <Auth />
        </div>
      </div>
    </>
  )
}

export default Modal;