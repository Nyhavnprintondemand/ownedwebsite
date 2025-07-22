import React, { useState, useEffect } from 'react';
import { X, Cookie, Settings } from 'lucide-react';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', 'all');
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem('cookie-consent', 'necessary');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Cookie className="w-6 h-6 text-accent-orange mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Vi bruger cookies på vores hjemmeside
              </h3>
              <p className="text-gray-600 mb-4">
                Vi bruger nødvendige cookies til at sikre, at vores hjemmeside fungerer korrekt, 
                og analyse-cookies til at forbedre din oplevelse. Du kan altid ændre dine præferencer senere.
              </p>
              
              {showDetails && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Cookie kategorier:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li><strong>Nødvendige:</strong> Kræves for grundlæggende hjemmesidefunktionalitet</li>
                    <li><strong>Analyse:</strong> Hjælper os med at forstå, hvordan du bruger vores hjemmeside</li>
                    <li><strong>Marketing:</strong> Bruges til at vise relevante annoncer og måle effektivitet</li>
                  </ul>
                </div>
              )}
              
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2 bg-accent-orange text-white font-semibold rounded-lg hover:bg-accent-orange-dark transition-colors"
                >
                  Accepter alle
                </button>
                <button
                  onClick={handleAcceptNecessary}
                  className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Kun nødvendige
                </button>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="px-4 py-2 text-accent-orange font-semibold hover:underline"
                >
                  <Settings className="w-4 h-4 inline mr-1" />
                  {showDetails ? 'Skjul detaljer' : 'Vis detaljer'}
                </button>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleReject}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;