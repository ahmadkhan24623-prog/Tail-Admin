import { useState } from 'react';
import { Search, Pencil, Trash2, Check, X, UserPlus } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader } from '../components/ui/Card';
import { useToast } from '../context/ToastContext';

interface Member {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Pending' | 'Inactive';
  joined: string;
}

const INITIAL_ROWS: Member[] = [
  { id: 1, name: 'Lindsey Curtis', email: 'lindsey.curtis@example.com', role: 'Team Manager', status: 'Active', joined: 'Jan 12, 2025' },
  { id: 2, name: 'Kaiya George', email: 'kaiya.george@example.com', role: 'Frontend Developer', status: 'Active', joined: 'Feb 03, 2025' },
  { id: 3, name: 'Zain Geidt', email: 'zain.geidt@example.com', role: 'Backend Developer', status: 'Pending', joined: 'Mar 21, 2025' },
  { id: 4, name: 'Abram Schleifer', email: 'abram.schleifer@example.com', role: 'UI/UX Designer', status: 'Active', joined: 'Apr 09, 2025' },
  { id: 5, name: 'Carla Repice', email: 'carla.repice@example.com', role: 'QA Engineer', status: 'Inactive', joined: 'May 30, 2025' },
];

const statusColor: Record<string, string> = {
  Active: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30',
  Pending: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30',
  Inactive: 'text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800',
};

let idCounter = 6;

export default function Tables() {
  const { showToast } = useToast();
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [query, setQuery] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDraft, setEditDraft] = useState<{ name: string; role: string; status: Member['status'] } | null>(null);

  const filtered = rows.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()) || r.email.toLowerCase().includes(query.toLowerCase()));

  const startEdit = (m: Member) => {
    setEditingId(m.id);
    setEditDraft({ name: m.name, role: m.role, status: m.status });
  };

  const saveEdit = (id: number) => {
    if (!editDraft) return;
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...editDraft } : r)));
    setEditingId(null);
    showToast('Member updated');
  };

  const deleteRow = (id: number, name: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
    showToast(`Removed ${name} from the team`);
  };

  const addMember = () => {
    const newMember: Member = {
      id: idCounter++,
      name: 'New Member',
      email: 'new.member@example.com',
      role: 'Unassigned',
      status: 'Pending',
      joined: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    };
    setRows((prev) => [newMember, ...prev]);
    startEdit(newMember);
    showToast('Member added — edit their details below');
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        title="Tables"
        subtitle="A searchable, sortable data table for managing team members."
        action={
          <button onClick={addMember} className="bg-white text-blue-600 px-5 py-2.5 rounded-2xl text-xs font-bold shadow-md hover:bg-blue-50 transition-all flex items-center gap-2 cursor-pointer">
            <UserPlus size={16} /> Add Member
          </button>
        }
      />

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
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/60 transition-colors">
                  {editingId === r.id && editDraft ? (
                    <>
                      <td className="py-2 pr-4">
                        <input
                          value={editDraft.name}
                          onChange={(e) => setEditDraft({ ...editDraft, name: e.target.value })}
                          className="w-full px-2 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:border-blue-500"
                        />
                        <p className="text-xs text-gray-400 mt-1">{r.email}</p>
                      </td>
                      <td className="py-2 pr-4">
                        <input
                          value={editDraft.role}
                          onChange={(e) => setEditDraft({ ...editDraft, role: e.target.value })}
                          className="w-full px-2 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:border-blue-500"
                        />
                      </td>
                      <td className="py-2 pr-4">
                        <select
                          value={editDraft.status}
                          onChange={(e) => setEditDraft({ ...editDraft, status: e.target.value as Member['status'] })}
                          className="px-2 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:border-blue-500"
                        >
                          <option>Active</option>
                          <option>Pending</option>
                          <option>Inactive</option>
                        </select>
                      </td>
                      <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{r.joined}</td>
                      <td className="py-3 pr-4">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => saveEdit(r.id)} className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors cursor-pointer"><Check size={14} /></button>
                          <button onClick={() => setEditingId(null)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"><X size={14} /></button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-3 pr-4">
                        <p className="font-semibold text-gray-800 dark:text-gray-100">{r.name}</p>
                        <p className="text-xs text-gray-400">{r.email}</p>
                      </td>
                      <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{r.role}</td>
                      <td className="py-3 pr-4"><span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusColor[r.status]}`}>{r.status}</span></td>
                      <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{r.joined}</td>
                      <td className="py-3 pr-4">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => startEdit(r)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors cursor-pointer"><Pencil size={14} /></button>
                          <button onClick={() => deleteRow(r.id, r.name)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors cursor-pointer"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </>
                  )}
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
