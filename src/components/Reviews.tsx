import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { REVIEWS } from '../constants';

export default function Reviews() {
  return (
    <section className="py-24 px-6 bg-beige transition-colors grainy-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-gold font-black uppercase tracking-widest text-xs mb-4 italic"
          >
            Verified Legit
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black tracking-tighter text-olive uppercase leading-tight"
          >
            STREET <br />
            <span className="text-outline text-transparent">CERTIFIED</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              className="bg-white p-12 relative overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-700 rounded-2xl border border-olive/5"
            >
              <Quote className="absolute top-8 right-8 text-olive/5 w-24 h-24 -z-0" />
              
              <div className="relative z-10">
                <div className="flex mb-8 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" stroke="none" />
                  ))}
                </div>
                
                <p className="text-olive mb-10 leading-relaxed font-black text-xl uppercase tracking-tighter">
                  "{review.content}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all shadow-lg">
                    <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-5">
                    <h4 className="text-xl font-black text-olive uppercase tracking-tight">{review.name}</h4>
                    <span className="text-[10px] text-gold font-black uppercase tracking-[0.2em]">{review.role}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
