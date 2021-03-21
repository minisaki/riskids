import React, { useState } from 'react';
import NabarMenu from '../nabarMenu/NabarMenu';
import Logo from '../logo/Logo';
import Modal from '../auth/Modal';
import './Nabar.css';
import Cart from '../Cart';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { onClickOpen } from '../../redux/closeFormSlice';
import { IconButton, makeStyles } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { logout } from '../../redux/userSlice';

const useStyles = makeStyles({
  root: {
    color: 'white',
    width: 30,
    height: 30,
  },
  icon_button: {
    color: 'white',
    fontSize: '1.2rem',
    maxWidth: 128,
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 2,
  },
  menu_account: {
      "& >div:nth-child(3)": {
        backgroundColor: "#cd3591",
        width: '14rem',
        
      }
  },
  li: {
    color: 'white',
    fontSize: "1.6rem",
    "&:hover": {
      backgroundColor: "#e44ba7cc",
    }
  }
});
function Nabar() {
  const [showResult, setShowResult] = useState(false);
  const [productSearch, setProductSearch] = useState(false);
  const [auth, setAuth] = useState(false);
  const [cartClick, setCartClick] = useState(false);
  const [clikedBar, setClickedBar] = useState(false);
  // const [cart, setCart] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSimpleMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    const action = logout();
    dispatch(action)
    setAnchorEl(null);
  };
  
  //style Meterial Ui

  const classes = useStyles();

  // redux close form
  const dispatch = useDispatch();
  const handleOpenForm = () => {
    const action = onClickOpen();
    dispatch(action);
  };

  const closeForm = useSelector((state) => state.closeForm);
  // check user login yet
  const loginUser = useSelector((state) => state.user.current);
  const isLogin = !!loginUser.id;

  const carts = useSelector((state) => state.cartItem.current);
  const isCart = carts.length > 0

  const barClose = (evt) => {
    setClickedBar(evt);
  };
  const clickedAuthMobile = (evt) => {
    setAuth(closeForm);
  };

  const ProductSearch = (text) => {
    console.log(text.length);
    if (text.length > 0) {
      setProductSearch(true);
    } else {
      setProductSearch(false);
      setShowResult(true);
    }
  };

  const SuggeSearch = () => {
    return (
      <>
        <div className="sugge-container" onMouseLeave={() => setShowResult(false)}>
          <h3 className="sugge-title">
            {productSearch ? 'SẢN PHẨM ĐỀ NGHỊ' : 'SẢN PHẨM KHÁCH THƯỜNG TÌM'}
          </h3>
          <ul className="sugge-list">
            <Link className="sugge-list__item">đầm bé gái</Link>
            <Link className="sugge-list__item">đồ bộ bé trai</Link>
            <Link className="sugge-list__item">đồ bộ bé gái</Link>
            <Link className="sugge-list__item">áo thun bé trai</Link>
          </ul>
        </div>
      </>
    );
  };

  return (
    <div className="Nabar-container">
      <div className="nabar-group">
        <div className="grid wide ">
          <div className="Nabar-header">
            <div className="nabar-bar view-on-mobile-table" onClick={() => setClickedBar(true)}>
              <i className="fas fa-bars icon-bar"></i>
            </div>
            <div className="hidden-on-table">
              <Logo />
            </div>
            <div className="Nabar-header__search">
              <input
                className="Nabar-header__search-input"
                placeholder="Tìm kiếm sản phẩm"
                onClick={() => setShowResult(!showResult)}
                onKeyPress={() => setShowResult(true)}
                onChange={(evt) => {
                  ProductSearch(evt.target.value);
                }}
              ></input>
              {showResult ? <SuggeSearch /> : null}

              <div className="btn-container btn-container--position">
                <button className="btn-search">
                  <i className="fas fa-search icon-search"></i>
                </button>
              </div>
            </div>

            <div className="Nabar-header__list">
              {!isLogin && (
                <div
                  className="Nabar-header__list-auth hidden-on-mobile-table"
                  onClick={handleOpenForm}
                >
                  Tai Khoan
                </div>
              )}
              {isLogin && (
                <>
                  <IconButton
                    color="primary"
                    size="medium"
                    className={classes.icon_button}
                    onClick={handleClick}
                  >
                    <AccountCircleIcon className={classes.root} />
                    <span className={classes.icon_button}>{loginUser.fullName}</span>
                  </IconButton>
                </>
              )}

              <div
                className={
                  isCart
                    ? 'Nabar-header__list-cart Nabar-header__list-cart--active'
                    : 'Nabar-header__list-cart'
                }
                onClick={() => setCartClick(!cartClick)}
              >
                {cartClick ? (
                  <i className="far fa-times-circle icon-close-cart"></i>
                ) : (
                  <i className="fas fa-shopping-cart icon-cart"></i>
                )}
                <span className="hidden-on-mobile-table">Gio hang</span>
              </div>
              {cartClick ? <Cart carts={carts} /> : null}
            </div>
            {closeForm ? <Modal /> : null}
          </div>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseSimpleMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            getContentAnchorEl={null}
            className={classes.menu_account}
          >
            
            <MenuItem 
              onClick={handleCloseSimpleMenu} 
              className={classes.li} >My account</MenuItem>
            <MenuItem 
              onClick={handleLogout} 
              className={classes.li}

              
              >Logout</MenuItem>
          </Menu>
        </div>
      </div>

      <div className="nabar-contact">
        <div className="grid wide">
          <div className="nabar-contact__list">
            <div className="">
              <div className="nabar-contact__item">
                <i className="fas fa-phone-volume nabar-contact__icon"></i>
                <div className="nabar-contact__text">
                  <span className="nabar-contact__content">Hỗ trợ đặt hàng nhanh:</span>
                  <span className="nabar-contact__phone">0818.0000.28</span>{' '}
                </div>
              </div>
            </div>
            <div className="">
              <div className="nabar-contact__item hidden-on-mobile-table">
                <i className="fas fa-map-marker-alt nabar-contact__icon"></i>
                <div className="nabar-contact__text">
                  <span className="nabar-contact__content">Địa chỉ: </span>
                  <span className="nabar-contact__phone">43/6 ngo chi quoc - tan hoa</span>
                </div>
              </div>
            </div>
            <div className="">
              <div className="nabar-contact__item">
                <i className="far fa-envelope nabar-contact__icon"></i>
                <div className="nabar-contact__text">
                  <span className="nabar-contact__content">Liên hệ: </span>
                  <span className="nabar-contact__phone">0943888843</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NabarMenu
        className={clikedBar ? 'menu active' : 'menu'}
        click={clikedBar}
        barClose={barClose}
        clickedAuthMobile={clickedAuthMobile}
      />
    </div>
  );
}

export default Nabar;
