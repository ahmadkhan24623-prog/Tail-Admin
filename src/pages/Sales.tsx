import { DollarSign, ShoppingCart, Percent, Users, MoreVertical } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { PageHeader } from '../components/ui/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { Card, CardHeader } from '../components/ui/Card';
import { useToast } from '../context/ToastContext';

const salesByRep = [
  { name: 'A. Lopez', sales: 82 }, { name: 'B. Chen', sales: 65 }, { name: 'C. Reed', sales: 91 },
  { name: 'D. Osei', sales: 54 }, { name: 'E. Wren', sales: 73 },
];

const topDeals = [
  { rep: 'Carla Reed', client: 'Northbridge Retail', amount: '$18,200', closed: 'Aug 06, 2026' },
  { rep: 'Amara Lopez', client: 'Pinecrest Group', amount: '$14,850', closed: 'Aug 05, 2026' },
  { rep: 'Ben Chen', client: 'Sunlyte Industries', amount: '$9,600', closed: 'Aug 03, 2026' },
  { rep: 'Elena Wren', client: 'Trailmark Corp', amount: '$21,400', closed: 'Aug 01, 2026' },
];

export default function Sales() {
  const { showToast } = useToast();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const gridStroke = isDark ? '#1f2937' : '#f3f4f6';
  const tickFill = isDark ? '#6b7280' : '#9ca3af';

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        eyebrow="Revenue Performance"
        title="Sales Dashboard"
        subtitle="Track team performance, quotas, and closed revenue across your sales org."
        gradient="from-emerald-600 via-teal-600 to-blue-700"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="$284.6K" trend="+14.7%" icon={<DollarSign size={22} />} />
        <StatCard title="Orders Closed" value="1,024" trend="+7.9%" icon={<ShoppingCart size={22} />} />
        <StatCard title="Win Rate" value="41.2%" trend="+3.1%" icon={<Percent size={22} />} />
        <StatCard title="Active Reps" value="18" trend="+2" icon={<Users size={22} />} />
      </div>

      <Card className="p-6">
        <CardHeader title="Sales by Rep" subtitle="Units sold this month, by representative" action={<button onClick={() => showToast('Chart export is not available in this demo yet.', 'info')} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"><MoreVertical size={20} /></button>} />
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesByRep}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: tickFill }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: tickFill }} />
              <Tooltip cursor={{ fill: isDark ? '#111827' : '#f9fafb' }} />
              <Bar dataKey="sales" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <CardHeader title="Recently Closed Deals" />
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                <th className="py-3 pr-4">Rep</th>
                <th className="py-3 pr-4">Client</th>
                <th className="py-3 pr-4">Amount</th>
                <th className="py-3 pr-4">Closed On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
              {topDeals.map((d, i) => (
                <tr key={i} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/60 transition-colors">
                  <td className="py-3 pr-4 font-semibold text-gray-800 dark:text-gray-100">{d.rep}</td>
                  <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{d.client}</td>
                  <td className="py-3 pr-4 font-semibold text-green-600 dark:text-green-400">{d.amount}</td>
                  <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{d.closed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
