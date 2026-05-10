import { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onHomeClick: () => void;
  onCategoryClick: (category: string) => void;
}

export default function Navbar({ cartCount, onCartClick, onHomeClick, onCategoryClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'KIDS', href: '#' },
    { name: 'MEN', href: '#' },
    { name: 'WOMEN', href: '#' },
    { name: 'ABOUT', href: '#about' },
    { name: 'NEW DROPS', href: '#', isHighlight: true },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 sm:px-12 py-4 bg-white border-b border-gray-100',
        isScrolled ? 'shadow-lg' : ''
      )}
    >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Section: Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={onHomeClick}
          >
            <div className="w-8 h-8 bg-black flex items-center justify-center p-1">
               <span className="text-[10px] font-black text-white leading-none text-center">AH<br/>CO</span>
            </div>
            <div className="text-xl font-black tracking-tighter text-black uppercase">
              AL-HAYĀ
            </div>
          </div>

          {/* Center Section: Main Links */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith('#') && link.href.length > 1) {
                    onHomeClick();
                  } else if (link.name !== 'ABOUT') {
                    e.preventDefault();
                    onCategoryClick(link.name);
                  }
                }}
                className={cn(
                  "text-xs font-black uppercase tracking-widest transition-colors relative group",
                  link.isHighlight ? "text-[#FF3E3E]" : "text-black/80 hover:text-[#FF3E3E]"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF3E3E] transition-all duration-300 group-hover:w-full",
                  link.isHighlight ? "w-full" : ""
                )} />
              </a>
            ))}
          </div>

          {/* Right Section: Search & Icons */}
          <div className="flex items-center space-x-6">
            <button className="text-black hover:text-red-500 transition-colors">
              <Search size={22} />
            </button>
            <button 
              onClick={onCartClick}
              className="relative text-black hover:text-red-500 transition-colors"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF3E3E] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="hidden lg:block text-black hover:text-red-500 transition-colors">
              <User size={22} />
            </button>
            <button
                className="lg:hidden text-black hover:text-red-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <div className="bg-black p-1 text-white">
                  {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </div>
            </button>
          </div>
        </div>


      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            className="lg:hidden fixed top-[72px] left-0 w-full bg-white dark:bg-stone-900 border-b border-stone-100 dark:border-stone-800 origin-top"
          >
            <div className="flex flex-col space-y-4 p-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-black uppercase tracking-[0.3em] text-black hover:text-[#FF3E3E] transition-colors"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (link.href.startsWith('#') && link.href.length > 1) {
                      onHomeClick();
                    } else if (link.name !== 'ABOUT') {
                      onCategoryClick(link.name);
                    }
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
