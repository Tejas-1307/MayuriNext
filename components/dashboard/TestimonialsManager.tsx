'use client';

import React, { useState } from 'react';
import { TestimonialAdminItem } from '@/lib/dashboardData';

interface TestimonialsManagerProps {
  testimonials: TestimonialAdminItem[];
  onTogglePublish: (id: string) => void;
  onAddTestimonial: (t: Omit<TestimonialAdminItem, 'id' | 'date'>) => void;
  onDeleteTestimonial: (id: string) => void;
}

export default function TestimonialsManager({
  testimonials,
  onTogglePublish,
  onAddTestimonial,
  onDeleteTestimonial,
}: TestimonialsManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newForm, setNewForm] = useState({
    name: '',
    project: 'Mayuri Infinity',
    role: 'Homeowner · 2024',
    quote: '',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop',
    published: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.name || !newForm.quote) return;

    onAddTestimonial(newForm);
    setIsModalOpen(false);
    setNewForm({
      name: '',
      project: 'Mayuri Infinity',
      role: 'Homeowner · 2024',
      quote: '',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop',
      published: true,
    });
  };

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
        <div>
          <h1 className="font-[magtis] uppercase font-bold text-2xl text-black dark:text-white">
            Customer Testimonials Manager ({testimonials.length})
          </h1>
          <p className="text-xs text-black/50 dark:text-white/50">
            Publish verified buyer reviews directly to the live website.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-[#6CAFBF] text-black font-bold text-xs tracking-widest uppercase rounded-md hover:bg-black hover:text-white transition-colors"
        >
          + Add Testimonial
        </button>
      </div>

      {/* Testimonials List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white dark:bg-[#181818] border border-black/10 dark:border-white/10 rounded-md p-6 flex flex-col justify-between gap-4 shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#6CAFBF]"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-black dark:text-white">{t.name}</h3>
                    <p className="text-[11px] text-[#6CAFBF] font-semibold">{t.project} · {t.role}</p>
                  </div>
                </div>

                {/* Publish Toggle Switch */}
                <button
                  onClick={() => onTogglePublish(t.id)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    t.published
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-black/10 dark:bg-white/10 text-black/40 dark:text-white/40'
                  }`}
                >
                  {t.published ? 'Published' : 'Hidden'}
                </button>
              </div>

              <p className="text-xs text-black/70 dark:text-white/70 italic leading-relaxed">
                "{t.quote}"
              </p>
            </div>

            <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
              <div className="flex text-amber-400 text-xs">
                {'★'.repeat(t.rating)}
              </div>
              <button
                onClick={() => onDeleteTestimonial(t.id)}
                className="text-xs text-rose-500 font-bold uppercase tracking-wider hover:underline"
              >
                Delete Review
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#F5F5F0] dark:bg-[#121212] rounded-md p-6 md:p-8 border border-black/10 dark:border-white/10 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
              <h2 className="font-[magtis] uppercase font-bold text-xl text-black dark:text-white">
                Add Customer Review
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-black/60 dark:text-white/60">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  value={newForm.name}
                  onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
                  placeholder="e.g. Rahul & Priya Sharma"
                  className="w-full mt-1 p-3 bg-white dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-md text-xs outline-none focus:border-[#6CAFBF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-black/60 dark:text-white/60">
                    Purchased Project
                  </label>
                  <select
                    value={newForm.project}
                    onChange={(e) => setNewForm({ ...newForm, project: e.target.value })}
                    className="w-full mt-1 p-3 bg-white dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-md text-xs outline-none focus:border-[#6CAFBF]"
                  >
                    <option value="Mayuri Infinity">Mayuri Infinity</option>
                    <option value="Mayuri Optimum">Mayuri Optimum</option>
                    <option value="Mayuri Adhinathpuram">Mayuri Adhinathpuram</option>
                    <option value="Mayuri Residency">Mayuri Residency</option>
                    <option value="Mayuri Elite">Mayuri Elite</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-black/60 dark:text-white/60">
                    Role / Subtitle
                  </label>
                  <input
                    type="text"
                    value={newForm.role}
                    onChange={(e) => setNewForm({ ...newForm, role: e.target.value })}
                    placeholder="Homeowners · 2024"
                    className="w-full mt-1 p-3 bg-white dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-md text-xs outline-none focus:border-[#6CAFBF]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-black/60 dark:text-white/60">
                  Review Quote *
                </label>
                <textarea
                  rows={3}
                  required
                  value={newForm.quote}
                  onChange={(e) => setNewForm({ ...newForm, quote: e.target.value })}
                  placeholder="Share the customer's exact words..."
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
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
