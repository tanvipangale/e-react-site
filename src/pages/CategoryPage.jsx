// src/pages/CategoryPage.jsx
import React from 'react'
import { useParams, Link } from 'react-router-dom'
import TopBar from '../components/Topbar.jsx'
import Navbar from '../components/Navbar.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { products } from '../data/Products.js'

function CategoryPage() {
  const { categoryName } = useParams();

  // Decode context from path parameter to filter items cleanly
  const currentCategory = decodeURIComponent(categoryName);
  
  const displayProducts = products.filter(
    (item) => item.category?.toLowerCase() === currentCategory.toLowerCase()
  );

  return (
    <>
      <TopBar />
      <Navbar />
      
      <div className="container" style={{ marginTop: '40px', marginBottom: '80px' }}>
        {/* Breadcrumb row match template style */}
        <div style={{ marginBottom: '30px', fontSize: '15px', color: '#7d7d7d' }}>
          <Link to="/" style={{ color: '#7d7d7d' }}>Home</Link> / <span style={{ color: '#1E1E1E', fontWeight: '500' }}>{currentCategory}</span>
        </div>

        <div className="today">{currentCategory} Department</div>
        <h2 className="flash-title" style={{ marginBottom: '40px' }}>Explore {currentCategory}</h2>

        {displayProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#F5F5F5', borderRadius: '16px', border: '1px solid #E5DFD5' }}>
            <h3 style={{ color: '#7d7d7d', fontWeight: '500', marginBottom: '15px' }}>No products available in this section yet.</h3>
            <Link to="/" style={{ display: 'inline-block', background: '#1E1E1E', color: 'white', padding: '12px 25px', borderRadius: '8px', fontWeight: 'bold' }}>
              Return to Home Shop
            </Link>
          </div>
        ) : (
          <div className="products">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default CategoryPage