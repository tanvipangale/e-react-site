import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';

function Cart() {

  const { cart, removeFromCart, cartTotal } = useStore();

  // EMPTY CART
  if (cart.length === 0) {
    return (
      <div className="section container">

        <div className="breadcrumb">
          <Link to="/">Home</Link> / <span>Cart</span>
        </div>

        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: '#fff',
            borderRadius: '16px',
            border: '1px solid #E5DFD5'
          }}
        >

          <h2>Your cart is empty</h2>

          <p
            style={{
              color: '#7d7d7d',
              marginBottom: '25px'
            }}
          >
            Looks like you have not added anything yet.
          </p>

          <Link
            to="/"
            className="checkout-btn"
            style={{
              display: 'inline-block',
              textDecoration: 'none',
              width: 'auto',
              padding: '12px 30px'
            }}
          >
            Continue Shopping
          </Link>

        </div>
      </div>
    );
  }

  // CART WITH ITEMS
  return (
    <div className="section container">

      <div className="breadcrumb">
        <Link to="/">Home</Link> / <span>Cart</span>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '40px',
          flexWrap: 'wrap',
          alignItems: 'flex-start'
        }}
      >

        {/* LEFT SIDE */}
        <div style={{ flex: '1', minWidth: '320px' }}>

          {cart.map((item) => {

            // SIMPLE IMAGE FIX
            const imageUrl =
              item.images?.[0]?.src ||
              'placeholder-image-url.jpg';

            return (
              <div
                key={item.id}
                className="cart-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '20px',
                  background: '#fff',
                  borderRadius: '12px',
                  border: '1px solid #E5DFD5',
                  marginBottom: '15px'
                }}
              >

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px'
                  }}
                >

                  <img
                    src={imageUrl}
                    alt={item.name}
                    style={{
                      width: '70px',
                      height: '70px',
                      objectFit: 'contain'
                    }}
                  />

                  <div>
                    <h4>{item.name}</h4>

                    <p
                      style={{
                        color: '#7d7d7d',
                        fontSize: '14px'
                      }}
                    >
                      Quantity: {item.quantity || 1}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '30px'
                  }}
                >

                  <p style={{ fontWeight: '600' }}>
                    ${item.price}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#891d1a',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Remove
                  </button>

                </div>
              </div>
            );
          })}

        </div>

        {/* RIGHT SIDE */}
        <div className="cart-summary">

          <h2>Cart Summary</h2>

          <div className="summary-line">
            <span>Total Items:</span>

            <strong>
              {cart.reduce(
                (total, item) =>
                  total + (item.quantity || 1),
                0
              )}
            </strong>
          </div>

          <div className="summary-line">
            <span>Shipping:</span>
            <span
              style={{
                color: '#891d1a',
                fontWeight: '600'
              }}
            >
              Free
            </span>
          </div>

          <div
            className="summary-line"
            style={{
              marginTop: '20px',
              borderTop: '1px solid #E5DFD5',
              paddingTop: '15px'
            }}
          >

            <strong>Total:</strong>

            <strong>
              ${Number(cartTotal).toFixed(2)}
            </strong>

          </div>

          <button
            className="checkout-btn"
            onClick={() =>
              alert('Proceeding to checkout...')
            }
          >
            Proceed to checkout
          </button>

        </div>
      </div>
    </div>
  );
}

export default Cart;