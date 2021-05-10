import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { unwrapResult } from '@reduxjs/toolkit';
import { fetchCategory } from '../../redux/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import './NabarMenu.css';

const NabarMenu = (props) => {
  const history = useHistory();
  const [authMobile, setAuthMobile] = useState(true);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.current);
  
  const clickedAuthMobile = () => {
    setAuthMobile(true);
    props.clickedAuthMobile(authMobile);
  };

  const clickMenu = (id, name) => {
    // history.push(`/categories/`, {id, name});
    let filters = {
      category_id : id,
      is_freeship: false,
      page: 1
    }
    history.push({
      pathname: `/categories/`,
      search: queryString.stringify(filters),
      
    }, {name});
  };

  useEffect(() => {
    (async () => {
      try {
        const action = fetchCategory();
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
      } catch (error) {
        console.log('Failed to fetch product list: ', error);
      }
    })();
  }, []);
  return (
    <div className={props.className} onClick={() => props.barClose(false)}>
      <div className="grid wide menu-mobile">
        <ul className="menu__list">
          <li className="menu__item logo-mobile">
            <div className="Nabar-header__logo--menu">
              <Link to="#" className="Nabar-header__link--menu">
                <img
                  className="Nabar-header__link-picture--menu"
                  src="/image/logo.jpg"
                  alt=""
                ></img>
                <span className="Nabar-header__link-trademark--menu">Ri'sKids</span>
              </Link>
            </div>
          </li>
          {categories?.map((category, index) => {
            return (
              <li key={index} className="menu__item" onClick={() => clickMenu(category.id, category.title)}>
                <h2 className="menu__item-title">{category.title}</h2>
              </li>
            );
          })}
          <li className="menu__item hidden-on-pc">
            <h2 className="menu__item-title ">DT: 0943888843</h2>
          </li>
          <li className="menu__item hidden-on-pc">
            <h2 className="menu__item-title">Hotline: 0818000028</h2>
          </li>
          <li className="menu__item hidden-on-pc">
            <div className="Nabar-header__list-auth" onClick={clickedAuthMobile}>
              Tai Khoan
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NabarMenu;
