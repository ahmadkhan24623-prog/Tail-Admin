import { useState, useEffect } from 'react';
import { Package, ShieldAlert, ArrowUpRight, ArrowDownRight, RefreshCw, BarChart2, Layers, Cpu, Search } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { useTheme } from '../context/ThemeContext';

const stockTurnoverData = [
  { category: 'Processors', stock: 420, fill: '#0ea5e9' },
  { category: 'Memory Kits', stock: 850, fill: '#6366f1' },
  { category: 'Motherboards', stock: 310, fill: '#8b5cf6' },
  { category: 'Power Units', stock: 190, fill: '#ec4899' },
  { category: 'Peripherals', stock: 540, fill: '#10b981' },
];

export default function Stock() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'low' | 'optimal'>('all');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const tickFill = isDark ? '#94a3b8' : '#64748b';

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 120);
    return () => clearTimeout(timer);
  }, []);

  const inventoryItems = [
    { sku: 'HW-90182', name: 'Quantum Core i9 Processor', category: 'Processors', stock: 184, status: 'Optimal', zone: 'Sector Alpha-1', updated: '2 hrs ago' },
    { sku: 'HW-44102', name: 'DDR5 32GB RGB Heatsink RAM', category: 'Memory Kits', stock: 8, status: 'Critical Low', zone: 'Sector Beta-4', updated: '12 mins ago' },
    { sku: 'HW-99211', name: 'Z790 Extreme Gaming Motherboard', category: 'Motherboards', stock: 95, status: 'Optimal', zone: 'Sector Gamma-2', updated: 'Yesterday' },
    { sku: 'HW-10499', name: '1200W Titanium Power Supply', category: 'Power Units', stock: 0, status: 'Depleted', zone: 'Sector Delta-3', updated: '3 days ago' },
    { sku: 'HW-77312', name: 'Tri-Mode Wireless Mechanical Keeb', category: 'Peripherals', stock: 240, status: 'Optimal', zone: 'Sector Alpha-2', updated: '5 hrs ago' },
  ];

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'low') return matchesSearch && (item.status === 'Critical Low' || item.status === 'Depleted');
    if (activeTab === 'optimal') return matchesSearch && item.status === 'Optimal';
    return matchesSearch;
  });

  return (
    <div className="p-4 md:p-6 space-y-6 min-h-screen text-slate-800 dark:text-slate-100 font-sans">
      
      {/* 1. CLEAN LIGHT HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 md:p-8 text-white shadow-lg">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-xs font-semibold text-white">
              <Cpu size={14} /> Inventory Matrix v9.4
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">Stock & Asset Telemetry</h2>
            <p className="text-blue-100 text-xs md:text-sm max-w-xl">Regional item tracking, predictive stockout detection, and automated supply chain routing.</p>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <button className="flex-1 lg:flex-none bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all border border-white/20 flex items-center justify-center gap-2 cursor-pointer shadow-sm">
              <RefreshCw size={14} className="animate-spin-slow" /> Re-sync Node
            </button>
            <button className="flex-1 lg:flex-none bg-white text-blue-600 hover:bg-blue-50 font-black px-5 py-2.5 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer">
              + New Asset Influx
            </button>
          </div>
        </div>
      </div>

      {/* 2. LIGHT METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-400 dark:hover:border-blue-700 transition-all group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Vault Units</p>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white mt-1">14,820</h4>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900 group-hover:scale-110 transition-transform">
              <Layers size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <ArrowUpRight size={14} /> +8.4% velocity this cycle
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-amber-400 dark:hover:border-amber-700 transition-all group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Critical Low Warnings</p>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white mt-1">12 SKUs</h4>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900 group-hover:scale-110 transition-transform">
              <ShieldAlert size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-semibold">
            Action required immediately
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-rose-400 dark:hover:border-rose-700 transition-all group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Depleted Stockouts</p>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white mt-1">3 Items</h4>
            </div>
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900 group-hover:scale-110 transition-transform">
              <Package size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-semibold">
            <ArrowDownRight size={14} /> Backorder queue active
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-700 transition-all group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Sector Efficiency</p>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white mt-1">98.2%</h4>
            </div>
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900 group-hover:scale-110 transition-transform">
              <BarChart2 size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
            Optimal routing active
          </div>
        </div>
      </div>

      {/* 3. CHART & SECTOR RADAR SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Hardware Category Distribution</h3>
              <p className="text-xs text-slate-400">Real-time volume load across hardware segments</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold border border-blue-100 dark:border-blue-900">Live Telemetry</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stockTurnoverData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{fill: tickFill, fontSize: 11}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: tickFill, fontSize: 11}} />
                <Tooltip 
                  cursor={{fill: 'rgba(241, 245, 249, 0.6)'}}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '1rem', color: '#fff', fontSize: '12px' }} 
                />
                <Bar dataKey="stock" radius={[8, 8, 0, 0]}>
                  {stockTurnoverData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} className="transition-all duration-300 hover:opacity-80 cursor-pointer" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Storage Zones Widget */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Sector Node Capacity</h3>
            <p className="text-xs text-slate-400">Storage facility utilization limits</p>
          </div>

          <div className="space-y-4 my-4">
            {[
              { zone: 'Sector Alpha (Processors)', load: '78%', color: 'bg-sky-500' },
              { zone: 'Sector Beta (Memory & RAM)', load: '92%', color: 'bg-indigo-500' },
              { zone: 'Sector Gamma (Peripherals)', load: '54%', color: 'bg-emerald-500' },
            ].map((node, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-200">{node.zone}</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{node.load}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className={`h-full ${node.color} rounded-full transition-all duration-1000`} style={{ width: node.load }}></div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all border border-slate-200 dark:border-slate-700 cursor-pointer">
            Rebalance Sector Loads →
          </button>
        </div>

      </div>

      {/* 4. INVENTORY MANIFEST TABLE */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Active Node Manifest</h3>
            <p className="text-xs text-slate-400">Live hardware inventory grid inspection</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Filter Tabs */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${activeTab === 'all' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('optimal')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${activeTab === 'optimal' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
              >
                Optimal
              </button>
              <button
                onClick={() => setActiveTab('low')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${activeTab === 'low' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
              >
                Alerts
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search size={14} />
              </span>
              <input
                type="text"
                placeholder="Search SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700">
                <th className="py-3 px-6">SKU Identifier</th>
                <th className="py-3 px-6">Hardware Name</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Units</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Storage Zone</th>
                <th className="py-3 px-6 text-right">Telemetry Ping</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredItems.map((item, idx) => (
                <tr key={idx} className={`transition-all duration-300 hover:bg-slate-50/80 dark:hover:bg-slate-800/80 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                  <td className="py-4 px-6 font-mono font-bold text-blue-600 dark:text-blue-400">{item.sku}</td>
                  <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">{item.name}</td>
                  <td className="py-4 px-6 text-slate-500 dark:text-slate-400 font-medium">{item.category}</td>
                  <td className="py-4 px-6 font-mono font-extrabold text-slate-900 dark:text-white">{item.stock}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      item.status === 'Optimal'
                        ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900'
                        : item.status === 'Critical Low'
                        ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-900 animate-pulse'
                        : 'bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 border border-rose-100 dark:border-rose-900'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-300 font-medium">{item.zone}</td>
                  <td className="py-4 px-6 text-right font-mono text-slate-400 text-[11px]">{item.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}