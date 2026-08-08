import { useState } from 'react';
import { Users, Handshake, PhoneCall, TrendingUp, MoreVertical, Plus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { PageHeader } from '../components/ui/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { Card, CardHeader } from '../components/ui/Card';

const pipelineTrend = [
  { name: 'Mon', deals: 12 }, { name: 'Tue', deals: 19 }, { name: 'Wed', deals: 14 },
  { name: 'Thu', deals: 22 }, { name: 'Fri', deals: 28 }, { name: 'Sat', deals: 18 }, { name: 'Sun', deals: 24 },
];

const stageData = [
  { name: 'Lead', value: 38, color: '#93c5fd' },
  { name: 'Qualified', value: 26, color: '#60a5fa' },
  { name: 'Proposal', value: 18, color: '#3b82f6' },
  { name: 'Won', value: 18, color: '#1d4ed8' },
];

const deals = [
  { company: 'Nimbus Retail Co.', contact: 'Sarah Klein', stage: 'Proposal', value: '$24,500', prob: 70 },
  { company: 'Vertex Logistics', contact: 'Omar Haddad', stage: 'Qualified', value: '$12,900', prob: 45 },
  { company: 'Bluepeak Studio', contact: 'Mina Cho', stage: 'Won', value: '$38,200', prob: 100 },
  { company: 'Harborline Foods', contact: 'Jake Turner', stage: 'Lead', value: '$6,400', prob: 15 },
  { company: 'Solace Health', contact: 'Priya Nair', stage: 'Proposal', value: '$19,750', prob: 65 },
];

const stageColor: Record<string, string> = {
  Lead: 'text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800',
  Qualified: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30',
  Proposal: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30',
  Won: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30',
};

export default function Crm() {
  const [range, setRange] = useState<'7d' | '30d'>('7d');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const gridStroke = isDark ? '#1f2937' : '#f3f4f6';
  const tickFill = isDark ? '#6b7280' : '#9ca3af';

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        eyebrow="Customer Relationship Suite"
        title="CRM Overview"
        subtitle="Track your pipeline, follow up on leads, and close more deals faster."
        action={
          <button className="bg-white text-blue-600 px-5 py-2.5 rounded-2xl text-xs font-bold shadow-md hover:bg-blue-50 transition-all flex items-center gap-2 cursor-pointer">
            <Plus size={16} /> New Deal
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Contacts" value="3,482" trend="+12.4%" icon={<Users size={22} />} />
        <StatCard title="Open Deals" value="146" trend="+4.1%" icon={<Handshake size={22} />} />
        <StatCard title="Calls This Week" value="212" trend="-3.2%" icon={<PhoneCall size={22} />} isNegative />
        <StatCard title="Win Rate" value="38.5%" trend="+2.9%" icon={<TrendingUp size={22} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <CardHeader
            title="Deals Created"
            subtitle="New pipeline entries over time"
            action={
              <div className="flex gap-2">
                {(['7d', '30d'] as const).map((r) => (
                  <button key={r} onClick={() => setRange(r)} className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${range === r ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>{r}</button>
                ))}
              </div>
            }
          />
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pipelineTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: tickFill }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: tickFill }} />
                <Tooltip />
                <Line type="monotone" dataKey="deals" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <CardHeader title="Pipeline by Stage" action={<MoreVertical size={20} className="text-gray-400 cursor-pointer" />} />
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stageData} innerRadius={45} outerRadius={65} paddingAngle={4} dataKey="value">
                  {stageData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {stageData.map((s) => (
              <div key={s.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }}></span>
                <span className="text-gray-600 dark:text-gray-300 font-medium">{s.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <CardHeader title="Active Deals" subtitle="Deals currently moving through your pipeline" />
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                <th className="py-3 pr-4">Company</th>
                <th className="py-3 pr-4">Contact</th>
                <th className="py-3 pr-4">Stage</th>
                <th className="py-3 pr-4">Value</th>
                <th className="py-3 pr-4">Probability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
              {deals.map((d, i) => (
                <tr key={i} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/60 transition-colors">
                  <td className="py-3 pr-4 font-semibold text-gray-800 dark:text-gray-100">{d.company}</td>
                  <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{d.contact}</td>
                  <td className="py-3 pr-4"><span className={`px-2.5 py-1 rounded-full text-xs font-bold ${stageColor[d.stage]}`}>{d.stage}</span></td>
                  <td className="py-3 pr-4 font-semibold text-gray-800 dark:text-gray-100">{d.value}</td>
                  <td className="py-3 pr-4 w-40">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${d.prob}%` }}></div>
                      </div>
                      <span className="text-xs text-gray-400 w-8">{d.prob}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
