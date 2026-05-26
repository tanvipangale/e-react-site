import React, {
  useEffect,
  useState
} from 'react';

import HeroSection from '../components/HeroSection.jsx';
import ProductsSection from '../components/ProductsSection.jsx';

import { apiService } from '../services/api';

function Home() {

  const [selectedCategory,
    setSelectedCategory] =
    useState(null);

  const [products, setProducts] =
    useState([]);

  useEffect(() => {

    const fetchProducts =
      async () => {

      const data =
        await apiService.getProducts();

      if (data) {
        setProducts(data);
      }
    };

    fetchProducts();

  }, []);

  return (
    <>

      <HeroSection
        selectedCategory={
          selectedCategory
        }
        onCategoryClick={
          setSelectedCategory
        }
        products={products}
      />

      <ProductsSection />

    </>
  );
}

export default Home;