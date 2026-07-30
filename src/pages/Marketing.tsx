import { useState, useEffect } from 'react';
import { DollarSign, MousePointerClick, Target, TrendingUp, MoreVertical, Plus, CheckCircle2, PauseCircle, Sparkles } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { useTheme } from '../context/ThemeContext';

const marketingBarData = [
  { name: 'Mon', spend: 300, roi: 3.2 },
  { name: 'Tue', spend: 450, roi: 4.1 },
  { name: 'Wed', spend: 400, roi: 3.8 },
  { name: 'Thu', spend: 600, roi: 4.5 },
  { name: 'Fri', spend: 750, roi: 5.0 },
  { name: 'Sat', spend: 850, roi: 5.4 },
  { name: 'Sun', spend: 500, roi: 3.9 },
];

const channelShareData = [
  { name: 'Meta Ads', value: 45, color: '#2563eb' },
  { name: 'Google PPC', value: 30, color: '#3b82f6' },
  { name: 'TikTok Hub', value: 15, color: '#60a5fa' },
  { name: 'Newsletter', value: 10, color: '#93c5fd' },
];

export default function Marketing() {
  const [animateCards, setAnimateCards] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const gridStroke = isDark ? '#1f2937' : '#f3f4f6';
  const tickFill = isDark ? '#6b7280' : '#9ca3af';
  const tooltipStyle = isDark
    ? { backgroundColor: '#111827', borderRadius: '1rem', border: '1px solid #1f2937', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)', color: '#f3f4f6' }
    : { backgroundColor: '#ffffff', borderRadius: '1rem', border: '1px solid #f3f4f6', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)' };

  useEffect(() => {
    const timer = setTimeout(() => setAnimateCards(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gray-50/50 dark:bg-gray-950 min-h-screen">
      {/* 1. MARKETING HEADER BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-6 md:p-8 text-white shadow-lg shadow-blue-500/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/20">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold mb-3 border border-white/20">
            <Sparkles size={14} className="text-blue-200" /> Advanced Campaign Engine
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Marketing Command Center</h2>
          <p className="text-blue-100 text-sm mt-1 max-w-xl">Manage active ad sets, track real-time conversion metrics, and optimize hyper-targeted campaign ROI effortlessly.</p>
        </div>
        <button className="relative z-10 bg-white text-blue-600 px-5 py-2.5 rounded-2xl text-xs font-bold shadow-md hover:bg-blue-50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer">
          <Plus size={16} /> Create Campaign
        </button>
      </div>

      {/* 2. TOP METRICS ROW (VERTICAL ACCENT CARDS WITH HOVER LIFTS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm border-l-4 border-l-blue-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Ad Budget</p>
          <div className="flex justify-between items-baseline mt-2">
            <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">$12,450</h4>
            <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-md border border-green-100 dark:border-green-900">+8.2%</span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
            <DollarSign size={14} className="text-blue-500" /> Across 4 active platforms
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm border-l-4 border-l-indigo-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Click-Through Rate</p>
          <div className="flex justify-between items-baseline mt-2">
            <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">4.65%</h4>
            <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-md border border-green-100 dark:border-green-900">+1.2%</span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
            <MousePointerClick size={14} className="text-indigo-500" /> 14.2K total clicks
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm border-l-4 border-l-sky-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-sky-200 dark:hover:border-sky-800">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Average ROI</p>
          <div className="flex justify-between items-baseline mt-2">
            <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">3.8x</h4>
            <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-md border border-green-100 dark:border-green-900">+0.5x</span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
            <TrendingUp size={14} className="text-sky-400" /> High performance threshold
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm border-l-4 border-l-blue-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Conversions</p>
          <div className="flex justify-between items-baseline mt-2">
            <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">1,240</h4>
            <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-md border border-green-100 dark:border-green-900">+14.6%</span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
            <Target size={14} className="text-blue-400" /> Cost per acquisition: $10.04
          </div>
        </div>
      </div>

      {/* 3. MIDDLE SECTION: BAR CHART & DONUT SHARE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Spend vs ROI Bar Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 tracking-tight">Daily Ad Spend vs Return</h3>
              <p className="text-sm text-gray-400">Comparing capital allocation against daily ROI</p>
            </div>
            <button className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
              <MoreVertical size={20} />
            </button>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marketingBarData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: tickFill}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: tickFill}} />
                <Tooltip
                  cursor={{fill: isDark ? 'rgba(59, 130, 246, 0.08)' : 'rgba(59, 130, 246, 0.04)'}}
                  contentStyle={tooltipStyle}
                />
                <Bar dataKey="spend" fill="#3b82f6" radius={[8, 8, 0, 0]} className="transition-all duration-500 hover:opacity-80 cursor-pointer" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Channel Share Donut */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 tracking-tight">Channel Spend Share</h3>
              <p className="text-sm text-gray-400">Budget distribution</p>
            </div>
            <button className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
              <MoreVertical size={20} />
            </button>
          </div>

          <div className="h-44 relative flex items-center justify-center my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelShareData}
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={6}
                  dataKey="value"
                >
                  {channelShareData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} className="transition-transform duration-300 hover:scale-105 cursor-pointer outline-none" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={tooltipStyle}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center pointer-events-none">
              <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">Top Share</span>
              <span className="text-xl font-extrabold text-gray-800 dark:text-gray-100">45%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-gray-100 dark:border-gray-800">
            {channelShareData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 p-1.5 rounded-xl transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                <span className="w-3 h-3 rounded-full shadow-xs" style={{ backgroundColor: item.color }}></span>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. BOTTOM SECTION: ACTIVE CAMPAIGNS GRID CARDS */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 tracking-tight">Campaign Deployments</h3>
            <p className="text-sm text-gray-400">Live operational promotional slots</p>
          </div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3.5 py-1.5 rounded-full border border-blue-100 dark:border-blue-900">4 Active Campaigns</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {[
            { name: 'Summer Flash Sale 2026', platform: 'Meta Ads', budget: '$1,500', spent: '$1,240', roi: '+3.4x', status: 'Active' },
            { name: 'New Product Launch - Tech', platform: 'Google PPC', budget: '$2,200', spent: '$1,890', roi: '+2.8x', status: 'Active' },
            { name: 'Retargeting Visitors', platform: 'Meta Ads', budget: '$800', spent: '$750', roi: '+4.1x', status: 'Active' },
            { name: 'Influencer Collab Promo', platform: 'TikTok Hub', budget: '$1,200', spent: '$1,200', roi: '+1.9x', status: 'Paused' },
          ].map((camp, idx) => (
            <div 
              key={idx} 
              className={`p-5 rounded-2xl border transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lg ${
                animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } ${
                camp.status === 'Active'
                  ? 'border-gray-100 dark:border-gray-800 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-900/50 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-blue-500/5'
                  : 'border-dashed border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-900/30 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900">
                  {camp.platform}
                </span>
                {camp.status === 'Active' ? (
                  <span className="flex items-center gap-1 text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2.5 py-0.5 rounded-full border border-green-100 dark:border-green-900">
                    <CheckCircle2 size={12} /> Active
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2.5 py-0.5 rounded-full border border-amber-100 dark:border-amber-900">
                    <PauseCircle size={12} /> Paused
                  </span>
                )}
              </div>

              <h4 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-1 line-clamp-1 tracking-tight">{camp.name}</h4>

              <div className="my-3.5 space-y-2 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Spent: <strong className="text-gray-700 dark:text-gray-200">{camp.spent}</strong></span>
                  <span>Budget: {camp.budget}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden p-0.5 border border-gray-200/60 dark:border-gray-700">
                  <div className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3.5 border-t border-gray-100 dark:border-gray-800 text-xs">
                <span className="text-gray-400 font-medium">Target ROI</span>
                <span className="font-extrabold text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 px-2.5 py-1 rounded-xl shadow-xs border border-gray-100 dark:border-gray-700">{camp.roi}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}