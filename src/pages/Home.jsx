import React, { useState } from 'react';
import HeroSection from '../components/HeroSection.jsx';
import ProductsSection from '../components/ProductsSection.jsx';
import CategoryViewSection from '../components/CategoryViewSection.jsx';

function Home() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setCurrentView('category');
  };

  const handleResetToHome = () => {
    setSelectedCategory(null);
    setCurrentView('home');
  };

  return (
    <>
      {currentView === 'home' ? (
        <>
          <HeroSection onCategoryClick={handleCategorySelect} />
          
          {/* 💡 PROP DRILLING: Pass the state down so ProductsSection can use it */}
          <ProductsSection 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
          />
        </>
      ) : (
        <CategoryViewSection 
          categoryName={selectedCategory} 
          onBackToHome={handleResetToHome} 
        />
      )}
    </>
  );
}

export default Home;