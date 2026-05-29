import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { apiService } from '../services/api';

function ProductDetail() {
  // Grab the unique product ID directly from the browser's URL bar
  const { id } = useParams();
  
  // Bring in the cart actions from your global store context
  const { addToCart, cart } = useStore();

  // Local component states to store the product data and loading screen status
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Download product details from your backend database as soon as this screen loads
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const allProducts = await apiService.getProducts();
        if (allProducts) {
          // Find the single product whose ID matches the URL string ID
          const foundProduct = allProducts.find((p) => String(p.id) === String(id));
          setProduct(foundProduct);
        }
      } catch (error) {
        console.error("Error loading product descriptions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  // Screen View 1: Display a clean animated loading message while contacting your server
  if (loading) {
    return (
      <div className="container" style={{ padding: '80px 5%', textAlign: 'center' }}>
        <h3 style={{ color: '#7d7d7d' }}>Loading product details...</h3>
      </div>
    );
  }

  // Screen View 2: Display an error alert if the product ID doesn't exist in WordPress
  if (!product) {
    return (
      <div className="container" style={{ padding: '80px 5%', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <p style={{ color: '#7d7d7d', marginBottom: '20px' }}>The item you are looking for does not exist or has been removed.</p>
        <Link to="/" style={{ color: '#891d1a', fontWeight: '600' }}>Back to Homepage</Link>
      </div>
    );
  }

  // Safety Image Fetch: Matches your homepage image formula exactly so it never breaks
  const imageUrl = product.images && product.images.length > 0
    ? product.images.src
    : 'placeholder-image-url.jpg';

  // Check if this specific item is already sitting inside the shopping cart
  const isInCart = cart.some((item) => item.id === product.id);

  return (
    <div className="container" style={{ padding: '40px 5%', marginBottom: '80px' }}>
      
      {/* Top Breadcrumb Navigation Tracking Line */}
      <div className="breadcrumb" style={{ marginBottom: '40px', fontSize: '14px', color: '#7d7d7d' }}>
        <Link to="/" style={{ color: '#7d7d7d' }}>Home</Link> / <span style={{ color: '#1E1E1E', fontWeight: '500' }}>{product.name}</span>
      </div>

      {/* Two-Column Clean Desktop/Mobile Grid Layout */}
      <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap', alignItems: 'center' }}>
        
        {/* LEFT COLUMN: Large High-Quality Image Display Showcase */}
        <div style={{ flex: '1', minWidth: '300px', background: '#F5F5F5', borderRadius: '12px', padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #E5DFD5' }}>
          <img 
            src={imageUrl} 
            alt={product.name} 
            style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} 
          />
        </div>

        {/* RIGHT COLUMN: Interactive Product Details, Specifications, Descriptions and Buy Triggers */}
        <div style={{ flex: '1', minWidth: '320px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '15px', color: '#1E1E1E' }}>
            {product.name}
          </h1>
          
          <div style={{ fontSize: '24px', fontWeight: '600', color: '#891d1a', marginBottom: '25px' }}>
            ${product.price}
          </div>

          <hr style={{ border: 'none', height: '1px', backgroundColor: '#E5DFD5', marginBottom: '25px' }} />

          {/* WordPress HTML Description Translator Box */}
          <h4 style={{ fontSize: '18px', marginBottom: '10px', fontWeight: '600' }}>Product Description</h4>
          <div 
            style={{ color: '#555', lineHeight: '1.7', marginBottom: '35px', fontSize: '15px' }}
            dangerouslySetInnerHTML={{ __html: product.description || product.short_description || 'No detailed description provided for this product.' }}
          />

          {/* Core Action Trigger: Add to Shopping Cart Button */}
          <button
            className="add-cart"
            onClick={() => addToCart(product)}
            style={{
              width: '100%',
              maxWidth: '250px',
              padding: '15px 30px',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.2s',
              background: isInCart ? '#891d1a' : '#1E1E1E',
              color: '#fff'
            }}
          >
            {isInCart ? '✓ Added To Cart' : 'Add To Cart'}
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductDetail;