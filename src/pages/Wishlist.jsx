import React from 'react';
import { useStore } from '../context/StoreContext.jsx';
import ProductCard from '../components/ProductCard.jsx';

function Wishlist() {
  const { wishlist, addToCart, removeFromWishlist } = useStore();

  const handleMoveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <section className="section container">
      <div style={{ marginBottom: '30px' }}>
        <div className="today">Saved Items</div>
        <h1 className="flash-title">Wishlist ({wishlist.length})</h1>
      </div>

      {wishlist.length === 0 ? (
        <p className="empty-message">Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <div key={product.id} style={{ display: 'flex', flexDirection: 'column' }}>
              
              {/* Pass the item along with our custom layout configuration flag */}
              <ProductCard 
                product={product} 
                isWishlistPage={true} 
                onMoveToCart={handleMoveToCart} 
              />
              
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Wishlist;