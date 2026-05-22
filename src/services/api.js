const WORDPRESS_URL = 'http://localhost/wordpress';

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
      const response = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/products`);
      return await response.json();
    } catch (error) {
      console.error("Backend connection error:", error);
    }
  }
};