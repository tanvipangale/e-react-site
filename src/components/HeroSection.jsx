import React from 'react';
import ProductCard from './ProductCard.jsx';

function HeroSection({
  selectedCategory,
  onCategoryClick,
  products
}) {

  const categories = [
    "Accessories",
    "Clothing",
    "Decor",
    "Hoodies",
    "Music",
    "Tshirts"
  ];

  // FILTER PRODUCTS
  const categoryProducts =
    selectedCategory
      ? products.filter((product) =>
          product.categories?.some(
            (cat) =>
              cat.name === selectedCategory
          )
        )
      : [];

  return (
    <section className="hero">

      {/* LEFT SIDEBAR */}
      <div className="sidebar">

        <ul>

          {categories.map((cat) => (

            <li
              key={cat}
              onClick={() =>
                onCategoryClick(cat)
              }
              style={{
                cursor: 'pointer',
                padding: '5px 0'
              }}
            >
              {cat}
            </li>

          ))}

        </ul>

      </div>

      {/* RIGHT SIDE */}
      {!selectedCategory ? (

        /* BANNER */
        <div className="banner">

          <div className="banner-text">

            <div className="banner-apple-brand">
              <i
                className="fa-brands fa-apple"
                style={{
                  fontSize: '24px',
                  color: '#FFF'
                }}
              ></i>

              <span>
                iPhone 14 Series
              </span>
            </div>

            <h1>
              Up to 10% off Voucher
            </h1>

            <a
              href="#"
              className="banner-shop-now-link"
            >
              Shop Now

              <i className="fa-solid fa-arrow-right"></i>
            </a>

          </div>

          <img
            src="https://i.ibb.co/zhNGB4zM/i-Phone-removebg-preview.png"
            alt="iPhone"
          />

        </div>

      ) : (

        /* CATEGORY PRODUCTS */
        <div
          style={{
            flex: 1,
            padding: '40px'
          }}
        >

          <div className="today">
            {selectedCategory}
          </div>

          <div
            className="products"
            style={{
              marginTop: '20px'
            }}
          >

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

        </div>

      )}

    </section>
  );
}

export default HeroSection;