import { useState } from 'react';
import { Search, Star, Paperclip, PenSquare, Inbox, Send, FileText, Trash2 } from 'lucide-react';
import { Card } from '../components/ui/Card';

const folders = [
  { name: 'Inbox', icon: Inbox, count: 12 },
  { name: 'Sent', icon: Send, count: 0 },
  { name: 'Drafts', icon: FileText, count: 3 },
  { name: 'Trash', icon: Trash2, count: 0 },
];

const emails = [
  { from: 'Sarah Klein', subject: 'Q3 Proposal — final review', preview: 'Attached is the updated proposal with the revised pricing tiers...', time: '9:41 AM', starred: true, unread: true },
  { from: 'GitHub', subject: '[femora-app] New pull request opened', preview: 'A new PR "Add background blur effects" was opened by ahmadkhan...', time: '8:15 AM', starred: false, unread: true },
  { from: 'Omar Haddad', subject: 'Invoice #4821 attached', preview: 'Please find attached the invoice for last month’s services.', time: 'Yesterday', starred: false, unread: false },
  { from: 'Mina Cho', subject: 'Design handoff — dashboard v2', preview: 'Handoff files are ready in Figma, let me know if anything is missing.', time: 'Yesterday', starred: true, unread: false },
  { from: 'TailAdmin Team', subject: 'Your subscription renews soon', preview: 'Your Pro plan renews on Sep 1, 2026. No action needed.', time: '2 days ago', starred: false, unread: false },
];

export default function Email() {
  const [activeFolder, setActiveFolder] = useState('Inbox');
  const [query, setQuery] = useState('');

  const filtered = emails.filter((e) => e.subject.toLowerCase().includes(query.toLowerCase()) || e.from.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="p-4 md:p-6 h-[calc(100vh-4rem)]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-full">
        <Card className="p-4 h-fit">
          <button className="w-full mb-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors cursor-pointer">
            <PenSquare size={16} /> Compose
          </button>
          <div className="space-y-1">
            {folders.map((f) => (
              <button
                key={f.name}
                onClick={() => setActiveFolder(f.name)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${activeFolder === f.name ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              >
                <span className="flex items-center gap-2"><f.icon size={16} /> {f.name}</span>
                {f.count > 0 && <span className="text-xs font-bold bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">{f.count}</span>}
              </button>
            ))}
          </div>
        </Card>

        <Card className="md:col-span-3 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Search size={14} />
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search mail..."
                className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50 dark:divide-gray-800/60">
            {filtered.map((e, i) => (
              <div key={i} className={`flex items-start gap-3 px-4 py-4 hover:bg-gray-50/60 dark:hover:bg-gray-800/40 cursor-pointer transition-colors ${e.unread ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}>
                <Star size={16} className={e.starred ? 'text-amber-400 fill-amber-400 shrink-0 mt-0.5' : 'text-gray-300 shrink-0 mt-0.5'} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className={`text-sm truncate ${e.unread ? 'font-bold text-gray-900 dark:text-gray-100' : 'font-medium text-gray-700 dark:text-gray-300'}`}>{e.from}</p>
                    <span className="text-xs text-gray-400 shrink-0 ml-2">{e.time}</span>
                  </div>
                  <p className={`text-sm truncate ${e.unread ? 'font-semibold text-gray-800 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'}`}>{e.subject}</p>
                  <p className="text-xs text-gray-400 truncate flex items-center gap-1">
                    {e.preview} {i === 1 && <Paperclip size={11} className="shrink-0" />}
                  </p>
                </div>
              </div>
            ))}
            {filtered.length === 0 && <div className="p-10 text-center text-gray-400 text-sm">No emails found.</div>}
          </div>
        </Card>
      </div>
    </div>
  );
}
