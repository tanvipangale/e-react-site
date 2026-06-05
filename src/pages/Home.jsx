import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection.jsx';
import ProductsSection from '../components/ProductsSection.jsx';
import { apiService } from '../services/api';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await apiService.getProducts();
        if (data) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching homepage products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {/* 1. The main promotional slider section */}
      <HeroSection
        selectedCategory={selectedCategory}
        onCategoryClick={setSelectedCategory}
        products={products}
      />

      {/* 2. The store catalog grid section (We pass the shared data here now) */}
      <ProductsSection 
        selectedCategory={selectedCategory} 
        allProducts={products}
        isLoading={loading}
      />
    </>
  );
}

export default Home;