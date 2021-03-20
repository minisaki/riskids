import { makeStyles, Paper, Tab, Tabs } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Pagination from '@material-ui/lab/Pagination';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import productApi from '../../../../api/productApi';
import Card from '../card/Card';
import ProductFilter from '../productFilter/ProductFilter';
import ProductSkeletonList from '../ProductSkeletonList';
import './Category.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
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

  let location = useLocation();
  let nameCategoryLocation = location.state;
  

  const [valueSort, setValueSort] = useState(1);
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
    'category.id': nameCategoryLocation?.id || 0,
  });
  // if (nameCategoryLocation.id) {
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     'category.id' : nameCategoryLocation.id
  //   }))
  // }
  const [nameCategory, setNameCategory] = useState(nameCategoryLocation?.name || "Thời trang");

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
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleChangeTab = (event, newValue) => {
    switch (newValue) {
      case 0:
        setFilters({_page: 1,
          _limit: 20,})
        setNameCategory("Tất cả")
        setValueSort(newValue)
        break;
      case 1:
        // code block
        break;
      case 2:
      // code block
      break;
      case 3:
        setFilters((prevFilters) => ({
          ...prevFilters,
          _sort: 'salePrice:ASC'
        }))
        setValueSort(newValue)

      break;
      case 4:
        setFilters((prevFilters) => ({
          ...prevFilters,
          _sort: 'salePrice:DESC'
        }))
        setValueSort(newValue)
        
      break;
      default:
        setFilters({
          _page: 1,
          _limit: 20,
        })
    }
  };
  

  const handleClick = (event) => {
    event.preventDefault();
  };

  const handlePageChange = (e, page) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      _page: page,
    }));
  };

  const HandleClickCategory = (categoryId, name) => {
    // console.log(categoryId, name)
    setFilters(() => ({    
      _limit: 20,
      _page: 1,
      ...categoryId,
    }));
    setNameCategory(name);
    setValueSort(1)
  };

  const handleClickSortPrice = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,      
      _sort: "salePrice:ASC",
    }));
    setValueSort(3)
  };
  const HandleClickService = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters, })
    )}
  console.log(filters);
  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(filters);
        setProductList(data);

        setPagination(pagination);
        
      } catch (error) {
        console.log('Failed to fetch product list: ', error);
      }

      setLoading(false);
    })();
  }, [filters]);

  
  return (
    <div className="container">
      <div className="grid wide">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="large" />}
          aria-label="breadcrumb"
          className={classes.breadcrumb}
        >
          <Link color="inherit" to="/" onClick={handleClick}>
            Trang chủ
          </Link>
          <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
            {valueSort === 0 && !filters['category.id'] ? "Tất cả" : nameCategory}
          </Link>
         
        </Breadcrumbs>
        <div className="row product-container__wrapper">
          <div className="col l-3 silebar">
            <div className="category_aside">              
              <ProductFilter
                onChange={HandleClickCategory}
                onChangeService={HandleClickService}
                onClickByFilterPrice={handleClickSortPrice}
                filters={filters}
              />
            </div>
          </div>
          <div className="col l-9 m-12 c-12 product-container__list">
            <Paper className={classes.root}>
              <Tabs
                value={valueSort}
                onChange={handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
                scrollButtons="off"
              >
                <Tab label="Tất cả" className={classes.label} />
                <Tab label="Bán Chạy" className={classes.label} />
                <Tab label="Hàng Mới" className={classes.label} />
                <Tab label="Giá Thấp" className={classes.label} />
                <Tab label="Giá Cao" className={classes.label} />                  
                
          
              </Tabs>
            </Paper>
            {loading ? (
              <ProductSkeletonList length={9} />
            ) : (
              <Card 
                CategoryName={valueSort === 0 && !filters['category.id'] ? "Tất cả" : nameCategory} 
                data={productList}
                />
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
