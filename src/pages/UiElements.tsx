import { Check, Info, AlertTriangle, XCircle, Bell } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader } from '../components/ui/Card';
import { useToast } from '../context/ToastContext';

export default function UiElements() {
  const { showToast } = useToast();

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader title="UI Elements" subtitle="Core building blocks — buttons, badges, alerts, and avatars." />

      <Card className="p-6">
        <CardHeader title="Buttons" subtitle="Click any variant to preview its action feedback" />
        <div className="flex flex-wrap gap-3">
          <button onClick={() => showToast('Primary action triggered')} className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors cursor-pointer">Primary</button>
          <button onClick={() => showToast('Secondary action triggered', 'info')} className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-semibold transition-colors cursor-pointer">Secondary</button>
          <button onClick={() => showToast('Outline action triggered', 'info')} className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm font-semibold transition-colors cursor-pointer">Outline</button>
          <button onClick={() => showToast('Danger action triggered', 'info')} className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors cursor-pointer">Danger</button>
          <button disabled className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-400 text-sm font-semibold cursor-not-allowed">Disabled</button>
        </div>
      </Card>

      <Card className="p-6">
        <CardHeader title="Badges" />
        <div className="flex flex-wrap gap-3">
          {[
            ['Default', 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'],
            ['Success', 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400'],
            ['Warning', 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'],
            ['Error', 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'],
            ['Info', 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'],
          ].map(([label, cls]) => (
            <span key={label} className={`px-3 py-1 rounded-full text-xs font-bold ${cls}`}>{label}</span>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <CardHeader title="Alerts" />
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900 text-green-700 dark:text-green-400 text-sm">
            <Check size={18} className="shrink-0 mt-0.5" /> Your changes have been saved successfully.
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 text-blue-700 dark:text-blue-400 text-sm">
            <Info size={18} className="shrink-0 mt-0.5" /> A new version of the app is available.
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900 text-amber-700 dark:text-amber-400 text-sm">
            <AlertTriangle size={18} className="shrink-0 mt-0.5" /> Your subscription expires in 3 days.
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900 text-red-700 dark:text-red-400 text-sm">
            <XCircle size={18} className="shrink-0 mt-0.5" /> Failed to process payment. Please try again.
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <CardHeader title="Avatars & Notifications" />
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex -space-x-2">
            {['MK', 'SK', 'OH', 'MC'].map((initials, i) => (
              <div key={i} className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 border-2 border-white dark:border-gray-900 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400">
                {initials}
              </div>
            ))}
            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-white dark:border-gray-900 flex items-center justify-center text-xs font-bold text-gray-500">+5</div>
          </div>
          <button onClick={() => showToast('You have 3 unread notifications', 'info')} className="relative p-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-blue-600 transition-colors cursor-pointer">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>
          </button>
        </div>
      </Card>
    </div>
  );
}
