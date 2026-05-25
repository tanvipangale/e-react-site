import React from 'react';
import { Outlet } from 'react-router-dom';

import TopBar from './components/Topbar.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/common/Footer.jsx';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >

      <TopBar />
      <Navbar />

      <main style={{ flexGrow: 1 }}>
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}

export default App;