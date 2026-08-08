import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Header } from './navbar/Header';
import { Logo } from './navbar/Logo';
import { SidebarItem } from './sidebar/SidebarItem';
import {
  LayoutDashboard, BrainCircuit, ShoppingBag, CalendarDays, User,
  CheckSquare, FileText, TableProperties, Files, Columns,
  MessageSquare, Headset, Mail, PieChart, Box, Lock, ChevronDown, X
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { showToast } = useToast();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [isDashboardOpen, setIsDashboardOpen] = useState(() => {
    return localStorage.getItem('isDashboardOpen') === 'true';
  });

  const { pathname } = useLocation();

  useEffect(() => {
    localStorage.setItem('isDashboardOpen', String(isDashboardOpen));
  }, [isDashboardOpen]);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isDashboardActive = ['/ecommerce', '/analytics', '/marketing', '/crm', '/stocks', '/saas', '/logistics', '/ai', '/sales', '/finance'].includes(pathname);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `block py-2 px-10 rounded-lg transition-all duration-200 ${
      isActive ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 font-medium" : "text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
    }`;

  const toggleSidebar = () => {
    setSidebarExpanded((v) => !v);
    setMobileOpen((v) => !v);
  };

  return (
    <div className="h-screen">
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 z-50 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
          transition-[left,width] duration-300 ease-in-out flex flex-col
          ${mobileOpen ? 'left-0' : '-left-72'}
          lg:left-0
          ${sidebarExpanded ? 'lg:w-72' : 'lg:w-20'}
        `}
      >
        <div className="flex items-center justify-between">
          <Logo />
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden mr-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* MENU SECTION */}
          <div>
            {sidebarExpanded && <h3 className="mb-2 ml-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">Menu</h3>}
            <div className="space-y-1">
              <div onClick={() => setIsDashboardOpen(!isDashboardOpen)} className={`cursor-pointer rounded-lg ${isDashboardActive ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" expanded={sidebarExpanded}>
                  {sidebarExpanded && <ChevronDown size={16} className={`transition-transform duration-300 ${isDashboardOpen ? 'rotate-180' : ''}`} />}
                </SidebarItem>
              </div>

              {/* Child Routes*/}
              {isDashboardOpen && sidebarExpanded && (
                <div className="space-y-1 mt-1">
                  <NavLink to="/ecommerce" className={navClass}>Ecommerce</NavLink>
                  <NavLink to="/analytics" className={navClass}>Analytics</NavLink>
                  <NavLink to="/marketing" className={navClass}>Marketing</NavLink>
                  <NavLink to="/crm" className={navClass}>CRM</NavLink>
                  <NavLink to="/stocks" className={navClass}>Stocks</NavLink>
                  <NavLink to="/saas" className={navClass}>SaaS</NavLink>
                  <NavLink to="/logistics" className={navClass}>Logistics</NavLink>
                  <NavLink to="/ai" className={navClass}>AI</NavLink>
                  <NavLink to="/sales" className={navClass}>Sales</NavLink>
                  <NavLink to="/finance" className={navClass}>Finance</NavLink>
                </div>
              )}

              <NavLink to="/ai-assistant" className={({isActive}) => isActive ? "bg-blue-50 dark:bg-blue-900/30 block rounded-lg" : ""}><SidebarItem icon={<BrainCircuit size={20} />} label="AI Assistant" expanded={sidebarExpanded} isNew={true} /></NavLink>
              <NavLink to="/ecommerce-main" className={({isActive}) => isActive ? "bg-blue-50 dark:bg-blue-900/30 block rounded-lg" : ""}><SidebarItem icon={<ShoppingBag size={20} />} label="E-commerce" expanded={sidebarExpanded} /></NavLink>
              <NavLink to="/calendar" className={({isActive}) => isActive ? "bg-blue-50 dark:bg-blue-900/30 block rounded-lg" : ""}><SidebarItem icon={<CalendarDays size={20} />} label="Calendar" expanded={sidebarExpanded} /></NavLink>
              <NavLink to="/profile" className={({isActive}) => isActive ? "bg-blue-50 dark:bg-blue-900/30 block rounded-lg" : ""}><SidebarItem icon={<User size={20} />} label="User Profile" expanded={sidebarExpanded} /></NavLink>
              <NavLink to="/tasks" className={({isActive}) => isActive ? "bg-blue-50 dark:bg-blue-900/30 block rounded-lg" : ""}><SidebarItem icon={<CheckSquare size={20} />} label="Task" expanded={sidebarExpanded} /></NavLink>
              <NavLink to="/forms" className={({isActive}) => isActive ? "bg-blue-50 dark:bg-blue-900/30 block rounded-lg" : ""}><SidebarItem icon={<FileText size={20} />} label="Forms" expanded={sidebarExpanded} /></NavLink>
              <NavLink to="/tables" className={({isActive}) => isActive ? "bg-blue-50 dark:bg-blue-900/30 block rounded-lg" : ""}><SidebarItem icon={<TableProperties size={20} />} label="Tables" expanded={sidebarExpanded} /></NavLink>
              <NavLink to="/pages" className={({isActive}) => isActive ? "bg-blue-50 dark:bg-blue-900/30 block rounded-lg" : ""}><SidebarItem icon={<Files size={20} />} label="Pages" expanded={sidebarExpanded} /></NavLink>
              <NavLink to="/layouts" className={({isActive}) => isActive ? "bg-blue-50 dark:bg-blue-900/30 block rounded-lg" : ""}><SidebarItem icon={<Columns size={20} />} label="Layouts" expanded={sidebarExpanded} isNew={true} /></NavLink>
            </div>
          </div>

          {/* Support and Others sections... */}
          <div>
            {sidebarExpanded && <h3 className="mb-2 ml-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">Support</h3>}
            <NavLink to="/chat" className={({isActive}) => isActive ? "bg-blue-50 dark:bg-blue-900/30 block rounded-lg" : ""}><SidebarItem icon={<MessageSquare size={20} />} label="Chat" expanded={sidebarExpanded} /></NavLink>
            <NavLink to="/support" className={({isActive}) => isActive ? "bg-blue-50 dark:bg-blue-900/30 block rounded-lg" : ""}><SidebarItem icon={<Headset size={20} />} label="Support Ticket" expanded={sidebarExpanded} isNew={true} /></NavLink>
            <NavLink to="/email" className={({isActive}) => isActive ? "bg-blue-50 dark:bg-blue-900/30 block rounded-lg" : ""}><SidebarItem icon={<Mail size={20} />} label="Email" expanded={sidebarExpanded} /></NavLink>
          </div>

          <div>
            {sidebarExpanded && <h3 className="mb-2 ml-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">Others</h3>}
            <NavLink to="/charts" className={({isActive}) => isActive ? "bg-blue-50 dark:bg-blue-900/30 block rounded-lg" : ""}><SidebarItem icon={<PieChart size={20} />} label="Charts" expanded={sidebarExpanded} /></NavLink>
            <NavLink to="/ui-elements" className={({isActive}) => isActive ? "bg-blue-50 dark:bg-blue-900/30 block rounded-lg" : ""}><SidebarItem icon={<Box size={20} />} label="UI Elements" expanded={sidebarExpanded} /></NavLink>
            <NavLink to="/signin" className={({isActive}) => isActive ? "bg-blue-50 dark:bg-blue-900/30 block rounded-lg" : ""}><SidebarItem icon={<Lock size={20} />} label="Authentication" expanded={sidebarExpanded} /></NavLink>
          </div>
        </nav>

        {sidebarExpanded && (
          <div className="mx-4 mt-auto mb-6 rounded-xl bg-gray-50 dark:bg-gray-800 p-4 text-center border border-gray-100 dark:border-gray-700">
            <h4 className="mb-1 text-sm font-bold text-gray-800 dark:text-gray-100">#1 Tailwind CSS Dashboard</h4>
            <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">Leading Tailwind CSS Admin Template.</p>
            <button onClick={() => showToast('Billing/upgrade isn\'t wired up in this demo yet.', 'info')} className="w-full rounded-lg bg-blue-600 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition cursor-pointer">
              Purchase Plan
            </button>
          </div>
        )}
      </aside>

      <div
        className={`
          relative flex flex-col h-screen overflow-y-auto overflow-x-hidden bg-gray-50 dark:bg-gray-950
          transition-[margin] duration-300 ease-in-out
          ${sidebarExpanded ? 'lg:ml-72' : 'lg:ml-20'}
        `}
      >
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
