import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="site-footer bg-black/60">
      <div className="container">
        <div className="mb-4">
          <p className="text-sm">なまくらメトロ — 非Official site</p>
        </div>
        <div className="mb-4">
          <a href="#" className="text-sm text-white/70 mr-4">Privacy</a>
          <a href="#" className="text-sm text-white/70">Cookie</a>
        </div>
        <div className="text-xs text-white/60">© {new Date().getFullYear()} なまくらメトロ</div>
      </div>
    </footer>
  );
};

export default Footer;
