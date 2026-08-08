import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';

const layouts = [
  { title: 'Sidebar Layout', desc: 'Default layout with a collapsible left navigation.' },
  { title: 'Stacked Layout', desc: 'Top navigation bar with full-width content below.' },
  { title: 'Two-Column Layout', desc: 'Split layout with a content list and detail pane.' },
  { title: 'Full-Width Layout', desc: 'Edge-to-edge layout for dashboards and data grids.' },
];

export default function Layouts() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader title="Layouts" subtitle="Reusable page layout patterns available in this template." />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {layouts.map((l) => (
          <Card key={l.title} className="p-6">
            <div className="rounded-xl bg-gray-50 dark:bg-gray-800 border border-dashed border-gray-200 dark:border-gray-700 h-32 mb-4 flex items-center justify-center text-gray-300 dark:text-gray-600 text-xs font-semibold">
              Preview
            </div>
            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100">{l.title}</h3>
            <p className="text-xs text-gray-400 mt-1">{l.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
