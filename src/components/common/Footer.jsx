import React from 'react';

function Footer() {
  return (
    <footer style={{
      background: '#1E1E1E',
      color: '#F9F6F0',
      padding: '40px 5%',
      marginTop: 'auto', 
      borderTop: '1px solid #E5DFD5'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '30px'
      }}>
        <div>
          <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '15px' }}>Exclusive</h3>
          <p style={{ color: '#7d7d7d', fontSize: '14px' }}>Subscribe to get 10% off your first order.</p>
        </div>
        <div>
          <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px' }}>Support</h4>
          <p style={{ color: '#7d7d7d', fontSize: '14px', lineHeight: '1.8' }}>
            111 Mumbai, India.<br />
            exclusive@support.com
          </p>
        </div>
        <div>
          <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px' }}>Account</h4>
          <p style={{ color: '#7d7d7d', fontSize: '14px', lineHeight: '1.8' }}>My Account / Login / Cart / Wishlist</p>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid rgba(249, 246, 240, 0.1)', color: '#7d7d7d', fontSize: '12px' }}>
        &copy; Copyright Exclusive 2026. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;