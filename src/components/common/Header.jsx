import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext.jsx'; 

function Header() {
  // Safely extract live state variable quantities from the active StoreContext
  const { cartCount, wishlist, user, logout } = useStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="site-header">
      {/* Top Black Announcement Sub-Bar Section */}
      <div className="top-bar">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        <span>ShopNow</span>
        <div className="language">
          English <i className="fa-solid fa-angle-down"></i>
        </div>
      </div>

      <nav>
        {/* Logo Text branding */}
        <div className="logo">
          <Link to="/">Exclusive</Link>
        </div>

        {/* Dynamic Center Navigation Row */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          
          {/* 💡 Categories link added right here */}
          <Link to="/categories">Categories</Link> 
          
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
        </div>

        {/* Right Side Controls Utility Hub */}
        <div className="right-nav">
          {/* Interactive Catalog Search Field Box */}
          <div className="search-box">
            <input type="text" placeholder="What are you looking for?" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>

          {/* Authorization Routes Redirection Switches */}
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

          {/* Live Updating Wishlist Link Icon Counter Badge */}
          <Link to="/wishlist" className="iconHub icon" style={{ position: 'relative', display: 'inline-block' }}>
            <i className="fa-regular fa-heart"></i>
            {wishlist.length > 0 && (
              <div className="count">{wishlist.length}</div>
            )}
          </Link>

          {/* Live Updating Cart Link Icon Counter Badge */}
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