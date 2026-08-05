'use client';

import React, { useState } from 'react';

export default function MediaManager() {
  const [activeCategory, setActiveCategory] = useState<string>('Projects');
  const [mediaItems, setMediaItems] = useState([
    {
      id: 1,
      category: 'Projects',
      title: 'Mayuri Infinity Elevation',
      url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 2,
      category: 'Projects',
      title: 'Mayuri Optimum Façade',
      url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 3,
      category: 'Interiors',
      title: 'Luxury Living Room Render',
      url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 4,
      category: 'Interiors',
      title: 'Master Suite Layout',
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 5,
      category: 'Amenities',
      title: 'Landscaped Garden Walkway',
      url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 6,
      category: 'Construction Updates',
      title: 'Adhinathpuram Tower A Structure',
      url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop',
    },
  ]);

  const categories = ['Projects', 'Interiors', 'Amenities', 'Construction Updates'];

  const filteredMedia = mediaItems.filter((m) => m.category === activeCategory);

  const handleDelete = (id: number) => {
    setMediaItems((prev) => prev.filter((m) => m.id !== id));
  };

  const handleSimulatedUpload = () => {
    const newItem = {
      id: Date.now(),
      category: activeCategory,
      title: `New ${activeCategory} Media`,
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    };
    setMediaItems((prev) => [newItem, ...prev]);
  };

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-4">
        <div>
          <h1 className="font-[magtis] uppercase font-bold text-2xl text-black dark:text-white">
            Media & Gallery Manager ({mediaItems.length})
          </h1>
          <p className="text-xs text-black/50 dark:text-white/50">
            Upload, replace, and categorize high-resolution project renders and walkthrough images.
          </p>
        </div>

        <button
          onClick={handleSimulatedUpload}
          className="px-5 py-2.5 bg-[#6CAFBF] text-black font-bold text-xs tracking-widest uppercase rounded-md hover:bg-black hover:text-white transition-colors"
        >
          + Upload Media
        </button>
      </div>

      {/* Categories Bar */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
              activeCategory === cat
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                : 'bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 hover:bg-black/10'
            }`}
          >
            {cat} ({mediaItems.filter((m) => m.category === cat).length})
          </button>
        ))}
      </div>

      {/* Drag & Drop Zone */}
      <div
        onClick={handleSimulatedUpload}
        className="border-2 border-dashed border-black/15 dark:border-white/15 hover:border-[#6CAFBF] rounded-lg p-8 text-center cursor-pointer transition-colors bg-white/5"
      >
        <svg
          className="mx-auto text-black/30 dark:text-white/30 mb-3"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <p className="text-xs font-bold uppercase tracking-wider text-black dark:text-white">
          Drag & Drop Images / Videos here or Click to Browse
        </p>
        <p className="text-[10px] text-black/40 dark:text-white/40 mt-1">
          Supports JPG, PNG, WEBP, and MP4 formats up to 50MB.
        </p>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="group relative h-48 rounded-md overflow-hidden bg-black border border-black/10 dark:border-white/10 shadow-sm"
          >
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
              <button
                onClick={() => handleDelete(item.id)}
                className="self-end bg-rose-500 text-white p-1.5 rounded-full text-xs hover:scale-110 transition-transform"
                title="Delete Media"
              >
                ✕
              </button>
              <span className="text-white text-xs font-bold leading-tight">
                {item.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
