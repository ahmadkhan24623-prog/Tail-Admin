import { useState, useRef, useEffect } from 'react';
import { Search, Bell, Moon, Sun, Menu, ChevronDown, User, Settings, LogOut, HelpCircle } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

export function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 flex w-full bg-white dark:bg-gray-900 drop-shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="flex flex-grow items-center justify-between px-4 py-4 md:px-6 2xl:px-11">

        {/* Left Side: Menu Toggle + Search */}
        <div className="flex items-center gap-4">
          {/* Three-line Menu Toggle */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Menu className="text-gray-600 dark:text-gray-300" size={20} />
          </button>

          {/* Search Bar */}
          <div className="hidden md:flex relative">
            <div className="relative w-96">
              <input
                type="text"
                placeholder="Search or type command..."
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <span className="absolute right-3 top-2 rounded border border-gray-300 dark:border-gray-600 px-1 text-xs text-gray-500 dark:text-gray-400">⌘K</span>
            </div>
          </div>
        </div>

        {/* Right Side Items */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-110 hover:shadow-md active:scale-95"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-110 hover:shadow-md active:scale-95 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-gray-800"></span>
            </button>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700"
            >
              <div className="text-right hidden sm:block">
                <span className="block text-sm font-medium text-black dark:text-white">Musharof</span>
              </div>
              <img src="/images/owner.png" className="h-10 w-10 rounded-full" alt="User" />
              <ChevronDown size={16} className={`text-gray-600 dark:text-gray-300 ${dropdownOpen ? 'rotate-180' : ''} transition-transform`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-4 w-60 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-3 z-50">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="block text-sm font-semibold text-black dark:text-white">Musharof Chowdhury</span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">randomuser@pimjo.com</span>
                </div>
                <ul className="flex flex-col gap-1 py-2">
                  <DropdownItem icon={<User size={18} />} label="Edit profile" />
                  <DropdownItem icon={<Settings size={18} />} label="Account settings" />
                  <DropdownItem icon={<HelpCircle size={18} />} label="Support" />
                </ul>
                <div className="border-t border-gray-100 dark:border-gray-700 pt-2 mt-2">
                  <DropdownItem icon={<LogOut size={18} />} label="Sign out" className="text-red-500" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function DropdownItem({ icon, label, className = "" }: { icon: React.ReactNode, label: string, className?: string }) {
  return (
    <li className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer text-gray-600 dark:text-gray-300 ${className}`}>
      {icon}
      <span className="text-sm">{label}</span>
    </li>
  );
}