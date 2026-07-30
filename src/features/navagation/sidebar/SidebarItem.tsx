export function SidebarItem({ icon, label, expanded, isNew, children }: any) {
  return (
    <div className={`flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all ${expanded ? 'justify-start' : 'justify-center'}`}>
      <div className="min-w-[20px] text-gray-600 dark:text-gray-300">{icon}</div>
      {expanded && (
        <>
          <span className="font-medium text-gray-700 dark:text-gray-200 flex-1 whitespace-nowrap">{label}</span>
          {isNew && <span className="text-[10px] font-bold bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full uppercase">New</span>}
          {children} {/* This renders the ChevronDown */}
        </>
      )}
    </div>
  );
}