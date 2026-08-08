import type { ReactNode } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  icon: ReactNode;
  isNegative?: boolean;
  hint?: string;
}

export function StatCard({ title, value, trend, icon, isNegative, hint }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <h4 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-1">{value}</h4>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-full text-blue-500">{icon}</div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        {trend && (
          <span className={`text-xs font-bold flex items-center gap-0.5 ${isNegative ? 'text-red-500' : 'text-green-500'}`}>
            {isNegative ? <ArrowDown size={12} /> : <ArrowUp size={12} />} {trend}
          </span>
        )}
        {hint && <span className="text-xs text-gray-400">{hint}</span>}
      </div>
    </div>
  );
}
