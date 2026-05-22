export function SidebarItem({ icon, label, expanded, isNew, children }: any) {
  return (
    <div className={`flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 transition-all ${expanded ? 'justify-start' : 'justify-center'}`}>
      <div className="min-w-[20px] text-gray-600">{icon}</div>
      {expanded && (
        <>
          <span className="font-medium text-gray-700 flex-1 whitespace-nowrap">{label}</span>
          {isNew && <span className="text-[10px] font-bold bg-green-100 text-green-600 px-2 py-0.5 rounded-full uppercase">New</span>}
          {children} {/* This renders the ChevronDown */}
        </>
      )}
    </div>
  );
}