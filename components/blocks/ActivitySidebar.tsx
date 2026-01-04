
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { User, TrendingUp, Filter, CalendarDays, Zap } from 'lucide-react';

interface ActivitySidebarProps {
  userName: string;
  userRole: string;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  stats: {
    velocity: number;
    uptime: string;
    label1: string;
    label2: string;
  };
}

export const ActivitySidebar: React.FC<ActivitySidebarProps> = ({ 
  userName, 
  userRole, 
  activeFilter, 
  onFilterChange,
  stats
}) => {
  const categories = ['All Events', 'Design Sprints', 'Code Reviews', 'Deployments', 'System Health'];

  return (
    <div className="glass-panel rounded-3xl p-6 h-full flex flex-col gap-6 w-full">
      {/* Profile Section */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-indigo-500/20 rounded-2xl border border-indigo-500/30">
          <User className="size-6 text-indigo-300" />
        </div>
        <div className="min-w-0">
          <h3 className="text-[clamp(1rem,1.25vw,1.25rem)] font-bold text-white font-sans truncate">{userName}</h3>
          <p className="text-[clamp(0.7rem,0.9vw,0.875rem)] text-slate-400 font-mono uppercase tracking-wider truncate">{userRole}</p>
        </div>
      </div>

      {/* Stats Widget (Dynamic Data) */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase">
          <TrendingUp className="size-4" />
          <span>Metric_Snapshot</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
           <div>
              <p className="text-[clamp(1.25rem,2vw,1.875rem)] font-bold text-white transition-all duration-300">{stats.velocity}</p>
              <p className="text-[10px] text-slate-500 font-mono">{stats.label1}</p>
           </div>
           <div>
              <p className="text-[clamp(1.25rem,2vw,1.875rem)] font-bold text-white transition-all duration-300">{stats.uptime}</p>
              <p className="text-[10px] text-slate-500 font-mono">{stats.label2}</p>
           </div>
        </div>
      </div>

      {/* Filter Navigation */}
      <div className="space-y-3 flex-1">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase px-2 mb-2">
           <Filter className="size-3" />
           <span>Views</span>
        </div>
        <nav className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onFilterChange(cat)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[clamp(0.8rem,1vw,1rem)] font-medium transition-all duration-300 cursor-pointer active:scale-[0.98] ${
                activeFilter === cat 
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
              }`}
            >
              <span className="truncate">{cat}</span>
              {activeFilter === cat && <Zap className="size-3.5 fill-current shrink-0" />}
            </button>
          ))}
        </nav>
      </div>

      <div className="pt-6 border-t border-white/5">
        <button className="w-full py-4 rounded-xl border border-dashed border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 hover:bg-white/5 transition-all flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest cursor-pointer active:scale-[0.98]">
           <CalendarDays className="size-4" /> Sync Calendar
        </button>
      </div>
    </div>
  );
};
