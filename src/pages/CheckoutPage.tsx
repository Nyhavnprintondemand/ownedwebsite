import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CreditCard, Truck, Shield, Check, AlertCircle } from 'lucide-react';

const CheckoutPage: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string>('');

  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Danmark'
  });

  const [paymentMethod, setPaymentMethod] = useState('dankort');
  const [shippingMethod, setShippingMethod] = useState('standard');

  const subtotal = getTotalPrice();
  const shipping = shippingMethod === 'express' ? 79 : 39;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderError(null);
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Process the actual order
      await processOrder();
    }
  };

  const processOrder = async () => {
    setIsProcessing(true);
    setOrderError(null);

    try {
      // Get Supabase URL from environment
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      
      if (!supabaseUrl) {
        throw new Error('Supabase configuration not found. Please connect to Supabase first.');
      }

      // Prepare order data
      const orderData = {
        customerInfo: {
          email: customerInfo.email.trim(),
          firstName: customerInfo.firstName.trim(),
          lastName: customerInfo.lastName.trim(),
          phone: customerInfo.phone?.trim() || '',
          address: customerInfo.address.trim(),
          city: customerInfo.city.trim(),
          postalCode: customerInfo.postalCode.trim(),
          country: customerInfo.country
        },
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
          artwork: item.artwork
        })),
        shippingMethod,
        paymentMethod,
        subtotal,
        shippingCost: shipping,
        totalAmount: total
      };

      console.log('Submitting order:', orderData);

      // Submit order to Edge Function
      const response = await fetch(`${supabaseUrl}/functions/v1/submit-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to process order');
      }

      console.log('Order processed successfully:', result);

      // Clear the cart and show success
      clearCart();
      setOrderId(result.orderId || 'Unknown');
      setOrderComplete(true);
      
    } catch (error) {
      console.error('Error processing order:', error);
      setOrderError(error instanceof Error ? error.message : 'Failed to process order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Din kurv er tom</h1>
          <p className="text-gray-600 mb-8">Tilføj nogle produkter for at fortsætte til kassen</p>
          <a
            href="/design"
            className="inline-flex items-center px-6 py-3 bg-accent-orange text-white font-semibold rounded-lg hover:bg-accent-orange-dark transition-colors"
          >
            Design dit produkt
          </a>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tak for din bestilling!</h1>
          <p className="text-gray-600 mb-6">
            Vi har modtaget din ordre og begynder at producere dit custom tøj. 
            Du vil modtage en bekræftelsesmail inden for få minutter.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Ordre ID: #{orderId}
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-accent-orange text-white font-semibold rounded-lg hover:bg-accent-orange-dark transition-colors"
          >
            Tilbage til forsiden
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 font-playfair">Kassen</h1>
          
          {/* Progress Steps */}
          <div className="flex justify-center space-x-8 mb-8">
            {[
              { number: 1, title: 'Kundeinfo' },
              { number: 2, title: 'Levering' },
              { number: 3, title: 'Betaling' }
            ].map((step) => (
              <div key={step.number} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= step.number 
                    ? 'bg-accent-orange text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.number}
                </div>
                <span className={`ml-2 ${currentStep >= step.number ? 'text-accent-orange' : 'text-gray-600'}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
              {/* Step 1: Customer Information */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Kundeoplysninger</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fornavn *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerInfo.firstName}
                        onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Efternavn *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerInfo.lastName}
                        onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adresse *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        By *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerInfo.city}
                        onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Postnummer *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerInfo.postalCode}
                        onChange={(e) => setCustomerInfo({...customerInfo, postalCode: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Shipping */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Leveringsmuligheder</h2>
                  
                  <div className="space-y-4">
                    <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      shippingMethod === 'standard' 
                        ? 'border-accent-orange bg-accent-orange-light bg-opacity-10' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="shipping"
                        value="standard"
                        checked={shippingMethod === 'standard'}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <Truck className="w-5 h-5 text-accent-orange" />
                          <div>
                            <p className="font-medium text-gray-900">Standard levering</p>
                            <p className="text-sm text-gray-600">3-5 hverdage</p>
                          </div>
                        </div>
                        <span className="font-semibold text-gray-900">39 kr</span>
                      </div>
                    </label>
                    
                    <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      shippingMethod === 'express' 
                        ? 'border-accent-orange bg-accent-orange-light bg-opacity-10' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="shipping"
                        value="express"
                        checked={shippingMethod === 'express'}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <Truck className="w-5 h-5 text-accent-orange" />
                          <div>
                            <p className="font-medium text-gray-900">Express levering</p>
                            <p className="text-sm text-gray-600">1-2 hverdage</p>
                          </div>
                        </div>
                        <span className="font-semibold text-gray-900">79 kr</span>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Betaling</h2>
                  
                  <div className="space-y-4 mb-6">
                    <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === 'dankort' 
                        ? 'border-accent-orange bg-accent-orange-light bg-opacity-10' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        value="dankort"
                        checked={paymentMethod === 'dankort'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-5 h-5 text-accent-orange" />
                        <span className="font-medium text-gray-900">Dankort</span>
                      </div>
                    </label>
                    
                    <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === 'mobilepay' 
                        ? 'border-accent-orange bg-accent-orange-light bg-opacity-10' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        value="mobilepay"
                        checked={paymentMethod === 'mobilepay'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-5 h-5 text-accent-orange" />
                        <span className="font-medium text-gray-900">MobilePay</span>
                      </div>
                    </label>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4" />
                      <span>Din betaling er sikret med SSL-kryptering</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t">
                {orderError && (
                  <div className="w-full mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-red-800 font-medium">Der opstod en fejl</p>
                      <p className="text-red-700 text-sm mt-1">{orderError}</p>
                    </div>
                  </div>
                )}
                
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isProcessing}
                  >
                    Tilbage
                  </button>
                )}
                
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="ml-auto px-8 py-3 bg-accent-orange text-white font-semibold rounded-lg hover:bg-accent-orange-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Behandler ordre...
                    </>
                  ) : (
                    currentStep === 3 ? 'Gennemfør bestilling' : 'Fortsæt'
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-lg p-8 h-fit">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Ordresammendrag</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.color} - {item.size}</p>
                    <p className="text-sm text-gray-600">Antal: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{item.price * item.quantity} kr</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">{subtotal} kr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Levering:</span>
                <span className="font-medium">{shipping} kr</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total:</span>
                <span className="text-accent-orange">{total} kr</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;