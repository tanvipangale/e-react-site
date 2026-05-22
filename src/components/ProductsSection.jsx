// src/components/ProductsSection.jsx
import React from 'react';
import ProductCard from './ProductCard.jsx';
import { products } from '../data/Products.js';

function ProductsSection({ selectedCategory, setSelectedCategory }) {
  
  // 💡 THE CONDITIONAL FILTER LOGIC
  const filteredProducts = selectedCategory 
    ? products.filter(product => product.category === selectedCategory) // If category is active, show only matching items
    : products.filter(product => product.discount && product.discount > 0); // If on homepage, ONLY show items that have a discount!

  return (
    <section className="section container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          {/* Changes sub-heading text depending on where the user looks */}
          <div className="today">
            {selectedCategory ? `${selectedCategory}` : "Today's"}
          </div>
          {/* Changes main title text depending on where the user looks */}
          <div className="flash-title">
            {selectedCategory ? "Category Collection" : "Flash Sales"}
          </div>
        </div>
        
        {/* If viewing a category, show a button to clear the filter and jump back to the sales page */}
        {selectedCategory && (
          <button 
            onClick={() => setSelectedCategory(null)}
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
            ← Back to Flash Sales
          </button>
        )}
      </div>

      {/* Grid container to render our custom product card items */}
      <div className="products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0', color: '#7d7d7d', fontSize: '16px' }}>
            No items are available in this category section right now.
          </p>
        )}
      </div>
    </section>
  );
}

export default ProductsSection;