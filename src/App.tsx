/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedCategories from './components/FeaturedCategories';
import TrendingProducts from './components/TrendingProducts';
import NewArrivals from './components/NewArrivals';
import SpecialOffer from './components/SpecialOffer';
import Reviews from './components/Reviews';
import Gallery from './components/Gallery';
import Newsletter from './components/Newsletter';
import About from './components/About';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout';
import AdminLogin from './components/Admin/Login';
import AdminDashboard from './components/Admin/Dashboard';
import { useCart } from './hooks/useCart';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from './constants';

import { MessageCircle } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'HOME' | 'DETAILS' | 'CHECKOUT' | 'ADMIN_LOGIN' | 'ADMIN_DASHBOARD'>(() => {
    const savedView = localStorage.getItem('alhaya_currentView');
    // Only allow persistence for admin views or if explicitly desired
    if (savedView === 'ADMIN_DASHBOARD') return 'ADMIN_DASHBOARD';
    return 'HOME';
  });
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [checkoutItems, setCheckoutItems] = useState<any[]>([]);
  const { cartItems, addToCart, removeFromCart, updateQuantity, totalItems } = useCart();

  useEffect(() => {
    // Only persist admin dashboard view to avoid confusing users on regular shop views
    if (currentView === 'ADMIN_DASHBOARD' || currentView === 'ADMIN_LOGIN') {
      localStorage.setItem('alhaya_currentView', currentView);
    } else {
      localStorage.removeItem('alhaya_currentView');
    }
  }, [currentView]);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    setCurrentView('DETAILS');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category.toUpperCase());
    setCurrentView('HOME');
    // Set timeout to ensure the view has switched before scrolling
    setTimeout(() => {
      const element = document.getElementById('trending');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleBuyNow = (id: string, quantity: number) => {
    const product = PRODUCTS.find(p => p.id === id);
    if (product) {
      setCheckoutItems([{ ...product, quantity }]);
      setCurrentView('CHECKOUT');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleProceedToCheckout = () => {
    const itemsWithData = cartItems.map(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      return { ...item, ...product };
    });
    setCheckoutItems(itemsWithData);
    setIsCartOpen(false);
    setCurrentView('CHECKOUT');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRemoveFromCheckout = (id: string) => {
    setCheckoutItems(prev => prev.filter(item => item.id !== id));
    removeFromCart(id);
  };

  const selectedProduct = PRODUCTS.find(p => p.id === selectedProductId);

  // Admin View handling
  if (currentView === 'ADMIN_LOGIN') {
    return <AdminLogin onLogin={() => setCurrentView('ADMIN_DASHBOARD')} onBack={() => setCurrentView('HOME')} />;
  }

  if (currentView === 'ADMIN_DASHBOARD') {
    return <AdminDashboard onLogout={() => setCurrentView('HOME')} />;
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-beige">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1, ease: 'circOut' }}
            className="fixed inset-0 z-[999] bg-olive flex flex-col items-center justify-center p-6 grainy-bg"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center relative"
            >
              <div className="absolute -inset-20 bg-gold/5 blur-[100px] rounded-full animate-pulse" />
              <h1 className="text-6xl md:text-9xl font-serif font-black tracking-tighter text-white mb-6 relative text-beige">
                AL-HAYĀ
              </h1>
              <div className="w-full max-w-[300px] h-[1px] bg-white/10 mx-auto relative overflow-hidden mb-8">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-gold shadow-[0_0_10px_gold]"
                />
              </div>
              <p className="relative text-gold/80 text-[10px] md:text-xs tracking-[0.6em] uppercase font-black">
                Modesty Meets Elegance
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Navbar 
            cartCount={totalItems} 
            onCartClick={() => setIsCartOpen(true)} 
            onHomeClick={() => setCurrentView('HOME')}
            onCategoryClick={handleCategoryClick}
          />
          
          <main className="bg-beige">
            {currentView === 'HOME' ? (
              <>
                <Hero onShopNow={() => handleCategoryClick('ALL')} />
                <FeaturedCategories />
                <TrendingProducts 
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                  onProductClick={handleProductClick}
                  onAddToCart={(id) => {
                    addToCart(id);
                    setIsCartOpen(true);
                  }} 
                />
                <NewArrivals onProductClick={handleProductClick} />
                <SpecialOffer />
                <About />
                <Reviews />
                <Gallery />
                <Newsletter />
              </>
            ) : currentView === 'DETAILS' ? (
              selectedProduct && (
                <ProductDetails 
                  product={selectedProduct} 
                  onBack={() => setCurrentView('HOME')}
                  onAddToCart={(id, qty) => {
                    // Simplified: just call addToCart for now
                    addToCart(id);
                    setIsCartOpen(true);
                  }}
                  onBuyNow={handleBuyNow}
                />
              )
            ) : (
              <Checkout 
                items={checkoutItems} 
                onBack={() => {
                  if (checkoutItems.length === 1 && checkoutItems[0].id === selectedProductId) {
                     setCurrentView('DETAILS');
                  } else {
                     setCurrentView('HOME');
                  }
                }}
                onRemoveItem={handleRemoveFromCheckout}
              />
            )}
          </main>

          <Footer onAdminClick={() => setCurrentView('ADMIN_LOGIN')} />

          {/* Floating WhatsApp / Support Button */}
          <motion.a
            href="https://wa.me/#"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 3, type: 'spring' }}
            whileHover={{ scale: 1.1 }}
            className="fixed bottom-10 right-10 z-[80] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30"
          >
            <MessageCircle size={32} />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-white/50"></span>
            </span>
          </motion.a>

          <CartSidebar 
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
            onCheckout={handleProceedToCheckout}
          />

          {/* Smooth Scroll Utility */}
          <style dangerouslySetInnerHTML={{ __html: `
            html { scroll-behavior: smooth; }
          ` }} />
        </motion.div>
      )}
    </div>
  );
}

