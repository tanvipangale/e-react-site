import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './common/Header.jsx'; 
import Footer from './common/Footer.jsx';        

function MainLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Global Header on every page */}
      <Header />

      {/* Main content wrapper containing page views */}
      <main style={{ flexGrow: 1 }}>
        <Outlet />
      </main>

      {/* Global Footer on every page */}
      <Footer />
    </div>
  );
}

export default MainLayout;