import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard as Edit3, Truck, Shield, Star, Check, Clock, Package, Heart } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../context/LanguageContext';

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-accent-orange opacity-5 rounded-full blur-xl float-element parallax-element"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-accent-orange-light opacity-10 rounded-full blur-lg float-element parallax-element"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-r from-accent-orange to-accent-orange-light opacity-5 rounded-full blur-2xl float-element parallax-element"></div>
          <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-accent-orange opacity-3 rounded-full blur-xl float-element parallax-element"></div>
          <div className="absolute bottom-1/3 right-10 w-16 h-16 bg-accent-orange-light opacity-8 rounded-full blur-lg float-element parallax-element"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <ScrollReveal direction="up" delay={100} duration={1000}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  <span className="font-playfair text-gray-900 block">{t('hero.title.line1')}</span>
                  <span className="gradient-text block">{t('hero.title.line2')}</span>
                </h1>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={300} duration={800}>
                <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                  {t('hero.subtitle')}
                </p>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={500} duration={800}>
                <Link
                  to="/design"
                  className="btn-primary btn-magnetic hover-glow-intense inline-flex items-center px-8 py-4 text-white font-semibold rounded-full group active:scale-95"
                >
                  <Edit3 className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  {t('hero.cta')}
                  <div className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                    →
                  </div>
                </Link>
              </ScrollReveal>
            </div>
            <ScrollReveal direction="left" delay={200} duration={1000}>
              <div className="relative">
                <div className="image-hover-zoom">
                  <img
                    src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop"
                    alt="Person som designer custom t-shirt"
                    className="w-full max-w-md mx-auto rounded-2xl shadow-2xl hover-tilt animate-float"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-accent-orange to-accent-orange-light text-white px-4 py-2 rounded-full text-sm font-semibold animate-bounce-in animate-pulse-glow hover-glow-intense">
                  {t('hero.price')}
                </div>
                {/* Enhanced decorative elements */}
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent-orange-light opacity-20 rounded-full blur-lg animate-bounce-gentle"></div>
                <div className="absolute top-1/2 -right-8 w-8 h-8 bg-accent-orange opacity-30 rounded-full animate-pulse-soft"></div>
                <div className="absolute -top-8 left-1/4 w-12 h-12 bg-gradient-to-r from-accent-orange to-accent-orange-light opacity-15 rounded-full blur-md animate-float"></div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Hvorfor vælge Nyhavn Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" delay={100} duration={800}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
                <span className="gradient-text">{t('home.whyChoose')}</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t('home.whyChoose.subtitle')}
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-accent-orange to-accent-orange-light mx-auto mt-6 rounded-full"></div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-hover">
            <ScrollReveal direction="up" delay={200} duration={600}>
              <div className="premium-card hover-lift-intense text-center p-6 rounded-xl group">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-orange to-accent-orange-light rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-pulse-glow">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-accent-orange transition-colors duration-300">{t('home.feature1.title')}</h3>
                <p className="text-gray-600">{t('home.feature1.desc')}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300} duration={600}>
              <div className="premium-card hover-lift-intense text-center p-6 rounded-xl group">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-orange to-accent-orange-light rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-pulse-glow">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-accent-orange transition-colors duration-300">{t('home.feature2.title')}</h3>
                <p className="text-gray-600">{t('home.feature2.desc')}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={400} duration={600}>
              <div className="premium-card hover-lift-intense text-center p-6 rounded-xl group">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-orange to-accent-orange-light rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-pulse-glow">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-accent-orange transition-colors duration-300">{t('home.feature3.title')}</h3>
                <p className="text-gray-600">{t('home.feature3.desc')}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={500} duration={600}>
              <div className="premium-card hover-lift-intense text-center p-6 rounded-xl group">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-orange to-accent-orange-light rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-pulse-glow">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-accent-orange transition-colors duration-300">{t('home.feature4.title')}</h3>
                <p className="text-gray-600">{t('home.feature4.desc')}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Sådan fungerer det */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #FF6600 2px, transparent 2px), radial-gradient(circle at 75% 75%, #FF6600 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" delay={100} duration={800}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
                <span className="gradient-text">{t('home.howItWorks')}</span>
              </h2>
              <p className="text-xl text-gray-600">
                {t('home.howItWorks.subtitle')}
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-accent-orange to-accent-orange-light mx-auto mt-6 rounded-full"></div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal direction="up" delay={200} duration={700}>
              <div className="text-center relative group hover-tilt hover-lift-intense">
                <div className="w-20 h-20 bg-gradient-to-br from-accent-orange to-accent-orange-light rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-pulse-glow hover-glow-intense">
                  <span className="text-white text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-accent-orange transition-colors duration-300">{t('home.step1.number')}</h3>
                <p className="text-gray-600">
                  {t('home.step1.number.desc')}
                </p>
                {/* Enhanced Animated Arrow */}
                <div className="hidden md:block absolute top-10 left-full w-32 h-0.5 z-0">
                  <svg className="w-full h-full" viewBox="0 0 128 2" fill="none">
                    <path 
                      d="M0 1 L120 1 M115 -3 L120 1 L115 5" 
                      stroke="#FF6600" 
                      strokeOpacity="0.3"
                      strokeWidth="2" 
                      fill="none"
                      className="animate-pulse animate-delay-200 group-hover:stroke-opacity-100 transition-all duration-300"
                    />
                  </svg>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={400} duration={700}>
              <div className="text-center relative group hover-tilt hover-lift-intense">
                <div className="w-20 h-20 bg-gradient-to-br from-accent-orange to-accent-orange-light rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-pulse-glow hover-glow-intense">
                  <span className="text-white text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-accent-orange transition-colors duration-300">{t('home.step2.number')}</h3>
                <p className="text-gray-600">
                  {t('home.step2.number.desc')}
                </p>
                {/* Enhanced Animated Arrow */}
                <div className="hidden md:block absolute top-10 left-full w-32 h-0.5 z-0">
                  <svg className="w-full h-full" viewBox="0 0 128 2" fill="none">
                    <path 
                      d="M0 1 L120 1 M115 -3 L120 1 L115 5" 
                      stroke="#FF6600" 
                      strokeOpacity="0.3"
                      strokeWidth="2" 
                      fill="none"
                      className="animate-pulse animate-delay-400 group-hover:stroke-opacity-100 transition-all duration-300"
                    />
                  </svg>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={600} duration={700}>
              <div className="text-center group hover-tilt hover-lift-intense">
                <div className="w-20 h-20 bg-gradient-to-br from-accent-orange to-accent-orange-light rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-pulse-glow hover-glow-intense">
                  <span className="text-white text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-accent-orange transition-colors duration-300">{t('home.step3.number')}</h3>
                <p className="text-gray-600">
                  {t('home.step3.number.desc')}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Hvad er Print on Demand Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="right" delay={100} duration={800}>
              <div className="hover-lift-intense">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
                  <span className="gradient-text">{t('home.whatIsPOD')}</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {t('home.whatIsPOD.p1')}
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  {t('home.whatIsPOD.p2')}
                </p>
                <div className="glass-morphism p-6 rounded-xl hover-lift transition-all duration-300 border border-accent-orange border-opacity-20 hover-glow-intense">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-accent-orange animate-pulse-soft" />
                    <span className="font-semibold text-gray-900">{t('home.deliveryTime')}</span>
                  </div>
                  <span className="gradient-text font-bold text-lg">{t('home.deliveryDays')}</span>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={300} duration={800}>
              <div className="relative hover-tilt hover-lift-intense">
                <div className="image-hover-zoom">
                  <img
                    src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                    alt="Print on demand proces"
                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                    loading="lazy"
                  />
                </div>
                {/* Enhanced decorative overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-orange via-transparent to-accent-orange-light opacity-10 rounded-2xl"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-accent-orange opacity-20 rounded-full blur-lg animate-float"></div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-accent-orange-light opacity-30 rounded-full blur-md animate-bounce-gentle"></div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center stagger-hover">
            <ScrollReveal direction="scale" delay={100} duration={500}>
              <div className="text-center hover-lift-intense group">
                <Shield className="w-8 h-8 text-accent-orange mx-auto mb-2 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 hover-glow-intense" />
                <p className="text-sm font-medium text-gray-900 group-hover:text-accent-orange transition-colors duration-300">{t('home.trust1')}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="scale" delay={200} duration={500}>
              <div className="text-center hover-lift-intense group">
                <Heart className="w-8 h-8 text-accent-orange mx-auto mb-2 group-hover:scale-110 animate-heartbeat transition-all duration-300 hover-glow-intense" />
                <p className="text-sm font-medium text-gray-900 group-hover:text-accent-orange transition-colors duration-300">{t('home.trust2')}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="scale" delay={300} duration={500}>
              <div className="text-center hover-lift-intense group">
                <Check className="w-8 h-8 text-accent-orange mx-auto mb-2 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 hover-glow-intense" />
                <p className="text-sm font-medium text-gray-900 group-hover:text-accent-orange transition-colors duration-300">{t('home.trust3')}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="scale" delay={400} duration={500}>
              <div className="text-center hover-lift-intense group">
                <Star className="w-8 h-8 text-accent-orange mx-auto mb-2 group-hover:scale-110 animate-pulse-soft transition-all duration-300 hover-glow-intense" />
                <p className="text-sm font-medium text-gray-900 group-hover:text-accent-orange transition-colors duration-300">{t('home.trust4')}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <ScrollReveal direction="up" delay={100} duration={800}>
        <section className="py-20 bg-gradient-to-br from-accent-orange via-accent-orange-light to-accent-orange relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full blur-xl animate-float parallax-element"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-white opacity-5 rounded-full blur-lg animate-bounce-gentle parallax-element"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white opacity-5 rounded-full animate-pulse-soft parallax-element"></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-playfair">
              {t('home.cta.title')}
            </h2>
            <p className="text-xl text-white opacity-90 mb-8">
              {t('home.cta.subtitle')}
            </p>
            <Link
              to="/design"
              className="btn-primary btn-magnetic hover-glow-intense inline-flex items-center px-8 py-4 text-white font-semibold rounded-full group active:scale-95"
            >
              <Edit3 className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              {t('home.cta.button')}
              <div className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                →
              </div>
            </Link>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
};

export default HomePage;