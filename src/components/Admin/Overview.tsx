import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  Calendar
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const SALES_DATA = [
  { name: 'Mon', revenue: 4000, orders: 24 },
  { name: 'Tue', revenue: 3000, orders: 13 },
  { name: 'Wed', revenue: 2000, orders: 98 },
  { name: 'Thu', revenue: 2780, orders: 39 },
  { name: 'Fri', revenue: 1890, orders: 48 },
  { name: 'Sat', revenue: 2390, orders: 38 },
  { name: 'Sun', revenue: 3490, orders: 43 },
];

const CATEGORY_STATS = [
  { name: 'Oversized Tees', value: 45, color: '#000000' },
  { name: 'Hoodies', value: 30, color: '#C5A059' },
  { name: 'Cargos', value: 15, color: '#4A5D4E' },
  { name: 'Accessories', value: 10, color: '#B0B0B0' },
];

const RECENT_ORDERS = [
  { id: '#ORD-7234', customer: 'Adnan Islam', product: 'Matrix Hoodie', amount: '৳4,500', status: 'DELIVERED', date: '2 mins ago' },
  { id: '#ORD-7235', customer: 'Sadia Ahmed', product: 'Tactical Cargo', amount: '৳5,500', status: 'PENDING', date: '15 mins ago' },
  { id: '#ORD-7236', customer: 'Rafiq Khan', product: 'Boxy Tee', amount: '৳2,200', status: 'PROCESSING', date: '1 hour ago' },
  { id: '#ORD-7237', customer: 'Maya Begum', product: 'Leather Jacket', amount: '৳8,500', status: 'SHIPPED', date: '3 hours ago' },
];

export default function Overview() {
  return (
    <div className="space-y-10 pb-20">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-3xl font-black uppercase tracking-tight text-black">Operations Hub</h1>
           <p className="text-gray-400 font-medium text-sm mt-1">Real-time performance analytics for AL-HAYĀ.</p>
        </div>
        <div className="flex items-center space-x-3">
           <button className="flex items-center space-x-2 bg-white border border-gray-100 px-4 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">
              <Calendar size={14} className="text-gray-400" />
              <span>Last 30 Days</span>
           </button>
           <button className="bg-black text-white px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-gold hover:text-black transition-all shadow-xl shadow-black/10">
              Download Report
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '৳245,000', change: '+14.5%', positive: true, icon: DollarSign, color: 'text-green-600' },
          { label: 'Total Orders', value: '1,284', change: '+8.2%', positive: true, icon: ShoppingBag, color: 'text-gold' },
          { label: 'Active Customers', value: '842', change: '-2.4%', positive: false, icon: Users, color: 'text-blue-600' },
          { label: 'Avg. Order Value', value: '৳3,450', change: '+5.1%', positive: true, icon: TrendingUp, color: 'text-purple-600' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
            <div className="flex justify-between items-start mb-6">
              <div className={cn("p-3 rounded-xl bg-gray-50 group-hover:bg-black transition-colors duration-500", stat.color)}>
                 <stat.icon size={24} className="group-hover:text-white" />
              </div>
              <div className={cn(
                "flex items-center space-x-1 text-[10px] font-black px-2 py-1 rounded-full",
                stat.positive ? "text-green-600 bg-green-50" : "text-red-500 bg-red-50"
              )}>
                {stat.positive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                <span>{stat.change}</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">{stat.label}</p>
              <h3 className="text-2xl font-black text-black">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Area Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
           <div className="flex items-center justify-between mb-10">
              <div>
                 <h3 className="text-sm font-black uppercase tracking-widest text-black">Revenue Velocity</h3>
                 <p className="text-xs text-gray-400 mt-1">Monitoring daily income streams.</p>
              </div>
              <button className="text-gray-400 hover:text-black transition-colors">
                 <MoreVertical size={20} />
              </button>
           </div>
           <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SALES_DATA}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C5A059" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#C5A059" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#A0A0A0' }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#A0A0A0' }}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontSize: '10px', textTransform: 'uppercase', fontWeight: 900 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#C5A059" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
           <div className="mb-10">
              <h3 className="text-sm font-black uppercase tracking-widest text-black">Product Affinity</h3>
              <p className="text-xs text-gray-400 mt-1">Top performing categories.</p>
           </div>
           <div className="flex-1 h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CATEGORY_STATS}>
                  <XAxis 
                    dataKey="name" 
                    hide
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                  />
                  <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                    {CATEGORY_STATS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
           </div>
           <div className="mt-8 space-y-4">
              {CATEGORY_STATS.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                   <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">{item.name}</span>
                   </div>
                   <span className="text-[10px] font-black text-black">{item.value}%</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
         <div className="p-8 border-b border-gray-100 flex items-center justify-between">
            <div>
               <h3 className="text-sm font-black uppercase tracking-widest text-black">Pending Fulfillment</h3>
               <p className="text-xs text-gray-400 mt-1">Orders requiring immediate action.</p>
            </div>
            <button className="text-[10px] font-black uppercase tracking-widest text-gold hover:text-black transition-colors">
               View All History
            </button>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-gray-50/50">
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Order ID</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Client</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Product</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Value</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Age</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {RECENT_ORDERS.map((order, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                       <td className="px-8 py-6 text-xs font-black text-black">{order.id}</td>
                       <td className="px-8 py-6">
                          <p className="text-xs font-black text-black">{order.customer}</p>
                          <p className="text-[9px] text-gray-400 mt-0.5">Verified Account</p>
                       </td>
                       <td className="px-8 py-6 text-xs font-medium text-gray-600">{order.product}</td>
                       <td className="px-8 py-6 text-xs font-black text-black">{order.amount}</td>
                       <td className="px-8 py-6">
                          <span className={cn(
                            "text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest",
                            order.status === 'DELIVERED' ? "bg-green-50 text-green-600" :
                            order.status === 'PENDING' ? "bg-yellow-50 text-yellow-600" :
                            "bg-blue-50 text-blue-600"
                          )}>
                            {order.status}
                          </span>
                       </td>
                       <td className="px-8 py-6 text-xs text-gray-400 font-medium">{order.date}</td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
