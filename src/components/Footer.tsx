import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="modern-footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>من نحن</h3>
            <ul className="footer-links">
              <li><a href="#">نبذة عنا</a></li>
              <li><a href="#">الوظائف</a></li>
              <li><a href="#">مركز العلامة التجارية</a></li>
              <li><a href="#">الخصوصية</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>استخدام واتساب</h3>
            <ul className="footer-links">
              <li><a href="#">أجهزة Android</a></li>
              <li><a href="#">أجهزة iPhone</a></li>
              <li><a href="#">كمبيوتر شخصي / Mac كمبيوتر</a></li>
              <li><a href="#">واتساب ويب</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>المساعدة</h3>
            <ul className="footer-links">
              <li><a href="#">مركز المساعدة</a></li>
              <li><a href="#">اتصل بنا</a></li>
              <li><a href="#">الأمان</a></li>
              <li><a href="#">الشروط والأحكام</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>هل تحتاج إلى المساعدة؟</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
            © 2024 WhatsApp. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;