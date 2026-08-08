import { Users, CreditCard, TrendingDown, Activity, MoreVertical } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { PageHeader } from '../components/ui/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { Card, CardHeader } from '../components/ui/Card';

const mrrTrend = [
  { name: 'Jan', mrr: 32 }, { name: 'Feb', mrr: 38 }, { name: 'Mar', mrr: 41 }, { name: 'Apr', mrr: 47 },
  { name: 'May', mrr: 52 }, { name: 'Jun', mrr: 58 }, { name: 'Jul', mrr: 64 }, { name: 'Aug', mrr: 71 },
];

const planUsage = [
  { name: 'Free', users: 4200 }, { name: 'Starter', users: 1850 }, { name: 'Pro', users: 920 }, { name: 'Enterprise', users: 180 },
];

const plans = [
  { name: 'John Reyes', plan: 'Enterprise', mrr: '$499', renewal: 'Sep 12, 2026', status: 'Active' },
  { name: 'Aiko Tanaka', plan: 'Pro', mrr: '$79', renewal: 'Aug 28, 2026', status: 'Active' },
  { name: 'Liam O’Connor', plan: 'Starter', mrr: '$29', renewal: 'Aug 14, 2026', status: 'Past Due' },
  { name: 'Fatima Zahra', plan: 'Pro', mrr: '$79', renewal: 'Sep 02, 2026', status: 'Active' },
  { name: 'Carlos Mendes', plan: 'Enterprise', mrr: '$499', renewal: 'Aug 20, 2026', status: 'Canceled' },
];

const statusColor: Record<string, string> = {
  Active: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30',
  'Past Due': 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30',
  Canceled: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30',
};

export default function SaaS() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const gridStroke = isDark ? '#1f2937' : '#f3f4f6';
  const tickFill = isDark ? '#6b7280' : '#9ca3af';

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        eyebrow="Subscription Metrics"
        title="SaaS Dashboard"
        subtitle="Monitor recurring revenue, subscriber growth, and churn at a glance."
        gradient="from-indigo-600 via-blue-600 to-indigo-700"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Monthly Recurring Revenue" value="$71.2K" trend="+9.8%" icon={<CreditCard size={22} />} />
        <StatCard title="Active Subscribers" value="7,150" trend="+5.6%" icon={<Users size={22} />} />
        <StatCard title="Churn Rate" value="2.4%" trend="-0.6%" icon={<TrendingDown size={22} />} />
        <StatCard title="Avg. Session Time" value="18m 42s" trend="+1.1%" icon={<Activity size={22} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <CardHeader title="MRR Growth" subtitle="Monthly recurring revenue, in thousands ($)" action={<MoreVertical size={20} className="text-gray-400 cursor-pointer" />} />
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mrrTrend}>
                <defs>
                  <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: tickFill }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: tickFill }} />
                <Tooltip />
                <Area type="monotone" dataKey="mrr" stroke="#6366f1" strokeWidth={2} fill="url(#colorMrr)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <CardHeader title="Users by Plan" />
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={planUsage} layout="vertical" margin={{ left: 10 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: tickFill, fontSize: 12 }} width={70} />
                <Tooltip cursor={{ fill: isDark ? '#111827' : '#f9fafb' }} />
                <Bar dataKey="users" fill="#6366f1" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <CardHeader title="Recent Subscriptions" subtitle="Latest customer billing activity" />
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                <th className="py-3 pr-4">Customer</th>
                <th className="py-3 pr-4">Plan</th>
                <th className="py-3 pr-4">MRR</th>
                <th className="py-3 pr-4">Renews</th>
                <th className="py-3 pr-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
              {plans.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/60 transition-colors">
                  <td className="py-3 pr-4 font-semibold text-gray-800 dark:text-gray-100">{p.name}</td>
                  <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{p.plan}</td>
                  <td className="py-3 pr-4 font-semibold text-gray-800 dark:text-gray-100">{p.mrr}</td>
                  <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{p.renewal}</td>
                  <td className="py-3 pr-4"><span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusColor[p.status]}`}>{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
