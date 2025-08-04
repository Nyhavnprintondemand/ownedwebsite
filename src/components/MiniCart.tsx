import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const MiniCart: React.FC = () => {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    getTotalPrice, 
    getItemCount,
    isCartOpen, 
    setIsCartOpen 
  } = useCart();

  const totalPrice = getTotalPrice();
  const itemCount = getItemCount();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300" 
        onClick={() => setIsCartOpen(false)} 
      />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              Kurv ({itemCount} {itemCount === 1 ? 'vare' : 'varer'})
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12 animate-fade-in-up">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Din kurv er tom</h3>
                <p className="text-gray-600 mb-6">Tilføj nogle produkter for at komme i gang</p>
                <Link
                  to="/design"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center px-4 py-2 bg-accent-orange text-white font-semibold rounded-lg hover:bg-accent-orange-dark transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Design nu
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item, index) => (
                  <div key={item.id} className={`flex space-x-4 animate-fade-in-up animate-delay-${Math.min(index * 100 + 100, 600)}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg hover-lift"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.color} - {item.size}</p>
                      <p className="text-sm font-semibold text-accent-orange">{item.price} kr</p>
                      
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-md border border-gray-300 hover:bg-gray-50 transition-all duration-300 hover:scale-110 active:scale-95"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium px-2">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-md border border-gray-300 hover:bg-gray-50 transition-all duration-300 hover:scale-110 active:scale-95"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-2 text-red-500 hover:text-red-700 text-xs transition-all duration-300 hover:scale-105"
                        >
                          Fjern
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-6 animate-fade-in-up">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-900">Total:</span>
                <span className="text-xl font-bold text-accent-orange">{totalPrice} kr</span>
              </div>
              
              <Link
                to="/kassen"
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-accent-orange text-white font-semibold py-3 rounded-lg hover:bg-accent-orange-dark transition-all duration-300 block text-center transform hover:scale-105 active:scale-95 hover-glow"
              >
                Gå til kassen
              </Link>
              
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full mt-3 border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Fortsæt shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MiniCart;