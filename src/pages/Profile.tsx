import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Camera, Link2, Globe, MessageCircle, Check } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';

const MAX_AVATAR_BYTES = 2 * 1024 * 1024;

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [tab, setTab] = useState<'about' | 'settings'>('about');
  const [avatarError, setAvatarError] = useState('');
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
  });

  if (!user) return null;

  const initials = user.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join('') || 'U';

  const handlePhotoClick = () => fileInputRef.current?.click();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setAvatarError('');
    if (!file.type.startsWith('image/')) {
      setAvatarError('Please choose an image file.');
      return;
    }
    if (file.size > MAX_AVATAR_BYTES) {
      setAvatarError('Image must be smaller than 2MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => updateProfile({ avatarUrl: reader.result as string });
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name: form.name, phone: form.phone, location: form.location, bio: form.bio });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader title="User Profile" subtitle="Manage your personal information, contact details, and preferences." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 text-center">
          <div className="relative w-24 h-24 mx-auto">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full object-cover" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-3xl font-bold text-blue-600 dark:text-blue-400">{initials}</div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            <button
              type="button"
              onClick={handlePhotoClick}
              aria-label="Change profile photo"
              className="absolute bottom-0 right-0 p-1.5 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 cursor-pointer"
            >
              <Camera size={12} />
            </button>
          </div>
          {avatarError && <p className="text-xs text-red-500 mt-2">{avatarError}</p>}
          <h3 className="mt-4 text-lg font-bold text-gray-800 dark:text-gray-100">{user.name}</h3>
          <p className="text-sm text-gray-400">{user.role || 'Member'}</p>
          <div className="flex justify-center gap-3 mt-4">
            {[Link2, Globe, MessageCircle].map((Icon, i) => (
              <button key={i} type="button" className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                <Icon size={16} />
              </button>
            ))}
          </div>
          <div className="mt-6 space-y-3 text-left border-t border-gray-100 dark:border-gray-800 pt-4">
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400"><Mail size={15} /> {user.email}</div>
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400"><Phone size={15} /> {user.phone || 'Not set'}</div>
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400"><MapPin size={15} /> {user.location || 'Not set'}</div>
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
                    ['Name', user.name], ['Email', user.email],
                    ['Phone', user.phone || 'Not set'], ['Location', user.location || 'Not set'], ['Role', user.role || 'Member'],
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
                  {user.bio || 'No bio added yet. Go to Settings to introduce yourself.'}
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              {saved && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900 text-green-600 dark:text-green-400 text-sm">
                  <Check size={16} /> Profile updated successfully.
                </div>
              )}
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block">Full Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block">Email Address</label>
                <input
                  value={form.email}
                  disabled
                  className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-500 dark:text-gray-400 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block">Phone Number</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block">Location</label>
                <input
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="City, Country"
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block">Bio</label>
                <textarea
                  rows={3}
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  placeholder="Tell us a bit about yourself..."
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>
              <button type="submit" className="mt-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors cursor-pointer">
                Save Changes
              </button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
