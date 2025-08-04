import React from 'react';
import { Link } from 'react-router-dom';
import { Edit3, Truck, Shield, Star, Check, Clock, Package, Heart } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                <span className="font-playfair">Design din egen</span><br />
                <span className="text-accent-orange">T-shirt eller hoodie</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                Hurtig levering · Ingen minimumsordre
              </p>
              <Link
                to="/design"
                className="inline-flex items-center px-8 py-4 bg-accent-orange text-white font-semibold rounded-full hover:bg-accent-orange-dark transition-all duration-300 transform hover:scale-105 hover-glow group active:scale-95"
              >
                <Edit3 className="w-5 h-5 mr-2" />
                Design selv
              </Link>
            </div>
            <div className="relative animate-fade-in-up animate-delay-200">
              <img
                src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop"
                alt="Person som designer custom t-shirt"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl hover-lift animate-float"
                loading="lazy"
              />
              <div className="absolute -top-4 -right-4 bg-accent-orange text-white px-4 py-2 rounded-full text-sm font-semibold animate-bounce-in animate-delay-500">
                Fra 199 kr
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hvorfor vælge Nyhavn Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              Hvorfor vælge Nyhavn?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Vi leverer kvalitet, hurtighed og den bedste kundeservice i Danmark
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 group hover-lift animate-fade-in-up animate-delay-100">
              <div className="w-16 h-16 bg-accent-orange rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">DTF-print teknologi</h3>
              <p className="text-gray-600">Professionel Direct-to-Film print for skarp kvalitet</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 group hover-lift animate-fade-in-up animate-delay-200">
              <div className="w-16 h-16 bg-accent-orange rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Holdbare farver</h3>
              <p className="text-gray-600">Farver der holder i mange år uden at falme</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 group hover-lift animate-fade-in-up animate-delay-300">
              <div className="w-16 h-16 bg-accent-orange rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">100+ vaske</h3>
              <p className="text-gray-600">Testet til at holde mindst 100 vaske</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 group hover-lift animate-fade-in-up animate-delay-400">
              <div className="w-16 h-16 bg-accent-orange rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Levering 2-4 hverdage</h3>
              <p className="text-gray-600">Hurtig produktion og forsendelse i Danmark</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sådan fungerer det */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              Sådan fungerer det
            </h2>
            <p className="text-xl text-gray-600">
              Fra idé til færdigt produkt på kun 3 nemme trin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center relative group animate-fade-in-up animate-delay-100">
              <div className="w-20 h-20 bg-accent-orange rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 hover-glow">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Vælg produkt</h3>
              <p className="text-gray-600">
                Vælg mellem T-shirt eller hoodie i forskellige farver og størrelser
              </p>
              {/* Animated Arrow */}
              <div className="hidden md:block absolute top-10 left-full w-32 h-0.5 z-0">
                <svg className="w-full h-full" viewBox="0 0 128 2" fill="none">
                  <path 
                    d="M0 1 L120 1 M115 -3 L120 1 L115 5" 
                    stroke="#D1D5DB" 
                    strokeWidth="2" 
                    fill="none"
                    className="animate-pulse animate-delay-200"
                  />
                </svg>
              </div>
            </div>

            <div className="text-center relative group animate-fade-in-up animate-delay-200">
              <div className="w-20 h-20 bg-accent-orange rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 hover-glow">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Design dit motiv</h3>
              <p className="text-gray-600">
                Upload dit eget design eller logo og se det live på produktet
              </p>
              {/* Animated Arrow */}
              <div className="hidden md:block absolute top-10 left-full w-32 h-0.5 z-0">
                <svg className="w-full h-full" viewBox="0 0 128 2" fill="none">
                  <path 
                    d="M0 1 L120 1 M115 -3 L120 1 L115 5" 
                    stroke="#D1D5DB" 
                    strokeWidth="2" 
                    fill="none"
                    className="animate-pulse animate-delay-400"
                  />
                </svg>
              </div>
            </div>

            <div className="text-center animate-fade-in-up animate-delay-300">
              <div className="w-20 h-20 bg-accent-orange rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 hover-glow">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Bestil og modtag</h3>
              <p className="text-gray-600">
                Betal sikkert og modtag dit custom produkt inden for 2-4 hverdage
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hvad er Print on Demand Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-playfair">
                Hvad er Print on Demand?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Print on Demand (POD) tilbyder en problemfri måde at skabe produkter af høj kvalitet og 
                sælge dem direkte til kunder. Denne metode giver dig mulighed for at tilbyde personaliserede 
                varer uden behov for at administrere lager eller forsendelseslogistik.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Med Nyhavn POD tager vi os af produktion og forsendelse af dine produkter på bestilling, 
                hvilket gør det nemt at sælge custom tøj.
              </p>
              <div className="flex items-center justify-between bg-accent-orange-light bg-opacity-10 p-4 rounded-lg hover-lift transition-all duration-300">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-accent-orange" />
                  <span className="font-semibold text-gray-900">Leveringstid:</span>
                </div>
                <span className="text-accent-orange font-bold">2-4 hverdage</span>
              </div>
            </div>
            <div className="relative animate-fade-in-up animate-delay-200">
              <img
                src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Print on demand proces"
                className="w-full h-96 object-cover rounded-2xl shadow-lg hover-lift"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-center animate-fade-in-up animate-delay-100 hover-lift">
              <Shield className="w-8 h-8 text-accent-orange mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">SSL Sikret</p>
            </div>
            <div className="text-center animate-fade-in-up animate-delay-200 hover-lift">
              <Heart className="w-8 h-8 text-accent-orange mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">14 dages returret</p>
            </div>
            <div className="text-center animate-fade-in-up animate-delay-300 hover-lift">
              <Check className="w-8 h-8 text-accent-orange mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Danske betalinger</p>
            </div>
            <div className="text-center animate-fade-in-up animate-delay-400 hover-lift">
              <Star className="w-8 h-8 text-accent-orange mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">4.8/5 stjerner</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent-orange animate-fade-in-up">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-playfair">
            Klar til at designe dit eget tøj?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Kom i gang med at skabe dit unique statement i dag
          </p>
          <Link
            to="/design"
            className="inline-flex items-center px-8 py-4 bg-white text-accent-orange font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 active:scale-95 hover-glow"
          >
            <Edit3 className="w-5 h-5 mr-2" />
            Start designet nu
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;