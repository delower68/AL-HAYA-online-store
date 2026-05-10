import { motion } from 'motion/react';
import { Send } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-beige grainy-bg">
      <div className="max-w-4xl mx-auto relative z-10 text-center text-olive">
        <div className="mb-6 text-gold font-serif italic text-4xl">Timeless Elegance</div>
        <h2 className="text-4xl md:text-6xl font-sans font-black mb-8 tracking-tighter uppercase">
          Join The AL-HAYĀ Community
        </h2>
        <p className="text-olive/70 dark:text-stone-300 text-lg mb-12 max-w-xl mx-auto font-medium italic">
          Experience the latest in modest fashion and lifestyle. Subscribe for exclusive early access to new collections and boutique events.
        </p>

        <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Your Email Address" 
            className="flex-1 px-10 py-6 bg-white rounded-full text-olive font-black uppercase tracking-widest text-[10px] shadow-2xl focus:outline-none focus:ring-2 focus:ring-gold border-gold/10"
          />
          <button className="px-12 py-6 bg-olive text-white rounded-full font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:bg-gold transition-all flex items-center justify-center">
            Subscribe <Send size={16} className="ml-4" />
          </button>
        </form>
      </div>

      {/* Decorative Islamic elements */}
      <div className="absolute top-10 left-10 text-gold opacity-10">
        <svg width="80" height="80" viewBox="0 0 40 40" fill="currentColor">
          <path d="M20 0L24 16L40 20L24 24L20 40L16 24L0 20L16 16L20 0Z" />
        </svg>
      </div>
      <div className="absolute bottom-10 right-10 text-olive opacity-5 rotate-12">
         <svg width="200" height="200" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
            <circle cx="50" cy="50" r="45" />
            <circle cx="50" cy="50" r="35" />
            <path d="M50 0 L50 100 M0 50 L100 50 M15 15 L85 85 M85 15 L15 85" />
         </svg>
      </div>
    </section>
  );
}
