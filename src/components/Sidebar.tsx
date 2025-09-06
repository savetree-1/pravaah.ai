import React from 'react';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className = '' }: SidebarProps) {
  const navItems = [
    { label: 'Dashboard', href: '/dashboard', active: true },
    { label: 'Upload', href: '/upload' },
    { label: 'Inbox', href: '/inbox', badge: 12 },
    { label: 'QC Review', href: '/qc', badge: 3 },
    { label: 'Connectors', href: '/connectors' },
    { label: 'Audit', href: '/audit' },
    { label: 'Analytics', href: '/analytics' },
    { label: 'Team', href: '/team' }
  ];

  return (
    <aside className={`w-70 h-full bg-panel border-r border-white/10 flex flex-col ${className}`}>
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className={`
                group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative
                ${item.active 
                  ? 'bg-accent/10 text-accent border border-accent/20' 
                  : 'text-muted hover:text-white hover:bg-white/5'
                }
              `}
            >
              <span className="flex-1">{item.label}</span>
              
              {item.badge && (
                <span className="px-2 py-0.5 bg-accent text-white text-xs rounded-full font-medium min-w-[20px] text-center">
                  {item.badge}
                </span>
              )}
              
              {item.active && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent rounded-r" />
              )}
            </a>
          ))}
        </div>
      </nav>

      <div className="px-4 py-4 border-t border-white/10">
        <div className="mb-3">
          <h4 className="text-xs font-semibold text-muted uppercase tracking-wider">Department</h4>
        </div>
        <div className="space-y-1">
          {['All', 'Engineering', 'Operations', 'Procurement', 'HR'].map((dept) => (
            <button
              key={dept}
              className="w-full text-left px-2 py-1.5 text-sm text-muted hover:text-white hover:bg-white/5 rounded transition-colors"
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-3 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-muted">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span>System Online</span>
        </div>
        <div className="text-xs text-muted mt-1">
          Last sync: 2 min ago
        </div>
      </div>
    </aside>
  );
}
