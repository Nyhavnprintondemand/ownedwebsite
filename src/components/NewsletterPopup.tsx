import React, { useState } from 'react';
import { X, Mail, Gift } from 'lucide-react';

interface NewsletterPopupProps {
  onClose: () => void;
}

const NewsletterPopup: React.FC<NewsletterPopupProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    setIsSubmitted(true);
    localStorage.setItem('newsletter-popup-shown', 'true');
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleClose = () => {
    localStorage.setItem('newsletter-popup-shown', 'true');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 animate-fade-in backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden animate-scale-in hover-lift">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent-orange to-accent-orange-light opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-orange opacity-5 rounded-full blur-xl"></div>
        
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-accent-orange transition-all duration-300 z-10 hover:scale-110 hover:rotate-90 active:scale-95"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div className="p-8 animate-fade-in-up relative z-10">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-orange to-accent-orange-light rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-in animate-pulse-glow">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2 font-playfair">
                <span className="gradient-text">Få 10% rabat!</span>
              </h2>
              <p className="text-gray-600">
                Tilmeld dig vores nyhedsbrev og få en eksklusiv rabatkode til din første bestilling
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-accent-orange to-accent-orange-light mx-auto mt-4 rounded-full"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email adresse
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-accent-orange transition-colors duration-300" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="din@email.dk"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent transition-all duration-300 hover:border-accent-orange"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary magnetic-btn w-full text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 group"
              >
                Få min rabatkode
                <div className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 inline-block">
                  →
                </div>
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              Vi sender kun relevante nyheder og tilbud. Du kan framelde dig når som helst.
            </p>
          </div>
        ) : (
          <div className="p-8 text-center animate-fade-in-up relative z-10">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-in animate-pulse-glow">
              <Gift className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2 font-playfair">
              <span className="gradient-text">
              Tak for tilmeldingen!
              </span>
            </h2>
            <p className="text-gray-600 mb-4">
              Du vil modtage din rabatkode på email inden for få minutter.
            </p>
            <div className="glass-morphism rounded-lg p-4 hover-lift border border-accent-orange border-opacity-20">
              <p className="gradient-text font-bold text-lg">
                Rabatkode: VELKOMMEN10
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Gælder på din første bestilling
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterPopup;