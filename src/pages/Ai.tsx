import { Sparkles, Cpu, Gauge, Zap, MoreVertical } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { PageHeader } from '../components/ui/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { Card, CardHeader } from '../components/ui/Card';

const usageTrend = [
  { name: '00:00', tokens: 12 }, { name: '04:00', tokens: 8 }, { name: '08:00', tokens: 34 },
  { name: '12:00', tokens: 52 }, { name: '16:00', tokens: 61 }, { name: '20:00', tokens: 44 }, { name: '23:59', tokens: 27 },
];

const models = [
  { name: 'Sonnet 5', requests: '48,120', latency: '412ms', accuracy: '98.4%' },
  { name: 'Opus 5', requests: '9,860', latency: '780ms', accuracy: '99.1%' },
  { name: 'Haiku 4.5', requests: '112,940', latency: '190ms', accuracy: '96.7%' },
];

export default function Ai() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const gridStroke = isDark ? '#1f2937' : '#f3f4f6';
  const tickFill = isDark ? '#6b7280' : '#9ca3af';

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        eyebrow="AI Operations"
        eyebrowIcon={<Sparkles size={14} />}
        title="AI Dashboard"
        subtitle="Monitor model usage, latency, and inference cost across your AI workloads."
        gradient="from-violet-600 via-indigo-600 to-blue-700"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Requests" value="170.9K" trend="+18.2%" icon={<Cpu size={22} />} />
        <StatCard title="Avg. Latency" value="342ms" trend="-6.4%" icon={<Gauge size={22} />} />
        <StatCard title="Tokens Consumed" value="4.2M" trend="+22.9%" icon={<Zap size={22} />} />
        <StatCard title="Success Rate" value="99.2%" trend="+0.3%" icon={<Sparkles size={22} />} />
      </div>

      <Card className="p-6">
        <CardHeader title="Token Usage (24h)" subtitle="Hourly token consumption across all models" action={<MoreVertical size={20} className="text-gray-400 cursor-pointer" />} />
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={usageTrend}>
              <defs>
                <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: tickFill }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: tickFill }} />
              <Tooltip />
              <Area type="monotone" dataKey="tokens" stroke="#8b5cf6" strokeWidth={2} fill="url(#colorTokens)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <CardHeader title="Model Performance" subtitle="Live comparison across deployed models" />
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                <th className="py-3 pr-4">Model</th>
                <th className="py-3 pr-4">Requests (24h)</th>
                <th className="py-3 pr-4">Avg. Latency</th>
                <th className="py-3 pr-4">Accuracy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
              {models.map((m, i) => (
                <tr key={i} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/60 transition-colors">
                  <td className="py-3 pr-4 font-semibold text-gray-800 dark:text-gray-100">{m.name}</td>
                  <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{m.requests}</td>
                  <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{m.latency}</td>
                  <td className="py-3 pr-4 font-semibold text-green-600 dark:text-green-400">{m.accuracy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
