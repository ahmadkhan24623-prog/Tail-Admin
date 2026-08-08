import { useState } from 'react';
import { Plus, MoreVertical, Calendar as CalendarIcon } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';

interface TaskItem {
  id: string;
  title: string;
  due: string;
  tag: string;
  tagColor: string;
}

const initialColumns: Record<string, TaskItem[]> = {
  'To Do': [
    { id: 't1', title: 'Wireframe the onboarding flow', due: 'Aug 10', tag: 'Design', tagColor: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
    { id: 't2', title: 'Write API docs for auth service', due: 'Aug 12', tag: 'Docs', tagColor: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300' },
  ],
  'In Progress': [
    { id: 't3', title: 'Build notifications settings page', due: 'Aug 09', tag: 'Frontend', tagColor: 'bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400' },
    { id: 't4', title: 'Fix checkout bug on Safari', due: 'Aug 08', tag: 'Bug', tagColor: 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400' },
  ],
  'Done': [
    { id: 't5', title: 'Set up CI pipeline', due: 'Aug 05', tag: 'DevOps', tagColor: 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' },
  ],
};

export default function Tasks() {
  const [columns] = useState(initialColumns);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        title="Tasks"
        subtitle="Organize your team's work with a simple Kanban-style board."
        action={
          <button className="bg-white text-blue-600 px-5 py-2.5 rounded-2xl text-xs font-bold shadow-md hover:bg-blue-50 transition-all flex items-center gap-2 cursor-pointer">
            <Plus size={16} /> New Task
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(columns).map(([col, items]) => (
          <div key={col} className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200">{col}</h3>
              <span className="text-xs font-bold text-gray-400 bg-white dark:bg-gray-800 px-2 py-0.5 rounded-full border border-gray-100 dark:border-gray-700">{items.length}</span>
            </div>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.tagColor}`}>{item.tag}</span>
                    <MoreVertical size={14} className="text-gray-300 cursor-pointer" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">{item.title}</p>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <CalendarIcon size={12} /> Due {item.due}
                  </div>
                </div>
              ))}
              <button className="w-full py-2.5 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-400 hover:text-blue-600 hover:border-blue-300 transition-colors cursor-pointer">
                + Add task
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
