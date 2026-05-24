import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';

function Navbar() {
  const { cartCount, wishlist, user, logout } = useStore();

  return (
    <nav>
      <div className="logo">Exclusive</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
      </div>

      <div className="right-nav">
        <div className="search-box">
          <input type="text" placeholder="What are you looking for?" />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>

        {user ? (
          <button className="nav-btn register-btn" onClick={logout} type="button">
            Logout ({user})
          </button>
        ) : (
          <>
            <Link to="/login"><button className="nav-btn login-btn">Login</button></Link>
            <Link to="/register"><button className="nav-btn register-btn">Register</button></Link>
          </>
        )}




        <Link to="/wishlist" className="icon">
          <i className="fa-regular fa-heart"></i>
          <div className="count">{wishlist.length}</div>
        </Link>

        <Link to="/cart" className="icon">
          <i className="fa-solid fa-cart-shopping"></i>
          <div className="count">{cartCount}</div>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;