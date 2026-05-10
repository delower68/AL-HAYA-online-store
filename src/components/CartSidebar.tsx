import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { formatCurrency } from '../lib/utils';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: { id: string; quantity: number }[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export default function CartSidebar({ isOpen, onClose, cartItems, onUpdateQuantity, onRemove, onCheckout }: CartSidebarProps) {
  const cartWithData = cartItems.map(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    return { ...item, ...(product!) };
  });

  const subtotal = cartWithData.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-olive/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-screen w-full max-w-md bg-beige shadow-2xl z-[101] flex flex-col grainy-bg"
          >
            <div className="p-10 flex items-center justify-between border-b border-gold/10">
              <div className="flex items-center">
                <ShoppingBag className="text-gold mr-4" size={28} />
                <h2 className="text-2xl font-serif font-black italic text-olive">Your Selection</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-3 hover:bg-gold hover:text-white rounded-full transition-all text-olive"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-10">
              {cartWithData.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-32 h-32 rounded-full bg-gold/5 flex items-center justify-center mb-8 border border-gold/10">
                    <ShoppingBag className="text-gold/30" size={48} />
                  </div>
                  <h3 className="text-2xl font-serif italic text-olive mb-4">Awaiting Your Choice</h3>
                  <p className="text-olive/60 text-sm mb-10 leading-relaxed max-w-[250px]">Modesty begins with a single selection. Elevate your wardrobe today.</p>
                  <button 
                    onClick={onClose}
                    className="px-10 py-5 bg-olive text-white text-[10px] font-black tracking-[0.3em] uppercase rounded-full hover:bg-gold transition-all shadow-xl shadow-olive/20"
                  >
                    Return to Boutique
                  </button>
                </div>
              ) : (
                cartWithData.map((item) => (
                  <div key={item.id} className="flex space-x-6 group">
                    <div className="w-28 aspect-[3/4] bg-olive/5 rounded-3xl overflow-hidden shadow-sm">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-serif font-black italic text-olive">{item.name}</h4>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-gold/40 hover:text-brand-red transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <span className="text-[10px] text-gold font-black uppercase tracking-[0.2em] mb-4">{item.category}</span>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center bg-white rounded-full border border-gold/10 p-1">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:text-gold transition-colors text-olive"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 text-sm font-black text-olive">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:text-gold transition-colors text-olive"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="text-lg font-black text-olive">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartWithData.length > 0 && (
              <div className="p-10 border-t border-gold/10 bg-white/50 backdrop-blur-md">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-olive/50 text-[10px] font-black tracking-[0.3em] uppercase">Estimated Sum</span>
                  <span className="text-3xl font-black text-olive">{formatCurrency(subtotal)}</span>
                </div>
                <p className="text-[9px] text-olive/40 uppercase tracking-[0.2em] mb-8 font-black">Complimentary shipping on orders above $200.</p>
                <button 
                  onClick={onCheckout}
                  className="w-full py-6 bg-olive text-white font-black tracking-[0.3em] uppercase text-xs rounded-full hover:bg-gold transition-all duration-500 shadow-2xl shadow-olive/20 flex items-center justify-center"
                >
                  Proceed to Checkout <ArrowRight className="ml-3 text-white" size={18} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
