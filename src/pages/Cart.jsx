import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';

function Cart() {
  // Extracting live cart global state data from our context provider
  const { cart, removeFromCart, cartTotal } = useStore();

  // View A: What displays if there are zero items in the cart array
  if (cart.length === 0) {
    return (
      <div className="section container">
        {/* Navigation tracking breadcrumb line */}
        <div className="breadcrumb" style={{ marginBottom: '30px', fontSize: '14px', color: '#7d7d7d' }}>
          <Link to="/">Home</Link> / <span style={{ color: '#1E1E1E', fontWeight: '500' }}>Cart</span>
        </div>
        
        {/* Empty State Banner Alert Notification Wrapper */}
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5DFD5' }}>
          <h2 style={{ marginBottom: '10px', color: '#1E1E1E' }}>Your cart is empty</h2>
          <p style={{ color: '#7d7d7d', marginBottom: '25px' }}>Looks like you have not added anything to your cart yet.</p>
          <Link to="/" className="checkout-btn" style={{ display: 'inline-block', textDecoration: 'none', width: 'auto', padding: '12px 30px' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // View B: What displays if the user has 1 or more items in their cart
  return (
    <div className="section container">
      {/* Navigation tracking breadcrumb line */}
      <div className="breadcrumb" style={{ marginBottom: '30px', fontSize: '14px', color: '#7d7d7d' }}>
        <Link to="/">Home</Link> / <span style={{ color: '#1E1E1E', fontWeight: '500' }}>Cart</span>
      </div>

      {/* Two-Column Flexbox Layout Grid Structure */}
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* LEFT COLUMN: The scrollable listing of products in the cart */}
        <div style={{ flex: '1', minWidth: '320px' }}>
          {cart.map((item) => (
            <div key={item.id} className="cart-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5DFD5', marginBottom: '15px' }}>
              
              {/* Product Thumbnail Image and Title Name Strings */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <img src={item.image} alt={item.name} style={{ width: '70px', height: '70px', objectFit: 'contain' }} />
                <div>
                  <h4 style={{ fontWeight: '600', marginBottom: '5px' }}>{item.name}</h4>
                  <p style={{ color: '#7d7d7d', fontSize: '14px' }}>Quantity: {item.quantity || 1}</p>
                </div>
              </div>

              {/* Product Price Tag values and Delete Removal Execution Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                <p style={{ fontWeight: '600' }}>${item.price}</p>
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  style={{ background: 'none', border: 'none', color: '#C88E72', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}
                >
                  Remove
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* RIGHT COLUMN: Fixed Checkout Pricing Overview Widget Summary Card */}
        <div className="cart-summary" style={{ marginTop: '0px' }}>
          <h2>Cart Summary</h2>
          
          <div className="summary-line">
            <span>Total Items:</span>
            <strong>{cart.reduce((total, item) => total + (item.quantity || 1), 0)}</strong>
          </div>

          <div className="summary-line">
            <span>Shipping:</span>
            <span style={{ color: '#C88E72', fontWeight: '600' }}>Free</span>
          </div>
          
          <div className="summary-line" style={{ marginTop: '20px', borderTop: '1px solid #E5DFD5', paddingTop: '15px' }}>
            <strong>Total:</strong>
            <strong>${Number(cartTotal).toFixed(2)}</strong>
          </div>
          
          <button className="checkout-btn" onClick={() => alert('Proceeding to checkout...')}>
            Proceed to checkout
          </button>
        </div>

      </div>
    </div>
  );
}

export default Cart;