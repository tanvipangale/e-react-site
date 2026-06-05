import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';

function ProductCard({ product, isWishlistPage = false, onMoveToCart }) {
  const { cart, toggleWishlist, wishlist } = useStore();

  // Determine if item is already configured in cart/wishlist states
  const isInCart = cart.some((item) => item.id === product.id);
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  // Safe image string parser fallback rule
  let imageUrl = 'https://via.placeholder.com/250';
  if (product.images && product.images.length > 0) {
    imageUrl = product.images[0].src;
  } else if (typeof product.image === 'string') {
    imageUrl = product.image;
  }

  return (
    <div className="product">
      <div className="product-top">
        {product.on_sale && <span className="discount">Sale</span>}
        
        <button 
          className="wishlist-btn" 
          onClick={() => toggleWishlist(product)}
          style={{ border: 'none', cursor: 'pointer' }}
        >
          <i className={isInWishlist ? "fa-solid fa-heart" : "fa-regular fa-heart"} style={{ color: '#891d1a' }}></i>
        </button>

        <Link to={`/product/${product.id}`}>
          <img src={imageUrl} alt={product.name} />
        </Link>
      </div>

      <div className="product-info">
        <h4>{product.name}</h4>
        <div className="price">${product.price || product.regular_price}</div>
      </div>

      {/* DYNAMIC BUTTON PLACEMENT CONDITION */}
      {isWishlistPage ? (
        /* If loaded inside the Wishlist, show ONLY the clean Move to Cart option */
        <button
          className="add-cart"
          onClick={() => onMoveToCart(product)}
          style={{ background: '#1E1E1E' }}
        >
          Move To Cart
        </button>
      ) : (
        /* If loaded on the Homepage/Catalog, show standard default cart buttons */
        <button
          className="add-cart"
          onClick={() => !isInCart && useStore().addToCart(product)}
          style={{ background: isInCart ? '#891d1a' : '#1E1E1E' }}
        >
          {isInCart ? 'Added' : 'Add To Cart'}
        </button>
      )}
    </div>
  );
}

export default ProductCard;