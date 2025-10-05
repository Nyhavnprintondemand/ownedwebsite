import React, { useState, useRef, useEffect } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { Upload, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
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
  const { t } = useLanguage();
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
  const [isScaling, setIsScaling] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scaleStart, setScaleStart] = useState({ scale: 1, x: 0, y: 0 });
  const [showBoundary, setShowBoundary] = useState(false);

  const productImageRef = useRef<HTMLImageElement>(null);
  const { addItem } = useCart();
  const navigate = useNavigate();

  // Printable area boundaries (as percentage of image dimensions)
  const printableAreas = {
    tshirt: {
      top: 0.25,    // Start below collar (25% from top)
      bottom: 0.75,  // End before hem (75% from top)
      left: 0.30,    // Exclude left sleeve (30% from left)
      right: 0.70,   // Exclude right sleeve (70% from left)
    },
    hoodie: {
      top: 0.20,     // Start higher, below hood (20% from top)
      bottom: 0.55,  // End much higher to avoid pocket area (55% from top)
      left: 0.32,    // Exclude left sleeve (32% from left)
      right: 0.68,   // Exclude right sleeve (68% from left)
    },
  };

  const getBoundaries = () => {
    if (!productImageRef.current) return null;

    const rect = productImageRef.current.getBoundingClientRect();
    const boundaries = printableAreas[selectedProduct];

    return {
      top: rect.height * boundaries.top,
      bottom: rect.height * boundaries.bottom,
      left: rect.width * boundaries.left,
      right: rect.width * boundaries.right,
      width: rect.width * (boundaries.right - boundaries.left),
      height: rect.height * (boundaries.bottom - boundaries.top),
    };
  };

  const clampPositionToBoundaries = (x: number, y: number) => {
    const boundaries = getBoundaries();
    if (!boundaries) return { x, y };

    // Design size accounting for scale (design is 128px max-width/height)
    const designSize = 128 * designScale;
    const halfDesignSize = designSize / 2;

    // Calculate max allowed movement from center
    const maxX = boundaries.width / 2 - halfDesignSize;
    const maxY = boundaries.height / 2 - halfDesignSize;

    // Clamp position
    const clampedX = Math.max(-maxX, Math.min(maxX, x));
    const clampedY = Math.max(-maxY, Math.min(maxY, y));

    return { x: clampedX, y: clampedY };
  };

  const getMaxAllowedScale = () => {
    const boundaries = getBoundaries();
    if (!boundaries) return 3; // Default max scale

    // Design base size is 128px (max-width/height)
    const designBaseSize = 128;
    
    // Calculate max scale based on printable area dimensions
    const maxScaleX = boundaries.width / designBaseSize;
    const maxScaleY = boundaries.height / designBaseSize;
    
    // Use the smaller dimension to ensure design fits in both directions
    const maxScale = Math.min(maxScaleX, maxScaleY);
    
    // Add some padding (90% of max to ensure it doesn't touch edges)
    return Math.max(0.5, maxScale * 0.9);
  };

  // Handler functions for design positioning and scaling
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - designPosition.x,
      y: e.clientY - designPosition.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      const clamped = clampPositionToBoundaries(newX, newY);
      setDesignPosition(clamped);
    } else if (isScaling) {
      const deltaX = e.clientX - scaleStart.x;
      const deltaY = e.clientY - scaleStart.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const scaleFactor = 1 + (distance / 100);
      const maxScale = getMaxAllowedScale();
      const newScale = Math.max(0.5, Math.min(maxScale, scaleStart.scale * scaleFactor));
      setDesignScale(newScale);
      // Re-clamp position when scaling
      const clamped = clampPositionToBoundaries(designPosition.x, designPosition.y);
      if (clamped.x !== designPosition.x || clamped.y !== designPosition.y) {
        setDesignPosition(clamped);
      }
    }
  };

  const handleScaleStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsScaling(true);
    setScaleStart({
      scale: designScale,
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsScaling(false);
  };

  const handleScaleChange = (newScale: number) => {
    const maxScale = getMaxAllowedScale();
    const clampedScale = Math.max(0.5, Math.min(maxScale, newScale));
    setDesignScale(clampedScale);
    // Re-clamp position after scaling
    const clamped = clampPositionToBoundaries(designPosition.x, designPosition.y);
    if (clamped.x !== designPosition.x || clamped.y !== designPosition.y) {
      setDesignPosition(clamped);
    }
  };

  const resetDesignPosition = () => {
    setDesignPosition({ x: 0, y: 0 });
    setDesignScale(1);
  };

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    { name: 'white', label: t('design.color.white'), hex: '#FFFFFF' },
    { name: 'black', label: t('design.color.black'), hex: '#000000' },
    { name: 'navy', label: t('design.color.marineblue'), hex: '#1F2937' },
    { name: 'gray', label: t('design.color.gray'), hex: '#6B7280' },
    { name: 'red', label: t('design.color.red'), hex: '#EF4444' },
    { name: 'blue', label: t('design.color.blue'), hex: '#3B82F6' }
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
        // Center design in printable area when uploaded
        setDesignPosition({ x: 0, y: 0 });
        setDesignScale(1);
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
              <span className="gradient-text">{t('design.title')}</span>
            </h1>
            <p className="text-xl text-gray-600">
              {t('design.subtitle')}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-orange to-accent-orange-light mx-auto mt-6 rounded-full"></div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Configuration */}
          <ScrollReveal direction="left" delay={100}>
            <div className="premium-card rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-6">
                <span className="gradient-text">{t('design.configuration')}</span>
              </h2>

              {/* Product Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('design.selectProduct')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setSelectedProduct('tshirt')}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 active:scale-95 group ${
                      selectedProduct === 'tshirt'
                        ? 'border-accent-orange bg-gradient-to-br from-accent-orange-light to-accent-orange bg-opacity-10 animate-pulse-glow text-white'
                        : 'border-gray-200 hover:border-gray-300 hover:scale-105 hover-tilt'
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
                    className={`p-4 rounded-xl border-2 transition-all duration-300 active:scale-95 group ${
                      selectedProduct === 'hoodie'
                        ? 'border-accent-orange bg-gradient-to-br from-accent-orange-light to-accent-orange bg-opacity-10 animate-pulse-glow text-white'
                        : 'border-gray-200 hover:border-gray-300 hover:scale-105 hover-tilt'
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
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('design.size')}</h3>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-4 rounded-lg border font-medium transition-all duration-300 active:scale-95 ${
                        selectedSize === size
                          ? 'border-accent-orange bg-gradient-to-r from-accent-orange to-accent-orange-light text-white animate-pulse-glow'
                          : 'border-gray-300 hover:border-gray-400 hover:scale-105 hover-tilt'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('design.color')}</h3>
                <div className="grid grid-cols-3 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`p-3 rounded-lg border-2 flex items-center space-x-2 transition-all duration-300 active:scale-95 group ${
                        selectedColor === color.name
                          ? 'border-accent-orange bg-gradient-to-r from-accent-orange-light to-accent-orange bg-opacity-10 animate-pulse-glow'
                          : 'border-gray-200 hover:border-gray-300 hover:scale-105 hover-tilt'
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
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('design.uploadDesign')}</h3>
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
                      {uploadedFile ? uploadedFile.name : t('design.uploadText')}
                    </p>
                    <p className="text-sm text-gray-400 group-hover:text-accent-orange transition-colors duration-300">{t('design.uploadFormat')}</p>
                  </div>
                </label>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('design.quantity')}</h3>
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
                  <span className="text-lg font-medium">{t('design.totalPrice')}:</span>
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
                      {t('contact.sending')}
                    </>
                  ) : (
                    <>
                      {t('design.addToCart')}
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
                <span className="gradient-text">{t('design.preview')}</span>
              </h2>
              <div
                className="relative hover-tilt overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onMouseEnter={() => filePreview && setShowBoundary(true)}
              >
                <img
                  ref={productImageRef}
                  src={currentProduct.image}
                  alt={`${currentProduct.name} preview`}
                  className="w-full max-w-md mx-auto rounded-lg transition-transform duration-300 hover:scale-105"
                />
                {filePreview && showBoundary && (
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      top: `${printableAreas[selectedProduct].top * 100}%`,
                      left: `${printableAreas[selectedProduct].left * 100}%`,
                      width: `${(printableAreas[selectedProduct].right - printableAreas[selectedProduct].left) * 100}%`,
                      height: `${(printableAreas[selectedProduct].bottom - printableAreas[selectedProduct].top) * 100}%`,
                      border: '2px dashed rgba(255, 127, 80, 0.5)',
                      backgroundColor: 'rgba(255, 127, 80, 0.05)',
                      transition: 'opacity 0.3s ease',
                      opacity: isDragging ? 1 : 0.7,
                    }}
                  >
                    <div className="absolute top-2 left-2 bg-accent-orange text-white text-xs px-2 py-1 rounded">
                      {t('design.printArea')}
                    </div>
                  </div>
                )}
                {filePreview && (
                  <div
                    className={`absolute ${
                      isDragging ? 'cursor-grabbing' : 'cursor-grab'
                    } select-none`}
                    style={{
                      top: `${((printableAreas[selectedProduct].top + printableAreas[selectedProduct].bottom) / 2) * 100}%`,
                      left: `${((printableAreas[selectedProduct].left + printableAreas[selectedProduct].right) / 2) * 100}%`,
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
                    
                    {/* Gear Icon with Scale Controls */}
                    <div
                      className="absolute group/gear hover:z-30"
                      style={{
                        transform: `scale(${1/designScale})`,
                        transformOrigin: 'bottom left',
                        top: `${-40 / designScale}px`,
                        right: `${-40 / designScale}px`
                      }}
                    >
                      <div className="w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                      </div>

                      {/* Invisible bridge to prevent hover gap */}
                      <div className="absolute bottom-0 right-0 w-12 h-8 pointer-events-auto"></div>

                      {/* Scale Controls - Show on Gear Hover */}
                      <div className="absolute bottom-0 right-10 bg-white rounded-lg shadow-xl px-3 py-2 opacity-0 group-hover/gear:opacity-100 transition-all duration-300 pointer-events-none group-hover/gear:pointer-events-auto z-30 min-w-max">
                        <div className="flex items-center space-x-2 text-sm">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleScaleChange(designScale - 0.1);
                            }}
                            className="w-7 h-7 bg-gray-100 hover:bg-accent-orange hover:text-white rounded-full flex items-center justify-center transition-all duration-200 font-bold pointer-events-auto"
                          >
                            -
                          </button>
                          <span className="text-gray-700 font-medium min-w-12 text-center">
                            {Math.round(designScale * 100)}%
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleScaleChange(designScale + 0.1);
                            }}
                            className="w-7 h-7 bg-gray-100 hover:bg-accent-orange hover:text-white rounded-full flex items-center justify-center transition-all duration-200 font-bold pointer-events-auto"
                          >
                            +
                          </button>
                        </div>
                        
                        {/* Reset Button */}
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              resetDesignPosition();
                            }}
                            className="w-full text-xs text-gray-600 hover:text-accent-orange transition-colors duration-200 py-1 pointer-events-auto"
                          >
                            Reset Position & Size
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent-orange opacity-30 rounded-full animate-pulse-soft"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-accent-orange-light opacity-20 rounded-full animate-bounce-gentle"></div>
              </div>
              
              {filePreview && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">{t('design.controls')}</h4>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>{t('design.dragToMove')}</span>
                    <button
                      onClick={resetDesignPosition}
                      className="text-accent-orange hover:text-accent-orange-dark transition-colors"
                    >
                      {t('design.resetPosition')}
                    </button>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <div className="w-3 h-3 border-2 border-dashed border-accent-orange mr-2 opacity-50"></div>
                    <span>{t('design.printAreaNote')}</span>
                  </div>
                </div>
              )}
              
              <div className="mt-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 hover:text-accent-orange transition-colors duration-300">
                  {currentProduct.name} - {colors.find(c => c.name === selectedColor)?.label}
                </h3>
                <p className="text-gray-600">{t('design.size')}: {selectedSize}</p>
                <p className="text-gray-600">{t('design.quantity')}: {quantity}</p>
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