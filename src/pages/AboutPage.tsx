import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { MapPin, Users, Award, Heart, Clock, Shield, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const AboutPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
              {t('about.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('about.subtitle')}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-orange to-accent-orange-light mx-auto mt-6 rounded-full"></div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Company Story */}
          <ScrollReveal direction="left" delay={100}>
            <div className="premium-card rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 font-playfair">
                <span className="gradient-text">{t('about.story')}</span>
              </h2>
              <p className="text-gray-600 mb-4">
                {t('about.story.p1')}
              </p>
              <p className="text-gray-600 mb-4">
                {t('about.story.p2')}
              </p>
              <p className="text-gray-600">
                {t('about.story.p3')}
              </p>
            </div>
          </ScrollReveal>

          {/* Location & Contact Info */}
          <ScrollReveal direction="right" delay={200}>
            <div className="premium-card rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 font-playfair">
                <span className="gradient-text">{t('about.findUs')}</span>
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-accent-orange mt-1 animate-bounce-gentle" />
                  <div>
                    <p className="font-semibold text-gray-900">{t('about.address')}</p>
                    <p className="text-gray-600">{t('about.address.text')}</p>
                  </div>
                </div>
              
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-accent-orange mt-1 animate-pulse-soft" />
                  <div>
                    <p className="font-semibold text-gray-900">{t('about.hours')}</p>
                    <p className="text-gray-600" style={{whiteSpace: 'pre-line'}}>
                      {t('about.hours.text')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 glass-morphism rounded-lg hover-lift transition-all duration-300 border border-accent-orange border-opacity-20">
                <p className="text-sm text-gray-600">
                  <strong>{t('about.note')}</strong> {t('about.note.text')}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Values Section */}
        <ScrollReveal direction="up" delay={300}>
          <div className="premium-card rounded-2xl p-8 mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center font-playfair">
              <span className="gradient-text">{t('about.values')}</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-orange to-accent-orange-light mx-auto mb-8 rounded-full"></div>
          
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollReveal direction="up" delay={400}>
                <div className="text-center group hover-tilt">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-orange to-accent-orange-light rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-pulse-glow">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-accent-orange transition-colors duration-300">{t('about.value1.title')}</h3>
                  <p className="text-gray-600">
                    {t('about.value1.desc')}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={500}>
                <div className="text-center group hover-tilt">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-orange to-accent-orange-light rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-pulse-glow">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-accent-orange transition-colors duration-300">{t('about.value2.title')}</h3>
                  <p className="text-gray-600">
                    {t('about.value2.desc')}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={600}>
                <div className="text-center group hover-tilt">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-orange to-accent-orange-light rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-pulse-glow">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-accent-orange transition-colors duration-300">{t('about.value3.title')}</h3>
                  <p className="text-gray-600">
                    {t('about.value3.desc')}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </ScrollReveal>

        {/* Team Section */}
        <ScrollReveal direction="up" delay={700}>
          <div className="premium-card rounded-2xl p-8 mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center font-playfair">
              <span className="gradient-text">{t('about.team')}</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-orange to-accent-orange-light mx-auto mb-8 rounded-full"></div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ScrollReveal direction="up" delay={800}>
                <div className="text-center group hover-tilt">
                  <div className="w-24 h-24 bg-gradient-to-br from-accent-orange to-accent-orange-light rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-pulse-glow">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-accent-orange transition-colors duration-300">{t('about.team1.title')}</h3>
                  <p className="text-gray-600">
                    {t('about.team1.desc')}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={900}>
                <div className="text-center group hover-tilt">
                  <div className="w-24 h-24 bg-gradient-to-br from-accent-orange to-accent-orange-light rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-pulse-glow">
                    <Award className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-accent-orange transition-colors duration-300">{t('about.team2.title')}</h3>
                  <p className="text-gray-600">
                    {t('about.team2.desc')}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={1000}>
                <div className="text-center group hover-tilt">
                  <div className="w-24 h-24 bg-gradient-to-br from-accent-orange to-accent-orange-light rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-pulse-glow">
                    <Heart className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-accent-orange transition-colors duration-300">{t('about.team3.title')}</h3>
                  <p className="text-gray-600">
                    {t('about.team3.desc')}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </ScrollReveal>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <ScrollReveal direction="scale" delay={500}>
            <div className="text-center hover-lift group">
              <div className="text-3xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">{t('about.stat1')}</div>
              <p className="text-gray-600">{t('about.stat1.desc')}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="scale" delay={600}>
            <div className="text-center hover-lift group">
              <div className="text-3xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">{t('about.stat2')}</div>
              <p className="text-gray-600">{t('about.stat2.desc')}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="scale" delay={700}>
            <div className="text-center hover-lift group">
              <div className="text-3xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">{t('about.stat3')}</div>
              <p className="text-gray-600">{t('about.stat3.desc')}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="scale" delay={800}>
            <div className="text-center hover-lift group">
              <div className="text-3xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">{t('about.stat4')}</div>
              <p className="text-gray-600">{t('about.stat4.desc')}</p>
            </div>
          </ScrollReveal>
        </div>

        {/* CTA Section */}
        <ScrollReveal direction="up" delay={900}>
          <div className="bg-gradient-to-br from-accent-orange via-accent-orange-light to-accent-orange rounded-2xl p-8 text-center text-white hover-lift relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-4 right-4 w-16 h-16 bg-white opacity-10 rounded-full blur-lg animate-float"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 bg-white opacity-5 rounded-full animate-bounce-gentle"></div>
          
            <h2 className="text-2xl font-bold mb-4 font-playfair relative z-10">
              {t('about.cta.title')}
            </h2>
            <p className="text-xl opacity-90 mb-6 relative z-10">
              {t('about.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <a
                href="/design"
                className="magnetic-btn inline-flex items-center px-6 py-3 bg-white text-accent-orange font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 active:scale-95 group"
              >
                {t('nav.design')}
                <div className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                  →
                </div>
              </a>
              <a
                href="/kontakt"
                className="magnetic-btn inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-accent-orange transition-all duration-300 transform hover:scale-105 active:scale-95 group"
              >
                {t('nav.contact')}
                <div className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                  →
                </div>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default AboutPage;