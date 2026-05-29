import React from 'react';
import { useStore } from '../context/StoreContext.jsx';

function Wishlist() {

  const { wishlist, removeFromWishlist } = useStore();

  return (
    <section className="section container">

      <div className="today">Your Saved</div>
      <h1 className="flash-title">Your Wishlist</h1>

      {wishlist.length === 0 ? (

        <p className="empty-message">
          Your wishlist is currently empty.
        </p>

      ) : (

        <div className="wishlist-grid">

          {wishlist.map((item) => {

            // SIMPLE IMAGE LOGIC
            const imageUrl =
              item.images && item.images.length > 0
                ? item.images[0].src
                : 'placeholder-image-url.jpg';

            return (
              <div className="product" key={item.id}>

                <div className="product-top">
                  <img src={imageUrl} alt={item.name} />
                </div>

                <div
                  className="product-info"
                  style={{ padding: '10px 0' }}
                >

                  <h4>{item.name}</h4>

                  <span className="price">
                    ${item.price}
                  </span>

                  <button
                    className="add-cart"
                    onClick={() => removeFromWishlist(item.id)}
                    style={{
                      background: '#1E1E1E',
                      marginTop: '15px'
                    }}
                  >
                    Remove
                  </button>

                </div>
              </div>
            );
          })}

        </div>
      )}
    </section>
  );
}

export default Wishlist;