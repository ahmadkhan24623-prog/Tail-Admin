import type { ReactNode } from 'react';

interface AuthCardProps {
  icon: ReactNode;
  title: string;
  subtitle: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthCard({ icon, title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="relative bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-2xl shadow-gray-200/60 dark:shadow-black/40 overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600"></div>

      <div className="p-6 sm:p-8 lg:p-9">
        <div className="mb-7">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white mb-5 shadow-lg shadow-blue-600/25 ring-4 ring-blue-50 dark:ring-blue-900/20">
            {icon}
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">{title}</h2>
          <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">{subtitle}</p>
        </div>

        {children}
      </div>

      {footer && (
        <div className="px-6 sm:px-8 lg:px-9 py-5 bg-gray-50/70 dark:bg-gray-800/40 border-t border-gray-100 dark:border-gray-800 text-center">
          {footer}
        </div>
      )}
    </div>
  );
}
