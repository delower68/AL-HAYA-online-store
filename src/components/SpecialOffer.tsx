import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function SpecialOffer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 45,
    seconds: 32
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-7xl mx-auto relative overflow-hidden h-[700px] flex items-center luxury-gradient rounded-[60px] shadow-2xl"
      >
        <div className="absolute inset-0 opacity-50 mix-blend-overlay">
          <img
            src="https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1920&auto=format&fit=crop"
            alt="Urban Lifestyle"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        
        {/* Decorative Overlay Pattern */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

        <div className="relative z-10 px-8 md:px-24 mx-auto text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-4 mb-4"
          >
            <span className="bg-gold px-6 py-2 rounded-full text-white font-sans font-black tracking-widest uppercase text-xs">
              Street Drop Flash
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl md:text-[5rem] font-black text-white mb-4 leading-[0.9] uppercase tracking-tighter"
          >
            STREET 
            <span className="text-outline text-transparent">CRED</span>
          </motion.h2>

          <p className="text-white/90 text-lg md:text-xl font-bold mb-10 max-w-xl mx-auto uppercase tracking-wide leading-relaxed">
            Level up your fit with our exclusive tactical collection before the timer hits zero.
          </p>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-10">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((unit, i) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
                className="flex flex-col items-center mt-4"
              >
                <div className="w-24 h-24 md:w-36 md:h-36 rounded-2xl border-4 border-gold/40 bg-white/5 backdrop-blur-xl flex items-center justify-center  shadow-2xl relative group">
                  <span className="text-4xl md:text-7xl font-black text-white relative z-10">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-gold font-black">{unit.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="max-w-md mx-auto mb-8 px-4">
             <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gold mb-3">
                <span>Sold: 88%</span>
                <span>ONLY 5 PIECES LEFT</span>
             </div>
             <div className="w-full h-3 bg-white/10 rounded-none overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '88%' }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="h-full bg-gold shadow-[0_0_20px_rgba(255,62,62,0.5)]"
                />
             </div>
          </div>


          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="px-20 py-8 bg-white text-black font-black tracking-[0.4em] uppercase text-sm rounded-none hover:bg-gold hover:text-white transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center mx-auto"
          >
            <span>Secure Your Fit</span>
          </motion.button>
        </div>

        {/* Traditional Patterns in corners */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full border border-gold/10 animate-pulse" />
        <div className="absolute -top-40 -right-40 w-120 h-120 rounded-full border border-gold/5" />
      </motion.div>
    </section>
  );
}
