// src/App.jsx
import React, { useState } from 'react';
import TopBar from './components/Topbar.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx';

function App() {
  // Simple state to control which main page tab is active: 'home' or 'cart'
  const [activePage, setActivePage] = useState('home'); 

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* ===================== 1. PERMANENT TOP HEADER BAR ===================== */}
      {/* If we are on the 'home' page tab, your Home.jsx renders its own TopBar and Navbar internally.
          If we navigate to the 'cart' page tab, this block displays a fresh copy so you never lose navigation! */}
      {activePage !== 'home' && (
        <>
          <TopBar />
          <div onClick={() => setActivePage('home')} style={{ cursor: 'pointer' }}>
            <Navbar />
          </div>
        </>
      )}

      {/* ===================== 2. DYNAMIC MAIN CONTENT PANEL ===================== */}
      <main style={{ flexGrow: 1 }} onClick={(e) => {
        // Automatically captures clicks on your custom navbar elements inside Home.jsx
        if (e.target.innerText === 'Cart' || e.target.closest('.fa-cart-shopping')) {
          setActivePage('cart');
        }
      }}>
        {activePage === 'home' ? <Home /> : <Cart />}
      </main>

      {/* ===================== 3. LOCKED PERMANENT FOOTER ===================== */}
      {/* This component sits completely outside your page tabs, so it stays visible on ALL pages no matter what! */}
      <Footer />

    </div>
  );
}

export default App;