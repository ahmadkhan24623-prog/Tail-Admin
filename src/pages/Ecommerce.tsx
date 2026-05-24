import { Tag, Package, ArrowUp, ArrowDown, MoreVertical, Filter } from 'lucide-react';
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Active Products" value="714" trend="+6.45%" icon={<Tag size={24} className="text-blue-500" />} />
        <StatCard title="Categories" value="31" trend="-2.11%" icon={<Package size={24} className="text-blue-500" />} isNegative />
      </div>

      {/* 2. MIDDLE SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3  gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Monthly Transactions</h3>
          <div className="h-64 w-full ">
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

      {/* 4. CUSTOMERS & RECENT ORDERS SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Customers Demographic</h3>
              <p className="text-sm text-gray-400">Number of customer based on country</p>
            </div>
            <MoreVertical size={20} className="text-gray-400 cursor-pointer" />
          </div>
          <div className="bg-gray-50 rounded-xl h-48 mb-6 flex items-center justify-center border border-dashed">
            <span className="text-gray-400 text-sm">Map Placeholder</span>
          </div>
          <div className="space-y-4">
            {[ 
                { img: '/images/USA.svg', name: 'USA', count: '2,379', percent: 79 }, 
                { img: '/images/France.svg', name: 'France', count: '589', percent: 23 } 
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-4">
                <img src={item.img} alt={item.name} className="w-8 h-8 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.count} Customers</p>
                </div>
                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${item.percent}%` }}></div>
                </div>
                <span className="text-sm font-bold text-gray-800 w-8 text-right">{item.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Recent Orders</h3>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"><Filter size={16} /> Filter</button>
              <button className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">See all</button>
            </div>
          </div>
          <div className="space-y-6">
            {[
              { name: 'MacBook Pro 13”', v: '2 Variants', p: '$2399.00', cat: 'Laptop', st: 'Delivered', col: 'text-green-600 bg-green-50', img: '/images/MacBook.jpg' },
              { name: 'Apple Watch Ultra', v: '1 Variant', p: '$879.00', cat: 'Watch', st: 'Pending', col: 'text-orange-600 bg-orange-50', img: '/images/Apple Watch.jpg' },
              { name: 'iPhone 15 Pro Max', v: '2 Variants', p: '$1869.00', cat: 'SmartPhone', st: 'Delivered', col: 'text-green-600 bg-green-50', img: '/images/Ihone 13.jpg' },
              { name: 'iPad Pro 3rd Gen', v: '2 Variants', p: '$1699.00', cat: 'Electronics', st: 'Canceled', col: 'text-red-600 bg-red-50', img: '/images/ipad pro3rd gen.jpg' },
              { name: 'AirPods Pro 2nd Gen', v: '1 Variant', p: '$240.00', cat: 'Accessories', st: 'Delivered', col: 'text-green-600 bg-green-50', img: '/images/AirPoda Pro 2ND gEN.jpg' },
            ].map((o, i) => (
              <div key={i} className="grid grid-cols-4 items-center text-sm">
                <div className="flex items-center gap-3">
                    <img src={o.img} alt={o.name} className="w-10 h-10 object-cover rounded-lg bg-gray-100" />
                    <div>
                        <p className="font-bold text-gray-800">{o.name}</p>
                        <p className="text-xs text-gray-400">{o.v}</p>
                    </div>
                </div>
                <p className="text-gray-600">{o.cat}</p>
                <p className="font-semibold text-gray-800">{o.p}</p>
                <span className={`px-3 py-1 rounded-full text-xs font-bold w-fit ${o.col}`}>{o.st}</span>
              </div>
            ))}
          </div>
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