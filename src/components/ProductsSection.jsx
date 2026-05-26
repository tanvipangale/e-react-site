import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard.jsx';
import { apiService } from '../services/api';

function ProductsSection({ selectedCategory }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await apiService.getProducts();

      if (data) {
        data.forEach((product) => {
  console.log(
    product.name,
    product.categories
  );
});
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  // CATEGORY FILTER
  const categoryProducts = selectedCategory
    ? products.filter((product) =>
        product.categories?.some(
          (cat) =>
            cat.name.toLowerCase().trim() ===
            selectedCategory.toLowerCase().trim()
        )
      )
    : [];

  // SALE PRODUCTS
  const saleProducts = products.filter(
    (product) =>
      product.sale_price &&
      product.sale_price !== ''
  );

  return (
    <section className="section container">

      {/* SHOW CATEGORY PRODUCTS */}
      {selectedCategory ? (
        <>
          <div style={{ marginBottom: '30px' }}>

            <div className="today">
              {selectedCategory}
            </div>

            <div className="flash-title">
              {selectedCategory} Collection
            </div>

          </div>

          <div className="products">
            {categoryProducts.length > 0 ? (
              categoryProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </>
      ) : (
        <>
          {/* FLASH SALES */}
          <div style={{ marginBottom: '30px' }}>

            <div className="today">
              Flash Sales
            </div>

            <div className="flash-title">
              Discount Products
            </div>

          </div>

          <div className="products">
            {saleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

          {/* ALL PRODUCTS */}
          <div
            style={{
              marginTop: '80px',
              marginBottom: '30px'
            }}
          >

            <div className="today">
              Our Collection
            </div>

            <div className="flash-title">
              All Products
            </div>

          </div>

          <div className="products">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </>
      )}

    </section>
  );
}

export default ProductsSection;