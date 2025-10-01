import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <ScrollReveal direction="scale">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-accent-orange mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-playfair">
              Siden blev ikke fundet
            </h2>
            <p className="text-gray-600 mb-8">
              Beklager, men den side du leder efter eksisterer ikke. 
              Måske er den blevet flyttet eller linket er forkert.
            </p>
          </div>

          <ScrollReveal direction="up" delay={200}>
            <div className="space-y-4">
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-accent-orange text-white font-semibold rounded-lg hover:bg-accent-orange-dark transition-colors"
              >
                <Home className="w-5 h-5 mr-2" />
                Gå til forsiden
              </Link>
          
              <div className="text-sm text-gray-500">
                <p>Eller prøv at:</p>
                <ul className="mt-2 space-y-1">
                  <li>• Tjek om URL'en er korrekt</li>
                  <li>• <Link to="/design" className="text-accent-orange hover:underline">Design dit eget tøj</Link></li>
                  <li>• <Link to="/kontakt" className="text-accent-orange hover:underline">Kontakt os</Link> hvis problemet fortsætter</li>
                </ul>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={400}>
            <div className="mt-12 p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Populære sider</h3>
              <div className="grid grid-cols-1 gap-2">
                <Link to="/design" className="text-accent-orange hover:underline">Design selv</Link>
                <Link to="/produkter" className="text-accent-orange hover:underline">Produkter</Link>
                <Link to="/om-os" className="text-accent-orange hover:underline">Om os</Link>
                <Link to="/faq" className="text-accent-orange hover:underline">FAQ</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </ScrollReveal>
    </div>
  );
};
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;