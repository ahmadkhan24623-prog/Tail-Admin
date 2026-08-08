import { Plus, Headset } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { Card, CardHeader } from '../components/ui/Card';
import { Ticket, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';

const tickets = [
  { id: '#TK-4821', subject: 'Unable to export monthly report', user: 'Sarah Klein', priority: 'High', status: 'Open', updated: '10 min ago' },
  { id: '#TK-4819', subject: 'Billing address not updating', user: 'Omar Haddad', priority: 'Medium', status: 'In Progress', updated: '1 hr ago' },
  { id: '#TK-4812', subject: 'Feature request: dark mode for emails', user: 'Mina Cho', priority: 'Low', status: 'Open', updated: '3 hrs ago' },
  { id: '#TK-4801', subject: 'Login loop after password reset', user: 'Jake Turner', priority: 'High', status: 'Resolved', updated: 'Yesterday' },
];

const priorityColor: Record<string, string> = {
  High: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30',
  Medium: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30',
  Low: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30',
};

const statusColor: Record<string, string> = {
  Open: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30',
  'In Progress': 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30',
  Resolved: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30',
};

export default function Support() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        eyebrow="New"
        eyebrowIcon={<Headset size={14} />}
        title="Support Tickets"
        subtitle="Track and respond to customer support requests."
        action={
          <button className="bg-white text-blue-600 px-5 py-2.5 rounded-2xl text-xs font-bold shadow-md hover:bg-blue-50 transition-all flex items-center gap-2 cursor-pointer">
            <Plus size={16} /> New Ticket
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Open Tickets" value="24" trend="+3" icon={<Ticket size={22} />} />
        <StatCard title="Avg. Response Time" value="1h 42m" trend="-12%" icon={<Clock size={22} />} />
        <StatCard title="Resolved Today" value="17" trend="+5" icon={<CheckCircle2 size={22} />} />
        <StatCard title="Escalated" value="3" trend="+1" icon={<AlertTriangle size={22} />} isNegative />
      </div>

      <Card className="p-6">
        <CardHeader title="Recent Tickets" subtitle="Latest support requests from customers" />
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                <th className="py-3 pr-4">Ticket</th>
                <th className="py-3 pr-4">Subject</th>
                <th className="py-3 pr-4">Priority</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
              {tickets.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/60 transition-colors">
                  <td className="py-3 pr-4 font-mono text-xs font-bold text-blue-600 dark:text-blue-400">{t.id}</td>
                  <td className="py-3 pr-4">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">{t.subject}</p>
                    <p className="text-xs text-gray-400">{t.user}</p>
                  </td>
                  <td className="py-3 pr-4"><span className={`px-2.5 py-1 rounded-full text-xs font-bold ${priorityColor[t.priority]}`}>{t.priority}</span></td>
                  <td className="py-3 pr-4"><span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusColor[t.status]}`}>{t.status}</span></td>
                  <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{t.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
