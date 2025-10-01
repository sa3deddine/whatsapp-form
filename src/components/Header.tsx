import React from 'react';
import { MessageCircle, Menu } from 'lucide-react';

const Header: React.FC = () => {
  const navItems = [
    'الإحصائيات',
    'الأنشطة التجارية', 
    'المدونة',
    'مركز المساعدة',
    'الخصوصية'
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo et actions */}
          <div className="flex items-center space-x-4">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
              تنزيل !
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-full font-medium hover:bg-gray-50 transition-colors duration-200">
              تسجيل الدخول
            </button>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a 
                key={index}
                href="#" 
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm font-medium"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Brand */}
          <div className="flex items-center space-x-3">
            <img 
              src="/image.png" 
              alt="WhatsApp" 
              className="h-12 w-auto"
            />
          </div>

          {/* Mobile menu */}
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;