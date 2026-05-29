import { Link } from 'react-router-dom';
import React from 'react';
import { useStore } from '../context/StoreContext.jsx';

function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist, cart } = useStore();
  const isWishlisted = wishlist.some(item => item.id === product.id);
  const isInCart = cart.some((item) => item.id === product.id);

  // Get product image
const imageUrl =
  product.images && product.images.length > 0
    ? product.images[0].src
    : 'placeholder-image-url.jpg';
    
  // 2. Handle Price 
  const price = product.price;

  // 3. Handle Discount 
  const calculateDiscount = () => {
    if (product.regular_price && product.sale_price) {
      const discount = ((product.regular_price - product.sale_price) / product.regular_price) * 100;
      return Math.round(discount);
    }
    return null;
  };
  const discountPercent = calculateDiscount();

  return (
    <div className="product">
      <div className="product-top">
        {discountPercent > 0 && (
          <div className="discount">-{discountPercent}%</div>
        )}
        <button 
          className="wishlist-btn" 
          onClick={() => toggleWishlist(product)}
          style={{ border: 'none', cursor: 'pointer' }}
        >
          <i 
            className={`${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart`}
            style={{ color: isWishlisted ? '#891d1a' : '#1E1E1E', fontSize: '16px' }}
          ></i>
        </button>
        
        {/* ADDED: This wraps your exact working image so clicking it opens the details page */}
        <Link to={`/product/${product.id}`}>
          <img src={imageUrl} alt={product.name} />
        </Link>
      </div>

      {/* ADDED: This wraps your text info so clicking the name or price opens the details page */}
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="product-info">
          <h4>{product.name}</h4>
          <span className="price">${price}</span>
        </div>
      </Link>

      <button
        className="add-cart"
        onClick={() => addToCart(product)}
        style={isInCart ? { background: '#891d1a', color: '#fff' } : undefined}
      >
        {isInCart ? 'Added' : 'Add To Cart'}
      </button>
    </div>
  );
}

export default ProductCard;