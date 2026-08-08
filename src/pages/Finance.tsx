import { Wallet, TrendingUp, CreditCard, PiggyBank, MoreVertical } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { PageHeader } from '../components/ui/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { Card, CardHeader } from '../components/ui/Card';
import { useToast } from '../context/ToastContext';

const cashFlow = [
  { name: 'Jan', income: 62, expense: 40 }, { name: 'Feb', income: 58, expense: 44 },
  { name: 'Mar', income: 70, expense: 46 }, { name: 'Apr', income: 66, expense: 50 },
  { name: 'May', income: 78, expense: 48 }, { name: 'Jun', income: 84, expense: 55 },
];

const transactions = [
  { desc: 'Client Payment - Northbridge', category: 'Income', amount: '+$14,200', date: 'Aug 07, 2026' },
  { desc: 'AWS Infrastructure', category: 'Expense', amount: '-$2,340', date: 'Aug 06, 2026' },
  { desc: 'Payroll - August', category: 'Expense', amount: '-$38,900', date: 'Aug 05, 2026' },
  { desc: 'Client Payment - Pinecrest', category: 'Income', amount: '+$9,750', date: 'Aug 04, 2026' },
  { desc: 'Office Lease', category: 'Expense', amount: '-$5,100', date: 'Aug 01, 2026' },
];

export default function Finance() {
  const { showToast } = useToast();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const gridStroke = isDark ? '#1f2937' : '#f3f4f6';
  const tickFill = isDark ? '#6b7280' : '#9ca3af';

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        eyebrow="Financial Overview"
        title="Finance Dashboard"
        subtitle="Track income, expenses, and cash flow health across the business."
        gradient="from-blue-700 via-blue-600 to-cyan-600"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Balance" value="$482.9K" trend="+9.4%" icon={<Wallet size={22} />} />
        <StatCard title="Monthly Income" value="$84.2K" trend="+12.1%" icon={<TrendingUp size={22} />} />
        <StatCard title="Monthly Expenses" value="$55.1K" trend="+4.8%" icon={<CreditCard size={22} />} isNegative />
        <StatCard title="Net Savings" value="$29.1K" trend="+18.6%" icon={<PiggyBank size={22} />} />
      </div>

      <Card className="p-6">
        <CardHeader title="Cash Flow" subtitle="Income vs expenses over the last 6 months" action={<button onClick={() => showToast('Chart export is not available in this demo yet.', 'info')} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"><MoreVertical size={20} /></button>} />
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={cashFlow}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: tickFill }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: tickFill }} />
              <Tooltip />
              <Area type="monotone" dataKey="income" stroke="#3b82f6" strokeWidth={2} fill="url(#colorIncome)" />
              <Area type="monotone" dataKey="expense" stroke="#f97316" strokeWidth={2} fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <CardHeader title="Recent Transactions" />
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                <th className="py-3 pr-4">Description</th>
                <th className="py-3 pr-4">Category</th>
                <th className="py-3 pr-4">Amount</th>
                <th className="py-3 pr-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
              {transactions.map((t, i) => (
                <tr key={i} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/60 transition-colors">
                  <td className="py-3 pr-4 font-semibold text-gray-800 dark:text-gray-100">{t.desc}</td>
                  <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{t.category}</td>
                  <td className={`py-3 pr-4 font-semibold ${t.amount.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>{t.amount}</td>
                  <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
