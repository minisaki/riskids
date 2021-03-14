import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '../card/Card';
import './Category.css';
import { Paper, Tabs, Tab, makeStyles } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import productApi from '../../../../api/productApi';
import ProductSkeletonList from '../ProductSkeletonList';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CardItems from '../cardItem/CardItems';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    boxShadow: 'none',
    borderBottom: '1px solid #e4dddd',
  },
  label: {
    '& > span': { fontSize: '1.2rem' },
  },
  panigation: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& > *': {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
  },
  breadcrumb: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    '& > ol > li > *': {
      fontSize: '1.6rem',
      fontWeight: 100,
    },
  },
}));

function Category(props) {
  const classes = useStyles();

  const [valueSort, setValueSort] = useState(0);
  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 9,
    total: 10,
    page: 1,
  });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 20,
  });

  let location = useLocation();
  let nameCategory = location.state

  const settingSlier = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,    
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  
  
  const handleChangeTab = (event, newValue) => {
    setValueSort(newValue);
  };
  console.log(valueSort);
  const handleClick = (event) => {
    event.preventDefault();
  };

  const handlePageChange = (e, page) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      _page: page,
    }));
  };
  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(filters);
        setProductList(data);
        
        setPagination(pagination);
        console.log({ data, pagination });
      } catch (error) {
        console.log('Failed to fetch product list: ', error);
      }

      setLoading(false);
    })();
  }, [filters]);

  const productCategory = productList.filter((product) => product.category.name === nameCategory.text)
  console.log(productCategory)
  return (
    <div className="container">
      <div className="grid wide">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="large" />}
          aria-label="breadcrumb"
          className={classes.breadcrumb}
        >
          <Link color="inherit" href="/" onClick={handleClick}>
            Material-UI
          </Link>
          <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
            Core
          </Link>
          <Typography color="textPrimary">Breadcrumb</Typography>
        </Breadcrumbs>
        <div className="row product-container__wrapper">
          <div className="col l-3 silebar">
            <div className="aside">
              <div className="aside-wrapper">
                <h3 className="aside-title">NÊN MUA HÀNG TẠI BABI</h3>
                <ul className="aside-list">
                  <li className="aside-item">Lịch sử Uy tín trên 10 năm</li>
                  <li className="aside-item">Cam kết hàng Chất lượng Tốt</li>
                  <li className="aside-item">Đảm bảo Hàng như Hình</li>
                  <li className="aside-item">Không vừa được đổi size</li>
                  <li className="aside-item">Giao hàng Toàn quốc</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col l-9 m-12 c-12 product-container__list">
            <Paper className={classes.root}>
              <Tabs
                value={valueSort}
                onChange={handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="Phổ Biến" className={classes.label} />
                <Tab label="Bán Chạy" className={classes.label} />
                <Tab label="Hàng Mới" className={classes.label} />
                <Tab label="Giá Thấp" className={classes.label} />
                <Tab label="Giá Cao" className={classes.label} />
              </Tabs>
            </Paper>
            {loading ? (
              <ProductSkeletonList length={9} />
            ) : (
              <Card text={nameCategory.text} data={productCategory} sort={valueSort} />
            )}

            <div className={classes.panigation}>
              <Pagination
                variant="outlined"
                color="primary"
                count={Math.ceil(pagination.total / pagination.limit)}
                page={pagination.page}
                onChange={handlePageChange}
              />
            </div>
            {/* <Slider {...settingSlier}>
              <CardItems
                cardStyle="col-product c-12"
                product = {productList}
              />
            </Slider> */}
          </div>
        </div>
      </div>
    </div>
  );
}

Category.propTypes = {};

export default Category;
