import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Layers, 
  Settings, 
  ChevronLeft,
  Menu,
  TrendingUp,
  Truck,
  Database
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { AdminView } from './Dashboard';

interface SidebarProps {
  activeView: AdminView;
  onViewChange: (view: AdminView) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const MENU_ITEMS = [
  { id: 'OVERVIEW', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'PRODUCTS', label: 'Products', icon: Package },
  { id: 'ORDERS', label: 'Orders', icon: ShoppingCart },
  { id: 'CATEGORIES', label: 'Categories', icon: Layers },
  { id: 'CUSTOMERS', label: 'Customers', icon: Users },
  { id: 'SETTINGS', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeView, onViewChange, isOpen, onToggle }: SidebarProps) {
  return (
    <motion.aside 
      animate={{ width: isOpen ? 280 : 80 }}
      className="bg-black text-white flex flex-col h-full relative z-30 transition-all border-r border-white/5"
    >
      {/* Brand */}
      <div className="p-8 flex items-center mb-10 overflow-hidden whitespace-nowrap">
        <div className="w-8 h-8 bg-gold rounded-sm flex-shrink-0 flex items-center justify-center">
            <span className="text-black font-black text-xl">A</span>
        </div>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-4"
          >
            <h1 className="text-xl font-black tracking-tighter uppercase italic">AL-HAYĀ</h1>
            <p className="text-[8px] font-bold text-gold tracking-[0.2em] uppercase opacity-60">Admin Central</p>
          </motion.div>
        )}
      </div>

      {/* Toggle Button */}
      <button 
        onClick={onToggle}
        className="absolute -right-3 top-24 w-6 h-6 bg-gold text-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        {isOpen ? <ChevronLeft size={14} /> : <Menu size={14} />}
      </button>

      {/* Nav Items */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as AdminView)}
              className={cn(
                "w-full flex items-center p-4 transition-all duration-300 group rounded-lg",
                isActive 
                  ? "bg-gold text-black" 
                  : "text-white/40 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon size={20} className={cn("flex-shrink-0", isActive ? "text-black" : "text-white/40 group-hover:text-white")} />
              {isOpen && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="ml-4 font-black uppercase text-[10px] tracking-widest"
                >
                  {item.label}
                </motion.span>
              )}
              {!isOpen && isActive && (
                 <div className="absolute left-0 w-1 h-8 bg-gold rounded-r-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-6 mt-auto border-t border-white/5">
         {isOpen ? (
            <div className="bg-white/5 p-4 rounded-xl">
               <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                     <TrendingUp size={14} className="text-gold" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-white">Daily Sales</p>
                     <p className="text-[9px] text-white/40">+12% from yesterday</p>
                  </div>
               </div>
               <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="w-[70%] h-full bg-gold" />
               </div>
            </div>
         ) : (
            <div className="flex justify-center">
               <Database size={20} className="text-white/20" />
            </div>
         )}
      </div>
    </motion.aside>
  );
}
