import { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Printer, 
  Truck, 
  CheckCircle, 
  XCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  Download,
  X,
  CreditCard,
  User,
  MapPin,
  Calendar
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { AnimatePresence, motion } from 'motion/react';

type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

interface Order {
  id: string;
  customer: { name: string; email: string; phone?: string; address?: string };
  date: string;
  amount: string;
  status: OrderStatus;
  items: number;
  payment: string;
}

const ORDERS: Order[] = [
  { id: 'ORD-2024-001', customer: { name: 'Adnan Islam', email: 'adnan@demo.com', phone: '01700-000001', address: 'Dhanmondi, Dhaka' }, date: '2024-05-09 18:30', amount: '৳4,500', status: 'DELIVERED', items: 3, payment: 'CASH ON DELIVERY' },
  { id: 'ORD-2024-002', customer: { name: 'Sarah Khan', email: 'sarah@demo.com', phone: '01700-000002', address: 'Gulshan, Dhaka' }, date: '2024-05-09 17:15', amount: '৳2,200', status: 'PENDING', items: 1, payment: 'ONLINE PAYMENT' },
  { id: 'ORD-2024-003', customer: { name: 'Rafiq Ahmed', email: 'rafiq@demo.com', phone: '01700-000003', address: 'Uttara, Dhaka' }, date: '2024-05-09 15:45', amount: '৳5,800', status: 'PROCESSING', items: 2, payment: 'bKash' },
  { id: 'ORD-2024-004', customer: { name: 'Maya Begum', email: 'maya@demo.com', phone: '01700-000004', address: 'Banani, Dhaka' }, date: '2024-05-08 22:10', amount: '৳8,900', status: 'SHIPPED', items: 5, payment: 'CASH ON DELIVERY' },
  { id: 'ORD-2024-005', customer: { name: 'Zayed Hassan', email: 'zayed@demo.com', phone: '01700-000005', address: 'Mirpur, Dhaka' }, date: '2024-05-08 19:30', amount: '৳3,400', status: 'CANCELLED', items: 2, payment: 'ONLINE PAYMENT' },
];

export default function OrderManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'ALL' | OrderStatus>('ALL');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const filteredOrders = ORDERS.filter(order => 
    (activeTab === 'ALL' || order.status === activeTab) &&
    (order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
     order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const exportToCSV = () => {
    const headers = ['Order ID', 'Customer Name', 'Customer Email', 'Date', 'Amount', 'Status', 'Items', 'Payment'];
    const rows = ORDERS.map(order => [
      order.id,
      order.customer.name,
      order.customer.email,
      order.date,
      order.amount.replace('৳', ''),
      order.status,
      order.items,
      order.payment
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `al-haya-orders-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = (order: Order) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Invoice - ${order.id}</title>
            <style>
              body { font-family: sans-serif; padding: 40px; color: #333; }
              .header { border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 30px; }
              .order-info { margin-bottom: 30px; }
              .order-info div { margin-bottom: 10px; }
              table { width: 100%; border-collapse: collapse; }
              th, td { text-align: left; padding: 12px; border-bottom: 1px solid #eee; }
              .total { margin-top: 30px; text-align: right; font-weight: bold; font-size: 20px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>AL-HAYA ABAYA</h1>
              <p>Luxury Islamic Artifacts</p>
            </div>
            <div class="order-info">
              <h2>Invoice: ${order.id}</h2>
              <div><strong>Client:</strong> ${order.customer.name}</div>
              <div><strong>Email:</strong> ${order.customer.email}</div>
              <div><strong>Date:</strong> ${order.date}</div>
              <div><strong>Payment Status:</strong> ${order.status}</div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Order Items Bundle</td>
                  <td>${order.items}</td>
                  <td>${order.amount}</td>
                </tr>
              </tbody>
            </table>
            <div class="total">Total: ${order.amount}</div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const openOrderDetail = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const getStatusStyle = (status: OrderStatus) => {
    switch (status) {
      case 'DELIVERED': return 'bg-green-50 text-green-600 border-green-100';
      case 'PENDING': return 'bg-yellow-50 text-yellow-600 border-yellow-100';
      case 'PROCESSING': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'SHIPPED': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'CANCELLED': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'DELIVERED': return <CheckCircle size={12} />;
      case 'PENDING': return <Clock size={12} />;
      case 'PROCESSING': return <Clock size={12} className="animate-spin-slow" />;
      case 'SHIPPED': return <Truck size={12} />;
      case 'CANCELLED': return <XCircle size={12} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-3xl font-black uppercase tracking-tight text-black">Order System</h1>
           <p className="text-gray-400 font-medium text-sm mt-1">Manage lifecycle and fulfillment of client orders.</p>
        </div>
        <div className="flex items-center space-x-3">
           <button 
             onClick={exportToCSV}
             className="flex items-center space-x-2 bg-white border border-gray-100 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-black transition-all"
            >
              <Download size={16} />
              <span>Export History</span>
           </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-8 border-b border-gray-100 overflow-x-auto custom-scrollbar whitespace-nowrap">
        {['ALL', 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={cn(
              "pb-4 text-[10px] font-black uppercase tracking-widest transition-all relative",
              activeTab === tab ? "text-black" : "text-gray-400 hover:text-black"
            )}
          >
            {tab}
            {activeTab === tab && (
              <motion.div layoutId="orderTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-black" />
            )}
          </button>
        ))}
      </div>

      {/* Data Section */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
         {/* Filter Bar */}
         <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
               <input 
                  type="text"
                  placeholder="Order ID, Customer Name..."
                  className="w-full bg-gray-50 border border-gray-100 p-3 pl-12 rounded-xl outline-none focus:border-black transition-colors font-medium text-black text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <button className="flex items-center space-x-2 bg-gray-50 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
               <Filter size={16} />
               <span>Refine Search</span>
            </button>
         </div>

         {/* Order Table */}
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-gray-50/50">
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Transaction ID</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Client Detail</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Manifest</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Valuation</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Payment</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Manage</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50/30 transition-all group">
                       <td className="px-8 py-6">
                          <p className="text-xs font-black text-black">{order.id}</p>
                          <p className="text-[9px] text-gray-400 mt-1 font-bold">{order.date}</p>
                       </td>
                       <td className="px-8 py-6">
                          <p className="text-xs font-black text-black">{order.customer.name}</p>
                          <p className="text-[10px] text-gray-400 mt-1">{order.customer.email}</p>
                       </td>
                       <td className="px-8 py-6">
                          <span className="text-[10px] font-black text-gray-600 bg-gray-100 px-3 py-1 rounded-full uppercase">
                             {order.items} {order.items === 1 ? 'Product' : 'Products'}
                          </span>
                       </td>
                       <td className="px-8 py-6 text-xs font-black text-black">{order.amount}</td>
                       <td className="px-8 py-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                          {order.payment}
                       </td>
                       <td className="px-8 py-6">
                          <div className={cn(
                             "flex items-center space-x-2 px-3 py-1.5 rounded-full border w-fit",
                             getStatusStyle(order.status as OrderStatus)
                          )}>
                             {getStatusIcon(order.status as OrderStatus)}
                             <span className="text-[9px] font-black uppercase tracking-widest">{order.status}</span>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center space-x-2 transition-opacity">
                             <button 
                                onClick={() => openOrderDetail(order)}
                                className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-all" 
                                title="View Order"
                             >
                                <Eye size={18} />
                             </button>
                             <button 
                                onClick={() => handlePrint(order)}
                                className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-all" 
                                title="Print Invoice"
                             >
                                <Printer size={18} />
                             </button>
                             <div className="h-6 w-[1px] bg-gray-200 mx-2" />
                             <button className="p-2 text-gray-400 hover:text-black transition-all">
                                <MoreVertical size={18} />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* Pagination */}
         <div className="p-8 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
               Volume <span className="text-black">1-10</span> of <span className="text-black">324</span> Shipments
            </p>
            <div className="flex items-center space-x-2">
               <button className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors text-gray-400">
                  <ChevronLeft size={20} />
               </button>
               <button className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors text-gray-400">
                  <ChevronRight size={20} />
               </button>
            </div>
         </div>
      </div>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowDetailModal(false)}
               className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="bg-white w-full max-w-2xl overflow-hidden rounded-3xl relative z-10 shadow-2xl"
            >
               <div className="flex items-center justify-between p-8 border-b border-gray-100">
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight text-black">{selectedOrder.id}</h2>
                    <p className="text-sm text-gray-400 font-medium">Manifest Details & Delivery Status</p>
                  </div>
                  <button 
                    onClick={() => setShowDetailModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={24} className="text-gray-400" />
                  </button>
               </div>

               <div className="p-8 space-y-8 overflow-y-auto max-h-[70vh] custom-scrollbar">
                  {/* Status & Date */}
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                       <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                         <Calendar size={12} />
                         Order Date
                        </p>
                       <p className="text-sm font-black text-black">{selectedOrder.date}</p>
                    </div>
                    <div className="flex-1 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                       <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                         <MapPin size={12} />
                         Current Status
                        </p>
                       <div className={cn(
                          "flex items-center space-x-2 px-3 py-1.5 rounded-full border w-fit",
                          getStatusStyle(selectedOrder.status as OrderStatus)
                       )}>
                          {getStatusIcon(selectedOrder.status as OrderStatus)}
                          <span className="text-[9px] font-black uppercase tracking-widest">{selectedOrder.status}</span>
                       </div>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Client Specifications</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="flex items-start space-x-4 p-4 rounded-xl border border-gray-100 group hover:border-black transition-colors">
                          <div className="p-3 bg-gray-50 rounded-lg text-gray-400 group-hover:text-black transition-colors">
                             <User size={20} />
                          </div>
                          <div>
                             <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Name</p>
                             <p className="text-sm font-black text-black">{selectedOrder.customer.name}</p>
                          </div>
                       </div>
                       <div className="flex items-start space-x-4 p-4 rounded-xl border border-gray-100 group hover:border-black transition-colors">
                          <div className="p-3 bg-gray-50 rounded-lg text-gray-400 group-hover:text-black transition-colors">
                             <CreditCard size={20} />
                          </div>
                          <div>
                             <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Payment Channel</p>
                             <p className="text-sm font-black text-black uppercase">{selectedOrder.payment}</p>
                          </div>
                       </div>
                    </div>
                    <div className="p-6 rounded-xl border border-gray-100 bg-gray-50/30">
                       <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">Shipping Artifact Address</p>
                       <p className="text-sm font-medium text-black leading-relaxed">
                         {selectedOrder.customer.address || 'Address information not provided.'}
                       </p>
                    </div>
                  </div>

                  {/* Order Items Summary */}
                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Inventory Bundle</p>
                    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                       <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between">
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Items Manifest</span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-black underline">{selectedOrder.items} SKU(s)</span>
                       </div>
                       <div className="p-6 flex items-center justify-between">
                          <div>
                             <p className="text-sm font-black text-black">Total Valuation</p>
                             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Inclusive of Taxes</p>
                          </div>
                          <p className="text-2xl font-black text-black">{selectedOrder.amount}</p>
                       </div>
                    </div>
                  </div>
               </div>

               <div className="p-8 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                  <button 
                    onClick={() => handlePrint(selectedOrder)}
                    className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                  >
                     <Printer size={16} />
                     <span>Generate Invoice</span>
                  </button>
                  <button 
                    onClick={() => setShowDetailModal(false)}
                    className="bg-black text-white px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gold hover:text-black transition-all shadow-xl shadow-black/10"
                  >
                     Close Manifest
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
