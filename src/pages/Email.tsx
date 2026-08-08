import { useState } from 'react';
import { Search, Star, Paperclip, PenSquare, Inbox, Send, FileText, Trash2, X } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

type Folder = 'Inbox' | 'Sent' | 'Drafts' | 'Trash';

interface EmailItem {
  id: number;
  folder: Folder;
  from: string;
  to?: string;
  subject: string;
  preview: string;
  time: string;
  starred: boolean;
  unread: boolean;
  hasAttachment?: boolean;
}

const INITIAL_EMAILS: EmailItem[] = [
  { id: 1, folder: 'Inbox', from: 'Sarah Klein', subject: 'Q3 Proposal — final review', preview: 'Attached is the updated proposal with the revised pricing tiers...', time: '9:41 AM', starred: true, unread: true },
  { id: 2, folder: 'Inbox', from: 'GitHub', subject: '[femora-app] New pull request opened', preview: 'A new PR "Add background blur effects" was opened by ahmadkhan...', time: '8:15 AM', starred: false, unread: true, hasAttachment: true },
  { id: 3, folder: 'Inbox', from: 'Omar Haddad', subject: 'Invoice #4821 attached', preview: 'Please find attached the invoice for last month’s services.', time: 'Yesterday', starred: false, unread: false },
  { id: 4, folder: 'Inbox', from: 'Mina Cho', subject: 'Design handoff — dashboard v2', preview: 'Handoff files are ready in Figma, let me know if anything is missing.', time: 'Yesterday', starred: true, unread: false },
  { id: 5, folder: 'Inbox', from: 'TailAdmin Team', subject: 'Your subscription renews soon', preview: 'Your Pro plan renews on Sep 1, 2026. No action needed.', time: '2 days ago', starred: false, unread: false },
  { id: 6, folder: 'Drafts', from: 'Me', to: 'accounting@femora.app', subject: 'Re: August invoices', preview: 'Hey, just following up on the invoices from...', time: '3 days ago', starred: false, unread: false },
  { id: 7, folder: 'Drafts', from: 'Me', to: 'team@femora.app', subject: 'Sprint retro notes', preview: 'Draft notes from this week\'s retro...', time: '5 days ago', starred: false, unread: false },
  { id: 8, folder: 'Drafts', from: 'Me', to: 'sarah.klein@nimbus.io', subject: 'Contract renewal', preview: 'Wanted to check in about renewing...', time: '1 week ago', starred: false, unread: false },
];

const FOLDER_ICONS: Record<Folder, typeof Inbox> = { Inbox, Sent: Send, Drafts: FileText, Trash: Trash2 };
const FOLDERS: Folder[] = ['Inbox', 'Sent', 'Drafts', 'Trash'];

function formatTime() {
  return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export default function Email() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [emails, setEmails] = useState(INITIAL_EMAILS);
  const [activeFolder, setActiveFolder] = useState<Folder>('Inbox');
  const [query, setQuery] = useState('');
  const [openEmail, setOpenEmail] = useState<number | null>(null);
  const [composing, setComposing] = useState(false);
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');

  const counts: Record<Folder, number> = {
    Inbox: emails.filter((e) => e.folder === 'Inbox' && e.unread).length,
    Sent: 0,
    Drafts: emails.filter((e) => e.folder === 'Drafts').length,
    Trash: 0,
  };

  const filtered = emails.filter(
    (e) => e.folder === activeFolder && (e.subject.toLowerCase().includes(query.toLowerCase()) || e.from.toLowerCase().includes(query.toLowerCase()))
  );

  const openMail = (id: number) => {
    setOpenEmail(id);
    setEmails((prev) => prev.map((e) => (e.id === id ? { ...e, unread: false } : e)));
  };

  const toggleStar = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setEmails((prev) => prev.map((m) => (m.id === id ? { ...m, starred: !m.starred } : m)));
  };

  const moveToTrash = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setEmails((prev) => prev.map((m) => (m.id === id ? { ...m, folder: 'Trash' } : m)));
    setOpenEmail(null);
    showToast('Email moved to Trash');
  };

  const openCompose = () => {
    setComposeTo('');
    setComposeSubject('');
    setComposeBody('');
    setComposing(true);
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeTo.trim() || !composeSubject.trim()) return;
    const newEmail: EmailItem = {
      id: Date.now(),
      folder: 'Sent',
      from: user?.name || 'Me',
      to: composeTo.trim(),
      subject: composeSubject.trim(),
      preview: composeBody.trim() || '(no message body)',
      time: formatTime(),
      starred: false,
      unread: false,
    };
    setEmails((prev) => [newEmail, ...prev]);
    setComposing(false);
    setActiveFolder('Sent');
    showToast(`Email sent to ${composeTo.trim()}`);
  };

  const activeEmail = emails.find((e) => e.id === openEmail);

  return (
    <div className="p-4 md:p-6 h-[calc(100vh-4rem)]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-full">
        <Card className="p-4 h-fit">
          <button
            onClick={openCompose}
            className="w-full mb-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            <PenSquare size={16} /> Compose
          </button>
          <div className="space-y-1">
            {FOLDERS.map((f) => {
              const Icon = FOLDER_ICONS[f];
              return (
                <button
                  key={f}
                  onClick={() => { setActiveFolder(f); setOpenEmail(null); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${activeFolder === f ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                >
                  <span className="flex items-center gap-2"><Icon size={16} /> {f}</span>
                  {counts[f] > 0 && <span className="text-xs font-bold bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">{counts[f]}</span>}
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="md:col-span-3 flex flex-col overflow-hidden">
          {activeEmail ? (
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <button onClick={() => setOpenEmail(null)} className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">← Back</button>
                <button onClick={(e) => moveToTrash(activeEmail.id, e)} className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"><Trash2 size={16} /></button>
              </div>
              <div className="p-6 overflow-y-auto flex-1">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1">{activeEmail.subject}</h2>
                <p className="text-sm text-gray-400 mb-6">
                  From <span className="font-semibold text-gray-600 dark:text-gray-300">{activeEmail.from}</span>
                  {activeEmail.to && <> to <span className="font-semibold text-gray-600 dark:text-gray-300">{activeEmail.to}</span></>}
                  {' · '}{activeEmail.time}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">{activeEmail.preview}</p>
              </div>
            </div>
          ) : (
            <>
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
                {filtered.map((e) => (
                  <div
                    key={e.id}
                    onClick={() => openMail(e.id)}
                    className={`flex items-start gap-3 px-4 py-4 hover:bg-gray-50/60 dark:hover:bg-gray-800/40 cursor-pointer transition-colors ${e.unread ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}
                  >
                    <button onClick={(ev) => toggleStar(e.id, ev)} className="shrink-0 mt-0.5 cursor-pointer">
                      <Star size={16} className={e.starred ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} />
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className={`text-sm truncate ${e.unread ? 'font-bold text-gray-900 dark:text-gray-100' : 'font-medium text-gray-700 dark:text-gray-300'}`}>
                          {activeFolder === 'Sent' || activeFolder === 'Drafts' ? `To: ${e.to}` : e.from}
                        </p>
                        <span className="text-xs text-gray-400 shrink-0 ml-2">{e.time}</span>
                      </div>
                      <p className={`text-sm truncate ${e.unread ? 'font-semibold text-gray-800 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'}`}>{e.subject}</p>
                      <p className="text-xs text-gray-400 truncate flex items-center gap-1">
                        {e.preview} {e.hasAttachment && <Paperclip size={11} className="shrink-0" />}
                      </p>
                    </div>
                    <button onClick={(ev) => moveToTrash(e.id, ev)} className="shrink-0 mt-0.5 p-1 text-gray-300 hover:text-red-500 cursor-pointer"><Trash2 size={14} /></button>
                  </div>
                ))}
                {filtered.length === 0 && <div className="p-10 text-center text-gray-400 text-sm">No emails in {activeFolder.toLowerCase()}.</div>}
              </div>
            </>
          )}
        </Card>
      </div>

      {composing && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50" onClick={() => setComposing(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full sm:max-w-lg bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-800 dark:text-gray-100">New Message</h3>
              <button onClick={() => setComposing(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"><X size={18} /></button>
            </div>
            <form onSubmit={sendEmail} className="space-y-3">
              <input
                autoFocus
                value={composeTo}
                onChange={(e) => setComposeTo(e.target.value)}
                type="email"
                required
                placeholder="To"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <input
                value={composeSubject}
                onChange={(e) => setComposeSubject(e.target.value)}
                required
                placeholder="Subject"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <textarea
                value={composeBody}
                onChange={(e) => setComposeBody(e.target.value)}
                rows={6}
                placeholder="Write your message..."
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
              <button type="submit" className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors cursor-pointer">
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
