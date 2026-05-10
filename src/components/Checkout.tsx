import { useState, useMemo } from 'react';
import { ChevronRight, Trash2, MapPin, Phone, User, ChevronDown, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { CartItem } from '../types';
import { formatCurrency, cn } from '../lib/utils';

interface CheckoutProps {
  items: CartItem[];
  onBack: () => void;
  onRemoveItem: (id: string) => void;
}

export default function Checkout({ items, onBack, onRemoveItem }: CheckoutProps) {
  const [deliveryArea, setDeliveryArea] = useState<'INSIDE' | 'OUTSIDE' | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    note: '',
  });

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  const shippingCharge = deliveryArea === 'INSIDE' ? 60 : deliveryArea === 'OUTSIDE' ? 120 : 0;
  const total = subtotal + shippingCharge;

  return (
    <div className="bg-white min-h-screen">
      {/* Black Header Header */}
      <div className="bg-black text-white pt-28 pb-12 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">SECURE CHECKOUT</h1>
          <div className="flex items-center space-x-6 text-[10px] font-black tracking-widest uppercase">
            <span className="text-white/40">BAG</span>
            <span className="text-white/40">/</span>
            <span className="text-[#FF3E3E] border-b-2 border-[#FF3E3E] pb-1">DETAILS</span>
            <span className="text-white/40">/</span>
            <span className="text-white/40">DONE</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Side: Form */}
          <div className="lg:col-span-2 space-y-16">
            {/* 1. Shipping Details */}
            <section>
              <div className="flex items-center space-x-4 mb-10">
                <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-black">1</div>
                <h2 className="text-2xl text-[#6B7280] font-bold uppercase tracking-tight">SHIPPING DETAILS</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black">FULL NAME</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Adnan Islam"
                    className="w-full border border-gray-200 p-4 font-medium focus:border-black outline-none transition-colors placeholder:text-black/20"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black">PHONE NUMBER</label>
                  <input 
                    type="text" 
                    placeholder="017XXXXXXXX"
                    className="w-full border border-gray-200 p-4 font-medium focus:border-black outline-none transition-colors placeholder:text-black/20"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <label className="text-[10px] font-black uppercase tracking-widest text-black">DELIVERY AREA</label>
                <div className="relative">
                  <select 
                    className="w-full border text-[#6B7280] border-gray-200 p-4 font-medium appearance-none focus:border-black outline-none transition-colors bg-white"
                    onChange={(e) => setDeliveryArea(e.target.value as any)}
                    defaultValue=""
                  >
                    <option value="" disabled>SELECT YOUR LOCATION</option>
                    <option value="INSIDE">Inside Dhaka (৳60)</option>
                    <option value="OUTSIDE">Outside Dhaka (৳120)</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black/40" size={20} />
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <label className="text-[10px] font-black uppercase tracking-widest text-black">FULL ADDRESS</label>
                <textarea 
                  rows={3}
                  placeholder="House No, Road No, Area details..."
                  className="w-full border border-gray-200 p-4 font-medium focus:border-black outline-none transition-colors resize-none placeholder:text-black/20"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-black">ORDER NOTE (OPTIONAL)</label>
                <input 
                  type="text" 
                  placeholder="Special instructions..."
                  className="w-full border border-gray-200 p-4 font-medium focus:border-black outline-none transition-colors placeholder:text-black/20"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                />
              </div>
            </section>

            {/* 2. Payment Method */}
            <section>
              <div className="flex items-center space-x-4 mb-10">
                <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-black">2</div>
                <h2 className="text-2xl text-black font-bold uppercase tracking-tight">PAYMENT METHOD</h2>
              </div>

              <div className="space-y-4">
                <div className="border-2 border-black p-6 flex justify-between items-center group cursor-pointer">
                  <div className="flex items-center space-x-6">
                    <div className="w-6 h-6 border-4 border-black rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-black rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-black uppercase tracking-widest text-sm text-black">CASH ON DELIVERY</h4>
                      <p className="text-[10px] font-bold text-black/60 uppercase tracking-widest">PAY UPON RECEIVING ORDER.</p>
                    </div>
                  </div>
                  <div className="text-2xl">💵</div>
                </div>

                <div className="border border-gray-100 p-6 flex justify-between items-center opacity-40 cursor-not-allowed">
                  <div className="flex items-center space-x-6">
                    <div className="w-6 h-6 border-2 border-gray-200 rounded-full" />
                    <div>
                      <h4 className="text-[#6B7280] uppercase tracking-widest text-sm">ONLINE PAYMENT</h4>
                      <p className="text-[10px] font-bold text-black/60 uppercase tracking-widest">COMING SOON</p>
                    </div>
                  </div>
                  <div className="text-2xl grayscale">💳</div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:sticky lg:top-32 h-fit">
            <div className="border-2 border-black p-8 bg-white">
                  <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl text-[#6B7280] font-bold uppercase tracking-tight">ORDER SUMMARY</h3>
                <button onClick={onBack} className="text-[10px] font-black uppercase tracking-widest text-black/60 hover:text-black transition-colors border-b border-black/20">EDIT BAG</button>
              </div>

              <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {items.length === 0 ? (
                  <div className="text-center py-10 text-black/40 font-bold uppercase text-xs">Your bag is empty</div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-20 h-20 bg-gray-50 flex items-center justify-center p-2 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-auto object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-[11px] font-black uppercase tracking-widest text-black truncate">{item.name}</h4>
                            <div className="inline-block bg-black text-white text-[9px] font-black px-2 py-0.5 mt-1 uppercase tracking-widest">
                               SIZE: 2-3 YRS {/* Sample variant */}
                            </div>
                            <div className="text-[10px] font-bold text-black/60 mt-1 uppercase tracking-widest">
                              {item.quantity} × {formatCurrency(item.price)}
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                             <span className="text-[11px] font-black">{formatCurrency(item.price * item.quantity)}</span>
                             <button 
                               onClick={() => onRemoveItem(item.id)}
                               className="text-black/40 hover:text-[#FF3E3E] transition-colors mt-2"
                             >
                               <Trash2 size={14} />
                             </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="space-y-4 border-t-2 border-black pt-6">
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                  <span className="text-black/80">SUBTOTAL</span>
                  <span className="text-black">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                  <span className="text-black/80">SHIPPING</span>
                  <div className="text-right">
                    <span className="text-black">{formatCurrency(shippingCharge)}</span>
                    <p className="text-[8px] text-[#FF3E3E] mt-0.5">*Based on location</p>
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-100 flex justify-between items-end">
                  <span className="text-sm text-black font-bold uppercase tracking-tighter">TOTAL</span>
                  <span className="text-3xl text-black font-bold uppercase tracking-widest leading-none">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              <button 
                disabled={items.length === 0 || !deliveryArea || !formData.fullName || !formData.phone || !formData.address}
                className="w-full bg-[#E52D2D] text-white font-black uppercase tracking-[0.2em] py-5 mt-10 hover:bg-[#d42525] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs flex items-center justify-center space-x-2"
              >
                CONFIRM ORDER
              </button>
              
              <div className="flex items-center justify-center space-x-2 mt-6 text-black/30">
                <CheckCircle2 size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest">SECURE SSL ENCRYPTED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
