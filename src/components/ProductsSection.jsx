import React from 'react';
import ProductCard from './ProductCard.jsx';

function ProductsSection({ selectedCategory, allProducts = [], isLoading }) {
  
  // Use the data passed from Home.jsx, defaulting to an empty list if not ready
  const products = allProducts;

  // 1. FILTER PRODUCTS BY SELECTED CATEGORY
  const categoryProducts = selectedCategory
    ? products.filter((product) =>
        product.categories?.some(
          (cat) =>
            cat.name.toLowerCase().trim() ===
            selectedCategory.toLowerCase().trim()
        )
      )
    : [];

  // 2. ISOLATE SALE PRODUCTS 
  const saleProducts = products.filter(
    (product) => product.sale_price && product.sale_price !== ''
  );

  // If the homepage is still loading network details, show a message
  if (isLoading) {
    return (
      <section className="section container" style={{ textAlign: 'center', padding: '40px 0' }}>
        <p style={{ color: '#7d7d7d' }}>Loading catalog items...</p>
      </section>
    );
  }

  return (
    <section className="section container">

      {/* SHOW FILTERED CATEGORY VIEW */}
      {selectedCategory ? (
        <>
          <div style={{ marginBottom: '30px' }}>
            <div className="today">{selectedCategory}</div>
            <h2 className="flash-title">Category Results</h2>
          </div>

          <div className="products">
            {categoryProducts.length > 0 ? (
              categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p style={{ color: '#7d7d7d', padding: '20px 0' }}>No products found in this category.</p>
            )}
          </div>
        </>
      ) : (
        /* SHOW STANDARD FRONT PAGE (FLASH SALES + ENTIRE COLLECTION) */
        <>
          {/* FLASH SALES SECTION */}
          <div style={{ marginBottom: '30px' }}>
            <div className="today">Flash Sales</div>
            <div className="flash-title">Discount Products</div>
          </div>

          <div className="products">
            {saleProducts.length > 0 ? (
              saleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p style={{ color: '#7d7d7d', padding: '10px 0 30px' }}>No items currently on sale.</p>
            )}
          </div>

          {/* ALL PRODUCTS COLLECTION SECTION */}
          <div style={{ marginTop: '80px', marginBottom: '30px' }}>
            <div className="today">Our Collection</div>
            <div className="flash-title">All Products</div>
          </div>

          <div className="products">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p style={{ color: '#7d7d7d' }}>No products available in the catalog.</p>
            )}
          </div>
        </>
      )}

    </section>
  );
}

export default ProductsSection;