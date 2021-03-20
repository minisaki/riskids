import React from 'react';
import Card from './card/Card';
import './Home.css';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Category from './caregories/Category';
import Product from './products/Product';
import Homepage from './Homepage';
import index from './products';
import Index from './ProductPage';


function Home() {
  const match = useRouteMatch()
  return (          
        <Switch>
          <Route path={match.path} exact component={Homepage}/>
          <Route path={`${match.path}categories`} component={Category }/>
          <Route path={`${match.path}product/:id`} component={Index}/>          
        </Switch>
  );
}

export default Home;
