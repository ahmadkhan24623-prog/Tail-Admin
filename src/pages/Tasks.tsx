import { useRef, useState } from 'react';
import { Plus, MoreVertical, Calendar as CalendarIcon, Trash2, ArrowRightCircle, X } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { useToast } from '../context/ToastContext';

interface TaskItem {
  id: string;
  title: string;
  due: string;
  tag: string;
  tagColor: string;
}

const COLUMN_ORDER = ['To Do', 'In Progress', 'Done'] as const;
type ColumnName = (typeof COLUMN_ORDER)[number];

const DEFAULT_TAG = { tag: 'General', tagColor: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300' };

const initialColumns: Record<ColumnName, TaskItem[]> = {
  'To Do': [
    { id: 't1', title: 'Wireframe the onboarding flow', due: 'Aug 10', tag: 'Design', tagColor: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
    { id: 't2', title: 'Write API docs for auth service', due: 'Aug 12', tag: 'Docs', tagColor: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300' },
  ],
  'In Progress': [
    { id: 't3', title: 'Build notifications settings page', due: 'Aug 09', tag: 'Frontend', tagColor: 'bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400' },
    { id: 't4', title: 'Fix checkout bug on Safari', due: 'Aug 08', tag: 'Bug', tagColor: 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400' },
  ],
  Done: [
    { id: 't5', title: 'Set up CI pipeline', due: 'Aug 05', tag: 'DevOps', tagColor: 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' },
  ],
};

let idCounter = 6;

export default function Tasks() {
  const { showToast } = useToast();
  const [columns, setColumns] = useState(initialColumns);
  const [addingTo, setAddingTo] = useState<ColumnName | null>(null);
  const [draft, setDraft] = useState('');
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const startAdding = (col: ColumnName) => {
    setAddingTo(col);
    setDraft('');
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const submitAdd = (e: React.FormEvent, col: ColumnName) => {
    e.preventDefault();
    const title = draft.trim();
    if (!title) { setAddingTo(null); return; }
    const newTask: TaskItem = { id: `t${idCounter++}`, title, due: 'No due date', ...DEFAULT_TAG };
    setColumns((prev) => ({ ...prev, [col]: [newTask, ...prev[col]] }));
    setDraft('');
    setAddingTo(null);
    showToast(`Task added to ${col}`);
  };

  const deleteTask = (col: ColumnName, id: string) => {
    setColumns((prev) => ({ ...prev, [col]: prev[col].filter((t) => t.id !== id) }));
    setMenuFor(null);
  };

  const moveTask = (col: ColumnName, id: string) => {
    const idx = COLUMN_ORDER.indexOf(col);
    const nextCol = COLUMN_ORDER[idx + 1];
    if (!nextCol) return;
    const task = columns[col].find((t) => t.id === id);
    if (!task) return;
    setColumns((prev) => ({
      ...prev,
      [col]: prev[col].filter((t) => t.id !== id),
      [nextCol]: [task, ...prev[nextCol]],
    }));
    setMenuFor(null);
    showToast(`Moved to ${nextCol}`);
  };

  return (
    <div className="p-4 md:p-6 space-y-6" onClick={() => setMenuFor(null)}>
      <PageHeader
        title="Tasks"
        subtitle="Organize your team's work with a simple Kanban-style board."
        action={
          <button
            onClick={(e) => { e.stopPropagation(); startAdding('To Do'); }}
            className="bg-white text-blue-600 px-5 py-2.5 rounded-2xl text-xs font-bold shadow-md hover:bg-blue-50 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus size={16} /> New Task
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COLUMN_ORDER.map((col) => {
          const items = columns[col];
          return (
            <div key={col} className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200">{col}</h3>
                <span className="text-xs font-bold text-gray-400 bg-white dark:bg-gray-800 px-2 py-0.5 rounded-full border border-gray-100 dark:border-gray-700">{items.length}</span>
              </div>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="relative bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.tagColor}`}>{item.tag}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); setMenuFor(menuFor === item.id ? null : item.id); }}
                        className="text-gray-300 hover:text-gray-500 cursor-pointer"
                      >
                        <MoreVertical size={14} />
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">{item.title}</p>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <CalendarIcon size={12} /> Due {item.due}
                    </div>

                    {menuFor === item.id && (
                      <div onClick={(e) => e.stopPropagation()} className="absolute right-3 top-9 z-10 w-40 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-lg py-1.5">
                        {col !== 'Done' && (
                          <button onClick={() => moveTask(col, item.id)} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                            <ArrowRightCircle size={14} /> Move to {COLUMN_ORDER[COLUMN_ORDER.indexOf(col) + 1]}
                          </button>
                        )}
                        <button onClick={() => deleteTask(col, item.id)} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer">
                          <Trash2 size={14} /> Delete task
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {addingTo === col ? (
                  <form onSubmit={(e) => submitAdd(e, col)} className="bg-white dark:bg-gray-900 rounded-xl p-3 border border-blue-200 dark:border-blue-800 space-y-2">
                    <input
                      ref={inputRef}
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Escape') setAddingTo(null); }}
                      placeholder="Task title..."
                      className="w-full text-sm text-gray-800 dark:text-gray-100 bg-transparent outline-none placeholder-gray-400"
                    />
                    <div className="flex gap-2">
                      <button type="submit" className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer">Add</button>
                      <button type="button" onClick={() => setAddingTo(null)} className="px-2 py-1.5 rounded-lg text-gray-400 hover:text-gray-600 cursor-pointer"><X size={14} /></button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={(e) => { e.stopPropagation(); startAdding(col); }}
                    className="w-full py-2.5 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-400 hover:text-blue-600 hover:border-blue-300 transition-colors cursor-pointer"
                  >
                    + Add task
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
