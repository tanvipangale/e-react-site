import React from 'react'
import { Link } from 'react-router-dom'
import TopBar from '../components/Topbar.jsx'
import Navbar from '../components/Navbar.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { products } from '../data/Products.js'

function Category() {
  // Direct matching list arrays for Category 1 and Category 2 headings
  const categoriesToDisplay = ["Electronics", "Home & Lifestyle"]

  return (
    <>
      {/* Keeping headers completely the same */}
      <TopBar />
      <Navbar />

      <main className="container" style={{ padding: '40px 5%', marginBottom: '60px' }}>
        
        {/* Top Breadcrumb Tracking Line */}
        <div className="breadcrumb" style={{ marginBottom: '40px', color: '#7d7d7d', fontSize: '14px' }}>
          <Link to="/" style={{ color: '#7d7d7d' }}>Home</Link> / <span style={{ color: '#000', fontWeight: '500' }}>Categories</span>
        </div>

        {/* Looping Categories layout horizontally precisely as requested */}
        {categoriesToDisplay.map((categoryName, idx) => {
          // Isolate products belonging only to this specific row key identifier
          const categoryProducts = products.filter(p => p.category === categoryName)

          return (
            <div key={idx} className="category-row-wrapper" style={{ marginBottom: '60px' }}>
              
              {/* Category Row Structural Title Block Header with Red Accent Box */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <div style={{ width: '16px', height: '32px', backgroundColor: '#db4444', borderRadius: '2px' }}></div>
                <span style={{ color: '#db4444', fontWeight: '600', fontSize: '14px' }}>Department</span>
              </div>

              <h3 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '24px', letterSpacing: '0.5px' }}>
                {categoryName}
              </h3>

              {/* Individual Products Listing Flow underneath the row headers */}
              {categoryProducts.length === 0 ? (
                <p style={{ color: '#7d7d7d', padding: '10px 0 30px 0' }}>No products available in this section yet.</p>
              ) : (
                <div className="products" style={{ marginBottom: '20px' }}>
                  {categoryProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              {/* Separator line between category blocks except after the last element */}
              {idx < categoriesToDisplay.length - 1 && (
                <hr style={{ border: 'none', height: '1px', backgroundColor: '#f0f0f0', marginTop: '50px' }} />
              )}
            </div>
          )
        })}
      </main>

      <footer style={{ background: '#000', color: '#fff', padding: '60px 5%', marginTop: '80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' }}>
          <div>
            <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>Exclusive</h3>
            <p style={{ color: '#7d7d7d' }}>Get 10% off your first order</p>
          </div>
          <div>
            <h4 style={{ fontSize: '18px', marginBottom: '16px' }}>Support</h4>
            <p style={{ color: '#7d7d7d' }}>Mumbai, Maharashtra, India.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Category