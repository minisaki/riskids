import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nabar from './components/header/nabar/Nabar';
import Home from './components/page/home/Home';
import Product from './components/page/home/products/Product';
import Footer from './components/footer/Footer';
import ImageZoomTest from './components/page/ImageZoomTest';
// import owlCarousel from './components/owlCarouselProductList/owlCarousel';
import './App.css';
import './components/responsive.css';
import { Provider } from 'react-redux';
import store from './app/store';
import CounterIndex from './components/redux/counterIndex';
import productApi from './api/productApi';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Category from './components/page/home/caregories/Category';
import ProductSkeletonList from './components/page/home/ProductSkeletonList';
import Homepage from './components/page/home/Homepage';
import index from './components/page/home/products';
// import ProductPage from './components/page/home/ProductPage/ProductPage.js';
import ProductSingle from './components/page/home/ProductPage';
import Index from './components/page/home/ProductPage';
import MyGallery from './components/page/home/image-gallery'

function App() {
  useEffect(() => {
    const fetcProducts = async () => {
      const params = {
        _limit: 10,
      };
      const productList = await productApi.getAll(params);
      // console.log(productList)
    };

    // fetcProducts();
  }, []);
  
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <SnackbarProvider
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            
          >
            <Suspense fallback={<div>Loading...</div>}>
            {/* <Route path="/" component={Index} /> */}
              <Nabar />
              
              <Switch>              
                <Route path="/" component={Home} />
                {/* <Route path="/products" component={Home} /> */}
                {/* <Route exact path="/ProductSkeletonList" component={ProductSkeletonList} /> */}
                

                {/* <Route exact path="/testZoom" component={ImageZoomTest} /> */}
                {/* <Route exact path="/owl" component={owlCarousel} /> */}
                {/* <Route exact path="/counterIndex" component={CounterIndex} /> */}
              </Switch>
              <Footer />
            </Suspense>
          </SnackbarProvider>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
