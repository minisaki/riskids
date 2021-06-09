import { makeStyles, Paper, Tab, Tabs } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Pagination from '@material-ui/lab/Pagination';
import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import productApi from '../../../../api/productApi';
import Card from '../card/Card';
import ProductFilter from '../productFilter/ProductFilter';
import ProductSkeletonList from '../ProductSkeletonList';
import queryString from 'query-string';
import './Category.css';
import OwlCarousel from '../../../owlCarouselProductList/owlCarousel';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
    boxShadow: 'none',
    borderBottom: '1px solid #e4dddd',
  },
  label: {
    '& > span': { fontSize: '1.2rem' },
    [theme.breakpoints.down('sm')]: {
      '& > span': { fontSize: '1rem' },
    }
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
  let history = useHistory();
  let nameCategoryLocation = location.state;
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      page: Number.parseInt(params.page) || 1,
      is_freeship: params.is_freeship === 'true',
    };
  }, [location.search]);

  const [valueSort, setValueSort] = useState(nameCategoryLocation?.id ? 1 : 0);
  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 9,
    total: 10,
    page: 1,
  });
  const [loading, setLoading] = useState(true);

  // const [filters, setFilters] = useState({
  //   _page: 1,
  //   _limit: 20,
  //   'category.id': nameCategoryLocation?.id || 0,
  // });
  // if (nameCategoryLocation.id) {
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     'category.id' : nameCategoryLocation.id
  //   }))
  // }

  useEffect(() => {
    if (nameCategoryLocation) {
      setNameCategory(nameCategoryLocation?.name);
      setValueSort(1);
    }
  }, [nameCategoryLocation]);

  const [nameCategory, setNameCategory] = useState(nameCategoryLocation?.name || 'Tất cả');

  
  const handleChangeTab = (event, newValue) => {
    let filters = queryParams;
    switch (newValue) {
      case 0:
        filters = {
          ...filters,
          ordering: '-view_product',
        };
        // delete filters['category_id'];
        console.log(filters);
        history.push({
          pathname: history.location.pathname,
          search: queryString.stringify(filters),
        });
        // setNameCategory('Xem Nhiều');
        setValueSort(newValue);
        break;
      case 1:
        filters = {
          ...filters,
          is_freeship: false,
          page: 1,
        };
        delete filters['ordering'];
        console.log(filters);
        history.push({
          pathname: history.location.pathname,
          search: queryString.stringify(filters),
        });
        // setNameCategory('Xem Nhiều');
        setValueSort(newValue);
        break;
      case 2:
        filters = {
          ...filters,
          ordering: '-update_at',
        };
        history.push({
          pathname: history.location.pathname,

          search: queryString.stringify(filters),
        });
        setValueSort(newValue);

        break;
      case 3:
        // setFilters((prevFilters) => ({
        //   ...prevFilters,
        //   _sort: 'salePrice:ASC'
        // }))
        filters = {
          ...filters,
          ordering: 'product_discount_price',
        };
        history.push({
          pathname: history.location.pathname,

          search: queryString.stringify(filters),
        });
        setValueSort(newValue);

        break;
      case 4:
        // setFilters((prevFilters) => ({
        //   ...prevFilters,
        //   _sort: 'salePrice:DESC'
        // }))
        filters = {
          ...filters,
          ordering: '-product_discount_price',
        };
        history.push({
          pathname: history.location.pathname,

          search: queryString.stringify(filters),
        });
        setValueSort(newValue);

        break;
      default:
        filters = {
          ...filters,
        };
        history.push({
          pathname: history.location.pathname,

          search: queryString.stringify(filters),
        });
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
  };

  const handlePageChange = (e, page) => {
    console.log(page);
    const filters = {
      page: page,
    };
    history.push({
      pathname: history.location.pathname,

      search: queryString.stringify(filters),
    });

    window.scroll({
      top: 50,
      left: 100,
      behavior: 'smooth',
    });
  };

  const HandleClickCategory = (categoryId, name) => {
    // console.log(categoryId, name)
    // setFilters(() => ({
    //   _limit: 20,
    //   _page: 1,
    //   ...categoryId,
    // }));
    if (categoryId) {
      const filters = {
        ...queryParams,
        page: 1,
        category_id: Number.parseInt(categoryId),
      };
      delete filters['ordering'];
      history.push({
        pathname: history.location.pathname,
        search: queryString.stringify(filters),
      });
      setNameCategory(name);
      setValueSort(1);
    } else {
      const filters = {
        ...queryParams,
        page: 1,
      };
      delete filters['ordering'];
      delete filters['category_id'];
      history.push({
        pathname: history.location.pathname,
        search: queryString.stringify(filters),
      });
      setNameCategory('Tất cả sản phẩm');
      setValueSort(1);
    }
  };

  const handleClickSortPrice = (newFilters) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   ...newFilters,
    //   _sort: "salePrice:ASC",
    // }));
    if (newFilters) {
      const filters = {
        ...queryParams,
        ...newFilters,
      };
      history.push({
        pathname: history.location.pathname,
        search: queryString.stringify(filters),
      });
      setValueSort(1);
    } else {
      const filters = {
        ...queryParams,
      };

      delete filters['product_discount_price__gte'];
      delete filters['product_discount_price__lte'];
      history.push({
        pathname: history.location.pathname,
        search: queryString.stringify(filters),
      });
      setValueSort(1);
    }
  };
  const HandleClickService = (newFilters) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   ...newFilters, }))

    const filters = {
      ...queryParams,
      ...newFilters,
    };
    console.log(filters);
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductList(data);

        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch product list: ', error);
      }

      setLoading(false);
    })();
  }, [queryParams]);

  // useEffect(() => {
  //   const cartFix = document.getElementById('fix-cart');

  //   const scrollCallBack = window.addEventListener('scroll', () => {
  //     console.log(window.scrollX, window.scrollY, window.pageYOffset)
  //     if (window.pageYOffset > 200 && window.pageYOffset < 900) {
  //       cartFix.classList.add('sticky');
  //      } 
  //     else {
  //         cartFix.classList.remove('sticky');
        
  //     }
  //   });
  //   return () => {
  //     window.removeEventListener('scroll', scrollCallBack);
  //   };
  // });

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
            {valueSort === 0 && !queryParams['category_id'] ? 'Tất cả' : nameCategory}
          </Link>
        </Breadcrumbs>
        <div className="row product-container__wrapper">
          <div className="col l-2-4 c-0 m-0" >
            <div className="category_aside" id="fix-cart">
              <ProductFilter
                onChange={HandleClickCategory}
                onChangeService={HandleClickService}
                onClickByFilterPrice={handleClickSortPrice}
                filters={queryParams}
              />
            </div>
          </div>
          <div className="col l-9-6 m-12 c-12 product-container__list">
            <Paper className={classes.root}>
              <Tabs
                value={valueSort}
                onChange={handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
                scrollButtons="off"
              >
                <Tab label="Xem nhiều" className={classes.label} />
                <Tab label="Bán Chạy" className={classes.label} />
                <Tab label="Hàng Mới" className={classes.label} />
                <Tab label="Giá Thấp" className={classes.label} />
                <Tab label="Giá Cao" className={classes.label} />
              </Tabs>
            </Paper>
            {loading ? (
              <ProductSkeletonList length={9} />
            ) : (
              <Card CategoryName={nameCategory} data={productList} />
            )}

            <div className={classes.panigation}>
              <Pagination
                variant="outlined"
                color="primary"
                // count={Math.ceil(pagination.total / pagination.limit)}
                count={pagination.total}
                page={parseInt(pagination.page)}
                onChange={handlePageChange}
              />
            </div>
          </div>
            
        </div>
        <div className="row product-container__wrapper">
          
        <OwlCarousel text="DANH MỤC SẢN PHẨM ĐÃ XEM"  className="categori_slider product-container__list"/>
        </div>
      </div>
    </div>
  );
}

Category.propTypes = {};

export default Category;
