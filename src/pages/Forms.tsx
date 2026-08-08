import { PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader } from '../components/ui/Card';

export default function Forms() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader title="Forms" subtitle="Common form elements and layouts you can reuse across the app." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <CardHeader title="Contact Form" subtitle="A simple example of a text-input based form" />
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block">First Name</label>
                <input placeholder="John" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block">Last Name</label>
                <input placeholder="Doe" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block">Email Address</label>
              <input type="email" placeholder="john@example.com" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block">Subject</label>
              <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:border-blue-500 transition-colors">
                <option>General Inquiry</option>
                <option>Support Request</option>
                <option>Partnership</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block">Message</label>
              <textarea rows={4} placeholder="Write your message..." className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-none" />
            </div>
            <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors cursor-pointer">Submit</button>
          </div>
        </Card>

        <Card className="p-6">
          <CardHeader title="Form Controls" subtitle="Checkboxes, radio buttons, and toggles" />
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Notification Preferences</p>
              <div className="space-y-2">
                {['Email notifications', 'SMS alerts', 'Push notifications'].map((label) => (
                  <label key={label} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
                    <input type="checkbox" defaultChecked={label === 'Email notifications'} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Plan Type</p>
              <div className="space-y-2">
                {['Monthly billing', 'Annual billing (save 20%)'].map((label, i) => (
                  <label key={label} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
                    <input type="radio" name="plan" defaultChecked={i === 1} className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500" />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Toggle Switch</p>
              <label className="inline-flex items-center gap-3 cursor-pointer">
                <span className="relative inline-block w-10 h-5">
                  <input type="checkbox" defaultChecked className="peer sr-only" />
                  <span className="absolute inset-0 rounded-full bg-gray-200 dark:bg-gray-700 peer-checked:bg-blue-600 transition-colors"></span>
                  <span className="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white transition-transform peer-checked:translate-x-5"></span>
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-200">Enable dark mode by default</span>
              </label>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
