import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './common/Header.jsx'; 
import Footer from './common/Footer.jsx';        

function MainLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      <Header />

      <main style={{ flexGrow: 1 }}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;