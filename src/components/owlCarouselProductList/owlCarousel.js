import React, { Component, useState, useEffect, Fragment } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './owlCarousel.css';
import CardItems from '../page/home/cardItem/CardItems';
import storagekeys from '../../constants/storageKeys';
import GridContainer from '../page/home/ProductPage/GridContainer';
import GridItem from '../page/home/ProductPage/GridItem';
import productStyle from '../page/home/ProductPage/productStyle';
import { makeStyles } from '@material-ui/core';
import classNames from 'classnames';

const useStyles = makeStyles(productStyle);

function OwlCarousel(props) {
  const { text, className } = props;
  const classes = useStyles();
  const productListView = JSON.parse(localStorage.getItem(storagekeys.LISTVIEW));
  // productListView?.length < 4 ? productListView.length : 4 || 1
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: productListView?.length < 4 ? productListView.length : 4 || 1,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: productListView?.length < 4 ? productListView.length - 1 : 1,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: productListView?.length < 4 ? productListView.length - 2 : 1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: productListView?.length < 4 ? productListView.length : 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  if (productListView?.length < 4) {
    settings.variableWidth = true;
  }
  // const [width, setWidth] = useState(200);
  // useEffect(() => {
  //   const scrollCallBack = window.addEventListener('resize', () => {
  //     console.log(window.outerWidth);
  //     if (window.outerWidth <= 600) {
  //       setWidth(336);
  //     } else {
  //       setWidth(200);
  //     }
  //   });
  //   return () => {
  //     window.removeEventListener('resize', scrollCallBack);
  //   };
  // });

  return (
    productListView && (
      <Fragment>
        <div className={className ? 'container__cate' : classes.container}>
          <div className="container__title-wrapper">
            <h2 className="container__text">{text}</h2>
          </div>
        </div>
        <div className={className ? className : classes.container}>
          <div className={classNames(classes.main, classes.slider)}>
            <GridContainer className={classes.gridContainer}>
              <GridItem md={12} sm={12}>
                <Slider {...settings}>
                  {productListView.map((product) => (
                    <div
                      key={product.id}
                      style={productListView?.length <= 4 ? { width: 250 } : ''}
                    >
                      <CardItems cardStyle="col-product c-12" product={product} />
                    </div>
                  ))}
                </Slider>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </Fragment>
    )
  );
}

export default OwlCarousel;
