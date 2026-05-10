import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import Overview from './Overview';
import ProductManager from './ProductManager';
import OrderManager from './OrderManager';

interface DashboardProps {
  onLogout: () => void;
}

export type AdminView = 'OVERVIEW' | 'PRODUCTS' | 'ORDERS' | 'CUSTOMERS' | 'CATEGORIES' | 'SETTINGS';

export default function Dashboard({ onLogout }: DashboardProps) {
  const [activeView, setActiveView] = useState<AdminView>(() => {
    return (localStorage.getItem('alhaya_admin_activeView') as AdminView) || 'OVERVIEW';
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Sync activeView to localStorage
  useState(() => {
    const saved = localStorage.getItem('alhaya_admin_activeView');
    if (saved && saved !== activeView) {
      // already handled in init
    }
  });

  const handleViewChange = (view: AdminView) => {
    setActiveView(view);
    localStorage.setItem('alhaya_admin_activeView', view);
  };

  const handleLogout = () => {
    localStorage.removeItem('alhaya_currentView');
    localStorage.removeItem('alhaya_admin_activeView');
    onLogout();
  };

  return (
    <div className="flex h-screen bg-[#F8F8F8] overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar 
        activeView={activeView} 
        onViewChange={handleViewChange} 
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopHeader 
          activeView={activeView} 
          onLogout={handleLogout}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
        
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeView === 'OVERVIEW' && <Overview />}
              {activeView === 'PRODUCTS' && <ProductManager />}
              {activeView === 'ORDERS' && <OrderManager />}
              {/* Other views will be added as needed or shown as placeholders */}
              {!['OVERVIEW', 'PRODUCTS', 'ORDERS'].includes(activeView) && (
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                  <div className="text-4xl mb-4">🏗️</div>
                  <h2 className="text-xl font-bold text-gray-400 uppercase tracking-widest">{activeView} MODULE UNDER CONSTRUCTION</h2>
                  <p className="text-gray-400 mt-2">We are currently building this section of the dashboard.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
