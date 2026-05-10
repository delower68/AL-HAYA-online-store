import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';
import { GALLERY_IMAGES } from '../constants';

export default function Gallery() {
  return (
    <section className="py-24 px-6 bg-beige transition-colors grainy-bg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6 px-4">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-gold font-black uppercase tracking-widest text-xs mb-4 italic"
            >
              Street Shots
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tighter text-olive uppercase leading-none"
            >
              LOOK <br />
              <span className="text-outline text-transparent">BOOK</span>
            </motion.h2>
          </div>
          <motion.a
            href="#"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center text-[10px] font-black tracking-[0.3em] text-olive hover:text-gold transition-colors uppercase"
          >
            TAG US @ALHAYA_OFFICIAL <Instagram className="ml-3" size={18} />
          </motion.a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {GALLERY_IMAGES.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.8 }}
              className="relative aspect-square overflow-hidden group rounded-3xl shadow-md hover:shadow-xl transition-all"
            >
              <img
                src={image}
                alt={`Gallery ${index}`}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-olive/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                <Instagram className="text-white" size={28} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
