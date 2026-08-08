import { useState } from 'react';
import { Mail, Phone, MapPin, Camera, Link2, Globe, MessageCircle } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader } from '../components/ui/Card';

export default function Profile() {
  const [tab, setTab] = useState<'about' | 'settings'>('about');

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader title="User Profile" subtitle="Manage your personal information, contact details, and preferences." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 text-center">
          <div className="relative w-24 h-24 mx-auto">
            <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-3xl font-bold text-blue-600 dark:text-blue-400">MK</div>
            <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 cursor-pointer">
              <Camera size={12} />
            </button>
          </div>
          <h3 className="mt-4 text-lg font-bold text-gray-800 dark:text-gray-100">Musharaf Khan</h3>
          <p className="text-sm text-gray-400">Product Designer</p>
          <div className="flex justify-center gap-3 mt-4">
            {[Link2, Globe, MessageCircle].map((Icon, i) => (
              <button key={i} className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                <Icon size={16} />
              </button>
            ))}
          </div>
          <div className="mt-6 space-y-3 text-left border-t border-gray-100 dark:border-gray-800 pt-4">
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400"><Mail size={15} /> musharaf.khan@femora.app</div>
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400"><Phone size={15} /> +1 (555) 214-7788</div>
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400"><MapPin size={15} /> San Francisco, CA</div>
          </div>
        </Card>

        <Card className="lg:col-span-2 p-6">
          <div className="flex gap-2 mb-6 border-b border-gray-100 dark:border-gray-800">
            {(['about', 'settings'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 text-sm font-semibold capitalize border-b-2 -mb-px transition-colors cursor-pointer ${tab === t ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === 'about' ? (
            <div className="space-y-6">
              <div>
                <CardHeader title="Personal Information" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  {[
                    ['First Name', 'Musharaf'], ['Last Name', 'Khan'], ['Email', 'musharaf.khan@femora.app'],
                    ['Phone', '+1 (555) 214-7788'], ['Location', 'San Francisco, CA'], ['Role', 'Product Designer'],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="text-xs text-gray-400 mb-1">{label}</p>
                      <p className="font-semibold text-gray-800 dark:text-gray-100">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <CardHeader title="Bio" />
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Product designer focused on building clean, accessible dashboard experiences. Enjoys turning complex data into simple, usable interfaces.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {['Full Name', 'Email Address', 'Phone Number', 'Location'].map((label) => (
                <div key={label}>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block">{label}</label>
                  <input className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
              ))}
              <button className="mt-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors cursor-pointer">
                Save Changes
              </button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
