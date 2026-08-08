import { useState } from 'react';
import { Plus, Headset, X } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { Card, CardHeader } from '../components/ui/Card';
import { Ticket, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface TicketItem {
  id: string;
  subject: string;
  user: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved';
  updated: string;
}

const INITIAL_TICKETS: TicketItem[] = [
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

const STATUS_CYCLE: TicketItem['status'][] = ['Open', 'In Progress', 'Resolved'];
let ticketCounter = 4822;

export default function Support() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState<TicketItem['priority']>('Medium');

  const openCount = tickets.filter((t) => t.status !== 'Resolved').length;
  const resolvedCount = tickets.filter((t) => t.status === 'Resolved').length;
  const escalatedCount = tickets.filter((t) => t.priority === 'High' && t.status !== 'Resolved').length;

  const createTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;
    const newTicket: TicketItem = {
      id: `#TK-${ticketCounter++}`,
      subject: subject.trim(),
      user: user?.name || 'You',
      priority,
      status: 'Open',
      updated: 'Just now',
    };
    setTickets((prev) => [newTicket, ...prev]);
    setSubject('');
    setPriority('Medium');
    setOpen(false);
    showToast(`Ticket ${newTicket.id} created`);
  };

  const cycleStatus = (id: string) => {
    setTickets((prev) => prev.map((t) => {
      if (t.id !== id) return t;
      const next = STATUS_CYCLE[(STATUS_CYCLE.indexOf(t.status) + 1) % STATUS_CYCLE.length];
      return { ...t, status: next, updated: 'Just now' };
    }));
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        eyebrow="New"
        eyebrowIcon={<Headset size={14} />}
        title="Support Tickets"
        subtitle="Track and respond to customer support requests."
        action={
          <button onClick={() => setOpen(true)} className="bg-white text-blue-600 px-5 py-2.5 rounded-2xl text-xs font-bold shadow-md hover:bg-blue-50 transition-all flex items-center gap-2 cursor-pointer">
            <Plus size={16} /> New Ticket
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Open Tickets" value={String(openCount)} icon={<Ticket size={22} />} />
        <StatCard title="Avg. Response Time" value="1h 42m" trend="-12%" icon={<Clock size={22} />} />
        <StatCard title="Resolved" value={String(resolvedCount)} icon={<CheckCircle2 size={22} />} />
        <StatCard title="Escalated" value={String(escalatedCount)} icon={<AlertTriangle size={22} />} isNegative={escalatedCount > 0} />
      </div>

      <Card className="p-6">
        <CardHeader title="Recent Tickets" subtitle="Latest support requests — click a status badge to advance it" />
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
                  <td className="py-3 pr-4">
                    <button onClick={() => cycleStatus(t.id)} className={`px-2.5 py-1 rounded-full text-xs font-bold cursor-pointer hover:opacity-80 transition-opacity ${statusColor[t.status]}`}>
                      {t.status}
                    </button>
                  </td>
                  <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{t.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-800 dark:text-gray-100">New Support Ticket</h3>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"><X size={18} /></button>
            </div>
            <form onSubmit={createTicket} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block">Subject</label>
                <input
                  autoFocus
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Describe the issue..."
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as TicketItem['priority'])}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <button type="submit" disabled={!subject.trim()} className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold transition-colors cursor-pointer">
                Create Ticket
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
