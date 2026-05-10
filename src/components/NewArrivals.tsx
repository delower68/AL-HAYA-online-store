import { motion } from 'motion/react';
import { PRODUCTS } from '../constants';
import { ArrowRight } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

interface NewArrivalsProps {
  onProductClick: (id: string) => void;
}

export default function NewArrivals({ onProductClick }: NewArrivalsProps) {
  const newArrivals = PRODUCTS.filter(p => p.isNew);

  return (
    <section id="new-arrivals" className="py-24 px-6 transition-colors bg-beige grainy-bg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-sans font-black tracking-tighter text-olive uppercase"
          >
            New Arrivals
          </motion.h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="text-[10px] font-black tracking-[0.3em] uppercase text-gold border-b-2 border-gold pb-2 hover:text-olive hover:border-olive transition-all"
          >
            VIEW ALL DROPS
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {newArrivals.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 1 }}
              onClick={() => onProductClick(product.id)}
              className="flex flex-col lg:flex-row bg-white rounded-[50px] overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-700 border border-gold/5 cursor-pointer"
            >
              <div className="lg:w-1/2 aspect-square overflow-hidden bg-olive/5 flex items-center justify-center p-8">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-contain transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="lg:w-1/2 p-10 lg:p-14 flex flex-col justify-center">
                <span className="text-gold font-serif italic text-3xl mb-4">Edition 2026</span>
                <h3 className="text-3xl font-sans font-black tracking-tighter mb-6 text-olive uppercase leading-none">{product.name}</h3>
                <p className="text-olive/70 mb-10 font-medium leading-relaxed italic">
                  Experience the pinnacle of modest fashion with our latest handcrafted release.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-olive">{formatCurrency(product.price)}</span>
                  <button className="w-14 h-14 bg-[#9A9A9A] text-white rounded-full flex items-center justify-center hover:bg-gold transition-all duration-500 shadow-xl shadow-olive/10 group-hover:rotate-[-45deg]">
                    <ArrowRight size={22} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
