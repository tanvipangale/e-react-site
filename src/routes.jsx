// src/routes.jsx
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './components/MainLayout.jsx';
import Home from './pages/Home.jsx';
import Category from './pages/Category.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Cart from './pages/Cart.jsx';
import Wishlist from './pages/Wishlist.jsx';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // The global frame
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/category/:categorySlug",
        element: <Category />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
    ]
  },
]);