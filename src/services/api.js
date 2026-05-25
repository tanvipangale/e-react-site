const WORDPRESS_URL = 'http://localhost/wordpress';
// Define your credentials here (Ensure these are kept secure in production)
const CONSUMER_KEY = 'ck_60c0ed6aa4eef0a1c851921894f4776d3836e457'; 
const CONSUMER_SECRET = 'cs_903db4eccb43d69184447f5642ec6527073d8cf7';

export const apiService = {
  // 1. Fetch user authorization token (Used in Login.jsx)
  loginUser: async (username, password) => {
    const response = await fetch(`${WORDPRESS_URL}/wp-json/jwt-auth/v1/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    return await response.json();
  },

  // 2. Register a new user profile account (Used in Register.jsx)
  registerUser: async (username, email, password) => {
    const response = await fetch(`${WORDPRESS_URL}/wp-json/custom/v1/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    return await response.json();
  },

 // 3. Fetch all item inventory listings
  getProducts: async () => {
    try {
      // Added '&per_page=50' to the end of the URL to fetch more products
      const url = `${WORDPRESS_URL}/wp-json/wc/v3/products?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&per_page=50`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      return await response.json();
    } catch (error) {
      console.error("Backend connection error:", error);
      return [];
    }
  }
};