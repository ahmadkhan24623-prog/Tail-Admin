import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Trash2 } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { useToast } from '../context/ToastContext';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CalEvent {
  title: string;
  color: string;
}

const COLORS = [
  { name: 'Blue', value: 'bg-blue-500' },
  { name: 'Green', value: 'bg-green-500' },
  { name: 'Amber', value: 'bg-amber-500' },
  { name: 'Violet', value: 'bg-violet-500' },
  { name: 'Rose', value: 'bg-rose-500' },
];

const INITIAL_EVENTS: Record<number, CalEvent[]> = {
  4: [{ title: 'Design Review', color: 'bg-blue-500' }],
  8: [{ title: 'Product Launch', color: 'bg-green-500' }],
  12: [{ title: 'Team Standup', color: 'bg-blue-500' }, { title: 'Client Call', color: 'bg-amber-500' }],
  19: [{ title: 'Quarterly Planning', color: 'bg-violet-500' }],
  24: [{ title: 'Marketing Sync', color: 'bg-amber-500' }],
};

export default function Calendar() {
  const { showToast } = useToast();
  const [current, setCurrent] = useState(new Date(2026, 7, 1));
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [modalDay, setModalDay] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [color, setColor] = useState(COLORS[0].value);

  const year = current.getFullYear();
  const month = current.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array.from({ length: firstDay }, (): number | null => null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  const changeMonth = (delta: number) => setCurrent(new Date(year, month + delta, 1));

  const openModal = (day: number) => {
    setModalDay(day);
    setTitle('');
    setColor(COLORS[0].value);
  };

  const addEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalDay || !title.trim()) return;
    setEvents((prev) => ({
      ...prev,
      [modalDay]: [...(prev[modalDay] || []), { title: title.trim(), color }],
    }));
    showToast(`"${title.trim()}" added to ${months[month]} ${modalDay}`);
    setModalDay(null);
  };

  const removeEvent = (day: number, index: number) => {
    setEvents((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        title="Calendar"
        subtitle="Keep track of meetings, launches, and team events in one place."
        action={
          <button
            onClick={() => openModal(new Date().getDate())}
            className="bg-white text-blue-600 px-5 py-2.5 rounded-2xl text-xs font-bold shadow-md hover:bg-blue-50 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus size={16} /> Add Event
          </button>
        }
      />

      <Card className="p-3 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100">{months[month]} {year}</h3>
          <div className="flex items-center gap-2">
            <button onClick={() => changeMonth(-1)} className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500 cursor-pointer">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => changeMonth(1)} className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500 cursor-pointer">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800">
          {weekDays.map((d) => (
            <div key={d} className="bg-gray-50 dark:bg-gray-900 text-center text-[10px] sm:text-xs font-bold text-gray-400 uppercase py-2 px-0.5 truncate">
              <span className="sm:hidden">{d.charAt(0)}</span>
              <span className="hidden sm:inline">{d}</span>
            </div>
          ))}
          {cells.map((day, i) => (
            <button
              key={i}
              onClick={() => day && openModal(day)}
              disabled={!day}
              className={`bg-white dark:bg-gray-900 min-h-[64px] sm:min-h-[96px] p-1 sm:p-2 text-left align-top transition-colors ${day ? 'hover:bg-blue-50/50 dark:hover:bg-blue-900/10 cursor-pointer' : 'cursor-default'}`}
            >
              {day && (
                <>
                  <span className="text-[11px] sm:text-xs font-semibold text-gray-600 dark:text-gray-300">{day}</span>
                  <div className="mt-1 space-y-1">
                    {(events[day] || []).slice(0, 2).map((e, idx) => (
                      <div key={idx} className={`text-[9px] sm:text-[10px] font-semibold text-white px-1 sm:px-1.5 py-0.5 rounded truncate ${e.color}`}>{e.title}</div>
                    ))}
                    {(events[day] || []).length > 2 && (
                      <div className="text-[9px] text-gray-400">+{(events[day] || []).length - 2} more</div>
                    )}
                  </div>
                </>
              )}
            </button>
          ))}
        </div>
      </Card>

      {modalDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setModalDay(null)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-800 dark:text-gray-100">{months[month]} {modalDay}, {year}</h3>
              <button onClick={() => setModalDay(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"><X size={18} /></button>
            </div>

            {(events[modalDay] || []).length > 0 && (
              <div className="mb-4 space-y-2">
                {(events[modalDay] || []).map((e, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <span className={`w-2 h-2 rounded-full ${e.color}`}></span>
                    <span className="flex-1 text-sm text-gray-700 dark:text-gray-200">{e.title}</span>
                    <button onClick={() => removeEvent(modalDay, idx)} className="text-gray-400 hover:text-red-500 cursor-pointer"><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={addEvent} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block">Event title</label>
                <input
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Client Kickoff Call"
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 block">Color</label>
                <div className="flex gap-2">
                  {COLORS.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setColor(c.value)}
                      aria-label={c.name}
                      className={`w-7 h-7 rounded-full ${c.value} transition-transform cursor-pointer ${color === c.value ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-offset-gray-900 scale-110' : ''}`}
                    />
                  ))}
                </div>
              </div>
              <button type="submit" disabled={!title.trim()} className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold transition-colors cursor-pointer">
                Add Event
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
