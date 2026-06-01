import React from 'react';
import './SplashScreen.css';

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <div className="bicycle-container">
        <svg width="200" height="150" viewBox="0 0 200 150" className="bicycle">
          {/* Frame */}
          <path d="M50 100 L100 50 L150 100 L100 100 Z" fill="none" stroke="#333" strokeWidth="3"/>
          {/* Seat */}
          <rect x="95" y="45" width="10" height="5" fill="#333"/>
          {/* Handlebars */}
          <line x1="100" y1="50" x2="110" y2="40" stroke="#333" strokeWidth="3"/>
          {/* Wheels */}
          <circle cx="60" cy="110" r="20" fill="none" stroke="#ff0000" strokeWidth="4" className="wheel front-wheel"/>
          <circle cx="140" cy="110" r="20" fill="none" stroke="#00ff00" strokeWidth="4" className="wheel back-wheel"/>
          {/* Spokes */}
          <line x1="60" y1="90" x2="60" y2="130" stroke="#333" strokeWidth="1"/>
          <line x1="40" y1="110" x2="80" y2="110" stroke="#333" strokeWidth="1"/>
          <line x1="140" y1="90" x2="140" y2="130" stroke="#333" strokeWidth="1"/>
          <line x1="120" y1="110" x2="160" y2="110" stroke="#333" strokeWidth="1"/>
          {/* Pedals */}
          <circle cx="100" cy="100" r="3" fill="#333"/>
        </svg>
      </div>
      <div className="logo-container">
        <img src="/logo.png" alt="Pidify Logo" className="logo" />
        <h1 className="app-name">Pidify</h1>
      </div>
    </div>
  );
};

export default SplashScreen;