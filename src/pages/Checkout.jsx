import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { apiService } from '../services/api';

function Checkout() {
  const navigate = useNavigate();

  const { cart, cartTotal } = useStore();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postcode: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const placeOrder = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        payment_method: 'cod',
        payment_method_title: 'Cash on Delivery',
        set_paid: false,

        billing: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.address,
          city: formData.city,
          state: formData.state,
          postcode: formData.postcode,
          country: 'IN',
          email: formData.email,
          phone: formData.phone
        },

        shipping: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.address,
          city: formData.city,
          state: formData.state,
          postcode: formData.postcode,
          country: 'IN'
        },

        line_items: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity
        }))
      };

      const order = await apiService.createOrder(orderData);

      alert(
        `Order Created Successfully!\nOrder ID: ${order.id}`
      );

      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Failed to create order');
    }

    setLoading(false);
  };

  return (
    <div className="section container">

      <div className="breadcrumb">
        <Link to="/">Home</Link> / <span>Checkout</span>
      </div>

      <h2 style={{ marginBottom: '30px' }}>
        Checkout
      </h2>

      <div className="checkout-layout">

        {/* LEFT SIDE */}
        <div className="checkout-form">

          <h3>Billing Details</h3>

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            onChange={handleChange}
          />

          <input
            type="text"
            name="postcode"
            placeholder="Pincode"
            onChange={handleChange}
          />

        </div>

        {/* RIGHT SIDE */}
        <div className="checkout-summary">

          <h3>Order Summary</h3>

          {cart.map((item) => (
            <div
              key={item.id}
              className="checkout-item"
            >
              <span>
                {item.name} × {item.quantity}
              </span>

              <strong>
                $
                {(Number(item.price) * item.quantity).toFixed(2)}
              </strong>
            </div>
          ))}

          <div className="checkout-total">
            <span>Total</span>

            <span>
              ${Number(cartTotal).toFixed(2)}
            </span>
          </div>

          <button
            className="checkout-btn"
            onClick={placeOrder}
            disabled={loading}
            style={{
              width: '100%',
              marginTop: '20px'
            }}
          >
            {loading
              ? 'Placing Order...'
              : 'Place Order'}
          </button>

        </div>

      </div>
    </div>
  );
}

export default Checkout;