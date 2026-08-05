'use client';

import React from 'react';
import { EnquiryItem } from '@/lib/dashboardData';

interface EnquiriesManagerProps {
  enquiries: EnquiryItem[];
  onConvertToLead: (enquiry: EnquiryItem) => void;
  onArchiveEnquiry: (id: string) => void;
}

export default function EnquiriesManager({
  enquiries,
  onConvertToLead,
  onArchiveEnquiry,
}: EnquiriesManagerProps) {
  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
        <div>
          <h1 className="font-[magtis] uppercase font-bold text-2xl text-black dark:text-white">
            Website Contact Enquiries ({enquiries.length})
          </h1>
          <p className="text-xs text-black/50 dark:text-white/50">
            Incoming form submissions from the live Mayuri Landmarks landing page.
          </p>
        </div>
      </div>

      {/* Enquiries Feed Table */}
      <div className="bg-white dark:bg-[#181818] border border-black/10 dark:border-white/10 rounded-md overflow-x-auto shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 font-bold uppercase tracking-wider border-b border-black/10 dark:border-white/10">
            <tr>
              <th className="p-4">Date</th>
              <th className="p-4">Name</th>
              <th className="p-4">Phone & Email</th>
              <th className="p-4">Interested Project</th>
              <th className="p-4">Message / Requirements</th>
              <th className="p-4 text-right">Quick Response Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/5">
            {enquiries.map((enq) => (
              <tr key={enq.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td className="p-4 text-black/40 dark:text-white/40 font-mono text-[11px]">
                  {enq.date}
                </td>
                <td className="p-4 font-bold text-black dark:text-white">{enq.name}</td>
                <td className="p-4 space-y-0.5">
                  <div className="text-black dark:text-white font-medium">{enq.phone}</div>
                  <div className="text-[10px] text-black/40 dark:text-white/40">{enq.email}</div>
                </td>
                <td className="p-4 text-[#6CAFBF] font-bold">{enq.project}</td>
                <td className="p-4 max-w-xs text-black/70 dark:text-white/70 italic line-clamp-2">
                  "{enq.message}"
                </td>
                <td className="p-4 text-right space-x-2">
                  <a
                    href={`tel:${enq.phone.replace(/[^0-9+]/g, '')}`}
                    className="px-2.5 py-1 bg-black text-white dark:bg-white dark:text-black font-bold text-[10px] uppercase rounded"
                  >
                    Call
                  </a>
                  <a
                    href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(enq.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-[#25D366] text-white font-bold text-[10px] uppercase rounded"
                  >
                    WhatsApp
                  </a>
                  <button
                    onClick={() => onConvertToLead(enq)}
                    className="px-2.5 py-1 bg-[#6CAFBF] text-black font-bold text-[10px] uppercase rounded"
                  >
                    Convert Lead
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
