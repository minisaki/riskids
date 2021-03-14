import React from 'react';
import {Link} from 'react-router-dom';
import './logo.css';

function Logo() {
  return (
    <>
      <div className="Nabar-header__logo">
        <Link to="/"className="Nabar-header__link"> 
          <img 
            className="Nabar-header__link-picture"
            src="/image/logo.jpg"
            alt=""></img>
          <span className="Nabar-header__link-trademark">Ri'sKids</span>
        </Link>
      </div>
    </>
  )
}

export default Logo
