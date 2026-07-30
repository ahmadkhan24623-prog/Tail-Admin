import { useState, useEffect } from 'react';
import { Users, TrendingUp, Clock, ArrowUp, ArrowDown, MoreVertical, Globe, Smartphone, Monitor } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { useTheme } from '../context/ThemeContext';

// Data sets for different timeframe filters
const analyticsDataSets: Record<string, { name: string; visitors: number; pageViews: number }[]> = {
  '7D': [
    { name: 'Mon', visitors: 1200, pageViews: 3400 },
    { name: 'Tue', visitors: 1900, pageViews: 4800 },
    { name: 'Wed', visitors: 1500, pageViews: 3900 },
    { name: 'Thu', visitors: 2200, pageViews: 5600 },
    { name: 'Fri', visitors: 2800, pageViews: 7100 },
    { name: 'Sat', visitors: 3100, pageViews: 8200 },
    { name: 'Sun', visitors: 2500, pageViews: 6400 },
  ],
  '30D': [
    { name: 'Week 1', visitors: 8500, pageViews: 22000 },
    { name: 'Week 2', visitors: 11200, pageViews: 29000 },
    { name: 'Week 3', visitors: 9800, pageViews: 25000 },
    { name: 'Week 4', visitors: 14300, pageViews: 38000 },
  ],
  '12M': [
    { name: 'Jan', visitors: 32000, pageViews: 85000 },
    { name: 'Feb', visitors: 41000, pageViews: 110000 },
    { name: 'Mar', visitors: 38000, pageViews: 99000 },
    { name: 'Apr', visitors: 45000, pageViews: 125000 },
    { name: 'May', visitors: 49000, pageViews: 134000 },
    { name: 'Jun', visitors: 53000, pageViews: 148000 },
    { name: 'Jul', visitors: 58000, pageViews: 160000 },
    { name: 'Aug', visitors: 51000, pageViews: 140000 },
    { name: 'Sep', visitors: 62000, pageViews: 175000 },
    { name: 'Oct', visitors: 71000, pageViews: 198000 },
    { name: 'Nov', visitors: 84000, pageViews: 230000 },
    { name: 'Dec', visitors: 95000, pageViews: 260000 },
  ],
};

const deviceData = [
  { name: 'Desktop', value: 58, color: '#3b82f6', icon: Monitor },
  { name: 'Mobile', value: 34, color: '#60a5fa', icon: Smartphone },
  { name: 'Tablet', value: 8, color: '#93c5fd', icon: Globe },
];

export default function Analytics() {
  const [timeframe, setTimeframe] = useState<'7D' | '30D' | '12M'>('30D');
  const [animateBars, setAnimateBars] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const gridStroke = isDark ? '#1f2937' : '#f3f4f6';
  const tickFill = isDark ? '#6b7280' : '#9ca3af';

  // Trigger left-to-right bar animation on page load/reload
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateBars(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* 1. TOP METRICS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsCard 
          title="Total Visitors" 
          value="48.6K" 
          trend="+12.4%" 
          icon={<Users size={22} className="text-blue-500" />} 
        />
        <AnalyticsCard 
          title="Bounce Rate" 
          value="42.3%" 
          trend="-3.1%" 
          icon={<TrendingUp size={22} className="text-blue-500" />} 
          isPositiveTrend={true} 
        />
        <AnalyticsCard 
          title="Session Duration" 
          value="3m 42s" 
          trend="+5.8%" 
          icon={<Clock size={22} className="text-blue-500" />} 
        />
        <AnalyticsCard 
          title="Conversion Rate" 
          value="3.8%" 
          trend="-0.4%" 
          icon={<TrendingUp size={22} className="text-blue-500" />} 
          isNegative={true} 
        />
      </div>

      {/* 2. MAIN TRAFFIC OVERVIEW CHART */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Website Traffic Overview</h3>
            <p className="text-sm text-gray-400">Monitor unique visitors vs total page views</p>
          </div>
          <div className="flex gap-2 bg-gray-50 dark:bg-gray-800 p-1 rounded-xl border border-gray-100 dark:border-gray-700">
            {(['7D', '30D', '12M'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  timeframe === tf
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tf === '7D' ? 'Last 7 Days' : tf === '30D' ? 'Last 30 Days' : '12 Months'}
              </button>
            ))}
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analyticsDataSets[timeframe]}>
              <defs>
                <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#93c5fd" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#93c5fd" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: tickFill}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: tickFill}} />
              <Tooltip />
              <Area type="monotone" dataKey="pageViews" name="Page Views" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorPageViews)" />
              <Area type="monotone" dataKey="visitors" name="Unique Visitors" stroke="#93c5fd" strokeWidth={2} fillOpacity={1} fill="url(#colorVisitors)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. LOWER GRID: TRAFFIC SOURCES & DEVICE BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Traffic Sources */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Top Traffic Sources</h3>
              <p className="text-sm text-gray-400">Where your users are coming from</p>
            </div>
            <MoreVertical size={20} className="text-gray-400 cursor-pointer" />
          </div>

          <div className="space-y-5 my-auto">
            {[
              { source: 'Google Organic', visitors: '24,520', percent: 52, color: 'bg-blue-500' },
              { source: 'Direct Search', visitors: '12,140', percent: 26, color: 'bg-indigo-500' },
              { source: 'GitHub / Referral', visitors: '6,800', percent: 14, color: 'bg-sky-400' },
              { source: 'Social Media', visitors: '3,800', percent: 8, color: 'bg-blue-300' },
            ].map((item) => (
              <div key={item.source} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-gray-700 dark:text-gray-200">{item.source}</span>
                  <span className="text-gray-400 font-medium">{item.visitors} visits ({item.percent}%)</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: animateBars ? `${item.percent}%` : '0%' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mt-6 flex justify-between items-center text-xs text-gray-400">
            <span>Updated 5 minutes ago</span>
            <button className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">View Detailed Report →</button>
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Device Analytics</h3>
              <p className="text-sm text-gray-400">Traffic split by device type</p>
            </div>
            <MoreVertical size={20} className="text-gray-400 cursor-pointer" />
          </div>

          <div className="h-48 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={6}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center pointer-events-none">
              <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">100%</span>
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-gray-800">
            {deviceData.map((item) => {
              const IconComp = item.icon;
              return (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2.5">
                    <span className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700">
                      <IconComp size={16} />
                    </span>
                    <span className="font-medium text-gray-700 dark:text-gray-200">{item.name}</span>
                  </div>
                  <span className="font-bold text-gray-800 dark:text-gray-100">{item.value}%</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

interface AnalyticsCardProps {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
  isNegative?: boolean;
  isPositiveTrend?: boolean;
}

function AnalyticsCard({ title, value, trend, icon, isNegative, isPositiveTrend }: AnalyticsCardProps) {
  const isGood = isPositiveTrend ? !isNegative : !isNegative;

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <h4 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-1">{value}</h4>
      </div>
      <div className="text-right">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-full mb-2">{icon}</div>
        <span className={`text-xs font-bold flex items-center justify-end gap-0.5 ${isGood ? 'text-green-500' : 'text-red-500'}`}>
          {isNegative ? <ArrowDown size={12} /> : <ArrowUp size={12} />} {trend}
        </span>
      </div>
    </div>
  );
}