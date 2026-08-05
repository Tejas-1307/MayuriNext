'use client';

import React, { useState } from 'react';
import { allProjectsData, ProjectItem } from '@/lib/projectsData';

export default function ProjectsManager() {
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(allProjectsData);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    setProjectsList((prev) =>
      prev.map((p) => (p.id === editingProject.id ? editingProject : p))
    );
    setEditingProject(null);
  };

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
        <div>
          <h1 className="font-[magtis] uppercase font-bold text-2xl text-black dark:text-white">
            Project Portfolio CRUD ({projectsList.length})
          </h1>
          <p className="text-xs text-black/50 dark:text-white/50">
            Update project pricing, unit availability, status, and brochure download links in 2 minutes.
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsList.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-[#181818] border border-black/10 dark:border-white/10 rounded-md overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div className="relative h-44 bg-black">
              <img
                src={project.img}
                alt={project.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[10px] text-white font-bold uppercase tracking-wider">
                {project.status}
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[#6CAFBF] text-[10px] uppercase font-bold tracking-widest">
                  {project.type}
                </span>
                <h3 className="font-[magtis] text-xl font-bold uppercase text-white leading-tight">
                  {project.name}
                </h3>
              </div>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5 text-xs text-black/70 dark:text-white/70">
                <p>Location: <span className="font-bold text-black dark:text-white">{project.location}</span></p>
                <p>Completion: <span className="font-bold text-black dark:text-white">{project.year}</span></p>
                <p>Capacity: <span className="font-bold text-[#6CAFBF]">{project.units}</span></p>
                <p className="line-clamp-2 text-[11px] text-black/50 dark:text-white/50 pt-1">
                  {project.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-2">
                <a
                  href={`/project/${project.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold text-[#6CAFBF] uppercase tracking-wider hover:underline"
                >
                  Live Page →
                </a>

                <button
                  onClick={() => setEditingProject(project)}
                  className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-bold text-[10px] uppercase tracking-wider rounded hover:bg-[#6CAFBF] dark:hover:bg-[#6CAFBF] transition-colors"
                >
                  Edit Project
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl bg-[#F5F5F0] dark:bg-[#121212] rounded-md p-6 md:p-8 border border-black/10 dark:border-white/10 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
              <h2 className="font-[magtis] uppercase font-bold text-xl text-black dark:text-white">
                Edit {editingProject.name}
              </h2>
              <button
                onClick={() => setEditingProject(null)}
                className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-black/60 dark:text-white/60">
                  Project Title
                </label>
                <input
                  type="text"
                  value={editingProject.name}
                  onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                  className="w-full mt-1 p-3 bg-white dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-md text-xs outline-none focus:border-[#6CAFBF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-black/60 dark:text-white/60">
                    Status
                  </label>
                  <select
                    value={editingProject.status}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        status: e.target.value as 'completed' | 'ongoing',
                      })
                    }
                    className="w-full mt-1 p-3 bg-white dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-md text-xs outline-none focus:border-[#6CAFBF]"
                  >
                    <option value="completed">Completed</option>
                    <option value="ongoing">Ongoing</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-black/60 dark:text-white/60">
                    Capacity / Units
                  </label>
                  <input
                    type="text"
                    value={editingProject.units}
                    onChange={(e) => setEditingProject({ ...editingProject, units: e.target.value })}
                    className="w-full mt-1 p-3 bg-white dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-md text-xs outline-none focus:border-[#6CAFBF]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-black/60 dark:text-white/60">
                  Location
                </label>
                <input
                  type="text"
                  value={editingProject.location}
                  onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                  className="w-full mt-1 p-3 bg-white dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-md text-xs outline-none focus:border-[#6CAFBF]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-black/60 dark:text-white/60">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingProject.desc}
                  onChange={(e) => setEditingProject({ ...editingProject, desc: e.target.value })}
                  className="w-full mt-1 p-3 bg-white dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-md text-xs outline-none focus:border-[#6CAFBF] resize-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-black/10 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-5 py-2.5 text-xs font-bold uppercase text-black/50 dark:text-white/50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#6CAFBF] text-black font-bold text-xs tracking-widest uppercase rounded-md hover:bg-black hover:text-white transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
