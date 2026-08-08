import { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Moon, Sun, Menu, ChevronDown, User, Settings, LogOut, HelpCircle, Check } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';
import { SEARCHABLE_PAGES } from '../searchablePages';

interface Notification {
  id: number;
  title: string;
  detail: string;
  time: string;
  unread: boolean;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: 1, title: 'New order received', detail: 'Order #4821 was placed by Sarah Klein.', time: '2m ago', unread: true },
  { id: 2, title: 'Server deployment finished', detail: 'femora-app deployed to production successfully.', time: '1h ago', unread: true },
  { id: 3, title: 'Weekly report ready', detail: 'Your analytics summary for last week is ready to view.', time: '5h ago', unread: true },
  { id: 4, title: 'New comment on task', detail: 'Omar Haddad commented on "Fix checkout bug".', time: 'Yesterday', unread: false },
];

export function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [query, setQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => n.unread).length;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SEARCHABLE_PAGES.slice(0, 6);
    return SEARCHABLE_PAGES.filter((p) => p.label.toLowerCase().includes(q) || p.keywords.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);

  const handleSignOut = () => {
    setDropdownOpen(false);
    logout();
    navigate('/signin', { replace: true });
  };

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));

  const markOneRead = (id: number) => setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));

  const goToResult = (path: string) => {
    navigate(path);
    setQuery('');
    setSearchFocused(false);
    setActiveIndex(0);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = results[activeIndex];
      if (target) goToResult(target.path);
    } else if (e.key === 'Escape') {
      setSearchFocused(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchFocused(true);
        searchRef.current?.querySelector('input')?.focus();
      }
    };
    document.addEventListener('keydown', handleShortcut);
    return () => document.removeEventListener('keydown', handleShortcut);
  }, []);

  return (
    <header className="sticky top-0 z-40 flex w-full bg-white dark:bg-gray-900 drop-shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="flex flex-grow items-center justify-between px-4 py-4 md:px-6 2xl:px-11">

        {/* Left Side: Menu Toggle + Search */}
        <div className="flex items-center gap-4">
          {/* Three-line Menu Toggle */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <Menu className="text-gray-600 dark:text-gray-300" size={20} />
          </button>

          {/* Search Bar */}
          <div className="hidden md:flex relative" ref={searchRef}>
            <div className="relative w-96">
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
                onFocus={() => setSearchFocused(true)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search or type command..."
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <span className="absolute right-3 top-2 rounded border border-gray-300 dark:border-gray-600 px-1 text-xs text-gray-500 dark:text-gray-400">⌘K</span>
            </div>

            {searchFocused && (
              <div className="absolute top-full mt-2 w-96 max-h-80 overflow-y-auto rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-2 z-50">
                {results.length === 0 ? (
                  <p className="px-3 py-4 text-sm text-gray-400 text-center">No pages match "{query}"</p>
                ) : (
                  results.map((r, i) => (
                    <button
                      key={r.path}
                      type="button"
                      onClick={() => goToResult(r.path)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer ${i === activeIndex ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                    >
                      <span className="font-medium">{r.label}</span>
                      <span className="text-xs text-gray-400">{r.path}</span>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Side Items */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-110 hover:shadow-md active:scale-95 cursor-pointer"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen((o) => !o)}
                aria-label="Notifications"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-110 hover:shadow-md active:scale-95 relative cursor-pointer"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 h-4 min-w-4 px-0.5 rounded-full bg-red-500 border-2 border-white dark:border-gray-800 text-[9px] font-bold text-white flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-4 w-80 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-sm font-bold text-gray-800 dark:text-gray-100">Notifications</span>
                    {unreadCount > 0 && (
                      <button onClick={markAllRead} className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => markOneRead(n.id)}
                        className={`w-full text-left flex items-start gap-3 px-4 py-3 border-b border-gray-50 dark:border-gray-700/50 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer ${n.unread ? 'bg-blue-50/40 dark:bg-blue-900/10' : ''}`}
                      >
                        <span className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${n.unread ? 'bg-blue-500' : 'bg-transparent'}`}></span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${n.unread ? 'font-bold text-gray-800 dark:text-gray-100' : 'font-semibold text-gray-600 dark:text-gray-300'}`}>{n.title}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{n.detail}</p>
                          <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
                        </div>
                        {!n.unread && <Check size={14} className="text-green-500 shrink-0 mt-1" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700 cursor-pointer"
            >
              <div className="text-right hidden sm:block">
                <span className="block text-sm font-medium text-black dark:text-white">{(user?.name || 'User').split(' ')[0]}</span>
              </div>
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
              ) : (
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400">
                  {(user?.name || 'U').charAt(0).toUpperCase()}
                </div>
              )}
              <ChevronDown size={16} className={`text-gray-600 dark:text-gray-300 ${dropdownOpen ? 'rotate-180' : ''} transition-transform`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-4 w-60 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-3 z-50">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="block text-sm font-semibold text-black dark:text-white">{user?.name || 'User'}</span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">{user?.email || ''}</span>
                </div>
                <ul className="flex flex-col gap-1 py-2">
                  <DropdownItem icon={<User size={18} />} label="Edit profile" onClick={() => { setDropdownOpen(false); navigate('/profile'); }} />
                  <DropdownItem icon={<Settings size={18} />} label="Account settings" onClick={() => { setDropdownOpen(false); navigate('/profile'); }} />
                  <DropdownItem icon={<HelpCircle size={18} />} label="Support" onClick={() => { setDropdownOpen(false); navigate('/support'); }} />
                </ul>
                <div className="border-t border-gray-100 dark:border-gray-700 pt-2 mt-2">
                  <DropdownItem icon={<LogOut size={18} />} label="Sign out" className="text-red-500" onClick={handleSignOut} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function DropdownItem({ icon, label, className = "", onClick }: { icon: React.ReactNode, label: string, className?: string, onClick?: () => void }) {
  return (
    <li onClick={onClick} className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer text-gray-600 dark:text-gray-300 ${className}`}>
      {icon}
      <span className="text-sm">{label}</span>
    </li>
  );
}
