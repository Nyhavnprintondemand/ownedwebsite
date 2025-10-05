import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'da' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  da: {
    'nav.home': 'Forside',
    'nav.design': 'Design selv',
    'nav.about': 'Om os',
    'nav.contact': 'Kontakt',
    'hero.title': 'Skab Unikke Designs',
    'hero.subtitle': 'Print-on-demand tjeneste med ubegrænsede muligheder',
    'hero.cta': 'Kom i gang',
    'products.title': 'Populære Produkter',
    'products.tshirt': 'T-Shirt',
    'products.hoodie': 'Hættetrøje',
    'products.mug': 'Krus',
    'products.poster': 'Plakat',
    'products.price': 'Fra',
    'products.customize': 'Tilpas',
    'features.title': 'Hvorfor Vælge Os',
    'features.quality.title': 'Premium Kvalitet',
    'features.quality.desc': 'Vi bruger kun de bedste materialer',
    'features.shipping.title': 'Hurtig Levering',
    'features.shipping.desc': 'Levering på 3-5 hverdage',
    'features.design.title': 'Tilpassede Designs',
    'features.design.desc': 'Upload dit eget design eller vælg fra vores galleri',
    'features.support.title': 'Kundeservice',
    'features.support.desc': '24/7 support til at hjælpe dig',
    'about.title': 'Om NYHAVN Print',
    'about.mission': 'Vores Mission',
    'about.mission.text': 'At levere print-on-demand tjenester af højeste kvalitet med fokus på kreativitet og kundetilfredshed.',
    'about.story': 'Vores Historie',
    'about.story.text': 'Startet i 2024, er NYHAVN Print vokset til at blive en af de førende print-on-demand tjenester i Danmark.',
    'about.values': 'Vores Værdier',
    'about.values.text': 'Kvalitet, kreativitet og kundetilfredshed er kernen i alt, hvad vi gør.',
    'contact.title': 'Kontakt Os',
    'contact.subtitle': 'Har du spørgsmål? Vi er her for at hjælpe!',
    'contact.name': 'Navn',
    'contact.email': 'Email',
    'contact.message': 'Besked',
    'contact.send': 'Send Besked',
    'contact.sending': 'Sender...',
    'contact.success': 'Tak for din besked! Vi vender tilbage hurtigst muligt.',
    'contact.error': 'Der opstod en fejl. Prøv venligst igen.',
    'design.title': 'Design Dit Produkt',
    'design.upload': 'Upload Dit Design',
    'design.text': 'Tilføj Tekst',
    'design.color': 'Farve',
    'design.price': 'Pris',
    'design.addToCart': 'Tilføj til Kurv',
    'design.product': 'Produkt',
    'design.size': 'Størrelse',
    'design.remove': 'Fjern Design',
    'design.textPlaceholder': 'Din tekst her...',
    'cart.title': 'Din Kurv',
    'cart.empty': 'Din kurv er tom',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Fragt',
    'cart.total': 'Total',
    'cart.checkout': 'Gå til Betaling',
    'cart.continueShopping': 'Fortsæt med at handle',
    'cart.remove': 'Fjern',
    'checkout.title': 'Checkout',
    'checkout.contactInfo': 'Kontaktinformation',
    'checkout.firstName': 'Fornavn',
    'checkout.lastName': 'Efternavn',
    'checkout.phone': 'Telefon',
    'checkout.shippingAddress': 'Leveringsadresse',
    'checkout.address': 'Adresse',
    'checkout.city': 'By',
    'checkout.postalCode': 'Postnummer',
    'checkout.country': 'Land',
    'checkout.orderSummary': 'Ordre Oversigt',
    'checkout.placeOrder': 'Afgiv Ordre',
    'checkout.processing': 'Behandler...',
    'checkout.success': 'Tak for din ordre! Vi sender en bekræftelse til din email.',
    'checkout.error': 'Der opstod en fejl. Prøv venligst igen.',
    'footer.company': 'Firma',
    'footer.support': 'Support',
    'footer.legal': 'Juridisk',
    'footer.privacy': 'Privatlivspolitik',
    'footer.terms': 'Vilkår & Betingelser',
    'footer.rights': 'Alle rettigheder forbeholdes.',
    'size.small': 'Lille',
    'size.medium': 'Medium',
    'size.large': 'Stor',
    'size.xlarge': 'X-Stor',
  },
  en: {
    'nav.home': 'Home',
    'nav.design': 'Design Yourself',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'hero.title': 'Create Unique Designs',
    'hero.subtitle': 'Print-on-demand service with unlimited possibilities',
    'hero.cta': 'Get Started',
    'products.title': 'Popular Products',
    'products.tshirt': 'T-Shirt',
    'products.hoodie': 'Hoodie',
    'products.mug': 'Mug',
    'products.poster': 'Poster',
    'products.price': 'From',
    'products.customize': 'Customize',
    'features.title': 'Why Choose Us',
    'features.quality.title': 'Premium Quality',
    'features.quality.desc': 'We only use the best materials',
    'features.shipping.title': 'Fast Delivery',
    'features.shipping.desc': 'Delivery in 3-5 business days',
    'features.design.title': 'Custom Designs',
    'features.design.desc': 'Upload your own design or choose from our gallery',
    'features.support.title': 'Customer Service',
    'features.support.desc': '24/7 support to help you',
    'about.title': 'About NYHAVN Print',
    'about.mission': 'Our Mission',
    'about.mission.text': 'To deliver the highest quality print-on-demand services with a focus on creativity and customer satisfaction.',
    'about.story': 'Our Story',
    'about.story.text': 'Started in 2024, NYHAVN Print has grown to become one of the leading print-on-demand services in Denmark.',
    'about.values': 'Our Values',
    'about.values.text': 'Quality, creativity, and customer satisfaction are at the core of everything we do.',
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Have questions? We\'re here to help!',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.success': 'Thank you for your message! We\'ll get back to you as soon as possible.',
    'contact.error': 'An error occurred. Please try again.',
    'design.title': 'Design Your Product',
    'design.upload': 'Upload Your Design',
    'design.text': 'Add Text',
    'design.color': 'Color',
    'design.price': 'Price',
    'design.addToCart': 'Add to Cart',
    'design.product': 'Product',
    'design.size': 'Size',
    'design.remove': 'Remove Design',
    'design.textPlaceholder': 'Your text here...',
    'cart.title': 'Your Cart',
    'cart.empty': 'Your cart is empty',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping',
    'cart.total': 'Total',
    'cart.checkout': 'Proceed to Checkout',
    'cart.continueShopping': 'Continue Shopping',
    'cart.remove': 'Remove',
    'checkout.title': 'Checkout',
    'checkout.contactInfo': 'Contact Information',
    'checkout.firstName': 'First Name',
    'checkout.lastName': 'Last Name',
    'checkout.phone': 'Phone',
    'checkout.shippingAddress': 'Shipping Address',
    'checkout.address': 'Address',
    'checkout.city': 'City',
    'checkout.postalCode': 'Postal Code',
    'checkout.country': 'Country',
    'checkout.orderSummary': 'Order Summary',
    'checkout.placeOrder': 'Place Order',
    'checkout.processing': 'Processing...',
    'checkout.success': 'Thank you for your order! We\'ll send a confirmation to your email.',
    'checkout.error': 'An error occurred. Please try again.',
    'footer.company': 'Company',
    'footer.support': 'Support',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms & Conditions',
    'footer.rights': 'All rights reserved.',
    'size.small': 'Small',
    'size.medium': 'Medium',
    'size.large': 'Large',
    'size.xlarge': 'X-Large',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'da';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
