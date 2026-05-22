import { useState } from 'react';
import { Header } from './navbar/Header';
import { Logo } from './navbar/Logo';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Area */}
      <aside className={`w-72 bg-white border-r border-gray-200 ${sidebarOpen ? 'block' : 'hidden md:block'}`}>
        <Logo />
        {/* Your Sidebar Links will go here */}
      </aside>

      {/* Main Content Area */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-4 md:p-6 2xl:p-10">{children}</main>
      </div>
    </div>
  );
}