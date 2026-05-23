import { Tag, Package, ArrowUp, ArrowDown, MoreVertical } from 'lucide-react';
import { 
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Jan', sales: 40, revenue: 20 }, { name: 'Feb', sales: 90, revenue: 50 },
  { name: 'Mar', sales: 50, revenue: 30 }, { name: 'Apr', sales: 70, revenue: 45 },
  { name: 'May', sales: 40, revenue: 25 }, { name: 'Jun', sales: 80, revenue: 60 },
  { name: 'Jul', sales: 50, revenue: 35 }, { name: 'Aug', sales: 40, revenue: 30 },
  { name: 'Sep', sales: 60, revenue: 40 }, { name: 'Oct', sales: 90, revenue: 70 },
  { name: 'Nov', sales: 70, revenue: 50 }, { name: 'Dec', sales: 30, revenue: 20 },
];

export default function Ecommerce() {
  const percentage = 75.55;

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* 1. TOP STAT ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <StatCard title="Active Products" value="714" trend="+6.45%" icon={<Tag size={24} className="text-blue-500" />} />
        <StatCard title="Categories" value="31" trend="-2.11%" icon={<Package size={24} className="text-blue-500" />} isNegative />
      </div>

      {/* 2. MIDDLE SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Monthly Transactions</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                <Tooltip cursor={{fill: '#f9fafb'}} />
                <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Monthly Target</h3>
              <p className="text-sm text-gray-400">Target you've set for each month</p>
            </div>
            <MoreVertical size={20} className="text-gray-400 cursor-pointer" />
          </div>
          <div className="relative flex justify-center py-4">
            <svg className="w-full max-w-[200px] h-auto mb-12" viewBox="0 0 200 100">
              <path d="M 20 100 A 90 90 0 0 1 180 100" fill="none" stroke="#f3f4f6" strokeWidth="15" strokeLinecap="round" />
              <path d="M 20 100 A 90 90 0 0 1 180 100" fill="none" stroke="#3b82f6" strokeWidth="15" strokeLinecap="round" 
                strokeDasharray={141} strokeDashoffset={141 - (percentage / 100) * 141} />
            </svg>
            <div className="absolute top-10 text-center">
              <div className="text-4xl mt-20 font-bold text-gray-800">{percentage}%</div>
              <span className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-full">+10%</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold border-t pt-4">
            <div>Target <br/><span className="text-red-500 block mt-1 text-sm">$1.1K ↓</span></div>
            <div>Revenue <br/><span className="text-green-500 block mt-1 text-sm">$2.1K ↑</span></div>
            <div>Today <br/><span className="text-green-500 block mt-1 text-sm">$7.4K ↑</span></div>
          </div>
        </div>
      </div>

      {/* 3. TREND CHART SECTION */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-800">Sales vs Revenue</h3>
          <div className="flex gap-2">
            {['Monthly', 'Quarterly', 'Annually'].map((tab) => (
              <button key={tab} className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100">
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
              <Tooltip />
              <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
              <Area type="monotone" dataKey="revenue" stroke="#93c5fd" strokeWidth={2} fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, icon, isNegative }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <h4 className="text-3xl font-bold text-gray-800 mt-1">{value}</h4>
      </div>
      <div className="text-right">
        <div className="bg-blue-50 p-3 rounded-full mb-2">{icon}</div>
        <span className={`text-xs font-bold ${isNegative ? 'text-red-500' : 'text-green-500'}`}>
          {isNegative ? <ArrowDown size={12} className="inline" /> : <ArrowUp size={12} className="inline" />} {trend}
        </span>
      </div>
    </div>
  );
}