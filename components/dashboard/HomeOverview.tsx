'use client';

import React from 'react';
import { LeadItem, SiteVisitItem, TaskItem, EnquiryItem } from '@/lib/dashboardData';

interface HomeOverviewProps {
  leads: LeadItem[];
  siteVisits: SiteVisitItem[];
  tasks: TaskItem[];
  enquiries: EnquiryItem[];
  onNavigateTab: (tab: any) => void;
  onToggleTask: (id: string) => void;
}

export default function HomeOverview({
  leads,
  siteVisits,
  tasks,
  enquiries,
  onNavigateTab,
  onToggleTask,
}: HomeOverviewProps) {
  const hotLeadsCount = leads.filter(
    (l) => l.status === ('Hot Lead' as any) || l.status === 'Negotiation' || l.status === 'Site Visit Scheduled'
  ).length;

  const todayVisitsCount = siteVisits.filter((s) => s.status === 'Scheduled').length;
  const newEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;
  const bookedUnitsCount = leads.filter((l) => l.status === 'Booked' || l.status === 'Sold').length;

  const kpis = [
    {
      title: "Today's Enquiries",
      value: newEnquiriesCount,
      change: '+3 new today',
      tab: 'enquiries',
      color: 'text-amber-500',
    },
    {
      title: 'Hot & Active Leads',
      value: hotLeadsCount,
      change: 'High purchase intent',
      tab: 'leads',
      color: 'text-[#6CAFBF]',
    },
    {
      title: 'Scheduled Site Visits',
      value: todayVisitsCount,
      change: '2 visits today',
      tab: 'site-visits',
      color: 'text-purple-500',
    },
    {
      title: 'Properties Booked / Sold',
      value: bookedUnitsCount,
      change: '₹8.4 Cr total volume',
      tab: 'leads',
      color: 'text-emerald-500',
    },
  ];

  return (
    <div className="space-y-8 select-none">
      {/* Top Banner Question */}
      <div className="bg-black text-white p-6 md:p-8 rounded-lg shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 z-10">
          <span className="text-[#6CAFBF] text-xs font-bold uppercase tracking-widest">
            Sales Operating System
          </span>
          <h1 className="font-[magtis] text-2xl md:text-4xl uppercase font-extrabold tracking-tight">
            What should I do today to sell more properties?
          </h1>
          <p className="text-white/60 text-xs md:text-sm font-medium">
            Here is your daily action guide. Complete follow-ups and convert active leads with 1-click actions.
          </p>
        </div>
        <button
          onClick={() => onNavigateTab('leads')}
          className="z-10 px-6 py-3 bg-[#6CAFBF] text-black font-bold text-xs tracking-widest uppercase rounded-full hover:bg-white transition-colors shrink-0"
        >
          View All Active Leads ({leads.length})
        </button>
        <div className="absolute right-0 bottom-0 opacity-10 font-[magtis] text-[10rem] font-extrabold leading-none pointer-events-none">
          ML
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            onClick={() => onNavigateTab(kpi.tab)}
            className="bg-white dark:bg-[#181818] border border-black/10 dark:border-white/10 p-5 rounded-md shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">
                {kpi.title}
              </span>
              <span className={`text-2xl font-extrabold ${kpi.color}`}>{kpi.value}</span>
            </div>
            <p className="text-[11px] text-black/40 dark:text-white/40 font-medium mt-3 group-hover:text-black dark:group-hover:text-white transition-colors">
              {kpi.change} →
            </p>
          </div>
        ))}
      </div>

      {/* Main Grid: Today's Tasks & Urgent Follow-ups */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Tasks Column (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-3">
            <h2 className="font-[magtis] uppercase font-bold text-lg md:text-xl text-black dark:text-white">
              Today's Actionable Tasks ({tasks.filter((t) => !t.completed).length})
            </h2>
            <span className="text-xs text-[#6CAFBF] font-bold uppercase tracking-wider">
              Priority Guided Feed
            </span>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-md border transition-all flex items-center justify-between gap-4 ${
                  task.completed
                    ? 'bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 opacity-50'
                    : 'bg-white dark:bg-[#181818] border-black/10 dark:border-white/10 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => onToggleTask(task.id)}
                    className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors mt-0.5 ${
                      task.completed
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'border-black/30 dark:border-white/30 hover:border-[#6CAFBF]'
                    }`}
                  >
                    {task.completed && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold ${
                          task.completed ? 'line-through text-black/40 dark:text-white/40' : 'text-black dark:text-white'
                        }`}
                      >
                        {task.title}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[#6CAFBF] font-bold uppercase">
                        {task.dueTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-black/50 dark:text-white/50">
                      <span>Client: {task.leadName}</span>
                      <span>•</span>
                      <span>Project: {task.project}</span>
                    </div>
                  </div>
                </div>

                {/* 1-Click Action triggers */}
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`tel:${task.phone.replace(/[^0-9+]/g, '')}`}
                    className="p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-[#6CAFBF] hover:text-black transition-colors"
                    title={`Call ${task.leadName}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.9v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.1 4.18 2 2 0 0 1 5.09 2h3a2 2 0 0 1 2 1.72c.13 1 .37 1.96.7 2.88a2 2 0 0 1-.45 2.11L9.09 9.91a16 16 0 0 0 5 5l1.2-1.2a2 2 0 0 1 2.11-.45c.92.33 1.88.57 2.88.7A2 2 0 0 1 22 16.9z" />
                    </svg>
                  </a>
                  <a
                    href={`https://wa.me/${task.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(
                      task.leadName
                    )}%2C%20following%20up%20from%20Mayuri%20Landmarks.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
                    title={`WhatsApp ${task.leadName}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.76.459 3.474 1.333 4.988l-1.417 5.176 5.297-1.389c1.455.794 3.1 1.212 4.774 1.213h.004c5.505 0 9.988-4.478 9.989-9.985 0-2.668-1.037-5.176-2.922-7.062-1.886-1.886-4.394-2.924-7.068-2.925z" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hot Leads Quick Action Feed (1 col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-3">
            <h2 className="font-[magtis] uppercase font-bold text-lg md:text-xl text-black dark:text-white">
              Hot Prospects
            </h2>
            <button
              onClick={() => onNavigateTab('leads')}
              className="text-xs text-[#6CAFBF] font-bold uppercase tracking-wider hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {leads.slice(0, 4).map((lead) => (
              <div
                key={lead.id}
                className="p-4 bg-white dark:bg-[#181818] border border-black/10 dark:border-white/10 rounded-md space-y-3 shadow-sm hover:border-[#6CAFBF] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-black dark:text-white">{lead.name}</span>
                  <span className="text-[10px] bg-[#6CAFBF]/20 text-[#6CAFBF] px-2 py-0.5 rounded font-bold uppercase">
                    {lead.budget}
                  </span>
                </div>

                <div className="text-xs text-black/60 dark:text-white/60 space-y-1">
                  <p>Project: <span className="text-black dark:text-white font-medium">{lead.project}</span></p>
                  <p>Next Action: <span className="text-[#6CAFBF] font-bold">{lead.nextFollowUp}</span></p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-black/5 dark:border-white/5">
                  <a
                    href={`tel:${lead.phone.replace(/[^0-9+]/g, '')}`}
                    className="flex-1 py-1.5 bg-black text-white dark:bg-white dark:text-black font-bold text-[10px] uppercase tracking-wider text-center rounded hover:bg-[#6CAFBF] dark:hover:bg-[#6CAFBF] transition-colors"
                  >
                    Call
                  </a>
                  <a
                    href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(
                      lead.name
                    )}%2C%20following%20up%20from%20Mayuri%20Landmarks.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-1.5 bg-[#25D366] text-white font-bold text-[10px] uppercase tracking-wider text-center rounded hover:opacity-90 transition-opacity"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
