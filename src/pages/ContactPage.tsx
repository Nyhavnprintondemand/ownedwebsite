import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HelpCircle } from 'lucide-react';

const ContactPage: React.FC = () => {
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
      // Get Supabase URL from environment or use default
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      
      if (!supabaseUrl) {
        throw new Error('Supabase configuration not found. Please connect to Supabase first.');
      }

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
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-playfair">
            Kontakt <span className="text-accent-orange">os</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Har du spørgsmål eller brug for hjælp? Vi er her for at hjælpe dig med dit næste projekt.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8 font-playfair">Kom i kontakt</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-accent-orange rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Telefon</h3>
                  <p className="text-gray-600">+45 53 69 07 86</p>
                  <p className="text-sm text-gray-500">Mandag - Fredag: 9:00 - 17:00</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-accent-orange rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">nyhavnprintondemand@gmail.com</p>
                  <p className="text-sm text-gray-500">Vi svarer inden for 24 timer</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-accent-orange rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Adresse</h3>
                  <p className="text-gray-600">Nyhavn 44<br />1051 København</p>
                  <p className="text-sm text-gray-500">Besøg efter aftale</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-accent-orange rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Åbningstider</h3>
                  <p className="text-gray-600">
                    Mandag - Fredag: 9:00 - 17:00<br />
                    Weekend: Lukket
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <HelpCircle className="w-5 h-5 text-accent-orange mr-2" />
                Ofte stillede spørgsmål
              </h3>
              <div className="space-y-3">
                <details className="group">
                  <summary className="cursor-pointer text-gray-700 hover:text-accent-orange transition-colors">
                    Hvor lang tid tager levering?
                  </summary>
                  <p className="mt-2 text-sm text-gray-600 pl-4">
                    Vi leverer normalt inden for 2-4 hverdage i Danmark.
                  </p>
                </details>
                <details className="group">
                  <summary className="cursor-pointer text-gray-700 hover:text-accent-orange transition-colors">
                    Hvilke filformater accepterer I?
                  </summary>
                  <p className="mt-2 text-sm text-gray-600 pl-4">
                    Vi accepterer PNG, JPG og SVG filer. For bedste kvalitet anbefaler vi høj opløsning.
                  </p>
                </details>
                <details className="group">
                  <summary className="cursor-pointer text-gray-700 hover:text-accent-orange transition-colors">
                    Kan jeg returnere mit produkt?
                  </summary>
                  <p className="mt-2 text-sm text-gray-600 pl-4">
                    Ja, vi tilbyder 14 dages returret på alle produkter.
                  </p>
                </details>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-playfair">Send os en besked</h2>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Tak for din besked!</h3>
                <p className="text-gray-600">Vi vender tilbage til dig inden for 24 timer.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 text-sm">{submitError}</p>
                  </div>
                )}
            {isSubmitted ? (
              <div key="success-message" className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Tak for din besked!</h3>
                <p className="text-gray-600">Vi vender tilbage til dig inden for 24 timer.</p>
              </div>
            ) : (
              <form key="contact-form" onSubmit={handleSubmit} className="space-y-6">
                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 text-sm">{submitError}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Navn *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                      placeholder="Dit fulde navn"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                      placeholder="din@email.dk"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emne *
                  </label>
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
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
                    Besked *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                    placeholder="Beskriv dit spørgsmål eller din forespørgsel..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent-orange text-white font-semibold py-4 rounded-lg hover:bg-accent-orange-dark transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sender...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send besked
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-white rounded-xl shadow-sm p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <MessageCircle className="w-8 h-8 text-accent-orange mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Hurtig respons</h3>
              <p className="text-gray-600 text-sm">Vi svarer på alle henvendelser inden for 24 timer</p>
            </div>
            <div>
              <Phone className="w-8 h-8 text-accent-orange mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Personlig service</h3>
              <p className="text-gray-600 text-sm">Ring direkte for øjeblikkelig hjælp og rådgivning</p>
            </div>
            <div>
              <Mail className="w-8 h-8 text-accent-orange mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Detaljerede svar</h3>
              <p className="text-gray-600 text-sm">Vi giver grundige og hjælpsomme svar på alle spørgsmål</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;