import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { getItemCount, setIsCartOpen } = useCart();
  const location = useLocation();
  const itemCount = getItemCount();

  const navigation = [
    { name: 'Forside', href: '/' },
    { name: 'Design selv', href: '/design' },
    { name: 'Om os', href: '/om-os' },
    { name: 'Kontakt', href: '/kontakt' }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-opacity-95 transition-all duration-300 hover:shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group hover-lift">
            <div className="w-8 h-8 bg-gradient-to-br from-accent-orange to-accent-orange-light rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-pulse-glow hover-glow-intense">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-2xl font-bold text-gray-900 tracking-wide group-hover:text-accent-orange transition-colors duration-300">NYHAVN</span>
              <span className="text-[10px] font-bold gradient-text -mt-1 tracking-widest">PRINT ON DEMAND</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 stagger-hover">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 hover-lift relative group ${
                  location.pathname === item.href
                    ? 'text-accent-orange'
                    : 'text-gray-700 hover:text-accent-orange'
                }`}
              >
                {item.name}
                {location.pathname === item.href && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-orange to-accent-orange-light rounded-full animate-pulse-glow"></div>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-orange to-accent-orange-light rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left hover-glow-intense"></div>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-700 hover:text-accent-orange transition-all duration-300 hover:scale-110 hover:rotate-12 active:scale-95 hover-glow-intense">
              <User className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-gray-700 hover:text-accent-orange transition-all duration-300 relative hover:scale-110 hover:rotate-12 active:scale-95 group hover-glow-intense"
            >
              <ShoppingCart className="w-5 h-5 group-hover:animate-bounce-gentle" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-accent-orange to-accent-orange-light text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce-in animate-pulse-glow hover-glow-intense">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-accent-orange transition-all duration-300 hover:scale-110 hover:rotate-12 active:scale-95 hover-glow-intense"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fade-in-up bg-gradient-to-r from-gray-50 to-white glass-morphism">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium transition-all duration-300 hover:scale-105 hover:translate-x-2 hover-lift ${
                  location.pathname === item.href
                    ? 'gradient-text'
                    : 'text-gray-700 hover:text-accent-orange'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;