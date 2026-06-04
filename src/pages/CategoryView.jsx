import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { apiService } from '../services/api';

function CategoryView() {
  // Grabs the exact category parameter phrase typed into the active browser URL path box
  const { categoryName } = useParams();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        // Query live database results array
        const data = await apiService.getProducts();
        if (data) {
          // Keep only items that contain our specific active URL category string name value
          const filtered = data.filter((product) =>
            product.categories?.some(
              (cat) => cat.name.toLowerCase().trim() === categoryName.toLowerCase().trim()
            )
          );
          setProducts(filtered);
        }
      } catch (error) {
        console.error("Error loading category products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]); // Re-fetches automatically if customer switches directly from Clothing to Hoodies

  // Informative placeholder state display during remote fetching wait time
  if (loading) {
    return (
      <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h3>Loading products from {categoryName}...</h3>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '60px 20px', minHeight: '80vh' }}>
      
      {/* Structural Interactive Navigation Line tracking links */}
      <div className="breadcrumb" style={{ marginBottom: '30px', color: '#7d7d7d', fontSize: '14px' }}>
        <Link to="/" style={{ color: '#7d7d7d' }}>Home</Link> / 
        <Link to="/categories" style={{ color: '#7d7d7d', marginLeft: '5px', marginRight: '5px' }}>Categories</Link> / 
        <span style={{ color: '#1E1E1E', fontWeight: '500' }}>{categoryName}</span>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <div className="today">Collection Grid</div>
        <h1 className="flash-title" style={{ marginTop: '5px' }}>{categoryName} Products</h1>
        <p style={{ color: '#7d7d7d', marginTop: '5px' }}>Found {products.length} items available</p>
      </div>

      {/* Safety check display layout rendering logic if chosen selection contains zero items */}
      {products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '12px', border: '1px solid #E5DFD5' }}>
          <h2>No Products Found</h2>
          <p style={{ color: '#7d7d7d', margin: '15px 0 25px' }}>
            We don't have any items stocked inside this collection category right now.
          </p>
          <Link to="/categories" className="checkout-btn" style={{ display: 'inline-block', width: 'auto', padding: '12px 30px' }}>
            Back to All Categories
          </Link>
        </div>
      ) : (
        <div className="products">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}

export default CategoryView;