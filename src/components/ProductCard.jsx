import React from 'react';
import { useStore } from '../context/StoreContext.jsx';

function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist, cart } = useStore();
  const isWishlisted = wishlist.some(item => item.id === product.id);

  const isInCart = cart.some((item) => item.id === product.id)

  return (
    <div className="product">
      <div className="product-top">
        {product.discount && (
          <div className="discount">-{product.discount}%</div>
        )}
        <button 
          className="wishlist-btn" 
          onClick={() => toggleWishlist(product)}
          style={{ border: 'none', cursor: 'pointer' }}
          aria-label="Toggle Wishlist"
        >
          <i 
            className={`${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart`}
            style={{ color: isWishlisted ? '#C88E72' : '#1E1E1E', fontSize: '16px' }}
          ></i>
        </button>
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info">
        <h4>{product.name}</h4>
        <span className="price">${product.price}</span>
      </div>

      <button
        className="add-cart"
        onClick={() => addToCart(product)}
        style={isInCart ? { background: '#C88E72', color: '#fff' } : undefined}
      >
        {isInCart ? 'Added' : 'Add To Cart'}
      </button>
    </div>
  );
}

export default ProductCard;