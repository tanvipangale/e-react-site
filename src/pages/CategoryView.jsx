import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { apiService } from '../services/api';

function CategoryView() {
  // Get category from URL
  const { categoryName } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('All');
  const [featuredFilter, setFeaturedFilter] = useState('All');
  const [sortOption, setSortOption] = useState('Default');

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);

      try {
        const data = await apiService.getProducts();

        if (data) {
          const filtered = data.filter((product) =>
            product.categories?.some(
              (cat) =>
                cat.name.toLowerCase().trim() ===
                categoryName.toLowerCase().trim()
            )
          );

          setProducts(filtered);
        }
      } catch (error) {
        console.error(
          'Error loading category products:',
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  // Loading State
  if (loading) {
    return (
      <div
        className="container"
        style={{
          padding: '100px 20px',
          textAlign: 'center',
        }}
      >
        <h3>
          Loading products from {categoryName}...
        </h3>
      </div>
    );
  }

  // Filter + Sort Products
  const filteredProducts = products
    .filter((product) => {
      const price = Number(
        product.price ||
        product.regular_price ||
        0
      );

      // Search
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      // Price
      let matchesPrice = true;

      if (priceFilter === 'Under20') {
        matchesPrice = price < 20;
      }

      if (priceFilter === '20to50') {
        matchesPrice =
          price >= 20 && price <= 50;
      }

      if (priceFilter === 'Above50') {
        matchesPrice = price > 50;
      }

      // Featured
      let matchesFeatured = true;

      if (
        featuredFilter === 'Featured'
      ) {
        matchesFeatured =
          product.featured;
      }

      return (
        matchesSearch &&
        matchesPrice &&
        matchesFeatured
      );
    })
    .sort((a, b) => {
      const priceA = Number(
        a.price ||
        a.regular_price ||
        0
      );

      const priceB = Number(
        b.price ||
        b.regular_price ||
        0
      );

      switch (sortOption) {
        case 'PriceLow':
          return priceA - priceB;

        case 'PriceHigh':
          return priceB - priceA;

        case 'NameAZ':
          return a.name.localeCompare(
            b.name
          );

        case 'NameZA':
          return b.name.localeCompare(
            a.name
          );

        default:
          return 0;
      }
    });

  return (
    <div
      className="container"
      style={{
        padding: '60px 20px',
        minHeight: '80vh',
      }}
    >
      {/* Breadcrumb */}
      <div
        className="breadcrumb"
        style={{
          marginBottom: '30px',
          color: '#7d7d7d',
          fontSize: '14px',
        }}
      >
        <Link
          to="/"
          style={{
            color: '#7d7d7d',
          }}
        >
          Home
        </Link>{' '}
        /
        <Link
          to="/categories"
          style={{
            color: '#7d7d7d',
            marginLeft: '5px',
            marginRight: '5px',
          }}
        >
          Categories
        </Link>{' '}
        /
        <span
          style={{
            color: '#1E1E1E',
            fontWeight: '500',
          }}
        >
          {categoryName}
        </span>
      </div>

      {/* Header */}
      <div
        style={{
          marginBottom: '30px',
        }}
      >
        <div className="today">
          Collection Grid
        </div>

        <h1
          className="flash-title"
          style={{
            marginTop: '5px',
          }}
        >
          {categoryName} Products
        </h1>

        <p
          style={{
            color: '#7d7d7d',
            marginTop: '5px',
          }}
        >
          Found{' '}
          {filteredProducts.length}{' '}
          items available
        </p>
      </div>

      {/* Filters */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
          marginBottom: '30px',
        }}
      >
        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          style={{
            padding: '10px',
            border:
              '1px solid #ccc',
            borderRadius: '5px',
          }}
        />

        {/* Price */}
        <select
          value={priceFilter}
          onChange={(e) =>
            setPriceFilter(
              e.target.value
            )
          }
          style={{
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          <option value="All">
            All Prices
          </option>

          <option value="Under20">
            Under $20
          </option>

          <option value="20to50">
            $20 - $50
          </option>

          <option value="Above50">
            Above $50
          </option>
        </select>

        {/* Featured */}
        <select
          value={featuredFilter}
          onChange={(e) =>
            setFeaturedFilter(
              e.target.value
            )
          }
          style={{
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          <option value="All">
            All Products
          </option>

          <option value="Featured">
            Featured Only
          </option>
        </select>

        {/* Sort */}
        <select
          value={sortOption}
          onChange={(e) =>
            setSortOption(
              e.target.value
            )
          }
          style={{
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          <option value="Default">
            Sort By
          </option>

          <option value="PriceLow">
            Price: Low to High
          </option>

          <option value="PriceHigh">
            Price: High to Low
          </option>

          <option value="NameAZ">
            Name: A-Z
          </option>

          <option value="NameZA">
            Name: Z-A
          </option>
        </select>
      </div>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: '#fff',
            borderRadius: '12px',
            border:
              '1px solid #E5DFD5',
          }}
        >
          <h2>
            No Products Found
          </h2>

          <p
            style={{
              color: '#7d7d7d',
              margin:
                '15px 0 25px',
            }}
          >
            No products match the
            selected filters.
          </p>

          <Link
            to="/categories"
            className="checkout-btn"
            style={{
              display:
                'inline-block',
              width: 'auto',
              padding:
                '12px 30px',
            }}
          >
            Back to All Categories
          </Link>
        </div>
      ) : (
        <div className="products">
          {filteredProducts.map(
            (product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default CategoryView;