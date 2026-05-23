import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Header } from './navbar/Header';
import { Logo } from './navbar/Logo';
import { SidebarItem } from './sidebar/SidebarItem';
import { 
  LayoutDashboard, BrainCircuit, ShoppingBag, CalendarDays, User, 
  CheckSquare, FileText, TableProperties, Files, Columns,
  MessageSquare, Headset, Mail, PieChart, Box, Lock, ChevronDown
} from 'lucide-react';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  
  const [isDashboardOpen, setIsDashboardOpen] = useState(() => {
    return localStorage.getItem('isDashboardOpen') === 'true';
  });

  const { pathname } = useLocation();

  useEffect(() => {
    localStorage.setItem('isDashboardOpen', String(isDashboardOpen));
  }, [isDashboardOpen]);

  const isDashboardActive = ['/ecommerce', '/analytics', '/marketing', '/crm', '/stocks', '/saas', '/logistics', '/ai', '/sales', '/finance'].includes(pathname);

  const navClass = ({ isActive }: { isActive: boolean }) => 
    `block py-2 px-10 rounded-lg transition-all duration-200 ${
      isActive ? "text-blue-600 bg-blue-50 font-medium" : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
    }`;

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className={`${sidebarExpanded ? 'w-72' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col`}>
        <Logo />
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* MENU SECTION */}
          <div>
            {sidebarExpanded && <h3 className="mb-2 ml-4 text-xs font-semibold text-gray-400 uppercase">Menu</h3>}
            <div className="space-y-1">
              <div onClick={() => setIsDashboardOpen(!isDashboardOpen)} className={`cursor-pointer rounded-lg ${isDashboardActive ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}>
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

              <NavLink to="/ai-assistant" className={({isActive}) => isActive ? "bg-blue-50 block rounded-lg" : ""}><SidebarItem icon={<BrainCircuit size={20} />} label="AI Assistant" expanded={sidebarExpanded} isNew={true} /></NavLink>
              <NavLink to="/ecommerce-main" className={({isActive}) => isActive ? "bg-blue-50 block rounded-lg" : ""}><SidebarItem icon={<ShoppingBag size={20} />} label="E-commerce" expanded={sidebarExpanded} /></NavLink>
              <NavLink to="/calendar" className={({isActive}) => isActive ? "bg-blue-50 block rounded-lg" : ""}><SidebarItem icon={<CalendarDays size={20} />} label="Calendar" expanded={sidebarExpanded} /></NavLink>
              <NavLink to="/profile" className={({isActive}) => isActive ? "bg-blue-50 block rounded-lg" : ""}><SidebarItem icon={<User size={20} />} label="User Profile" expanded={sidebarExpanded} /></NavLink>
              <NavLink to="/tasks" className={({isActive}) => isActive ? "bg-blue-50 block rounded-lg" : ""}><SidebarItem icon={<CheckSquare size={20} />} label="Task" expanded={sidebarExpanded} /></NavLink>
              <NavLink to="/forms" className={({isActive}) => isActive ? "bg-blue-50 block rounded-lg" : ""}><SidebarItem icon={<FileText size={20} />} label="Forms" expanded={sidebarExpanded} /></NavLink>
              <NavLink to="/tables" className={({isActive}) => isActive ? "bg-blue-50 block rounded-lg" : ""}><SidebarItem icon={<TableProperties size={20} />} label="Tables" expanded={sidebarExpanded} /></NavLink>
              <NavLink to="/pages" className={({isActive}) => isActive ? "bg-blue-50 block rounded-lg" : ""}><SidebarItem icon={<Files size={20} />} label="Pages" expanded={sidebarExpanded} /></NavLink>
              <NavLink to="/layouts" className={({isActive}) => isActive ? "bg-blue-50 block rounded-lg" : ""}><SidebarItem icon={<Columns size={20} />} label="Layouts" expanded={sidebarExpanded} isNew={true} /></NavLink>
            </div>
          </div>

          {/* Support and Others sections... */}
          <div>
            {sidebarExpanded && <h3 className="mb-2 ml-4 text-xs font-semibold text-gray-400 uppercase">Support</h3>}
            <NavLink to="/chat" className={({isActive}) => isActive ? "bg-blue-50 block rounded-lg" : ""}><SidebarItem icon={<MessageSquare size={20} />} label="Chat" expanded={sidebarExpanded} /></NavLink>
            <NavLink to="/support" className={({isActive}) => isActive ? "bg-blue-50 block rounded-lg" : ""}><SidebarItem icon={<Headset size={20} />} label="Support Ticket" expanded={sidebarExpanded} isNew={true} /></NavLink>
            <NavLink to="/email" className={({isActive}) => isActive ? "bg-blue-50 block rounded-lg" : ""}><SidebarItem icon={<Mail size={20} />} label="Email" expanded={sidebarExpanded} /></NavLink>
          </div>

          <div>
            {sidebarExpanded && <h3 className="mb-2 ml-4 text-xs font-semibold text-gray-400 uppercase">Others</h3>}
            <NavLink to="/charts" className={({isActive}) => isActive ? "bg-blue-50 block rounded-lg" : ""}><SidebarItem icon={<PieChart size={20} />} label="Charts" expanded={sidebarExpanded} /></NavLink>
            <NavLink to="/ui-elements" className={({isActive}) => isActive ? "bg-blue-50 block rounded-lg" : ""}><SidebarItem icon={<Box size={20} />} label="UI Elements" expanded={sidebarExpanded} /></NavLink>
            <NavLink to="/auth" className={({isActive}) => isActive ? "bg-blue-50 block rounded-lg" : ""}><SidebarItem icon={<Lock size={20} />} label="Authentication" expanded={sidebarExpanded} /></NavLink>
          </div>
        </nav>

        {sidebarExpanded && (
          <div className="mx-4 mt-auto mb-6 rounded-xl bg-gray-50 p-4 text-center border border-gray-100">
            <h4 className="mb-1 text-sm font-bold text-gray-800">#1 Tailwind CSS Dashboard</h4>
            <p className="mb-4 text-xs text-gray-500">Leading Tailwind CSS Admin Template.</p>
            <button className="w-full rounded-lg bg-blue-600 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition">
              Purchase Plan
            </button>
          </div>
        )}
      </aside>

      <div className="relative flex flex-1 flex-col overflow-y-auto">
        <Header toggleSidebar={() => setSidebarExpanded(!sidebarExpanded)} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}