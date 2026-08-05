'use client';

import React, { useState } from 'react';
import { LeadItem } from '@/lib/dashboardData';

interface LeadsManagerProps {
  leads: LeadItem[];
  searchQuery: string;
  onAddLead: (lead: Omit<LeadItem, 'id'>) => void;
  onUpdateStatus: (id: string, status: LeadItem['status']) => void;
  onDeleteLead: (id: string) => void;
  onScheduleVisitForLead: (lead: LeadItem) => void;
}

export default function LeadsManager({
  leads,
  searchQuery,
  onAddLead,
  onUpdateStatus,
  onDeleteLead,
  onScheduleVisitForLead,
}: LeadsManagerProps) {
  const [activeStage, setActiveStage] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    project: 'Mayuri Adhinathpuram',
    budget: '₹85 Lakh',
    status: 'New' as LeadItem['status'],
    source: 'Website',
    lastContact: 'Just Now',
    nextFollowUp: 'Tomorrow, 11:00 AM',
    notes: '',
    assignedTo: 'Rohit Pote',
  });

  const stages = [
    'All',
    'New',
    'Contacted',
    'Interested',
    'Site Visit Scheduled',
    'Negotiation',
    'Booked',
    'Sold',
    'Lost',
  ];

  const filtered = leads.filter((l) => {
    const matchesSearch =
      !searchQuery ||
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      l.project.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStage = activeStage === 'All' || l.status === activeStage;

    return matchesSearch && matchesStage;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.phone) return;

    onAddLead(newLeadForm);
    setIsAddModalOpen(false);
    setNewLeadForm({
      name: '',
      phone: '',
      email: '',
      project: 'Mayuri Adhinathpuram',
      budget: '₹85 Lakh',
      status: 'New',
      source: 'Website',
      lastContact: 'Just Now',
      nextFollowUp: 'Tomorrow, 11:00 AM',
      notes: '',
      assignedTo: 'Rohit Pote',
    });
  };

  const getStatusBadgeColor = (status: LeadItem['status']) => {
    switch (status) {
      case 'New':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Contacted':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Interested':
        return 'bg-[#6CAFBF]/20 text-[#6CAFBF] border-[#6CAFBF]/30';
      case 'Site Visit Scheduled':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Negotiation':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Booked':
      case 'Sold':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Lost':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6 select-none">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-4">
        <div>
          <h1 className="font-[magtis] uppercase font-bold text-2xl text-black dark:text-white">
            Lead Operating Feed ({filtered.length})
          </h1>
          <p className="text-xs text-black/50 dark:text-white/50">
            Convert leads, track follow-ups, and trigger 1-click calls or WhatsApp messages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-md border border-black/10 dark:border-white/10">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1 text-xs font-bold uppercase rounded ${
                viewMode === 'cards' ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-black/50 dark:text-white/50'
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 text-xs font-bold uppercase rounded ${
                viewMode === 'table' ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-black/50 dark:text-white/50'
              }`}
            >
              Table
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 bg-[#6CAFBF] text-black font-bold text-xs tracking-widest uppercase rounded-md hover:bg-black hover:text-white transition-colors"
          >
            + Add New Lead
          </button>
        </div>
      </div>

      {/* Stage Filter Chips */}
      <div className="flex flex-wrap gap-2 pb-2">
        {stages.map((stage) => (
          <button
            key={stage}
            onClick={() => setActiveStage(stage)}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
              activeStage === stage
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                : 'bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/10'
            }`}
          >
            {stage}
            <span className="ml-1.5 opacity-60 text-[10px]">
              {stage === 'All' ? leads.length : leads.filter((l) => l.status === stage).length}
            </span>
          </button>
        ))}
      </div>

      {/* CARDS VIEW */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((lead) => (
            <div
              key={lead.id}
              className="bg-white dark:bg-[#181818] border border-black/10 dark:border-white/10 rounded-md p-5 flex flex-col justify-between gap-4 shadow-sm hover:shadow-md transition-shadow relative group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-black/40 dark:text-white/40 font-mono block">
                      {lead.id} · {lead.source}
                    </span>
                    <h3 className="font-bold text-base text-black dark:text-white leading-snug">
                      {lead.name}
                    </h3>
                  </div>

                  {/* Status Dropdown */}
                  <select
                    value={lead.status}
                    onChange={(e) => onUpdateStatus(lead.id, e.target.value as any)}
                    className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded border outline-none cursor-pointer ${getStatusBadgeColor(
                      lead.status
                    )}`}
                  >
                    {stages.slice(1).map((s) => (
                      <option key={s} value={s} className="bg-black text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1 text-xs text-black/70 dark:text-white/70">
                  <p>
                    Target Project: <span className="font-bold text-black dark:text-white">{lead.project}</span>
                  </p>
                  <p>
                    Budget: <span className="font-bold text-[#6CAFBF]">{lead.budget}</span>
                  </p>
                  <p>
                    Next Action: <span className="font-bold text-amber-500">{lead.nextFollowUp}</span>
                  </p>
                  {lead.notes && (
                    <p className="text-[11px] text-black/50 dark:text-white/50 italic bg-black/5 dark:bg-white/5 p-2 rounded mt-2">
                      "{lead.notes}"
                    </p>
                  )}
                </div>
              </div>

              {/* 1-Click Action Buttons */}
              <div className="pt-3 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center gap-2">
                <a
                  href={`tel:${lead.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex-1 py-2 bg-black text-white dark:bg-white dark:text-black font-bold text-[10px] uppercase tracking-wider text-center rounded hover:bg-[#6CAFBF] dark:hover:bg-[#6CAFBF] transition-colors"
                >
                  Call
                </a>

                <a
                  href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(
                    lead.name
                  )}%2C%20following%20up%20from%20Mayuri%20Landmarks.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 bg-[#25D366] text-white font-bold text-[10px] uppercase tracking-wider text-center rounded hover:opacity-90 transition-opacity"
                >
                  WhatsApp
                </a>

                <button
                  onClick={() => onScheduleVisitForLead(lead)}
                  className="px-3 py-2 bg-[#6CAFBF] text-black font-bold text-[10px] uppercase tracking-wider rounded hover:bg-black hover:text-white transition-colors"
                  title="Book Site Visit"
                >
                  Visit
                </button>

                <button
                  onClick={() => onDeleteLead(lead.id)}
                  className="px-2 py-2 text-black/30 dark:text-white/30 hover:text-rose-500 text-xs font-bold"
                  title="Delete Lead"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white dark:bg-[#181818] border border-black/10 dark:border-white/10 rounded-md overflow-x-auto shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 font-bold uppercase tracking-wider border-b border-black/10 dark:border-white/10">
              <tr>
                <th className="p-4">Lead Name</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Project</th>
                <th className="p-4">Budget</th>
                <th className="p-4">Status</th>
                <th className="p-4">Next Action</th>
                <th className="p-4 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {filtered.map((lead) => (
                <tr key={lead.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="p-4 font-bold text-black dark:text-white">{lead.name}</td>
                  <td className="p-4 text-black/70 dark:text-white/70">{lead.phone}</td>
                  <td className="p-4 text-black/80 dark:text-white/80 font-medium">{lead.project}</td>
                  <td className="p-4 text-[#6CAFBF] font-bold">{lead.budget}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${getStatusBadgeColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4 text-amber-500 font-medium">{lead.nextFollowUp}</td>
                  <td className="p-4 text-right space-x-2">
                    <a
                      href={`tel:${lead.phone.replace(/[^0-9+]/g, '')}`}
                      className="px-2.5 py-1 bg-black text-white dark:bg-white dark:text-black font-bold text-[10px] uppercase rounded"
                    >
                      Call
                    </a>
                    <a
                      href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(lead.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-[#25D366] text-white font-bold text-[10px] uppercase rounded"
                    >
                      WhatsApp
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#F5F5F0] dark:bg-[#121212] rounded-md p-6 md:p-8 border border-black/10 dark:border-white/10 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
              <h2 className="font-[magtis] uppercase font-bold text-xl text-black dark:text-white">
                Add New Lead (30 Sec)
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-black/60 dark:text-white/60">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newLeadForm.name}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  placeholder="e.g. Anand Kulkarni"
                  className="w-full mt-1 p-3 bg-white dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-md text-xs outline-none focus:border-[#6CAFBF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-black/60 dark:text-white/60">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full mt-1 p-3 bg-white dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-md text-xs outline-none focus:border-[#6CAFBF]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-black/60 dark:text-white/60">
                    Target Project
                  </label>
                  <select
                    value={newLeadForm.project}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, project: e.target.value })}
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
                    Budget
                  </label>
                  <input
                    type="text"
                    value={newLeadForm.budget}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, budget: e.target.value })}
                    placeholder="e.g. ₹85 Lakh"
                    className="w-full mt-1 p-3 bg-white dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-md text-xs outline-none focus:border-[#6CAFBF]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-black/60 dark:text-white/60">
                    Initial Status
                  </label>
                  <select
                    value={newLeadForm.status}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, status: e.target.value as any })}
                    className="w-full mt-1 p-3 bg-white dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-md text-xs outline-none focus:border-[#6CAFBF]"
                  >
                    {stages.slice(1).map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-black/60 dark:text-white/60">
                  Notes / Requirements
                </label>
                <textarea
                  rows={2}
                  value={newLeadForm.notes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                  placeholder="e.g. Looking for 3 BHK flat, East facing."
                  className="w-full mt-1 p-3 bg-white dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-md text-xs outline-none focus:border-[#6CAFBF] resize-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-black/10 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-bold uppercase text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#6CAFBF] text-black font-bold text-xs tracking-widest uppercase rounded-md hover:bg-black hover:text-white transition-colors"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
