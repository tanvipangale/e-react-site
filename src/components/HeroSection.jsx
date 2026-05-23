import React from 'react';

function HeroSection({ onCategoryClick }) {
  const categories = [
    "Woman’s Fashion",
    "Men’s Fashion",
    "Electronics",
    "Home & Lifestyle",
    "Medicine",
    "Sports & Outdoor",
    "Baby’s & Toys",
    "Groceries & Pets",
    "Health & Beauty"
  ];

  return (
    <section className="hero">
      <div className="sidebar">
        <ul>
          {categories.map((cat) => (
            <li 
              key={cat} 
              onClick={() => onCategoryClick(cat)}
              style={{ cursor: 'pointer', padding: '4px 0' }}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      <div className="banner">
        <div className="banner-text">
          <div className="banner-apple-brand">
            <i className="fa-brands fa-apple" style={{ fontSize: '24px', color: '#FFF' }}></i>
            <span>iPhone 14 Series</span>
          </div>
          <h1>Up to 10% off Voucher</h1>
          <a href="#" className="banner-shop-now-link">
            Shop Now <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>
        <img src="https://i.ibb.co/zhNGB4zM/i-Phone-removebg-preview.png" alt="iPhone" />
      </div>
    </section>
  );
}

export default HeroSection;