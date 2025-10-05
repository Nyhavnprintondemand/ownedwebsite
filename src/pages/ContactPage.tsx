import React, { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Get Supabase URL from environment
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      
      if (!supabaseUrl) {
        throw new Error('Supabase configuration not found. Please connect to Supabase first.');
      }

      console.log('Submitting contact form:', formData);

      // Submit form to Edge Function
      const response = await fetch(`${supabaseUrl}/functions/v1/submit-contact-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      console.log('Contact form submitted successfully:', result);

      // Success - show confirmation and reset form
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Hide success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <ScrollReveal direction="up">
          <div className="text-center mb-16 relative">
            {/* Floating background elements */}
            <div className="absolute top-10 left-10 w-24 h-24 bg-accent-orange opacity-5 rounded-full blur-xl float-element"></div>
            <div className="absolute top-20 right-20 w-16 h-16 bg-accent-orange-light opacity-10 rounded-full blur-lg float-element"></div>
          
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-playfair">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-orange to-accent-orange-light mx-auto mt-6 rounded-full"></div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <ScrollReveal direction="left" delay={100}>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8 font-playfair">
                <span className="gradient-text">{t('contact.title')}</span>
              </h2>
            
              <div className="space-y-6 mb-8">
                <ScrollReveal direction="up" delay={200}>
                  <div className="flex items-start space-x-4 p-4 premium-card rounded-xl hover-lift group">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent-orange to-accent-orange-light rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-pulse-glow">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-accent-orange transition-colors duration-300">Telefon</h3>
                      <p className="text-gray-600">+45 53 69 07 86</p>
                      <p className="text-sm text-gray-500">Mandag - Fredag: 9:00 - 17:00</p>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={300}>
                  <div className="flex items-start space-x-4 p-4 premium-card rounded-xl hover-lift group">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent-orange to-accent-orange-light rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-pulse-glow">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-accent-orange transition-colors duration-300">Email</h3>
                      <p className="text-gray-600">nyhavnprintondemand@gmail.com</p>
                      <p className="text-sm text-gray-500">Vi svarer inden for 24 timer</p>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={400}>
                  <div className="flex items-start space-x-4 p-4 premium-card rounded-xl hover-lift group">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent-orange to-accent-orange-light rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-pulse-glow">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-accent-orange transition-colors duration-300">Adresse</h3>
                      <p className="text-gray-600">Nyhavn 44<br />1051 København</p>
                      <p className="text-sm text-gray-500">Besøg efter aftale</p>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={500}>
                  <div className="flex items-start space-x-4 p-4 premium-card rounded-xl hover-lift group">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent-orange to-accent-orange-light rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-pulse-glow">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-accent-orange transition-colors duration-300">Åbningstider</h3>
                      <p className="text-gray-600">
                        Mandag - Fredag: 9:00 - 17:00<br />
                        Weekend: Lukket
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* FAQ Section */}
              <ScrollReveal direction="up" delay={600}>
                <div className="premium-card rounded-xl p-6 hover-lift">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center group">
                    <HelpCircle className="w-5 h-5 text-accent-orange mr-2 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                    Ofte stillede spørgsmål
                  </h3>
                  <div className="space-y-3">
                    <details className="group cursor-pointer">
                      <summary className="cursor-pointer text-gray-700 hover:text-accent-orange transition-colors">
                        Hvor lang tid tager levering?
                      </summary>
                      <p className="mt-2 text-sm text-gray-600 pl-4">
                        Vi leverer normalt inden for 2-4 hverdage i Danmark.
                      </p>
                    </details>
                    <details className="group cursor-pointer">
                      <summary className="cursor-pointer text-gray-700 hover:text-accent-orange transition-colors">
                        Hvilke filformater accepterer I?
                      </summary>
                      <p className="mt-2 text-sm text-gray-600 pl-4">
                        Vi accepterer PNG, JPG og SVG filer. For bedste kvalitet anbefaler vi høj opløsning.
                      </p>
                    </details>
                    <details className="group cursor-pointer">
                      <summary className="cursor-pointer text-gray-700 hover:text-accent-orange transition-colors">
                        Kan jeg returnere mit produkt?
                      </summary>
                      <p className="mt-2 text-sm text-gray-600 pl-4">
                        Ja, vi tilbyder 14 dages returret på alle produkter.
                      </p>
                    </details>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal direction="right" delay={200}>
            <div className="premium-card rounded-xl p-8 hover-lift relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-accent-orange opacity-5 rounded-full blur-lg float-element"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-accent-orange-light opacity-10 rounded-full float-element"></div>
            
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-playfair relative z-10"><span className="gradient-text">{t('contact.send')}</span></h2>
            
              {isSubmitted ? (
                <div className="text-center py-8 animate-fade-in-up relative z-10">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-in animate-pulse-glow">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 gradient-text">{t('contact.success')}</h3>
                  <p className="text-gray-600">{t('contact.success')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 animate-fade-in-up">
                      <p className="text-red-800 text-sm">{submitError}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('contact.name')} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent transition-all duration-300 hover:border-accent-orange hover:scale-[1.02]"
                        placeholder="Dit fulde navn"
                      />
                    </div>
                  
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('contact.email')} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent transition-all duration-300 hover:border-accent-orange hover:scale-[1.02]"
                        placeholder="din@email.dk"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.message')} *
                    </label>
                    <select
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent transition-all duration-300 hover:border-accent-orange hover:scale-[1.02]"
                    >
                      <option value="">Vælg et emne</option>
                      <option value="general">Generel forespørgsel</option>
                      <option value="order">Spørgsmål om ordre</option>
                      <option value="design">Design hjælp</option>
                      <option value="technical">Teknisk support</option>
                      <option value="partnership">Samarbejde</option>
                      <option value="other">Andet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.message')} *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent transition-all duration-300 hover:border-accent-orange hover:scale-[1.02]"
                      placeholder="Beskriv dit spørgsmål eller din forespørgsel..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary magnetic-btn w-full text-white font-semibold py-4 rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {t('contact.sending')}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                        {t('contact.send')}
                        <div className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                          →
                        </div>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* Additional Info */}
        <ScrollReveal direction="up" delay={700}>
          <div className="mt-16 premium-card rounded-xl p-8 hover-lift relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br from-accent-orange to-accent-orange-light opacity-5 rounded-full blur-2xl float-element"></div>
            <div className="absolute bottom-6 left-6 w-16 h-16 bg-accent-orange opacity-5 rounded-full blur-lg float-element"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <ScrollReveal direction="up" delay={800}>
                <div className="hover-tilt group">
                  <MessageCircle className="w-8 h-8 text-accent-orange mx-auto mb-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-pulse-glow" />
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-accent-orange transition-colors duration-300">Hurtig respons</h3>
                  <p className="text-gray-600 text-sm">Vi svarer på alle henvendelser inden for 24 timer</p>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={900}>
                <div className="hover-tilt group">
                  <Phone className="w-8 h-8 text-accent-orange mx-auto mb-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-pulse-glow" />
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-accent-orange transition-colors duration-300">Personlig service</h3>
                  <p className="text-gray-600 text-sm">Ring direkte for øjeblikkelig hjælp og rådgivning</p>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={1000}>
                <div className="hover-tilt group">
                  <Mail className="w-8 h-8 text-accent-orange mx-auto mb-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-pulse-glow" />
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-accent-orange transition-colors duration-300">Detaljerede svar</h3>
                  <p className="text-gray-600 text-sm">Vi giver grundige og hjælpsomme svar på alle spørgsmål</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default ContactPage;