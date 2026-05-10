import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
  onBack: () => void;
}

export default function Login({ onLogin, onBack }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      onLogin();
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-white/40 hover:text-white mb-12 transition-colors group text-[10px] font-black uppercase tracking-[0.3em]"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Return to Store</span>
        </button>

        <div className="bg-[#111111] border border-white/5 p-12 shadow-2xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-black tracking-tighter text-white mb-2 uppercase">AL-HAYĀ</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gold/60">Admin Central</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Credentials</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  type="email" 
                  placeholder="USERNAME OR EMAIL"
                  required
                  className="w-full bg-white/5 border border-white/10 p-4 pl-12 text-white font-medium focus:border-gold outline-none transition-colors placeholder:text-white/10 text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Access Code</label>
                <a href="#" className="text-[9px] font-black uppercase tracking-widest text-gold/40 hover:text-gold">Recovery</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/5 border border-white/10 p-4 pl-12 text-white font-medium focus:border-gold outline-none transition-colors placeholder:text-white/10 text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-gold text-black p-5 font-black uppercase tracking-[0.3em] text-xs hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center space-x-3"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Initialize Access</span>
              )}
            </button>
          </form>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[9px] text-white/20 tracking-[0.3em] uppercase font-black">
            System Authorized Access Only. All activities are monitored.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
