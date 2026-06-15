import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Cart from './pages/Cart.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import Checkout from './pages/Checkout.jsx';
import OrderSuccess from './pages/OrderSuccess.jsx';
import SearchResults from './pages/SearchResults';

// 💡 Imports for our two brand new pages:
import Categories from './pages/Categories.jsx';
import CategoryView from './pages/CategoryView.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,

    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'wishlist',
        element: <Wishlist />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'product/:id',
        element: <ProductDetail />
      },
      
      {
        path: 'categories',
        element: <Categories />
      },
      {
        path: 'category/:categoryName',
        element: <CategoryView />
      }, 
      {
        path: 'checkout',
        element: <Checkout />
      },
      {
        path: 'order-success',
        element: <OrderSuccess />
      },
      {
        path: 'search',
        element: <SearchResults />
      },
    ]
  }
]);