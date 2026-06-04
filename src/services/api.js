const WORDPRESS_URL = 'http://localhost/wordpress';

// Define credentials
const CONSUMER_KEY = 'ck_850368bc42046505b19e3affa264d7cc29477b0f';
const CONSUMER_SECRET = 'cs_bad51486524b1fdf0aa54bd62b32662f127c9683';

export const apiService = {
  // 1. Fetch user authorization token
  loginUser: async (username, password) => {
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/jwt-auth/v1/token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      }
    );

    return await response.json();
  },

  // 2. Register a new user profile account
  registerUser: async (username, email, password) => {
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/custom/v1/register`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      }
    );

    return await response.json();
  },

  // 3. Fetch all products
  getProducts: async () => {
    try {
      const url = `${WORDPRESS_URL}/wp-json/wc/v3/products?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&per_page=50`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const rawProducts = await response.json();

      const cleanedProducts = rawProducts.map(product => {
        if (product.images && Array.isArray(product.images)) {
          return {
            ...product,
            images: product.images.map(img => ({
              ...img,
              src: img.src
                ? img.src.replace('https://', 'http://')
                : '',
            })),
          };
        }

        return product;
      });

      return cleanedProducts;
    } catch (error) {
      console.error('Backend connection error:', error);
      return [];
    }
  },

  // 4. Get Cart
  getCart: async () => {
    try {
      const response = await fetch(
        `${WORDPRESS_URL}/wp-json/wc/store/v1/cart`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }

      return await response.json();
    } catch (error) {
      console.error('Cart error:', error);
      return null;
    }
  },

  // 5. Add Product To Cart
  addToCart: async (productId, quantity = 1) => {
    try {
      const response = await fetch(
        `${WORDPRESS_URL}/?add-to-cart=${productId}&quantity=${quantity}`,
        {
          method: 'GET',
        }
      );

      return response;
    } catch (error) {
      console.error('Add to cart error:', error);
      return null;
    }
  },

  // 6. Create Order
  createOrder: async (orderData) => {
    try {
      const response = await fetch(
        `${WORDPRESS_URL}/wp-json/wc/v3/orders?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        }
      );

      return await response.json();
    } catch (error) {
      console.error('Order creation error:', error);
      return null;
    }
  },
};