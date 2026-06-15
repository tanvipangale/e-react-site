import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { apiService } from '../services/api';

function SearchResults() {
  const [searchParams] = useSearchParams();
  // Reads the exact search term string from the current address URL bar (?q=...)
  const query = searchParams.get('q') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Collect product items from your local WordPress database API connection
        const data = await apiService.getProducts();

        // Performs a safe, case-insensitive filter over product names
        const filtered = data.filter((product) => {
          const productName = product.name || product.title || '';
          return productName.toLowerCase().includes(query.toLowerCase());
        });

        setProducts(filtered);
      } catch (error) {
        console.error('Failed to parse catalog lookup filtering rules:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]); // Automatically restarts the filter query whenever the user searches a new word

  if (loading) {
    return (
      <div className="container" style={{ padding: '80px 20px' }}>
        <h2 className="flash-title">Searching catalog items...</h2>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '60px 20px', minHeight: '80vh' }}>
      
      {/* Sub-Header Context Readout Summary Labels */}
      <div style={{ marginBottom: '40px' }}>
        <div className="today">Search Results</div>
        <h1 className="flash-title" style={{ marginTop: '5px' }}>
          Showing results for "{query}"
        </h1>
        <p style={{ color: '#7d7d7d', marginTop: '10px', fontSize: '15px' }}>
          {products.length} item(s) found matching your criteria.
        </p>
      </div>

      {/* Conditionally swap displays if nothing matches */}
      {products.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: '#fff',
            borderRadius: '12px',
            border: '1px solid #E5DFD5',
          }}
        >
          <h2>No Products Found</h2>
          <p style={{ color: '#7d7d7d', marginTop: '10px' }}>
            We couldn't find matches for your search. Try checking your spelling or search for broader keywords.
          </p>
        </div>
      ) : (
        /* 🛠️ FIXED: Added your layout class structure grid hook to map cards seamlessly */
        <div className="products">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;