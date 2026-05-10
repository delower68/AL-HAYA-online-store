import { useState } from 'react';
import { ChevronRight, Minus, Plus, ChevronDown, Check, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { formatCurrency, cn } from '../lib/utils';
import { PRODUCTS } from '../constants';

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (id: string, quantity: number) => void;
  onBuyNow: (id: string, quantity: number) => void;
}

const VARIANTS = ['Choose Size / Color...', 'Small / Black', 'Medium / Black', 'Large / Black', 'XL / Black'];

export default function ProductDetails({ product, onBack, onAddToCart, onBuyNow }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('DESCRIPTION');
  const [selectedVariant, setSelectedVariant] = useState(VARIANTS[0]);
  const [showError, setShowError] = useState(false);

  const relatedProducts = PRODUCTS.slice(0, 5);

  const isVariantSelected = selectedVariant !== VARIANTS[0];

  const handleAction = (action: 'ADD' | 'BUY') => {
    if (!isVariantSelected) {
      setShowError(true);
      return;
    }
    setShowError(false);
    if (action === 'ADD') onAddToCart(product.id, quantity);
    else onBuyNow(product.id, quantity);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 40;

  return (
    <div className="bg-white min-h-screen pt-[120px]">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-100 py-4 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-[10px] font-black tracking-widest uppercase text-black/50">
          <button onClick={onBack} className="hover:text-black transition-colors">HOME</button>
          <ChevronRight size={10} />
          <span className="hover:text-black cursor-pointer transition-colors">SHOP</span>
          <ChevronRight size={10} />
          <span className="hover:text-black cursor-pointer transition-colors">{product.category}</span>
          <ChevronRight size={10} />
          <span className="text-black font-black">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Product Image */}
          <div className="bg-[#F9F9F9] p-4 flex items-center justify-center">
             <img 
               src={product.image} 
               alt={product.name} 
               className="w-full max-w-lg h-auto shadow-sm"
               referrerPolicy="no-referrer"
             />
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div className="text-[11px] font-black tracking-widest text-black/60 uppercase">
                {product.category} / {product.name}
              </div>
              <div className="border border-[#2D9B65] text-[#2D9B65] text-[10px] font-black px-3 py-1 uppercase tracking-widest">
                IN STOCK
              </div>
            </div>

            <h1 className="text-6xl md:text-7xl font-black text-black mb-6 uppercase tracking-tight leading-none">
              {product.name}
            </h1>

            <div className="flex items-center space-x-6 mb-10">
              <span className="text-4xl font-black text-black">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-black/40 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
              <div className="bg-[#FF3E3E] text-white text-[11px] font-black px-3 py-1.5 uppercase tracking-widest">
                SAVE {discountPercentage}%
              </div>
            </div>

            {/* Variant Selector */}
            <div className={cn(
              "border p-6 mb-8 transition-all duration-300",
              showError && !isVariantSelected ? "border-[#FF3E3E] bg-[#FF3E3E]/5" : "border-gray-100"
            )}>
               <div className="flex justify-between items-center mb-4">
                  <span className="text-[11px] font-black tracking-[0.2em] uppercase text-black">SELECT VARIANT</span>
                  <span className={cn(
                    "text-[9px] font-black uppercase",
                    showError && !isVariantSelected ? "text-[#FF3E3E] animate-pulse" : "text-black/60"
                  )}>
                    {showError && !isVariantSelected ? "SELECTION REQUIRED" : "REQUIRED"}
                  </span>
               </div>
               <div className="relative">
                  <select 
                    className={cn(
                      "w-full border-2 p-4 text-xs font-black uppercase tracking-widest appearance-none outline-none transition-all",
                      isVariantSelected ? "border-black bg-[#6B7280]" : "border-[#1A73E8] bg-[#6B7280]",
                      showError && !isVariantSelected ? "border-[#FF3E3E]" : ""
                    )}
                    value={selectedVariant}
                    onChange={(e) => {
                      setSelectedVariant(e.target.value);
                      setShowError(false);
                    }}
                  >
                    {VARIANTS.map(v => (
                       <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" size={16} />
               </div>
               <div className="mt-4 flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <div className="flex space-x-4">
                    <span className="text-black/60 uppercase tracking-widest">PRICE</span>
                    <span className="text-black">{formatCurrency(product.price)}</span>
                  </div>
                  <div className="flex space-x-4">
                    <span className="text-black/60 uppercase tracking-widest">STOCK</span>
                    <span className={cn(isVariantSelected ? "text-[#2D9B65]" : "text-black")}>
                      {isVariantSelected ? "IN STOCK" : "—"}
                    </span>
                  </div>
               </div>
            </div>

            {/* Quantity and Actions */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                 <div className="flex border-2 border-black h-[60px]">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                    >
                      <Minus size={20} />
                    </button>
                    <div className="w-16 flex items-center justify-center text-black text-xl">
                      {quantity}
                    </div>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                    >
                      <Plus size={20} />
                    </button>
                 </div>
              </div>

              <div className="flex space-x-4 w-full">
                <button 
                  onClick={() => handleAction('ADD')}
                  className={cn(
                    "flex-1 h-[60px] font-black uppercase tracking-[0.2em] text-xs transition-all",
                    isVariantSelected ? "bg-[#9A9A9A] text-white hover:bg-black" : "bg-gray-100 text-[#6B7280]"
                  )}
                >
                  ADD TO CART
                </button>
                <button 
                  onClick={() => handleAction('BUY')}
                  className={cn(
                    "flex-1 h-[60px] font-black uppercase tracking-[0.2em] text-xs transition-all",
                    isVariantSelected ? "bg-[#F19C9C] text-white hover:bg-[#e88a8a]" : "bg-gray-50 text-black/40"
                  )}
                >
                  BUY NOW
                </button>
              </div>

              {showError && !isVariantSelected && (
                 <motion.p 
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="text-[#FF3E3E] text-[10px] font-black uppercase tracking-widest flex items-center"
                 >
                   <AlertCircle size={14} className="mr-2" />
                   Please select a variant to continue
                 </motion.p>
              )}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-32">
           <div className="flex border-b border-gray-100 relative">
              <button 
                onClick={() => setActiveTab('DESCRIPTION')}
                className={cn(
                  "px-8 py-5 text-xs font-black uppercase tracking-widest transition-all relative z-10",
                  activeTab === 'DESCRIPTION' ? "text-black" : "text-black/30"
                )}
              >
                DESCRIPTION
                {activeTab === 'DESCRIPTION' && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-[3px] bg-black" />
                )}
              </button>
              <button 
                onClick={() => setActiveTab('SHIPPING')}
                className={cn(
                  "px-8 py-5 text-xs font-black uppercase tracking-widest transition-all relative z-10",
                  activeTab === 'SHIPPING' ? "text-black" : "text-black/30"
                )}
              >
                SHIPPING & RETURNS
                {activeTab === 'SHIPPING' && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-[3px] bg-black" />
                )}
              </button>
           </div>

            <div className="py-20 text-center">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-black/50">
                {activeTab === 'DESCRIPTION' ? "NO DETAILED DESCRIPTION AVAILABLE." : "FREE SHIPPING ON ORDERS OVER $100."}
              </span>
            </div>
        </div>

        {/* Complete the Look Section */}
        <div className="mt-32">
           <div className="text-center mb-16">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF3E3E] mb-4 block italic">MATCHES</span>
              <h2 className="text-5xl md:text-6xl font-black text-black uppercase tracking-tighter">COMPLETE THE LOOK</h2>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {relatedProducts.map((item) => (
                <div key={item.id} className="group cursor-pointer">
                  <div className="bg-[#F9F9F9] aspect-square p-4 mb-4 relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.1em] text-black group-hover:text-[#FF3E3E] transition-colors">
                    {item.name}
                  </h3>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
