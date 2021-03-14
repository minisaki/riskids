import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './NabarMenu.css';


const NabarMenu = (props) => {
  
  const [authMobile, setAuthMobile] = useState(true)

 

  const clickedAuthMobile = () => {
    setAuthMobile(true)
    props.clickedAuthMobile(authMobile)
  }
  return (
    <div className={props.className} onClick={()=> props.barClose(false)}>
      <div className="grid wide menu-mobile">
        <ul className="menu__list">
          <li className="menu__item logo-mobile">
            <div className="Nabar-header__logo--menu">
              <Link to="#"className="Nabar-header__link--menu"> 
                <img 
                  className="Nabar-header__link-picture--menu"
                  src="/image/logo.jpg"
                  alt=""></img>
                <span className="Nabar-header__link-trademark--menu">Ri'sKids</span>
              </Link>
        </div>
          </li>
          <li className="menu__item">
            <h2 className="menu__item-title">QUẦN ÁO BÉ TRAI</h2>
            <div className="menu-detail">
              <ul className="menu-detail__list">
                <li className="menu-detail__item">Áo sơ mi</li>
                <li className="menu-detail__item">Áo thun</li>
                <li className="menu-detail__item">Áo khoác</li>
                <li className="menu-detail__item">Quần kiểu</li>
                <li className="menu-detail__item">Đồ bộ</li>
                <li className="menu-detail__item">Đồ bơi</li>
              </ul>
            </div>
            </li>
          <li className="menu__item">            
            <h2 className="menu__item-title">QUẦN ÁO BÉ GÁI</h2>
            <div className="menu-detail">
              <ul className="menu-detail__list">
                <li className="menu-detail__item">Áo sơ mi</li>
                <li className="menu-detail__item">Áo thun</li>
                <li className="menu-detail__item">Áo khoác</li>
                <li className="menu-detail__item">Quần kiểu</li>
                <li className="menu-detail__item">Đồ bộ</li>
                <li className="menu-detail__item">Đồ bơi</li>
              </ul>
            </div>
            </li>
          <li className="menu__item">
            <h2 className="menu__item-title">ĐỒ SƠ SINH</h2>
            <div className="menu-detail">
              <ul className="menu-detail__list">
                <li className="menu-detail__item">Áo sơ mi</li>
                <li className="menu-detail__item">Áo thun</li>
                <li className="menu-detail__item">Áo khoác</li>
                <li className="menu-detail__item">Quần kiểu</li>
                <li className="menu-detail__item">Đồ bộ</li>
                <li className="menu-detail__item">Đồ bơi</li>
              </ul>
            </div>
            </li>
          <li className="menu__item">
            <h2 className="menu__item-title"> ĐỒ DÙNG CHO BÉ</h2>
            <div className="menu-detail">
              <ul className="menu-detail__list">
                <li className="menu-detail__item">Áo sơ mi</li>
                <li className="menu-detail__item">Áo thun</li>
                <li className="menu-detail__item">Áo khoác</li>
                <li className="menu-detail__item">Quần kiểu</li>
                <li className="menu-detail__item">Đồ bộ</li>
                <li className="menu-detail__item">Đồ bơi</li>
              </ul>
            </div>
          </li>
          <li className="menu__item">
            <h2 className="menu__item-title">QUẦN ÁO TRẺ EM 10-12 TUỔI</h2>
            <div className="menu-detail">
              <ul className="menu-detail__list">
                <li className="menu-detail__item">Áo sơ mi</li>
                <li className="menu-detail__item">Áo thun</li>
                <li className="menu-detail__item">Áo khoác</li>
                <li className="menu-detail__item">Quần kiểu</li>
                <li className="menu-detail__item">Đồ bộ</li>
                <li className="menu-detail__item">Đồ bơi</li>
              </ul>
            </div>
          </li>
          <li className="menu__item">
            <h2 className="menu__item-title">ĐỒ ĐÔI MẸ VÀ BÉ</h2>
            <div className="menu-detail">
              <ul className="menu-detail__list">
                <li className="menu-detail__item">Áo sơ mi</li>
                <li className="menu-detail__item">Áo thun</li>
                <li className="menu-detail__item">Áo khoác</li>
                <li className="menu-detail__item">Quần kiểu</li>
                <li className="menu-detail__item">Đồ bộ</li>
                <li className="menu-detail__item">Đồ bơi</li>
              </ul>
            </div>
          </li>
          <li className="menu__item">
            <h2 className="menu__item-title">HÀNG MỚI VỀ</h2>
            <div className="menu-detail">
              <ul className="menu-detail__list">
                <li className="menu-detail__item">Áo sơ mi</li>
                <li className="menu-detail__item">Áo thun</li>
                <li className="menu-detail__item">Áo khoác</li>
                <li className="menu-detail__item">Quần kiểu</li>
                <li className="menu-detail__item">Đồ bộ</li>
                <li className="menu-detail__item">Đồ bơi</li>
              </ul>
            </div>
          </li>
          <li className="menu__item">
            <h2 className="menu__item-title hidden-on-pc">DT: 0943888843</h2>            
          </li>
          <li className="menu__item">
            <h2 className="menu__item-title hidden-on-pc">Hotline: 0818000028</h2>            
          </li>
          <li className="menu__item">
            <div className="Nabar-header__list-auth hidden-on-pc" onClick={clickedAuthMobile}>
              Tai Khoan 
            </div>           
          </li>
          
        </ul>
      </div>
    </div>
  )
}

export default NabarMenu
