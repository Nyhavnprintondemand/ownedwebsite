import React, { useState } from 'react';
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
    tshirt: { name: 'T-shirt', price: 199, image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    hoodie: { name: 'Hoodie', price: 399, image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' }
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
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
            Design dit eget tøj
          </h1>
          <p className="text-xl text-gray-600">
            Vælg produkt, upload dit design og se det live
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Configuration */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Konfiguration</h2>

            {/* Product Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Vælg produkt</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedProduct('tshirt')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedProduct === 'tshirt'
                      ? 'border-accent-orange bg-accent-orange-light bg-opacity-10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={products.tshirt.image}
                    alt="T-shirt"
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                  <p className="font-medium">T-shirt</p>
                  <p className="text-accent-orange font-bold">{products.tshirt.price} kr</p>
                </button>
                
                <button
                  onClick={() => setSelectedProduct('hoodie')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedProduct === 'hoodie'
                      ? 'border-accent-orange bg-accent-orange-light bg-opacity-10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={products.hoodie.image}
                    alt="Hoodie"
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                  <p className="font-medium">Hoodie</p>
                  <p className="text-accent-orange font-bold">{products.hoodie.price} kr</p>
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
                    className={`py-2 px-4 rounded-lg border font-medium transition-all ${
                      selectedSize === size
                        ? 'border-accent-orange bg-accent-orange text-white'
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
                    className={`p-3 rounded-lg border-2 flex items-center space-x-2 transition-all ${
                      selectedColor === color.name
                        ? 'border-accent-orange bg-accent-orange-light bg-opacity-10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.hex }}
                    ></div>
                    <span className="text-sm font-medium">{color.label}</span>
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
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-accent-orange transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    {uploadedFile ? uploadedFile.name : 'Klik for at uploade dit design'}
                  </p>
                  <p className="text-sm text-gray-400">PNG, JPG eller SVG (max 10MB)</p>
                </div>
              </label>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Antal</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="p-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-xl font-semibold px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium">Total:</span>
                <span className="text-2xl font-bold text-accent-orange">{totalPrice} kr</span>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={isUploading}
                className="w-full bg-accent-orange text-white py-4 rounded-xl font-semibold hover:bg-accent-orange-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isUploading ? (
                  <>
                    <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Uploader design...
                  </>
                ) : (
                  'Læg i kurv'
                )}
              </button>
            </div>
          </div>

          {/* Product Preview */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Preview</h2>
            <div className="relative">
              <img
                src={currentProduct.image}
                alt={`${currentProduct.name} preview`}
                className="w-full max-w-md mx-auto rounded-lg"
              />
              {filePreview && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <img
                    src={filePreview}
                    alt="Uploaded design"
                    className="max-w-32 max-h-32 object-contain opacity-80"
                  />
                </div>
              )}
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                {currentProduct.name} - {colors.find(c => c.name === selectedColor)?.label}
              </h3>
              <p className="text-gray-600">Størrelse: {selectedSize}</p>
              <p className="text-gray-600">Antal: {quantity}</p>
              <p className="text-accent-orange font-bold text-xl mt-2">{totalPrice} kr</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignPage;