// src/sidebar/SidebarItem.tsx
export function SidebarItem({ icon, label, expanded, isNew, children }: any) {
  return (
    <div className={`
      flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200
      hover:bg-gray-100 text-gray-600 hover:text-gray-900 
      ${expanded ? 'justify-start' : 'justify-center'}
    `}>
      <div className="min-w-[20px]">{icon}</div>
      {expanded && (
        <>
          <span className="font-medium flex-1">{label}</span>
          {isNew && <span className="text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full uppercase font-bold">New</span>}
          {children}
        </>
      )}
    </div>
  );
}