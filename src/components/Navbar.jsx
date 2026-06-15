import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';

function Navbar() {
  const { cartCount, wishlist, user, logout } = useStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // 💡 This function handles the submission
  const handleSearchSubmit = (e) => {
    // Prevent the browser from refreshing the page automatically
    e.preventDefault(); 
    
    if (searchTerm.trim()) {
      // Navigates to /search?q=your_search_term
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <nav>
      <div className="logo">Exclusive</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
      </div>

      <div className="right-nav">
        
        {/* 🛠️ IMPROVED: Wrapped the search elements inside a <form> */}
        <form onSubmit={handleSearchSubmit} className="search-box">
          <input
            type="text"
            placeholder="What are you looking for?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Changing this to a button with type="submit" ensures clicking it sends the form */}
          <button type="submit" style={{ background: 'none', border: 'none', padding: 0 }}>
            <i
              className="fa-solid fa-magnifying-glass"
              style={{ cursor: 'pointer' }}
            ></i>
          </button>
        </form>

        {/* Login / Logout */}
        {user ? (
          <button className="nav-btn register-btn" onClick={logout} type="button">
            Logout ({user})
          </button>
        ) : (
          <>
            <Link to="/login">
              <button className="nav-btn login-btn">Login</button>
            </Link>

            <Link to="/register">
              <button className="nav-btn register-btn">Register</button>
            </Link>
          </>
        )}

        {/* Wishlist */}
        <Link to="/wishlist" className="icon">
          <i className="fa-regular fa-heart"></i>
          <div className="count">{wishlist.length}</div>
        </Link>

        {/* Cart */}
        <Link to="/cart" className="icon">
          <i className="fa-solid fa-cart-shopping"></i>
          <div className="count">{cartCount}</div>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;