import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onAdminClick?: () => void;
}

export default function Footer({ onAdminClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-black text-white pt-20 pb-12 px-12 transition-colors border-t border-white/5 grainy-bg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24 text-white">
          {/* Brand */}
          <div className="space-y-10">
            <a href="/" className="text-4xl font-black tracking-tighter flex items-center text-white uppercase">
              AL-HAYĀ
            </a>
            <p className="text-white/60 font-medium leading-relaxed text-base italic">
              "Redefining the street code." Providing premium heavyweight essentials and tactical aesthetics since 2012.
            </p>
            <div className="flex space-x-6">
              {[Instagram, Facebook, Twitter, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-none border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all transform hover:-translate-y-2 duration-500 shadow-sm">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-black tracking-[0.3em] uppercase mb-10 text-gold border-b border-white/10 pb-4 inline-block">Drops</h4>
            <ul className="space-y-5 text-sm font-black tracking-tight uppercase tracking-[0.1em]">
              {['Oversized Tees', 'Tactical Hoodies', 'Cargo & Denim', 'Limited Bags', 'Urban Accessories'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/70 hover:text-gold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-[10px] font-black tracking-[0.3em] uppercase mb-10 text-gold border-b border-white/10 pb-4 inline-block">Support</h4>
            <ul className="space-y-5 text-sm font-black tracking-tight uppercase tracking-[0.1em]">
              <li>
                <a href="#about" className="text-white/70 hover:text-gold transition-colors">
                  Our Manifesto
                </a>
              </li>
              {['Shipping Track', 'Hassle-Free Returns', 'Garment Care', 'Secure Checkout'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/70 hover:text-gold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[10px] font-black tracking-[0.3em] uppercase mb-10 text-gold border-b border-white/10 pb-4 inline-block">The Boutique</h4>
            <ul className="space-y-8 text-sm font-black tracking-tight italic">
              <li className="flex items-start space-x-5">
                <MapPin className="text-gold mt-1 shrink-0" size={20} />
                <span className="text-white/70 leading-relaxed">
                  Gulshan Ave, Dhaka 1212 <br />
                  Signature Boutique 
                </span>
              </li>
              <li className="flex items-center space-x-5">
                <Phone className="text-gold shrink-0" size={20} />
                <span className="text-white/70 tracking-widest">+880 (1) ALHAYA</span>
              </li>
              <li className="flex items-center space-x-5">
                <Mail className="text-gold shrink-0" size={20} />
                <span className="text-white/70 tracking-widest">concierge@al-haya.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[9px] text-white/40 tracking-[0.4em] uppercase font-black">
            &copy; {currentYear} AL-HAYĀ URBAN CULTURE CO. REDEFINING THE STREET CODE.
          </p>
          <div className="flex space-x-10 text-[9px] text-white/40 tracking-[0.4em] uppercase font-black">
            <span className="cursor-pointer hover:text-gold transition-colors">Privacy</span>
            <span className="cursor-pointer hover:text-gold transition-colors">Terms</span>
            <button 
              onClick={onAdminClick}
              className="cursor-pointer hover:text-gold transition-colors underline underline-offset-4 decoration-gold/30"
            >
              Admin Central
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
