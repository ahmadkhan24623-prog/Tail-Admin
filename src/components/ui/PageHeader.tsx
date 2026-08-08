import type { ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  eyebrowIcon?: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  gradient?: string;
}

export function PageHeader({ eyebrow, eyebrowIcon, title, subtitle, action, gradient = 'from-blue-600 via-indigo-600 to-blue-700' }: PageHeaderProps) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-r ${gradient} rounded-3xl p-6 md:p-8 text-white shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6`}>
      <div className="absolute -right-10 -bottom-10 w-56 h-56 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="relative z-10">
        {eyebrow && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold mb-3 border border-white/20">
            {eyebrowIcon} {eyebrow}
          </div>
        )}
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{title}</h2>
        {subtitle && <p className="text-blue-100 text-sm mt-1 max-w-xl">{subtitle}</p>}
      </div>
      {action && <div className="relative z-10">{action}</div>}
    </div>
  );
}
