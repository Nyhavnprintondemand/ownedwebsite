import React from 'react';
import { MapPin, Users, Award, Heart, Clock, Shield, Star } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-playfair">
            Om <span className="text-accent-orange">Nyhavn Print on Demand</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Vi er dit lokale print-on-demand firma i hjertet af København, 
            specialiseret i at skabe unikke T-shirts og hoodies af højeste kvalitet.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Company Story */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-playfair">Vores historie</h2>
            <p className="text-gray-600 mb-4">
              Nyhavn Print on Demand blev grundlagt med en simpel vision: at gøre det nemt og overkommeligt 
              for alle at skabe deres eget unikke tøj. Vi startede i det historiske Nyhavn-område i København 
              og har siden specialiseret os i print-on-demand løsninger.
            </p>
            <p className="text-gray-600 mb-4">
              Med vores moderne DTF-print teknologi sikrer vi, at hvert design bliver trykt med den højeste 
              kvalitet og holdbarhed. Vi tror på, at alle fortjener at udtrykke deres personlighed gennem 
              deres tøj, og vi er her for at gøre det muligt.
            </p>
            <p className="text-gray-600">
              Fra vores base på Nyhavn 44 betjener vi kunder i hele Danmark med hurtig levering og 
              exceptionel kundeservice.
            </p>
          </div>

          {/* Location & Contact Info */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-playfair">Find os</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent-orange mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Adresse</p>
                  <p className="text-gray-600">Nyhavn 44<br />1051 København</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-accent-orange mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Åbningstider</p>
                  <p className="text-gray-600">
                    Mandag - Fredag: 9:00 - 17:00<br />
                    Weekend: Lukket
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-accent-orange-light bg-opacity-10 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Bemærk:</strong> Vi er primært et online firma. Kontakt os venligst på forhånd 
                hvis du ønsker at besøge vores lokation.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center font-playfair">
            Vores værdier
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Kvalitet først</h3>
              <p className="text-gray-600">
                Vi bruger kun de bedste materialer og print-teknologier for at sikre holdbare produkter.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Kundetilfredshed</h3>
              <p className="text-gray-600">
                Din tilfredshed er vores prioritet. Vi går den ekstra mil for at sikre en fantastisk oplevelse.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pålidelighed</h3>
              <p className="text-gray-600">
                Vi leverer til tiden, hver gang. Du kan stole på os til at opfylde dine forventninger.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center font-playfair">
            Mød teamet
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-accent-orange to-accent-orange-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Design Team</h3>
              <p className="text-gray-600">
                Vores kreative team hjælper med at bringe dine ideer til live med professionel grafisk design.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-accent-orange to-accent-orange-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Produktion</h3>
              <p className="text-gray-600">
                Vores erfarne produktionsteam sikrer, at hvert produkt møder vores høje kvalitetsstandarder.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-accent-orange to-accent-orange-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Kundeservice</h3>
              <p className="text-gray-600">
                Vores venlige kundeservice team er altid klar til at hjælpe dig med spørgsmål og support.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-orange mb-2">1000+</div>
            <p className="text-gray-600">Tilfredse kunder</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-orange mb-2">5000+</div>
            <p className="text-gray-600">Produkter leveret</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-orange mb-2">2-4</div>
            <p className="text-gray-600">Dages levering</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-orange mb-2">4.8★</div>
            <p className="text-gray-600">Gennemsnitlig rating</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-accent-orange rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4 font-playfair">
            Klar til at starte dit projekt?
          </h2>
          <p className="text-xl opacity-90 mb-6">
            Lad os hjælpe dig med at skabe det perfekte custom tøj
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/design"
              className="inline-flex items-center px-6 py-3 bg-white text-accent-orange font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Design selv
            </a>
            <a
              href="/kontakt"
              className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-accent-orange transition-colors"
            >
              Kontakt os
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;