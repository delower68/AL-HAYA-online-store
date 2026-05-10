import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80" 
          alt="Street Culture" 
          className="w-full h-full object-cover grayscale opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 w-full py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-[#FF3E3E] mb-6 block">
              Our Manifesto
            </span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase mb-12 leading-[0.85]">
              Redefining the <br />
              <span className="text-white/20">Street Code</span>
            </h2>
            <div className="space-y-8 text-xl text-white/70 leading-relaxed font-medium">
              <p>
                Founded in 2012, AL-HAYĀ started with a single vision: to merge traditional modesty with the raw, uncompromising energy of urban culture. We don't just make clothes; we build identity.
              </p>
              <p>
                Our philosophy is simple—Heavyweight fabrics, tactical functionality, and silhouettes that command respect without saying a word. Every piece is engineered for the concrete landscape.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 mt-16 pt-16 border-t border-white/10">
              <div>
                <h4 className="text-4xl font-black text-white mb-2 underline decoration-[#FF3E3E] decoration-4 underline-offset-8">12+</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-4">Years Heritage</p>
              </div>
              <div>
                <h4 className="text-4xl font-black text-white mb-2 underline decoration-[#FF3E3E] decoration-4 underline-offset-8">50k+</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-4">Community</p>
              </div>
              <div className="hidden md:block">
                <h4 className="text-4xl font-black text-white mb-2 underline decoration-[#FF3E3E] decoration-4 underline-offset-8">100%</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-4">Ethical Source</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative vertical text */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:block">
        <span className="text-[10px] font-black text-white/10 uppercase tracking-[1em] rotate-90 block origin-right">
          ESTABLISHED TWO THOUSAND TWELVE — AL-HAYĀ URBAN WEAR
        </span>
      </div>
    </section>
  );
}
