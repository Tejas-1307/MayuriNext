'use client';

import React, { useState } from 'react';
import { SiteVisitItem } from '@/lib/dashboardData';

interface SiteVisitsManagerProps {
  siteVisits: SiteVisitItem[];
  onAddVisit: (visit: Omit<SiteVisitItem, 'id'>) => void;
  onUpdateVisitStatus: (id: string, status: SiteVisitItem['status']) => void;
}

export default function SiteVisitsManager({
  siteVisits,
  onAddVisit,
  onUpdateVisitStatus,
}: SiteVisitsManagerProps) {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newVisitForm, setNewVisitForm] = useState({
    leadName: '',
    phone: '',
    project: 'Mayuri Adhinathpuram',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '11:00 AM',
    status: 'Scheduled' as SiteVisitItem['status'],
    salesExec: 'Rohit Pote',
    notes: '',
  });

  const filteredVisits =
    filterStatus === 'All'
      ? siteVisits
      : siteVisits.filter((v) => v.status === filterStatus);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVisitForm.leadName || !newVisitForm.phone) return;

    onAddVisit(newVisitForm);
    setIsModalOpen(false);
    setNewVisitForm({
      leadName: '',
      phone: '',
      project: 'Mayuri Adhinathpuram',
      date: new Date().toISOString().split('T')[0],
      timeSlot: '11:00 AM',
      status: 'Scheduled',
      salesExec: 'Rohit Pote',
      notes: '',
    });
  };

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-4">
        <div>
          <h1 className="font-[magtis] uppercase font-bold text-2xl text-black dark:text-white">
            Site Visits Schedule ({filteredVisits.length})
          </h1>
          <p className="text-xs text-black/50 dark:text-white/50">
            Track site visit bookings, WhatsApp directions, and update visit completion statuses.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-[#6CAFBF] text-black font-bold text-xs tracking-widest uppercase rounded-md hover:bg-black hover:text-white transition-colors"
        >
          + Book Site Visit
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {['All', 'Scheduled', 'Completed', 'Missed', 'Rescheduled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
              filterStatus === status
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                : 'bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 hover:bg-black/10'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Visit List Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredVisits.map((visit) => (
          <div
            key={visit.id}
            className="bg-white dark:bg-[#181818] border border-black/10 dark:border-white/10 rounded-md p-5 flex flex-col justify-between gap-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#6CAFBF] uppercase tracking-wider">
                  {visit.date} · {visit.timeSlot}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded border ${
                    visit.status === 'Completed'
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : visit.status === 'Scheduled'
                      ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                      : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                  }`}
                >
                  {visit.status}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base text-black dark:text-white leading-snug">
                  {visit.leadName}
                </h3>
                <p className="text-xs text-black/60 dark:text-white/60">Phone: {visit.phone}</p>
                <p className="text-xs text-black/60 dark:text-white/60">
                  Target Project: <span className="font-bold text-black dark:text-white">{visit.project}</span>
                </p>
                <p className="text-xs text-black/40 dark:text-white/40 mt-1">
                  Sales Executive: {visit.salesExec}
                </p>
              </div>

              {visit.notes && (
                <p className="text-[11px] text-black/50 dark:text-white/50 italic bg-black/5 dark:bg-white/5 p-2 rounded">
                  "{visit.notes}"
                </p>
              )}
            </div>

            {/* 1-Click Action triggers */}
            <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-1">
                <a
                  href={`tel:${visit.phone.replace(/[^0-9+]/g, '')}`}
                  className="py-1.5 px-3 bg-black text-white dark:bg-white dark:text-black font-bold text-[10px] uppercase rounded"
                >
                  Call
                </a>
                <a
                  href={`https://wa.me/${visit.phone.replace(
                    /[^0-9]/g,
                    ''
                  )}?text=Hi%20${encodeURIComponent(
                    visit.leadName
                  )}%2C%20here%20is%20the%20Google%20Maps%20location%20for%20your%20site%20visit%20to%20${encodeURIComponent(
                    visit.project
                  )}%3A%20https%3A%2F%2Fmaps.google.com%2F%3Fq%3DMayuri%2BAdhinathpuram%2BPune`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-3 bg-[#25D366] text-white font-bold text-[10px] uppercase rounded"
                >
                  WhatsApp Location
                </a>
              </div>

              {visit.status === 'Scheduled' && (
                <button
                  onClick={() => onUpdateVisitStatus(visit.id, 'Completed')}
                  className="py-1.5 px-3 bg-emerald-500 text-white font-bold text-[10px] uppercase rounded hover:bg-emerald-600 transition-colors"
                >
                  Mark Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Book Visit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#F5F5F0] dark:bg-[#121212] rounded-md p-6 md:p-8 border border-black/10 dark:border-white/10 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
              <h2 className="font-[magtis] uppercase font-bold text-xl text-black dark:text-white">
                Book Site Visit
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-black/60 dark:text-white/60">
                  Visitor Name *
                </label>
                <input
                  type="text"
                  required
                  value={newVisitForm.leadName}
                  onChange={(e) => setNewVisitForm({ ...newVisitForm, leadName: e.target.value })}
                  placeholder="e.g. Priya Sharma"
                  className="w-full mt-1 p-3 bg-white dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-md text-xs outline-none focus:border-[#6CAFBF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-black/60 dark:text-white/60">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newVisitForm.phone}
                    onChange={(e) => setNewVisitForm({ ...newVisitForm, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full mt-1 p-3 bg-white dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-md text-xs outline-none focus:border-[#6CAFBF]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-black/60 dark:text-white/60">
                    Project
                  </label>
                  <select
                    value={newVisitForm.project}
                    onChange={(e) => setNewVisitForm({ ...newVisitForm, project: e.target.value })}
                    className="w-full mt-1 p-3 bg-white dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-md text-xs outline-none focus:border-[#6CAFBF]"
                  >
                    <option value="Mayuri Adhinathpuram">Mayuri Adhinathpuram</option>
                    <option value="Mayuri Infinity">Mayuri Infinity</option>
                    <option value="Mayuri Optimum">Mayuri Optimum</option>
                    <option value="Mayuri Residency">Mayuri Residency</option>
                    <option value="Mayuri Elite">Mayuri Elite</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-black/60 dark:text-white/60">
                    Visit Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newVisitForm.date}
                    onChange={(e) => setNewVisitForm({ ...newVisitForm, date: e.target.value })}
                    className="w-full mt-1 p-3 bg-white dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-md text-xs outline-none focus:border-[#6CAFBF]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-black/60 dark:text-white/60">
                    Time Slot
                  </label>
                  <input
                    type="text"
                    required
                    value={newVisitForm.timeSlot}
                    onChange={(e) => setNewVisitForm({ ...newVisitForm, timeSlot: e.target.value })}
                    placeholder="11:00 AM"
                    className="w-full mt-1 p-3 bg-white dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-md text-xs outline-none focus:border-[#6CAFBF]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-black/60 dark:text-white/60">
                  Notes
                </label>
                <textarea
                  rows={2}
                  value={newVisitForm.notes}
                  onChange={(e) => setNewVisitForm({ ...newVisitForm, notes: e.target.value })}
                  placeholder="e.g. Special pickup requested from Wanowarie."
                  className="w-full mt-1 p-3 bg-white dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-md text-xs outline-none focus:border-[#6CAFBF] resize-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-black/10 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-bold uppercase text-black/50 dark:text-white/50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#6CAFBF] text-black font-bold text-xs tracking-widest uppercase rounded-md hover:bg-black hover:text-white transition-colors"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
