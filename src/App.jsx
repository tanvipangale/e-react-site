import React from 'react';
import { Outlet } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import Footer from './components/common/Footer.jsx';
import Header from './components/common/Header.jsx';

function App() {
  return (
    <PayPalScriptProvider
      options={{
        clientId: 'BAAwbk3LHEbnI0IbxawktwCSrn-oeidWZFXYUtz18dEOdxGBdvCs95M5oQUbbQeeFnmni1jBg1IntSaL4g',
        currency: 'INR',
        intent: 'capture'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        <Header />

        <main style={{ flexGrow: 1 }}>
          <Outlet />
        </main>

        <Footer />
      </div>
    </PayPalScriptProvider>
  );
}

export default App;