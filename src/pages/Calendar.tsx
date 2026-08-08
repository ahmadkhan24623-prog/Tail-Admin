import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const eventsByDay: Record<number, { title: string; color: string }[]> = {
  4: [{ title: 'Design Review', color: 'bg-blue-500' }],
  8: [{ title: 'Product Launch', color: 'bg-green-500' }],
  12: [{ title: 'Team Standup', color: 'bg-blue-500' }, { title: 'Client Call', color: 'bg-amber-500' }],
  19: [{ title: 'Quarterly Planning', color: 'bg-violet-500' }],
  24: [{ title: 'Marketing Sync', color: 'bg-amber-500' }],
};

export default function Calendar() {
  const [current, setCurrent] = useState(new Date(2026, 7, 1));
  const year = current.getFullYear();
  const month = current.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: firstDay }, () => null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  const changeMonth = (delta: number) => setCurrent(new Date(year, month + delta, 1));

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        title="Calendar"
        subtitle="Keep track of meetings, launches, and team events in one place."
        action={
          <button className="bg-white text-blue-600 px-5 py-2.5 rounded-2xl text-xs font-bold shadow-md hover:bg-blue-50 transition-all flex items-center gap-2 cursor-pointer">
            <Plus size={16} /> Add Event
          </button>
        }
      />

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{months[month]} {year}</h3>
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
            <div key={d} className="bg-gray-50 dark:bg-gray-900 text-center text-xs font-bold text-gray-400 uppercase py-2">{d}</div>
          ))}
          {cells.map((day, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 min-h-[96px] p-2 align-top">
              {day && (
                <>
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">{day}</span>
                  <div className="mt-1 space-y-1">
                    {(eventsByDay[day] || []).map((e, idx) => (
                      <div key={idx} className={`text-[10px] font-semibold text-white px-1.5 py-0.5 rounded truncate ${e.color}`}>{e.title}</div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
