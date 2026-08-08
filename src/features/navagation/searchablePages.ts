export interface SearchablePage {
  label: string;
  path: string;
  keywords: string;
}

export const SEARCHABLE_PAGES: SearchablePage[] = [
  { label: 'Ecommerce', path: '/ecommerce', keywords: 'dashboard orders products sales' },
  { label: 'Analytics', path: '/analytics', keywords: 'dashboard traffic visitors metrics' },
  { label: 'Marketing', path: '/marketing', keywords: 'dashboard campaigns ads roi' },
  { label: 'Stocks', path: '/stocks', keywords: 'dashboard inventory warehouse' },
  { label: 'CRM', path: '/crm', keywords: 'dashboard deals contacts pipeline' },
  { label: 'SaaS', path: '/saas', keywords: 'dashboard subscriptions mrr churn' },
  { label: 'Logistics', path: '/logistics', keywords: 'dashboard shipments fleet delivery' },
  { label: 'AI', path: '/ai', keywords: 'dashboard models tokens usage' },
  { label: 'Sales', path: '/sales', keywords: 'dashboard revenue reps quota' },
  { label: 'Finance', path: '/finance', keywords: 'dashboard income expenses cash flow' },
  { label: 'AI Assistant', path: '/ai-assistant', keywords: 'chat help assistant' },
  { label: 'E-commerce Catalog', path: '/ecommerce-main', keywords: 'products catalog store' },
  { label: 'Calendar', path: '/calendar', keywords: 'events schedule meetings' },
  { label: 'User Profile', path: '/profile', keywords: 'account settings photo avatar' },
  { label: 'Tasks', path: '/tasks', keywords: 'kanban board todo' },
  { label: 'Forms', path: '/forms', keywords: 'inputs controls' },
  { label: 'Tables', path: '/tables', keywords: 'data grid members' },
  { label: 'Pages', path: '/pages', keywords: '404 blank pricing coming soon' },
  { label: 'Layouts', path: '/layouts', keywords: 'templates structure' },
  { label: 'Chat', path: '/chat', keywords: 'messages conversations' },
  { label: 'Support Ticket', path: '/support', keywords: 'help desk tickets' },
  { label: 'Email', path: '/email', keywords: 'inbox mail compose' },
  { label: 'Charts', path: '/charts', keywords: 'graphs visualizations' },
  { label: 'UI Elements', path: '/ui-elements', keywords: 'buttons badges alerts avatars' },
];
