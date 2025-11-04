import React from 'react';

const Splash: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`site-splash ${className}`} role="status" aria-label="Loading">
      <div className="site-splash__center">
        <div className="site-splash__logo">namakurametro</div>
        <div className="site-splash__dots" aria-hidden>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Splash;
