import React from 'react';
import { Link } from 'react-router-dom';

function Categories() {
  // These arrays match your exact WordPress WooCommerce backend category items
  const categories = [
    { name: "Accessories", description: "Complete your look with premium accessories" },
    { name: "Clothing", description: "Modern garments designed for everyday style" },
    { name: "Decor", description: "Transform your spaces with gorgeous details" },
    { name: "Hoodies", description: "Cozy, heavy-duty fabrics to protect you from cold weather" },
    { name: "Music", description: "Discover unique sound elements and items" },
    { name: "Tshirts", description: "Classic everyday fit casual clothing basics" }
  ];

  return (
    <div className="container" style={{ padding: '60px 20px', minHeight: '80vh' }}>
      
      {/* Structural Path Indicator links */}
      <div className="breadcrumb" style={{ marginBottom: '30px', color: '#7d7d7d', fontSize: '14px' }}>
        <Link to="/" style={{ color: '#7d7d7d' }}>Home</Link> / <span style={{ color: '#1E1E1E', fontWeight: '500' }}>All Categories</span>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <div className="today">Browse Store</div>
        <h1 className="flash-title" style={{ marginTop: '5px' }}>Shop By Category</h1>
      </div>

      {/* Grid container layout rendering category choices */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '25px',
          marginTop: '30px' 
        }}
      >
        {categories.map((cat) => (
          <Link 
            key={cat.name} 
            to={`/category/${cat.name}`} 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div 
              className="category-card"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E5DFD5',
                borderRadius: '12px',
                padding: '35px 25px',
                textAlign: 'center',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '180px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#891d1a';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E5DFD5';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#1E1E1E', marginBottom: '10px' }}>
                {cat.name}
              </h3>
              <p style={{ fontSize: '14px', color: '#7d7d7d', lineHeight: '1.4' }}>
                {cat.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}

export default Categories;