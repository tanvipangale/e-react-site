import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { apiService } from '../services/api';

function ProductDetail() {
  const { id } = useParams();
  const { addToCart, cart } = useStore();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const allProducts = await apiService.getProducts();

        if (allProducts) {
          const foundProduct = allProducts.find(
            (p) => String(p.id) === String(id)
          );

          setProduct(foundProduct);
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) {
    return (
      <div
        className="container"
        style={{
          padding: '80px 5%',
          textAlign: 'center'
        }}
      >
        <h3>Loading product details...</h3>
      </div>
    );
  }

  if (!product) {
    return (
      <div
        className="container"
        style={{
          padding: '80px 5%',
          textAlign: 'center'
        }}
      >
        <h2>Product Not Found</h2>

        <p
          style={{
            color: '#7d7d7d',
            marginBottom: '20px'
          }}
        >
          The item you are looking for does not exist.
        </p>

        <Link
          to="/"
          style={{
            color: '#891d1a',
            fontWeight: '600'
          }}
        >
          Back to Homepage
        </Link>
      </div>
    );
  }

  // PRODUCT IMAGE
  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0].src
      : 'placeholder-image-url.jpg';

  // PRICE
  const price = product.price;

  // DISCOUNT
  const calculateDiscount = () => {
    if (product.regular_price && product.sale_price) {
      const discount =
        ((product.regular_price - product.sale_price) /
          product.regular_price) *
        100;

      return Math.round(discount);
    }

    return null;
  };

  const discountPercent = calculateDiscount();

  const isInCart = cart.some(
    (item) => item.id === product.id
  );

  return (
    <div
      className="container"
      style={{
        padding: '40px 5%',
        marginBottom: '80px'
      }}
    >
      <div
        className="breadcrumb"
        style={{
          marginBottom: '40px'
        }}
      >
        <Link to="/">Home</Link> /{' '}
        <span>{product.name}</span>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '60px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}
      >
        {/* IMAGE */}
        <div
          style={{
            flex: '1',
            minWidth: '300px',
            background: '#F5F5F5',
            borderRadius: '12px',
            padding: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <img
            src={imageUrl}
            alt={product.name}
            style={{
              maxWidth: '100%',
              maxHeight: '400px',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* DETAILS */}
        <div
          style={{
            flex: '1',
            minWidth: '320px'
          }}
        >
          <h1
            style={{
              fontSize: '32px',
              marginBottom: '15px'
            }}
          >
            {product.name}
          </h1>

          <div
            style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#891d1a',
              marginBottom: '25px'
            }}
          >
            ${price}

            {discountPercent && (
              <span
                style={{
                  marginLeft: '10px',
                  fontSize: '16px',
                  color: 'green'
                }}
              >
                ({discountPercent}% OFF)
              </span>
            )}
          </div>

          <hr
            style={{
              marginBottom: '25px'
            }}
          />

          <h4
            style={{
              marginBottom: '10px'
            }}
          >
            Product Description
          </h4>

          <div
            style={{
              color: '#555',
              lineHeight: '1.7',
              marginBottom: '35px'
            }}
            dangerouslySetInnerHTML={{
              __html:
                product.description ||
                product.short_description ||
                'No description available.'
            }}
          />

          <button
            className="add-cart"
            onClick={() => addToCart(product)}
            style={{
              width: '100%',
              maxWidth: '250px',
              padding: '15px 30px',
              background: isInCart
                ? '#891d1a'
                : '#1E1E1E',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            {isInCart
              ? '✓ Added To Cart'
              : 'Add To Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;