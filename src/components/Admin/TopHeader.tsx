import { Search, Bell, Moon, Sun, LogOut, ChevronDown, UserCircle, Settings } from 'lucide-react';
import { useState } from 'react';

interface TopHeaderProps {
  activeView: string;
  onLogout: () => void;
  onToggleSidebar: () => void;
}

export default function TopHeader({ activeView, onLogout, onToggleSidebar }: TopHeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 relative z-20">
      {/* View Title */}
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-black uppercase tracking-widest text-black/80">{activeView}</h2>
        <div className="h-6 w-[1px] bg-gray-100" />
        <div className="hidden lg:flex items-center text-[10px] font-bold text-gray-400 space-x-2 uppercase tracking-[0.2em]">
            <span>Admin</span>
            <span>/</span>
            <span className="text-black">{activeView}</span>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-6">
        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-50 border border-gray-100 rounded-lg px-4 py-2 w-80 group focus-within:border-gray-200 transition-all">
          <Search size={16} className="text-gray-400 group-focus-within:text-black transition-colors" />
          <input 
            type="text" 
            placeholder="Search analytics, products..."
            className="bg-transparent border-none outline-none ml-3 text-sm w-full font-medium"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-black transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#FF3E3E] rounded-full border-2 border-white" />
        </button>

        {/* Theme Toggle */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 text-gray-400 hover:text-black transition-colors"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="h-8 w-[1px] bg-gray-100" />

        {/* Profile */}
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-3 group"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center p-0.5">
               <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center text-gray-500 font-bold uppercase text-[10px]">
                  AD
               </div>
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-[10px] font-black uppercase tracking-widest leading-none">Admin User</p>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Super Admin</p>
            </div>
            <ChevronDown size={14} className="text-gray-400 group-hover:text-black" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-4 w-56 bg-white border border-gray-100 shadow-2xl rounded-xl overflow-hidden py-2 z-50">
              <button className="w-full flex items-center px-6 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors font-medium">
                <UserCircle size={18} className="mr-3" />
                Profile Settings
              </button>
              <button className="w-full flex items-center px-6 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors font-medium">
                <Settings size={18} className="mr-3" />
                System Preferences
              </button>
              <div className="h-[1px] bg-gray-50 my-2" />
              <button 
                onClick={onLogout}
                className="w-full flex items-center px-6 py-3 text-sm text-[#FF3E3E] hover:bg-red-50 transition-colors font-bold"
              >
                <LogOut size={18} className="mr-3" />
                Logout Session
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
