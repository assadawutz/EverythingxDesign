
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useMemo } from 'react';
import { ContainerPage } from './ContainerPage';
import { ActivitySidebar } from './blocks/ActivitySidebar';
import { CalendarGrid } from './blocks/CalendarGrid';
import { ViewMode } from '../types';
import { ArrowLeft } from 'lucide-react';
import { Section } from './Section';

// Extended Mock Data for Richer Interaction
const RAW_EVENTS = [
  { id: '1', title: 'System Deploy', time: '10:00', type: 'deploy', day: 5 },
  { id: '2', title: 'UX Review', time: '14:00', type: 'design', day: 5 },
  { id: '3', title: 'API Integration', time: '11:00', type: 'code', day: 12 },
  { id: '4', title: 'Database Migration', time: '02:00', type: 'deploy', day: 15 },
  { id: '5', title: 'Sprint Planning', time: '09:00', type: 'meeting', day: 3 },
  { id: '6', title: 'Code Freeze', time: '18:00', type: 'code', day: 24 },
  { id: '7', title: 'Design Handoff', time: '13:00', type: 'design', day: 18 },
  { id: '8', title: 'Hotfix v4.0.1', time: '16:30', type: 'deploy', day: 24 },
  { id: '9', title: 'Client Demo', time: '10:00', type: 'meeting', day: 28 },
  { id: '10', title: 'Server Health Check', time: '00:00', type: 'deploy', day: 8 },
  { id: '11', title: 'Accessibility Audit', time: '15:00', type: 'design', day: 22 },
];

interface ActivityCalendarPageProps {
  onNavigate: (mode: ViewMode) => void;
}

const ActivityCalendarPage: React.FC<ActivityCalendarPageProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState('All Events');

  // Logic: Filter Events based on Sidebar Selection
  const filteredEvents = useMemo(() => {
    return RAW_EVENTS.filter(event => {
      if (filter === 'All Events') return true;
      if (filter === 'Design Sprints') return event.type === 'design';
      if (filter === 'Code Reviews') return event.type === 'code';
      if (filter === 'Deployments') return event.type === 'deploy';
      if (filter === 'System Health') return event.type === 'deploy' || event.type === 'meeting';
      return true;
    });
  }, [filter]);

  // Logic: Generate Calendar Days with Filtered Events
  const calendarDays = useMemo(() => {
    return Array.from({ length: 35 }, (_, i) => {
      const date = (i % 30) + 1;
      const isCurrentMonth = i >= 2 && i < 32;
      
      // Match events to this specific day
      const dayEvents = isCurrentMonth 
        ? filteredEvents
            .filter(e => e.day === date)
            .map(e => ({ ...e, id: `${e.id}-${i}`, type: e.type as any }))
        : [];
      
      return {
        date,
        isCurrentMonth,
        events: dayEvents
      };
    });
  }, [filteredEvents]);

  // Logic: Calculate Dynamic Stats
  const stats = useMemo(() => {
    const total = filteredEvents.length;
    let label1 = "Total Events";
    let label2 = "Completion";
    let velocity = total;
    let uptime = "100%";

    if (filter === 'Design Sprints') {
       label1 = "Screens";
       label2 = "Approval";
       velocity = total * 3; // Mock multiplier
       uptime = "92%";
    } else if (filter === 'Code Reviews') {
       label1 = "PRs Merged";
       label2 = "Coverage";
       velocity = total * 12;
       uptime = "88%";
    } else if (filter === 'Deployments') {
       label1 = "Releases";
       label2 = "Success Rate";
       uptime = "99.9%";
    }

    return { velocity, uptime, label1, label2 };
  }, [filteredEvents, filter]);

  return (
    // MASTER LAYOUT RULE: Root Wrapper
    <div className="container flex flex-col min-h-screen mx-auto px-4 justify-center md:px-0 cursor-default">
        
        {/* MASTER LAYOUT RULE: Content Block Capping (md:w-2xl) */}
        <div className="w-full md:w-2xl mx-auto px-6 py-12 my-auto transition-all duration-300 space-y-8 md:space-y-12">
            
            {/* Header Block */}
            <div className="w-full text-center space-y-6 animate-in fade-in slide-in-from-top-4">
                <div className="inline-flex items-center justify-center gap-4">
                    <button 
                        onClick={() => onNavigate(ViewMode.HOME)}
                        className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all active:scale-[0.98] cursor-pointer"
                        title="Go Back"
                    >
                        <ArrowLeft className="size-6" />
                    </button>
                    {/* FLUID TYPOGRAPHY RULE: Using clamp() */}
                    <h1 className="text-[clamp(1.5rem,4vw,2.25rem)] font-extrabold text-white font-sans tracking-tight leading-tight">
                        Activity Calendar
                    </h1>
                </div>
                <p className="text-[clamp(1rem,1.5vw,1.125rem)] text-slate-400 font-mono leading-relaxed max-w-lg mx-auto">
                    Engineering Sprints & System Deployments tracked in real-time.
                </p>
            </div>

            {/* Main Grid System: Mobile=1col / Desktop=4col (1:3 Ratio) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
                
                {/* Sidebar: Mobile=col-span-1 / Desktop=col-span-1 */}
                <div className="col-span-1 h-full animate-in slide-in-from-left-4 duration-500">
                    <ActivitySidebar 
                        userName="Alex Chen"
                        userRole="Lead Engineer"
                        activeFilter={filter}
                        onFilterChange={setFilter}
                        stats={stats}
                    />
                </div>

                {/* Calendar: Mobile=col-span-1 / Desktop=col-span-3 (1:3 Ratio) */}
                <div className="col-span-1 md:col-span-3 h-full animate-in slide-in-from-right-4 duration-500 delay-100">
                    <CalendarGrid 
                        currentMonth="October 2025"
                        days={calendarDays}
                    />
                </div>

            </div>

        </div>
    </div>
  );
};

export default ActivityCalendarPage;
