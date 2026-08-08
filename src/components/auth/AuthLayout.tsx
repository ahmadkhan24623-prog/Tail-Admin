import type { ReactNode } from 'react';
import { BarChart3, ShieldCheck, Sparkles, Zap } from 'lucide-react';

const FEATURES = [
  { icon: BarChart3, text: 'Real-time dashboards across every team' },
  { icon: Zap, text: 'Automate reports and save hours every week' },
  { icon: ShieldCheck, text: 'Enterprise-grade security, built in' },
];

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
      {/* Branding panel — hidden on small screens */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-900">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle,_white_1px,_transparent_1px)] [background-size:24px_24px]"></div>

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white font-black">TA</div>
            <span className="text-white font-bold text-lg tracking-tight">TailAdmin</span>
          </div>

          <div className="max-w-md">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-white mb-6 border border-white/20">
              <Sparkles size={14} className="text-blue-200" /> Trusted by 4,000+ teams
            </div>
            <h1 className="text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Run your entire business from one dashboard.
            </h1>
            <p className="text-blue-100 mt-4 text-sm xl:text-base leading-relaxed">
              CRM, analytics, finance, and operations — unified in a single, beautifully designed workspace.
            </p>

            <div className="mt-8 space-y-4">
              {FEATURES.map((f) => (
                <div key={f.text} className="flex items-center gap-3 text-white/90 text-sm">
                  <span className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                    <f.icon size={16} />
                  </span>
                  {f.text}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-5">
            <p className="text-white text-sm leading-relaxed">
              “Switching to this dashboard cut our reporting time by 70%. It's the first tool the whole company actually enjoys using.”
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">SK</div>
              <div>
                <p className="text-white text-xs font-semibold">Sarah Klein</p>
                <p className="text-blue-200 text-[11px]">Head of Operations, Nimbus Retail</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="w-full max-w-sm sm:max-w-md">{children}</div>
      </div>
    </div>
  );
}
