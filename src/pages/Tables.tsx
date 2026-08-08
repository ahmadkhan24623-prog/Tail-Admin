import { useState } from 'react';
import { Search, Pencil, Trash2 } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader } from '../components/ui/Card';

const rows = [
  { name: 'Lindsey Curtis', email: 'lindsey.curtis@example.com', role: 'Team Manager', status: 'Active', joined: 'Jan 12, 2025' },
  { name: 'Kaiya George', email: 'kaiya.george@example.com', role: 'Frontend Developer', status: 'Active', joined: 'Feb 03, 2025' },
  { name: 'Zain Geidt', email: 'zain.geidt@example.com', role: 'Backend Developer', status: 'Pending', joined: 'Mar 21, 2025' },
  { name: 'Abram Schleifer', email: 'abram.schleifer@example.com', role: 'UI/UX Designer', status: 'Active', joined: 'Apr 09, 2025' },
  { name: 'Carla Repice', email: 'carla.repice@example.com', role: 'QA Engineer', status: 'Inactive', joined: 'May 30, 2025' },
];

const statusColor: Record<string, string> = {
  Active: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30',
  Pending: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30',
  Inactive: 'text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800',
};

export default function Tables() {
  const [query, setQuery] = useState('');
  const filtered = rows.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()) || r.email.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader title="Tables" subtitle="A searchable, sortable data table for managing team members." />

      <Card className="p-6">
        <CardHeader
          title="Team Members"
          subtitle={`${filtered.length} of ${rows.length} members`}
          action={
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Search size={14} />
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search members..."
                className="pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          }
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                <th className="py-3 pr-4">Name</th>
                <th className="py-3 pr-4">Role</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Joined</th>
                <th className="py-3 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
              {filtered.map((r, i) => (
                <tr key={i} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/60 transition-colors">
                  <td className="py-3 pr-4">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.email}</p>
                  </td>
                  <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{r.role}</td>
                  <td className="py-3 pr-4"><span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusColor[r.status]}`}>{r.status}</span></td>
                  <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{r.joined}</td>
                  <td className="py-3 pr-4">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors cursor-pointer"><Pencil size={14} /></button>
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors cursor-pointer"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="py-10 text-center text-gray-400 text-sm">No members found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
