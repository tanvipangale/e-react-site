const WORDPRESS_URL = 'http://localhost/wordpress';
// Define credentials 
const CONSUMER_KEY = 'ck_0acc9aa695f1ba5a1c114db011b4affdc3764804'; 
const CONSUMER_SECRET = 'cs_07e31316e7ee8c5b68c8a7a60c741e2ccffd97c0';

export const apiService = {
  // 1. Fetch user authorization token 
  loginUser: async (username, password) => {
    const response = await fetch(`${WORDPRESS_URL}/wp-json/jwt-auth/v1/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    return await response.json();
  },

  // 2. Register a new user profile account
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
      const url = `${WORDPRESS_URL}/wp-json/wc/v3/products?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&per_page=50`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const rawProducts = await response.json();
      
      // GLOBALLY CLEAN IMAGES FOR HOME, CART, AND WISHLIST
      const cleanedProducts = rawProducts.map(product => {
        if (product.images && Array.isArray(product.images)) {
          return {
            ...product,
            images: product.images.map(img => ({
              ...img,
              // Safely replace https with http, or provide a blank string if src is missing
              src: img.src ? img.src.replace('https://', 'http://') : ''
            }))
          };
        }
        return product;
      });
      
      return cleanedProducts;

    } catch (error) {
      console.error("Backend connection error:", error);
      return [];
    }
  }
};