import { useState } from 'react';
import { Search, Send, Phone, Video, MoreVertical } from 'lucide-react';

const contacts = [
  { name: 'Sarah Klein', last: 'Sounds good, see you then!', time: '2m', unread: 2, active: true },
  { name: 'Omar Haddad', last: 'Sent the invoice over.', time: '18m', unread: 0, active: false },
  { name: 'Mina Cho', last: 'Can we reschedule the call?', time: '1h', unread: 1, active: false },
  { name: 'Jake Turner', last: 'Thanks for the update!', time: '3h', unread: 0, active: false },
  { name: 'Priya Nair', last: 'Attaching the design files.', time: 'Yesterday', unread: 0, active: false },
];

const thread = [
  { from: 'them', text: 'Hey! Are we still on for the 3pm review?', time: '10:02 AM' },
  { from: 'me', text: 'Yes, I’ll share my screen with the latest mockups.', time: '10:05 AM' },
  { from: 'them', text: 'Perfect. Sounds good, see you then!', time: '10:06 AM' },
];

export default function Chat() {
  const [active, setActive] = useState(contacts[0].name);
  const [input, setInput] = useState('');

  return (
    <div className="p-4 md:p-6 h-[calc(100vh-6rem)]">
      <div className="grid grid-cols-1 md:grid-cols-3 h-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="border-r border-gray-100 dark:border-gray-800 flex flex-col">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Search size={14} />
              </span>
              <input placeholder="Search chats..." className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {contacts.map((c) => (
              <button
                key={c.name}
                onClick={() => setActive(c.name)}
                className={`w-full flex items-center gap-3 p-4 text-left border-b border-gray-50 dark:border-gray-800/50 transition-colors cursor-pointer ${active === c.name ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800/40'}`}
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400 shrink-0">
                  {c.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{c.name}</p>
                    <span className="text-[10px] text-gray-400 shrink-0">{c.time}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{c.last}</p>
                </div>
                {c.unread > 0 && <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">{c.unread}</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400">
                {active.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{active}</p>
                <p className="text-xs text-green-500 font-medium">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[Phone, Video, MoreVertical].map((Icon, i) => (
                <button key={i} className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"><Icon size={16} /></button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {thread.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${m.from === 'me' ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-tl-sm'}`}>
                  {m.text}
                  <div className={`text-[10px] mt-1 ${m.from === 'me' ? 'text-blue-100' : 'text-gray-400'}`}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setInput(''); }} className="p-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Message ${active}...`}
              className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button type="submit" className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer"><Send size={16} /></button>
          </form>
        </div>
      </div>
    </div>
  );
}
