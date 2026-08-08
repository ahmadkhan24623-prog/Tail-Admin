import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader } from '../components/ui/Card';

const data = [
  { name: 'Jan', a: 40, b: 24 }, { name: 'Feb', a: 55, b: 32 }, { name: 'Mar', a: 48, b: 40 },
  { name: 'Apr', a: 70, b: 45 }, { name: 'May', a: 62, b: 55 }, { name: 'Jun', a: 80, b: 60 },
];

const pieData = [
  { name: 'Desktop', value: 55, color: '#3b82f6' },
  { name: 'Mobile', value: 32, color: '#60a5fa' },
  { name: 'Tablet', value: 13, color: '#bfdbfe' },
];

export default function Charts() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const gridStroke = isDark ? '#1f2937' : '#f3f4f6';
  const tickFill = isDark ? '#6b7280' : '#9ca3af';

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader title="Charts" subtitle="A gallery of reusable chart components built with Recharts." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <CardHeader title="Line Chart" />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: tickFill }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: tickFill }} />
                <Tooltip />
                <Line type="monotone" dataKey="a" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="b" stroke="#93c5fd" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <CardHeader title="Bar Chart" />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: tickFill }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: tickFill }} />
                <Tooltip cursor={{ fill: isDark ? '#111827' : '#f9fafb' }} />
                <Bar dataKey="a" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <CardHeader title="Area Chart" />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: tickFill }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: tickFill }} />
                <Tooltip />
                <Area type="monotone" dataKey="a" stroke="#3b82f6" strokeWidth={2} fill="url(#colorA)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <CardHeader title="Pie Chart" />
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
