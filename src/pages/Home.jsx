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
      {/* 💡 Old TopBar and Navbar tags removed from here! */}
      
      {currentView === 'home' ? (
        <>
          <HeroSection onCategoryClick={handleCategorySelect} />
          <ProductsSection />
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