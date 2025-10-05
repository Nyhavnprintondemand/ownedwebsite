import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-orange to-accent-orange-light rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-2xl font-bold text-white tracking-wide">NYHAVN</span>
                <span className="text-[10px] font-bold text-accent-orange -mt-1 tracking-widest">PRINT ON DEMAND</span>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Lav dit eget statement – vi trykker det i København
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-accent-orange transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent-orange transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent-orange transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2">
              <li><Link to="/design" className="text-gray-300 hover:text-accent-orange transition-colors">{t('nav.design')}</Link></li>
              <li><Link to="/produkter" className="text-gray-300 hover:text-accent-orange transition-colors">{t('products.title')}</Link></li>
              <li><Link to="/om-os" className="text-gray-300 hover:text-accent-orange transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-accent-orange transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              <li><Link to="/handelsbetingelser" className="text-gray-300 hover:text-accent-orange transition-colors">{t('footer.terms')}</Link></li>
              <li><Link to="/privatlivspolitik" className="text-gray-300 hover:text-accent-orange transition-colors">{t('footer.privacy')}</Link></li>
              <li><Link to="/gdpr" className="text-gray-300 hover:text-accent-orange transition-colors">GDPR</Link></li>
              <li><Link to="/returret" className="text-gray-300 hover:text-accent-orange transition-colors">Returret</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('nav.contact')}</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="w-4 h-4" />
                <span>info@nyhavnpod.dk</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="w-4 h-4" />
                <span>+45 12 34 56 78</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>København, Danmark</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
          <p>&copy; 2025 Nyhavn Print-on-Demand. {t('footer.rights')}</p>
          <div className="flex justify-center space-x-6 mt-4">
            <span className="flex items-center">
              <svg className="w-8 h-5 mr-2" viewBox="0 0 32 20" fill="none">
                <rect width="32" height="20" rx="4" fill="#1565C0"/>
                <path d="M8 6h16v8H8z" fill="white"/>
                <path d="M10 8h12v4H10z" fill="#1565C0"/>
              </svg>
              Dankort
            </span>
            <span className="flex items-center">
              <svg className="w-8 h-5 mr-2" viewBox="0 0 32 20" fill="none">
                <rect width="32" height="20" rx="4" fill="#5B2C87"/>
                <circle cx="12" cy="10" r="6" fill="#FF5F00"/>
                <circle cx="20" cy="10" r="6" fill="#EB001B"/>
              </svg>
              MobilePay
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;