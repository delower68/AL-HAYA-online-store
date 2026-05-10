import { motion } from 'motion/react';
import { CATEGORIES } from '../constants';
import { ArrowRight } from 'lucide-react';

export default function FeaturedCategories() {
  return (
    <section id="categories" className="py-24 px-6 transition-colors bg-beige grainy-bg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
          <div>
            <h3 className="text-gold font-black uppercase tracking-widest text-xs mb-4 italic">The Vault</h3>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-olive uppercase leading-none">
              CURATED <br />
              <span className="text-outline text-transparent">COLLECTIONS</span>
            </h2>
          </div>
          <button className="text-xs font-black tracking-widest uppercase text-olive border-b-4 border-gold pb-2 flex items-center space-x-3 group">
            <span>Explore All Drops</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group relative h-[500px] overflow-hidden rounded-[40px] cursor-pointer shadow-xl"
            >
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                referrerPolicy="no-referrer"
              />
              {/* Overlay with subtle pattern or gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-olive/90 via-olive/20 to-transparent flex flex-col justify-end p-10">
                <span className="text-gold font-black text-[10px] tracking-[0.3em] uppercase mb-2">
                  Drop: {category.count} Sets
                </span>
                <h3 className="text-white font-black text-3xl tracking-tighter uppercase mb-4">
                  {category.name}
                </h3>
                <div className="w-10 h-[2px] bg-gold group-hover:w-full transition-all duration-500" />
              </div>
              <div className="absolute top-6 right-6 bg-gold text-white p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 duration-500">
                <ArrowRight size={24} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
