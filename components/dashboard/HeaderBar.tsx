'use client';

import React, { useState } from 'react';

interface HeaderBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onQuickAddLead: () => void;
}

export default function HeaderBar({
  searchQuery,
  setSearchQuery,
  onQuickAddLead,
}: HeaderBarProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const sampleNotifications = [
    { id: 1, text: 'New Lead: Rahul Patil inquired for Mayuri Adhinathpuram', time: '10 min ago' },
    { id: 2, text: 'Follow-up Due: Call Priya Sharma at 4:00 PM', time: '1 hour ago' },
    { id: 3, text: 'Site Visit Confirmed: Vikram Deshmukh tomorrow', time: '2 hours ago' },
  ];

  return (
    <header className="h-16 bg-[#F5F5F0] dark:bg-[#121212] border-b border-black/10 dark:border-white/10 px-6 flex items-center justify-between z-30 select-none">
      {/* Search Input */}
      <div className="relative w-72 md:w-96">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Global Search (Name, Phone, Project)..."
          className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#1C1C1C] text-black dark:text-white text-xs font-medium rounded-full border border-black/10 dark:border-white/10 outline-none focus:border-[#6CAFBF] transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications Drawer Toggle */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen((prev) => !prev)}
            className="relative p-2.5 rounded-full bg-white dark:bg-[#1C1C1C] border border-black/10 dark:border-white/10 text-black dark:text-white hover:border-[#6CAFBF] transition-colors"
            title="Notifications"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#6CAFBF] animate-ping" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#6CAFBF]" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-[#1C1C1C] border border-black/10 dark:border-white/10 rounded-md shadow-2xl p-4 z-50 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                  Notifications
                </span>
                <span className="text-[10px] text-[#6CAFBF] font-bold">3 Unread</span>
              </div>
              <div className="divide-y divide-black/5 dark:divide-white/5 py-2">
                {sampleNotifications.map((n) => (
                  <div key={n.id} className="py-2.5 text-xs text-black/80 dark:text-white/80 space-y-1">
                    <p className="leading-snug">{n.text}</p>
                    <span className="text-[10px] text-black/40 dark:text-white/40 block">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Add Lead CTA */}
        <button
          onClick={onQuickAddLead}
          className="flex items-center gap-2 px-4 py-2 bg-[#6CAFBF] text-black font-bold text-xs tracking-widest uppercase rounded-full hover:bg-black hover:text-white transition-colors shadow-md"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>+ Add Lead</span>
        </button>
      </div>
    </header>
  );
}
