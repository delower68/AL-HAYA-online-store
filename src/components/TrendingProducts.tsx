import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Heart, Eye, Star, X } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { formatCurrency, cn } from '../lib/utils';

interface TrendingProductsProps {
  onAddToCart: (id: string) => void;
  onProductClick: (id: string) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function TrendingProducts({ onAddToCart, onProductClick, activeCategory, onCategoryChange }: TrendingProductsProps) {
  
  const filteredProducts = activeCategory === 'ALL' 
    ? PRODUCTS
    : PRODUCTS.filter(p => 
        p.category.toUpperCase() === activeCategory || 
        p.gender?.toUpperCase() === activeCategory
      );

  const categories = ['ALL', 'MEN', 'WOMEN', 'KIDS', 'OVERSIZED TEES', 'HOODIES'];

  return (
    <section id="trending" className="py-24 px-6 transition-colors bg-beige grainy-bg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-block text-gold font-black uppercase tracking-widest text-xs mb-4 italic"
            >
              Hottest Drops
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tighter text-olive uppercase leading-none"
            >
              STREET <br />
              <span className="text-outline text-transparent">HEAT</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-6 md:space-x-8 text-[10px] font-black uppercase tracking-[0.2em] border-b border-olive/10 pb-2 overflow-x-auto pb-4 md:pb-2 no-scrollbar"
          >
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={cn(
                  "transition-all pb-2 whitespace-nowrap",
                  activeCategory === cat ? "text-olive border-b-2 border-gold -mb-2.5" : "text-olive/40 hover:text-gold"
                )}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 min-h-[600px]">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="group cursor-pointer"
                onClick={() => onProductClick(product.id)}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-white rounded-[10px] mb-8 shadow-sm group-hover:shadow-xl transition-all duration-500 flex items-center justify-center p-4">
                  {/* Badge logic... */}
                  {product.discount && (
                    <span className="absolute top-6 left-6 z-10 bg-[#FF3E3E] text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-[0.1em]">
                      {product.discount}
                    </span>
                  )}
                  {product.isNew && (
                    <span className="absolute top-6 left-6 z-10 bg-black text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-[0.1em]">
                      New In
                    </span>
                  )}
                  
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto object-contain transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />

                  {/* Hover Overlay with SELECT OPTIONS button */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-end pb-12">
                     <motion.button 
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                       className="bg-[#9A9A9A] text-white px-8 py-4 font-black text-[10px] tracking-[0.2em] uppercase transition-all shadow-2xl transform translate-y-4 group-hover:translate-y-0"
                     >
                       SELECT OPTIONS
                     </motion.button>
                  </div>
                </div>

                <div className="space-y-3 px-4 text-center">
                  <div className="flex justify-center items-center space-x-3">
                    <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">{product.category}</span>
                    <div className="w-4 h-[1px] bg-gold/30" />
                    <div className="flex items-center text-gold">
                      <Star size={10} fill="currentColor" />
                      <span className="text-[10px] ml-1 font-black text-olive">{product.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black tracking-tighter transition-colors group-hover:text-gold text-olive uppercase">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-center space-x-4">
                    <span className="text-xl font-sans font-black text-olive">{formatCurrency(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-olive/30 line-through font-medium">{formatCurrency(product.originalPrice)}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
