import React from 'react';
import {
  createBrowserRouter
} from 'react-router-dom';

import App from './App.jsx';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Cart from './pages/Cart.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ProductDetail from './components/ProductDetail.jsx';

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

      /* ADDED NEW ROUTE BELOW:
        This tells the browser to display the ProductDetail page 
        whenever a user visits a link like "/product/123"
      */
      {
        path: 'product/:id',
        element: <ProductDetail />
      }
      
    ]
  }
]);