import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="modern-header">
      <div className="header-content">
        <div className="logo-section">
          <div className="whatsapp-logo">📱</div>
          <div className="logo-text">WhatsApp</div>
        </div>
        
        <div className="header-buttons">
          <a href="#" className="btn-header btn-login">تسجيل الدخول</a>
          <a href="#" className="btn-header btn-download">! تنزيل</a>
        </div>
      </div>
    </header>
  );
};

export default Header;