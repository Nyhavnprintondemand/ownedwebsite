import React, { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { Upload, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with anon key for general use
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
}

// Initialize Supabase client with anon key for general use
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Initialize Supabase client with service role for file uploads
const supabaseServiceRole = supabaseUrl && supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null;

const DesignPage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<'tshirt' | 'hoodie'>('tshirt');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('white');
  const [quantity, setQuantity] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Design positioning and scaling states
  const [designPosition, setDesignPosition] = useState({ x: 0, y: 0 });
  const [designScale, setDesignScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const { addItem } = useCart();
  const navigate = useNavigate();

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    { name: 'white', label: 'Hvid', hex: '#FFFFFF' },
    { name: 'black', label: 'Sort', hex: '#000000' },
    { name: 'navy', label: 'Marineblå', hex: '#1F2937' },
    { name: 'gray', label: 'Grå', hex: '#6B7280' },
    { name: 'red', label: 'Rød', hex: '#EF4444' },
    { name: 'blue', label: 'Blå', hex: '#3B82F6' }
  ];

  const products = {
    tshirt: { name: 'T-shirt', price: 299, image: '/ChatGPT Image Oct 1, 2025, 06_51_00 PM.png' },
    hoodie: { name: 'Hoodie', price: 399, image: '/ChatGPT Image Oct 1, 2025, 06_57_22 PM.png' }
  };

  const currentProduct = products[selectedProduct];
  const totalPrice = currentProduct.price * quantity;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadArtworkToStorage = async (file: File): Promise<string | null> => {
    try {
      setIsUploading(true);
      
      if (!supabaseServiceRole) {
        console.error('Supabase service role client not initialized. Please check your environment variables.');
        return null;
      }
      
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `artwork/${fileName}`;

      // Upload file to Supabase Storage
      const { data, error } = await supabaseServiceRole.storage
        .from('order-artwork')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Error uploading file:', error);
        return null;
      }

      // Get public URL
      const { data: { publicUrl } } = supabaseServiceRole.storage
        .from('order-artwork')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error in uploadArtworkToStorage:', error);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddToCart = async () => {
    let artworkUrl: string | undefined = undefined;

    // Upload artwork if file is selected
    if (uploadedFile) {
      artworkUrl = await uploadArtworkToStorage(uploadedFile);
      if (!artworkUrl) {
        alert('Der opstod en fejl ved upload af dit design. Prøv igen.');
        return;
      }
    }

    const item = {
      id: selectedProduct,
      name: currentProduct.name,
      size: selectedSize,
      color: colors.find(c => c.name === selectedColor)?.label || selectedColor,
      quantity,
      price: currentProduct.price,
      image: currentProduct.image,
      artwork: artworkUrl
    };

    addItem(item);
    
    // Show success message or redirect
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
              <span className="gradient-text">Design dit eget tøj</span>
            </h1>
            <p className="text-xl text-gray-600">
              Vælg produkt, upload dit design og se det live
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-orange to-accent-orange-light mx-auto mt-6 rounded-full"></div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Configuration */}
          <ScrollReveal direction="left" delay={100}>
            <div className="premium-card rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-6">
                <span className="gradient-text">Konfiguration</span>
              </h2>

              {/* Product Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Vælg produkt</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setSelectedProduct('tshirt')}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover-tilt active:scale-95 group ${
                      selectedProduct === 'tshirt'
                        ? 'border-accent-orange bg-gradient-to-br from-accent-orange-light to-accent-orange bg-opacity-10 animate-pulse-glow text-white'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={products.tshirt.image}
                      alt="T-shirt"
                      className="w-full h-24 object-contain rounded-lg mb-2 transition-transform duration-300 group-hover:scale-110"
                    />
                    <p className={`font-medium transition-colors duration-300 ${
                      selectedProduct === 'tshirt' ? 'text-white' : 'group-hover:text-accent-orange'
                    }`}>T-shirt</p>
                    <p className={`font-bold ${
                      selectedProduct === 'tshirt' ? 'text-white' : 'gradient-text'
                    }`}>{products.tshirt.price} kr</p>
                  </button>
                
                  <button
                    onClick={() => setSelectedProduct('hoodie')}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover-tilt active:scale-95 group ${
                      selectedProduct === 'hoodie'
                        ? 'border-accent-orange bg-gradient-to-br from-accent-orange-light to-accent-orange bg-opacity-10 animate-pulse-glow text-white'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={products.hoodie.image}
                      alt="Hoodie"
                      className="w-full h-24 object-contain rounded-lg mb-2 transition-transform duration-300 group-hover:scale-110"
                    />
                    <p className={`font-medium transition-colors duration-300 ${
                      selectedProduct === 'hoodie' ? 'text-white' : 'group-hover:text-accent-orange'
                    }`}>Hoodie</p>
                    <p className={`font-bold ${
                      selectedProduct === 'hoodie' ? 'text-white' : 'gradient-text'
                    }`}>{products.hoodie.price} kr</p>
                  </button>
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Størrelse</h3>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-4 rounded-lg border font-medium transition-all duration-300 hover:scale-105 hover-tilt active:scale-95 ${
                        selectedSize === size
                          ? 'border-accent-orange bg-gradient-to-r from-accent-orange to-accent-orange-light text-white animate-pulse-glow'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Farve</h3>
                <div className="grid grid-cols-3 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`p-3 rounded-lg border-2 flex items-center space-x-2 transition-all duration-300 hover:scale-105 hover-tilt active:scale-95 group ${
                        selectedColor === color.name
                          ? 'border-accent-orange bg-gradient-to-r from-accent-orange-light to-accent-orange bg-opacity-10 animate-pulse-glow'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300 group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: color.hex }}
                      ></div>
                      <span className={`text-sm font-medium transition-colors duration-300 ${
                        selectedColor === color.name 
                          ? 'text-white' 
                          : 'group-hover:text-accent-orange'
                      }`}>{color.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* File Upload */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Upload dit design</h3>
                <label className="block w-full">
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg,.svg"
                    onChange={handleFileUpload}
                    className="sr-only"
                  />
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-accent-orange transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:bg-gradient-to-br hover:from-gray-50 hover:to-accent-orange-light hover:bg-opacity-5 group">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4 group-hover:text-accent-orange group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                    <p className="text-gray-600 mb-2">
                      {uploadedFile ? uploadedFile.name : 'Klik for at uploade dit design'}
                    </p>
                    <p className="text-sm text-gray-400 group-hover:text-accent-orange transition-colors duration-300">PNG, JPG eller SVG (max 10MB)</p>
                  </div>
                </label>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Antal</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="p-2 rounded-lg border border-gray-300 hover:border-accent-orange hover:bg-accent-orange hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-xl font-semibold px-4 gradient-text">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 rounded-lg border border-gray-300 hover:border-accent-orange hover:bg-accent-orange hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium">Total:</span>
                  <span className="text-2xl font-bold gradient-text">{totalPrice} kr</span>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={isUploading}
                  className="btn-primary magnetic-btn w-full text-white py-4 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-105 active:scale-95 group"
                >
                  {isUploading ? (
                    <>
                      <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Uploader design...
                    </>
                  ) : (
                    <>
                      Læg i kurv
                      <div className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                        →
                      </div>
                    </>
                  )}
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Product Preview */}
          <ScrollReveal direction="right" delay={200}>
            <div className="premium-card rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-6">
                <span className="gradient-text">Preview</span>
              </h2>
              <div 
                className="relative hover-tilt overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <img
                  src={currentProduct.image}
                  alt={`${currentProduct.name} preview`}
                  className="w-full max-w-md mx-auto rounded-lg transition-transform duration-300 hover:scale-105"
                />
                {filePreview && (
                  <div 
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                      isDragging ? 'cursor-grabbing' : 'cursor-grab'
                    } select-none`}
                    style={{
                      transform: `translate(-50%, -50%) translate(${designPosition.x}px, ${designPosition.y}px) scale(${designScale})`,
                      transition: isDragging ? 'none' : 'transform 0.2s ease'
                    }}
                    onMouseDown={handleMouseDown}
                  >
                    <img
                      src={filePreview}
                      alt="Uploaded design"
                      className="max-w-32 max-h-32 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      draggable={false}
                    />
                    
                    {/* Design controls */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg px-3 py-1 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center space-x-2 text-xs">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleScaleChange(designScale - 0.1);
                        }}
                        className="w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center transition-colors"
                      >
                        -
                      </button>
                      <span className="text-gray-600 min-w-8 text-center">{Math.round(designScale * 100)}%</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleScaleChange(designScale + 0.1);
                        }}
                        className="w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          resetDesignPosition();
                        }}
                        className="w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center transition-colors"
                        title="Reset position"
                      >
                        ↻
                      </button>
                    </div>
                  </div>
                )}
                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent-orange opacity-30 rounded-full animate-pulse-soft"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-accent-orange-light opacity-20 rounded-full animate-bounce-gentle"></div>
              </div>
              
              {filePreview && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Design kontroller:</h4>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Træk for at flytte • Hover for at skalere</span>
                    <button
                      onClick={resetDesignPosition}
                      className="text-accent-orange hover:text-accent-orange-dark transition-colors"
                    >
                      Nulstil position
                    </button>
                  </div>
                </div>
              )}
              
              <div className="mt-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 hover:text-accent-orange transition-colors duration-300">
                  {currentProduct.name} - {colors.find(c => c.name === selectedColor)?.label}
                </h3>
                <p className="text-gray-600">Størrelse: {selectedSize}</p>
                <p className="text-gray-600">Antal: {quantity}</p>
                <p className="gradient-text font-bold text-xl mt-2">{totalPrice} kr</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default DesignPage;