import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Languages } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { getItemCount, setIsCartOpen } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const itemCount = getItemCount();

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.design'), href: '/design' },
    { name: t('nav.about'), href: '/om-os' },
    { name: t('nav.contact'), href: '/kontakt' }
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'da' ? 'en' : 'da');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-accent-orange to-accent-orange-light rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-pulse-glow">
              <span className="text-white font-bold text-sm">Z</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-2xl font-bold text-gray-900 tracking-wide group-hover:text-accent-orange transition-colors duration-300">ZM PREMIUM</span>
              <span className="text-[10px] font-bold gradient-text -mt-1 tracking-[0.32em]">PRINT ON DEMAND</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 relative group ${
                  location.pathname === item.href
                    ? 'gradient-text'
                    : 'text-gray-700 hover:text-accent-orange'
                }`}
              >
                {item.name}
                {location.pathname === item.href && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-orange to-accent-orange-light rounded-full"></div>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-orange to-accent-orange-light rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              className="hidden md:flex group relative p-2 text-gray-700 hover:text-accent-orange transition-all duration-300 hover:scale-110 active:scale-95"
              title={language === 'da' ? 'Switch to English' : 'Skift til Dansk'}
            >
              <div className="relative flex items-center gap-1">
                <Languages className="w-5 h-5" />
                <span className="text-xs font-bold">
                  {language === 'da' ? 'DA' : 'EN'}
                </span>
              </div>
            </button>

            <button className="hidden md:block p-2 text-gray-700 hover:text-accent-orange transition-all duration-300 hover:scale-110 hover:rotate-12 active:scale-95">
              <User className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-gray-700 hover:text-accent-orange transition-all duration-300 relative hover:scale-110 hover:rotate-12 active:scale-95 group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:animate-bounce-gentle" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-accent-orange to-accent-orange-light text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce-in animate-pulse-glow">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-accent-orange transition-all duration-300 hover:scale-110 hover:rotate-12 active:scale-95"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fade-in-up bg-gradient-to-r from-gray-50 to-white">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium transition-all duration-300 hover:scale-105 hover:translate-x-2 ${
                  location.pathname === item.href
                    ? 'gradient-text'
                    : 'text-gray-700 hover:text-accent-orange'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Language Switch */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-accent-orange transition-all duration-300 hover:scale-105 hover:translate-x-2"
            >
              <Languages className="w-5 h-5" />
              <span>{language === 'da' ? 'Switch to English' : 'Skift til Dansk'}</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;