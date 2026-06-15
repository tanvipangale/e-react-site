import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext.jsx'; 

function Header() {
  // Extract live variables and functions from your global StoreContext
  const { cartCount, wishlist, user, logout } = useStore();
  
  // React Router hook to move the user to different pages programmatically
  const navigate = useNavigate();
  
  // State variable to store the text typed inside the search bar input
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    logout();
  };

  // Triggers automatically when the user hits 'Enter' or clicks the submit button
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Keeps the web page from refreshing the browser
    
    if (searchTerm.trim()) {
      // Moves the user to the Search Results page along with their typed query text
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="site-header">
      {/* Top Black Announcement Banner */}
      <div className="top-bar">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        <span>ShopNow</span>
        <div className="language">
          English <i className="fa-solid fa-angle-down"></i>
        </div>
      </div>

      <nav>
        {/* Brand Logo Link */}
        <div className="logo">
          <Link to="/">Exclusive</Link>
        </div>

        {/* Center Main Navigation Links */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/categories">Categories</Link> 
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
        </div>

        {/* Right Navigation Controls Hub */}
        <div className="right-nav">
          
          {/* 🛠️ FIXED: Changed from a <div> to a functional HTML <form> */}
          <form onSubmit={handleSearchSubmit} className="search-box">
            <input 
              type="text" 
              placeholder="What are you looking for?" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Live updates state as you type
            />
            
            {/* Wrapping the icon in a submit button makes it fully clickable */}
            <button type="submit" style={{ background: 'none', border: 'none', padding: 0 }}>
              <i className="fa-solid fa-magnifying-glass" style={{ cursor: 'pointer' }}></i>
            </button>
          </form>

          {/* User Logged-In Display Check switches */}
          {user ? (
            <button
              type="button"
              className="nav-btn register-btn"
              onClick={handleLogout}
            >
              Logout ({user})
            </button>
          ) : (
            <>
              <Link to="/login"><button className="nav-btn login-btn">Login</button></Link>
              <Link to="/register"><button className="nav-btn register-btn">Register</button></Link>
            </>
          )}

          {/* Wishlist Heart Icon Badge Counter */}
          <Link to="/wishlist" className="iconHub icon" style={{ position: 'relative', display: 'inline-block' }}>
            <i className="fa-regular fa-heart"></i>
            {wishlist.length > 0 && (
              <div className="count">{wishlist.length}</div>
            )}
          </Link>

          {/* Shopping Cart Bag Icon Badge Counter */}
          <Link to="/cart" className="iconHub icon" style={{ position: 'relative', display: 'inline-block' }}>
            <i className="fa-solid fa-cart-shopping"></i>
            {cartCount > 0 && (
              <div className="count">{cartCount}</div>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;