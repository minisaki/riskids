import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import classNames from 'classnames';
import GridContainer from './GridContainer';
import GridItem from './GridItem';
import ImageGallery from 'react-image-gallery';
import product1 from './img/1.jpg';
import product2 from './img/2.jpg';
import product3 from './img/3.jpg';
import product4 from './img/4.jpg';
import product6 from './img/6.jpg';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import AccordionCustom from './AccordionCustom';
import Button from './Button';
import "react-image-gallery/styles/css/image-gallery.css";
import productStyle from './productStyle.js';
import './ProductPage.css';
import Header from './Header/Header.js';
import HeaderLinks from './Header/HeaderLinks.js';
import { useParams } from 'react-router-dom';
import productApi from '../../../../api/productApi';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../../constants/conmon';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../../../redux/cartSlice';
import { useSnackbar } from 'notistack';
import DOMPurify from 'dompurify';


const useStyles = makeStyles(productStyle);
function Index(props) {
  const classes = useStyles();
  const [colorSelect, setColorSelect] = useState('0');
  const [sizeSelect, setSizeSelect] = useState('0');
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const [filters, setFilters] = useState(id ? { id: id } : {});
  const [product, setProduct] = useState({});
  const thumbnailUrl = product.thumbnail
    ? [{original: `${STATIC_HOST}${product.thumbnail?.url}`, thumbnail: `${STATIC_HOST}${product.thumbnail?.formats.thumbnail.url}`},
    {original: `${STATIC_HOST}${product.thumbnail?.url}`, thumbnail: `${STATIC_HOST}${product.thumbnail?.formats.thumbnail.url}`},
    {original: `${STATIC_HOST}${product.thumbnail?.url}`, thumbnail: `${STATIC_HOST}${product.thumbnail?.formats.thumbnail.url}`}
  ]
    : [{original:THUMBNAIL_PLACEHOLDER, thumbnail: THUMBNAIL_PLACEHOLDER}];
    console.log(thumbnailUrl)

  console.log(filters);

  const dispatch = useDispatch()
  const safeDescription = DOMPurify.sanitize(product.description);

  useEffect(() => {
      (async () => {
        try {
          const { data } = await productApi.getAll(filters);
          setProduct(data[0]);
          console.log('vao day')
        } catch (error) {
          console.log('Failed to fetch product: ', error);
        }
  
        //   setLoading(false);
      })();
    }, [filters]);
  
  const submitCartItem = () => {
    const cartItem = {
      id: `${product.id}_${colorSelect}_${sizeSelect}`,
      product: product,
      quantity: 1,
      color: colorSelect,
      size: sizeSelect
    }
    const action = addCartItem(cartItem)
    dispatch(action)
    enqueueSnackbar('Thêm giỏi hàng thành công', {variant: 'success',})
  }

  return (
    <div className={classes.productPage}>      
      <div className={classNames(classes.section, classes.sectionGray)}>
        <div className={classes.container}>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <GridContainer className={classes.gridContainer}>
              <GridItem md={6} sm={6}>
                <ImageGallery
                  showFullscreenButton={false}
                  showPlayButton={false}
                  startIndex={0}
                  items={thumbnailUrl}
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
                        className="image-gallery-right-nav"
                        disabled={disabled}
                        onClick={onClick}
                      />
                    );
                  }}
                />
              </GridItem>
              <GridItem md={6} sm={6}>
                <h2 className={classes.title}>{product.name}</h2>
                <h3 className={classes.mainPrice}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.salePrice)}</h3>
                <AccordionCustom
                  active={0}
                  activeColor="rose"
                  collapses={[
                    {
                      title: 'Mô tả',
                      content: (
                        <p>
                         {product.shortDescription}
                        </p>
                      ),
                    },
                    {
                      title: 'Thông tin thiết kế',
                      content: (
                        <p>
                          <div dangerouslySetInnerHTML={{ __html: safeDescription }} />
                        </p>
                      ),
                    },
                    {
                      title: 'Chi tiết',
                      content: (
                        <ul>
                          <li>Storm and midnight-blue stretch cotton-blend</li>
                          <li>
                            Notch lapels, functioning buttoned cuffs, two front flap pockets, single
                            vent, internal pocket
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
                    <label>Chọn màu</label>
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
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                          }}
                          value="0"
                        >
                         <span className={classes.span}>Rose</span>
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                          }}
                          value="1"
                        >
                          <span className={classes.span}>Gray</span>
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                          }}
                          value="2"
                        >
                          <span className={classes.span}>White</span>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem md={6} sm={6}>
                    <label>Chọn Size</label>
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
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                          }}
                          value="0"
                        >
                          <span className={classes.span}>Small</span>
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                          }}
                          value="1"
                        >
                          <span className={classes.span}>Medium</span>
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                          }}
                          value="2"
                        >
                          <span className={classes.span}>Large</span>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer className={classes.pullRight}>
                  <Button round color="rose" onClick={submitCartItem}>
                    Thêm giỏ hàng &nbsp; <ShoppingCart />
                  </Button>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </div>
        </div>
    </div>
    </div> 
  );
}

Index.propTypes = {};

export default Index;
