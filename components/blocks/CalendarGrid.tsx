
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  type: 'design' | 'code' | 'deploy' | 'meeting';
}

interface CalendarGridProps {
  currentMonth: string;
  days: { date: number; isCurrentMonth: boolean; events: CalendarEvent[] }[];
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ currentMonth, days }) => {
  const weeks = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'design': return 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30';
      case 'code': return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      case 'deploy': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      default: return 'bg-slate-700/50 text-slate-300 border-slate-600/50';
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 h-full flex flex-col w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6">
        <div>
          {/* FLUID TYPOGRAPHY: clamp() */}
          <h2 className="text-[clamp(1.25rem,2.5vw,1.875rem)] font-bold text-white font-sans tracking-tight">{currentMonth}</h2>
          <p className="text-[clamp(0.875rem,1vw,1rem)] text-slate-400 font-mono mt-2 leading-relaxed">Engineering Schedule</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex items-center bg-slate-950/50 rounded-xl border border-white/5 p-1.5">
              <button className="p-3 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all active:scale-[0.98] cursor-pointer">
                 <ChevronLeft className="size-5" />
              </button>
              <button className="p-3 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all active:scale-[0.98] cursor-pointer">
                 <ChevronRight className="size-5" />
              </button>
           </div>
           <button className="p-4 bg-white text-slate-900 rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-white/10 active:scale-[0.98] cursor-pointer flex items-center gap-2">
              <Plus className="size-5" />
              <span className="hidden md:inline font-bold text-sm">New Event</span>
           </button>
        </div>
      </div>

      {/* Week Header */}
      <div className="grid grid-cols-7 mb-4 gap-2">
        {weeks.map(day => (
          <div key={day} className="text-center text-xs md:text-sm font-mono text-slate-500 uppercase tracking-wider py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid - Fluid Height (aspect ratio enforced where possible or min-height in rem) */}
      <div className="grid grid-cols-7 auto-rows-fr gap-2 flex-1 w-full">
        {days.map((day, idx) => (
          <div 
            key={idx} 
            className={`
              relative p-2 rounded-2xl border transition-all duration-300 group min-h-[6rem] flex flex-col w-full aspect-square md:aspect-auto
              ${day.isCurrentMonth 
                ? 'bg-slate-950/30 border-white/5 hover:border-indigo-500/30 hover:bg-white/5 cursor-pointer active:scale-[0.98]' 
                : 'bg-transparent border-transparent opacity-20 pointer-events-none'
              }
            `}
          >
            <span className={`text-[clamp(0.75rem,1vw,0.875rem)] font-mono mb-2 block ${day.isCurrentMonth ? 'text-slate-400' : 'text-slate-700'}`}>
              {day.date}
            </span>
            
            <div className="space-y-1.5 flex-1 w-full overflow-hidden">
              {day.events.slice(0, 3).map(event => (
                <div 
                  key={event.id}
                  className={`px-1.5 py-1 rounded-lg border text-[clamp(0.6rem,0.8vw,0.75rem)] font-medium truncate flex items-center gap-1.5 transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer ${getTypeColor(event.type)}`}
                >
                  <div className={`size-1.5 rounded-full flex-shrink-0 ${event.type === 'deploy' ? 'bg-emerald-400' : event.type === 'code' ? 'bg-indigo-400' : 'bg-fuchsia-400'}`} />
                  <span className="truncate">{event.title}</span>
                </div>
              ))}
              {day.events.length > 3 && (
                  <div className="text-[10px] text-slate-500 text-center">+{day.events.length - 3} more</div>
              )}
            </div>

            {/* Add Button on Hover (Desktop Only) */}
            <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                <button className="p-1 hover:bg-white/20 rounded-lg text-slate-400 hover:text-white transition-all active:scale-[0.90] cursor-pointer">
                   <Plus className="size-3" />
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
