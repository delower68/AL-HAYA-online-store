import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2000&auto=format&fit=crop"
];

interface HeroProps {
  onShopNow: () => void;
}

export default function Hero({ onShopNow }: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[800px] flex items-center overflow-hidden bg-black">
      {/* Main Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img 
              src={BACKGROUND_IMAGES[currentImageIndex]} 
              alt="Modest Streetwear Impact - AL-HAYA" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
        {/* Dark Overlays for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 sm:px-12 relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center mb-8 h-10"
          >
            <div className="bg-[#FF3E3E] px-6 h-full flex items-center">
              <span className="text-white font-black text-xs tracking-widest uppercase italic">Est. 2025</span>
            </div>
            <div className="bg-black/80 backdrop-blur-md px-8 h-full flex items-center">
              <span className="text-white font-black text-xs tracking-widest uppercase">Premium Streetwear</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h1 className="text-[14vw] md:text-[10vw] font-black text-white leading-[0.85] tracking-tighter uppercase">
              DEFINE <br />
              YOUR <br />
              <span className="text-white/60">IMPACT</span>
            </h1>
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button 
              onClick={onShopNow}
              className="bg-white text-black px-12 py-5 font-black uppercase tracking-widest text-sm hover:bg-gold hover:text-white transition-all duration-300 shadow-2xl"
            >
              SHOP NOW
            </button>
          </motion.div>
        </div>
      </div>

      {/* Side Decorative Text */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none opacity-20">
         <div className="rotate-90 origin-right">
            <span className="text-8xl font-black text-outline text-transparent uppercase tracking-tighter">AL-HAYĀ</span>
         </div>
      </div>
    </section>
  );
}
