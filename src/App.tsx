import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DesignPage from './pages/DesignPage';
import CheckoutPage from './pages/CheckoutPage';
import NotFoundPage from './pages/NotFoundPage';
import CookieConsent from './components/CookieConsent';
import NewsletterPopup from './components/NewsletterPopup';
import MiniCart from './components/MiniCart';
import { CartProvider } from './context/CartContext';
import './index.css';

// Component to handle scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Parallax scroll effect
const ParallaxEffect: React.FC = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-element');
      
      parallaxElements.forEach((element) => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
};
function App() {
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);

  useEffect(() => {
    // Show newsletter popup after 30 seconds if not shown before
    const timer = setTimeout(() => {
      const hasShownPopup = localStorage.getItem('newsletter-popup-shown');
      if (!hasShownPopup) {
        setShowNewsletterPopup(true);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <ScrollToTop />
          <ParallaxEffect />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/om-os" element={<AboutPage />} />
              <Route path="/kontakt" element={<ContactPage />} />
              <Route path="/design" element={<DesignPage />} />
              <Route path="/kassen" element={<CheckoutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
          <CookieConsent />
          <MiniCart />
          {showNewsletterPopup && (
            <NewsletterPopup onClose={() => setShowNewsletterPopup(false)} />
          )}
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;