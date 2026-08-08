import { FileQuestion, FileText, Tag, Clock3, ArrowRight } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';

const pages = [
  { title: '404 Not Found', desc: 'Friendly error page shown when a route doesn’t exist.', icon: FileQuestion, color: 'text-red-500 bg-red-50 dark:bg-red-900/30' },
  { title: 'Blank Page', desc: 'A minimal starting point for building new views.', icon: FileText, color: 'text-gray-500 bg-gray-100 dark:bg-gray-800' },
  { title: 'Pricing', desc: 'Plan comparison and pricing tiers for the product.', icon: Tag, color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/30' },
  { title: 'Coming Soon', desc: 'Placeholder page for features still in development.', icon: Clock3, color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/30' },
];

export default function Pages() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader title="Pages" subtitle="A collection of utility pages included in this template." />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {pages.map((p) => (
          <Card key={p.title} className="p-6 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer group">
            <div className={`p-3 rounded-xl ${p.color}`}>
              <p.icon size={22} />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100">{p.title}</h3>
              <p className="text-xs text-gray-400 mt-1">{p.desc}</p>
            </div>
            <ArrowRight size={16} className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all mt-1" />
          </Card>
        ))}
      </div>
    </div>
  );
}
