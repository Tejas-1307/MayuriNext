'use client';

import React, { useState } from 'react';
import { CompanySettings } from '@/lib/dashboardData';

interface SettingsManagerProps {
  settings: CompanySettings;
  onSaveSettings: (s: CompanySettings) => void;
}

export default function SettingsManager({
  settings,
  onSaveSettings,
}: SettingsManagerProps) {
  const [form, setForm] = useState<CompanySettings>(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(form);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
        <div>
          <h1 className="font-[magtis] uppercase font-bold text-2xl text-black dark:text-white">
            Company & Website Settings
          </h1>
          <p className="text-xs text-black/50 dark:text-white/50">
            Update RERA numbers, business contact info, WhatsApp links, and search engine titles.
          </p>
        </div>

        {savedSuccess && (
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded animate-fadeIn">
            ✓ Settings Saved!
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Identity */}
        <div className="bg-white dark:bg-[#181818] border border-black/10 dark:border-white/10 p-6 rounded-md space-y-4 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#6CAFBF]">
            Company Identity & Contact Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase text-black/60 dark:text-white/60">
                Company Legal Name
              </label>
              <input
                type="text"
                value={form.companyName}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                className="w-full mt-1 p-3 bg-[#F5F5F0] dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-md text-xs outline-none focus:border-[#6CAFBF]"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-black/60 dark:text-white/60">
                MAHA RERA Registration Number
              </label>
              <input
                type="text"
                value={form.mahaReraNo}
                onChange={(e) => setForm({ ...form, mahaReraNo: e.target.value })}
                className="w-full mt-1 p-3 bg-[#F5F5F0] dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-md text-xs outline-none focus:border-[#6CAFBF]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold uppercase text-black/60 dark:text-white/60">
                Sales Hotline
              </label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full mt-1 p-3 bg-[#F5F5F0] dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-md text-xs outline-none focus:border-[#6CAFBF]"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-black/60 dark:text-white/60">
                WhatsApp Business Number
              </label>
              <input
                type="text"
                value={form.whatsappNumber}
                onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                className="w-full mt-1 p-3 bg-[#F5F5F0] dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-md text-xs outline-none focus:border-[#6CAFBF]"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-black/60 dark:text-white/60">
                Sales Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full mt-1 p-3 bg-[#F5F5F0] dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-md text-xs outline-none focus:border-[#6CAFBF]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-black/60 dark:text-white/60">
              Corporate Office Address
            </label>
            <textarea
              rows={2}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full mt-1 p-3 bg-[#F5F5F0] dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-md text-xs outline-none focus:border-[#6CAFBF] resize-none"
            />
          </div>
        </div>

        {/* SEO Settings */}
        <div className="bg-white dark:bg-[#181818] border border-black/10 dark:border-white/10 p-6 rounded-md space-y-4 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#6CAFBF]">
            Search Engine (SEO) Information
          </h2>

          <div>
            <label className="text-xs font-bold uppercase text-black/60 dark:text-white/60">
              Homepage Meta Title
            </label>
            <input
              type="text"
              value={form.metaTitle}
              onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
              className="w-full mt-1 p-3 bg-[#F5F5F0] dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-md text-xs outline-none focus:border-[#6CAFBF]"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-black/60 dark:text-white/60">
              Homepage Meta Description
            </label>
            <textarea
              rows={2}
              value={form.metaDescription}
              onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
              className="w-full mt-1 p-3 bg-[#F5F5F0] dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-md text-xs outline-none focus:border-[#6CAFBF] resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-3.5 bg-[#6CAFBF] text-black font-bold text-xs tracking-widest uppercase rounded-md hover:bg-black hover:text-white transition-colors"
        >
          Save All Settings
        </button>
      </form>
    </div>
  );
}
