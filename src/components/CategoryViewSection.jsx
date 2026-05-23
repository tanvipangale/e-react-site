import React from 'react';
import { products } from '../data/Products.js';

function CategoryViewSection({ categoryName, onBackToHome }) {
  // Pull only items that match the clicked sidebar name string
  const filteredList = products.filter(item => item.category === categoryName);

  return (
    <section className="section container">
      {/* Navigation Breadcrumb track line */}
      <div style={{ marginBottom: '20px', fontSize: '14px', color: '#7d7d7d' }}>
        <span onClick={onBackToHome} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Home</span>
        {" / "}
        <span style={{ color: '#1E1E1E', fontWeight: '600' }}>{categoryName}</span>
      </div>

      {/* Styled Headings using your exact App.css theme classes */}
      <div className="today">{categoryName}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 className="flash-title" style={{ margin: 0 }}>{categoryName} Collection</h1>
        <button 
          onClick={onBackToHome}
          style={{
            background: '#1E1E1E',
            color: '#F9F6F0',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: '0.2s'
          }}
        >
          <i className="fa-solid fa-arrow-left" style={{ marginRight: '8px' }}></i> Back to Home
        </button>
      </div>

      {/* Product Display Layout Grid using your .products CSS structure */}
      <div className="products">
        {filteredList.map((product) => (
          <div className="product" key={product.id}>
            <div className="product-top">
              <div className="discount">-{product.discount}%</div>
              <div className="wishlist-btn" style={{ cursor: 'pointer' }}>
                <i className="fa-regular fa-heart"></i>
              </div>
              <img src={product.image} alt={product.name} />
            </div>
            
            <button className="add-cart">
              Add To Cart
            </button>
            
            <div className="product-info">
              <h4>{product.name}</h4>
              <span className="price">${product.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoryViewSection;