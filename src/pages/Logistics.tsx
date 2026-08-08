import { Truck, PackageCheck, MapPin, Timer, MoreVertical } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { PageHeader } from '../components/ui/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { Card, CardHeader } from '../components/ui/Card';

const deliveryTrend = [
  { name: 'Mon', onTime: 92 }, { name: 'Tue', onTime: 88 }, { name: 'Wed', onTime: 95 },
  { name: 'Thu', onTime: 90 }, { name: 'Fri', onTime: 97 }, { name: 'Sat', onTime: 93 }, { name: 'Sun', onTime: 96 },
];

const shipments = [
  { id: 'SHP-88213', route: 'Chicago → Denver', driver: 'Marcus Bell', eta: '2h 15m', status: 'In Transit' },
  { id: 'SHP-88214', route: 'Austin → Dallas', driver: 'Rita Alvarez', eta: '45m', status: 'In Transit' },
  { id: 'SHP-88190', route: 'Miami → Atlanta', driver: 'Youssef Idris', eta: 'Delivered', status: 'Delivered' },
  { id: 'SHP-88175', route: 'Seattle → Portland', driver: 'Kayla Simmons', eta: 'Delayed', status: 'Delayed' },
  { id: 'SHP-88201', route: 'Boston → NYC', driver: 'Devon Park', eta: '1h 05m', status: 'In Transit' },
];

const statusColor: Record<string, string> = {
  'In Transit': 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30',
  Delivered: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30',
  Delayed: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30',
};

export default function Logistics() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const gridStroke = isDark ? '#1f2937' : '#f3f4f6';
  const tickFill = isDark ? '#6b7280' : '#9ca3af';

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        eyebrow="Fleet & Delivery Operations"
        title="Logistics Dashboard"
        subtitle="Track shipments, fleet status, and on-time delivery performance in real time."
        gradient="from-sky-600 via-blue-600 to-indigo-700"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Shipments" value="248" trend="+6.2%" icon={<Truck size={22} />} />
        <StatCard title="Delivered Today" value="182" trend="+11.4%" icon={<PackageCheck size={22} />} />
        <StatCard title="Active Routes" value="34" trend="+2.0%" icon={<MapPin size={22} />} />
        <StatCard title="Avg. Transit Time" value="3h 12m" trend="-8.1%" icon={<Timer size={22} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <CardHeader title="On-Time Delivery Rate" subtitle="Percentage of shipments delivered on schedule" action={<MoreVertical size={20} className="text-gray-400 cursor-pointer" />} />
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={deliveryTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: tickFill }} />
                <YAxis domain={[80, 100]} axisLine={false} tickLine={false} tick={{ fill: tickFill }} />
                <Tooltip />
                <Line type="monotone" dataKey="onTime" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 flex flex-col justify-between">
          <CardHeader title="Fleet Status" />
          <div className="space-y-4">
            {[
              { label: 'On the Road', value: 62, color: 'bg-blue-500' },
              { label: 'Idle', value: 21, color: 'bg-gray-400' },
              { label: 'Maintenance', value: 17, color: 'bg-amber-500' },
            ].map((f) => (
              <div key={f.label}>
                <div className="flex justify-between text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
                  <span>{f.label}</span><span>{f.value}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className={`h-full ${f.color} rounded-full`} style={{ width: `${f.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <CardHeader title="Live Shipments" subtitle="Currently tracked deliveries across all routes" />
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                <th className="py-3 pr-4">Shipment ID</th>
                <th className="py-3 pr-4">Route</th>
                <th className="py-3 pr-4">Driver</th>
                <th className="py-3 pr-4">ETA</th>
                <th className="py-3 pr-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
              {shipments.map((s, i) => (
                <tr key={i} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/60 transition-colors">
                  <td className="py-3 pr-4 font-mono text-xs font-bold text-blue-600 dark:text-blue-400">{s.id}</td>
                  <td className="py-3 pr-4 text-gray-700 dark:text-gray-200 font-medium">{s.route}</td>
                  <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{s.driver}</td>
                  <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{s.eta}</td>
                  <td className="py-3 pr-4"><span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusColor[s.status]}`}>{s.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
