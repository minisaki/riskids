import React, { useState, useEffect, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import classNames from 'classnames';
import GridContainer from './GridContainer';
import GridItem from './GridItem';
import ImageGallery from 'react-image-gallery';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import AccordionCustom from './AccordionCustom.js';
import Button from './Button';
import 'react-image-gallery/styles/css/image-gallery.css';
import productStyle from './productStyle.js';
import './ProductPage.css';
import Header from './Header/Header.js';
import HeaderLinks from './Header/HeaderLinks.js';
import { useParams, Link, useLocation } from 'react-router-dom';
import productApi from '../../../../api/productApi';
import { STATIC_HOST_LOCAL } from '../../../../constants/conmon';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../../../redux/cartSlice';
import { useSnackbar } from 'notistack';
import DOMPurify from 'dompurify';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CardItems from '../cardItem/CardItems';
import storagekeys from '../../../../constants/storageKeys';
import queryString from 'query-string';
import './slice.css';
import OwlCarousel from '../../../owlCarouselProductList/owlCarousel';

const useStyles = makeStyles(productStyle);
function Index(props) {
  const classes = useStyles();
  const [colorSelect, setColorSelect] = useState('0');
  const [sizeSelect, setSizeSelect] = useState('0');
  const { slug } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const imgList = product.product_media;
  // const thumbnailUrl = []
  const thumbnailUrl = imgList
    ? imgList.map((img, index) => {
        return {
          original: `${STATIC_HOST_LOCAL}${img.media_content}`,
          thumbnail: `${STATIC_HOST_LOCAL}${img.media_content}`,
        };
      })
    : '';

  const imgs = [...thumbnailUrl];

  const dispatch = useDispatch();
  const safeDescription = DOMPurify.sanitize(product.description);
  
  let location = useLocation();
  const queryParams = useMemo(() => {
    const path = location.pathname;
    return path;
  }, [location.pathname]);
  

  useEffect(() => {
    (async () => {
      try {
        const product = await productApi.get(queryParams);
        setProduct(product);
        setLoading(false);
      } catch (error) {
        console.log('Failed to fetch product: ', error);
      }

      //   setLoading(false);
    })();
  }, [queryParams]);

  

  const submitCartItem = () => {
    const cartItem = {
      id: `${product.id}_${colorSelect}_${sizeSelect}`,
      product: {
        id: product.id,
        name: product.product_name,
        price: product.product_discount_price,
        is_stock_total: product.is_stock_total,
        is_freeship: product.is_freeship,
        image: product.image,
        product_varients: product.product_varients,
      },
      quantity: 1,
      color: colorSelect,
      size: sizeSelect,
    };
    const action = addCartItem(cartItem);
    // dispatch(action.product_varients);
    dispatch(action);

    enqueueSnackbar('Th??m gi???i h??ng th??nh c??ng', { variant: 'success' });
  };
  const varient = product.product_varients;
  console.log(colorSelect, typeof colorSelect);
  return (
    <div className={classes.productPage}>
      <div className={classNames(classes.section)}>
        <div className={classes.container}>
          <div className={classNames(classes.main, classes.mainRaised)}>
            {loading ? (
              'dang load'
            ) : (
              <GridContainer className={classes.gridContainer}>
                <GridItem md={6} sm={6}>
                  <ImageGallery
                    showFullscreenButton={false}
                    showPlayButton={false}
                    startIndex={0}
                    items={imgs}
                    showThumbnails={true}
                    height={500}
                    width={500}
                    renderLeftNav={(onClick, disabled) => {
                      return (
                        <button
                          className="image-gallery-left-nav"
                          disabled={disabled}
                          onClick={onClick}
                        />
                      );
                    }}
                    renderRightNav={(onClick, disabled) => {
                      return (
                        <button
                          className="image-gallery-icon image-gallery-right-nav"
                          disabled={disabled}
                          onClick={onClick}
                        />
                      );
                    }}
                  />
                </GridItem>
                <GridItem md={6} sm={6}>
                  <h2 className={classes.title}>{product.product_name}</h2>
                  <h3 className={classes.mainPrice}>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                      product.product_discount_price
                    )}
                  </h3>
                  <AccordionCustom
                    active={0}
                    activeColor="warning"
                    collapses={[
                      {
                        title: 'M?? t???',
                        content: <p>{product.product_description}</p>,
                      },
                      {
                        title: 'Th??ng tin thi???t k???',
                        content: (
                          <p>
                            {/* <div dangerouslySetInnerHTML={{ __html: safeDescription }} />
                             */}
                            {product.product_long_description}
                          </p>
                        ),
                      },
                      {
                        title: 'Chi ti???t',
                        content: (
                          <ul>
                            <li>Storm and midnight-blue stretch cotton-blend</li>
                            <li>
                              Notch lapels, functioning buttoned cuffs, two front flap pockets,
                              single vent, internal pocket
                            </li>
                            <li>Two button fastening</li>
                            <li>84% cotton, 14% nylon, 2% elastane</li>
                            <li>Dry clean</li>
                          </ul>
                        ),
                      },
                    ]}
                  />
                  <GridContainer className={classes.pickSize}>
                    <GridItem md={6} sm={6}>
                      <label>Ch???n m??u</label>
                      <FormControl fullWidth className={classes.selectFormControl}>
                        <Select
                          MenuProps={{
                            className: classes.selectMenu,
                          }}
                          classes={{
                            select: classes.select,
                          }}
                          value={colorSelect}
                          onChange={(event) => setColorSelect(event.target.value)}
                          inputProps={{
                            name: 'colorSelect',
                            id: 'color-select',
                          }}
                        >
                          {varient &&
                            varient.map((item, index) => {
                              console.log(index.toString());
                              return (
                                <MenuItem
                                  key={index}
                                  classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected,
                                  }}
                                  value={index.toString()}
                                >
                                  <span className={classes.span}>{item.color.title}</span>
                                </MenuItem>
                              );
                            })}
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem md={6} sm={6}>
                      <label>Ch???n Size</label>
                      <FormControl fullWidth className={classes.selectFormControl}>
                        <Select
                          MenuProps={{
                            className: classes.selectMenu,
                          }}
                          classes={{
                            select: classes.select,
                          }}
                          value={sizeSelect}
                          onChange={(event) => setSizeSelect(event.target.value)}
                          inputProps={{
                            name: 'sizeSelect',
                            id: 'size-select',
                          }}
                        >
                          {varient &&
                            varient.map((item, index) => {
                              return (
                                <MenuItem
                                  key={index}
                                  classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected,
                                  }}
                                  value={index.toString()}
                                >
                                  <span className={classes.span}>{item.size.title}</span>
                                </MenuItem>
                              );
                            })}
                        </Select>
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                  <GridContainer className={classes.pullRight}>
                    <Button round color="rose" onClick={submitCartItem}>
                      Th??m gi??? h??ng &nbsp; <ShoppingCart />
                    </Button>
                  </GridContainer>
                  <GridContainer className={classes.viewCart}>
                    <Button round color="rose">
                      <Link className={classes.linkCart} to={`/cart/`}>
                        {' '}
                        xem gi??? h??ng{' '}
                      </Link>
                    </Button>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            )}
          </div>
        </div>
      </div>      
        <OwlCarousel text="DANH M???C S???N PH???M ???? XEM"/>
    </div>
  );
}

Index.propTypes = {};

export default Index;
