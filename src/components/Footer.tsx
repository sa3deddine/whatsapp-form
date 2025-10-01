import React from 'react';
import { Twitter, Youtube, Instagram, Facebook, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'من نحن',
      links: ['نبذة عنا', 'الوظائف', 'مركز العلامة التجارية', 'الخصوصية']
    },
    {
      title: 'استخدام واتساب',
      links: ['أجهزة Android', 'أجهزة iPhone', 'كمبيوتر Mac/كمبيوتر شخصي', 'واتساب ويب']
    },
    {
      title: 'هل تحتاج إلى المساعدة؟',
      links: ['الاتصال بنا', 'مركز المساعدة', 'التطبيقات', 'استشارات أمنية']
    },
    {
      title: 'موقعنا',
      links: ['الإحصائيات', 'المدونة', 'الحماية', 'للأنشطة التجارية']
    }
  ];

  const socialIcons = [
    { Icon: Twitter, href: '#', color: 'hover:text-sky-500' },
    { Icon: Youtube, href: '#', color: 'hover:text-red-500' },
    { Icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { Icon: Facebook, href: '#', color: 'hover:text-blue-600' }
  ];

  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                الشروط والخصوصية © WhatsApp LLC. 2025
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-gray-400" />
                <select className="bg-transparent text-gray-400 text-sm border border-gray-600 rounded px-3 py-1 focus:outline-none focus:border-blue-500">
                  <option value="ar">العربية</option>
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                </select>
              </div>

              <div className="flex space-x-4">
                {socialIcons.map(({ Icon, href, color }, index) => (
                  <a 
                    key={index}
                    href={href}
                    className={`text-gray-400 ${color} transition-colors duration-200`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;