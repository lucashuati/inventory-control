import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import BaseRoute from './components/common/BaseRoute';
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/main.css';
import ListProductPage from './pages/product/ListProductPage';
import ProductPage from './pages/product/ProductPage';

const App = () => (
  <Router>
    <ToastContainer />
    <Switch>
      <BaseRoute exact path="/" component={ListProductPage} />
      <BaseRoute exact path="/products" component={ProductPage} />
      <BaseRoute path="/products/:id" component={ProductPage} />
    </Switch>
  </Router>
);

export default App;
