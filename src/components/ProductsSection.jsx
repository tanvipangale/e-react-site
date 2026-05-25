import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard.jsx';
import { apiService } from '../services/api';

function ProductsSection({ selectedCategory, setSelectedCategory }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await apiService.getProducts();

      if (data) {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  // Show category products OR only sale products
  const filteredProducts = selectedCategory
    ? products.filter((product) =>
        product.categories?.some(
          (cat) => cat.name === selectedCategory
        )
      )
    : products.filter((product) => product.on_sale);

return (
  <section className="section container">

    {/* FLASH SALES */}
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}
    >
      <div>
        <div className="today">
          Flash Sales
        </div>

        <div className="flash-title">
          Discount Products
        </div>
      </div>
    </div>

    <div className="products">
      {products
        .filter(
          (product) =>
            product.sale_price &&
            product.sale_price !== ''
        )
        .map((product) => (
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

  </section>
);
}

export default ProductsSection;