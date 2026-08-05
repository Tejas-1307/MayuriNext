'use client';

import React, { useState, useEffect } from 'react';
import SidebarNav, { DashboardTab } from '@/components/dashboard/SidebarNav';
import HeaderBar from '@/components/dashboard/HeaderBar';
import HomeOverview from '@/components/dashboard/HomeOverview';
import LeadsManager from '@/components/dashboard/LeadsManager';
import SiteVisitsManager from '@/components/dashboard/SiteVisitsManager';
import ProjectsManager from '@/components/dashboard/ProjectsManager';
import MediaManager from '@/components/dashboard/MediaManager';
import TestimonialsManager from '@/components/dashboard/TestimonialsManager';
import EnquiriesManager from '@/components/dashboard/EnquiriesManager';
import SettingsManager from '@/components/dashboard/SettingsManager';
import {
  initialLeads,
  initialSiteVisits,
  initialTasks,
  initialEnquiries,
  initialTestimonialsAdmin,
  initialSettings,
  LeadItem,
  SiteVisitItem,
  TaskItem,
  EnquiryItem,
  TestimonialAdminItem,
  CompanySettings,
} from '@/lib/dashboardData';

export default function SalesOSDashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Datastore state with LocalStorage persistence
  const [leads, setLeads] = useState<LeadItem[]>(initialLeads);
  const [siteVisits, setSiteVisits] = useState<SiteVisitItem[]>(initialSiteVisits);
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(initialEnquiries);
  const [testimonials, setTestimonials] = useState<TestimonialAdminItem[]>(initialTestimonialsAdmin);
  const [settings, setSettings] = useState<CompanySettings>(initialSettings);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const savedLeads = localStorage.getItem('mayuri_sales_leads');
      if (savedLeads) setLeads(JSON.parse(savedLeads));

      const savedVisits = localStorage.getItem('mayuri_sales_visits');
      if (savedVisits) setSiteVisits(JSON.parse(savedVisits));

      const savedTasks = localStorage.getItem('mayuri_sales_tasks');
      if (savedTasks) setTasks(JSON.parse(savedTasks));

      const savedEnquiries = localStorage.getItem('mayuri_sales_enquiries');
      if (savedEnquiries) setEnquiries(JSON.parse(savedEnquiries));

      const savedTestimonials = localStorage.getItem('mayuri_sales_testimonials');
      if (savedTestimonials) setTestimonials(JSON.parse(savedTestimonials));

      const savedSettings = localStorage.getItem('mayuri_sales_settings');
      if (savedSettings) setSettings(JSON.parse(savedSettings));
    } catch (e) {
      console.warn('LocalStorage read error:', e);
    }
  }, []);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('mayuri_sales_leads', JSON.stringify(leads));
    } catch (e) {}
  }, [leads]);

  useEffect(() => {
    try {
      localStorage.setItem('mayuri_sales_visits', JSON.stringify(siteVisits));
    } catch (e) {}
  }, [siteVisits]);

  useEffect(() => {
    try {
      localStorage.setItem('mayuri_sales_tasks', JSON.stringify(tasks));
    } catch (e) {}
  }, [tasks]);

  // Lead Operations
  const handleAddLead = (newLeadData: Omit<LeadItem, 'id'>) => {
    const newLead: LeadItem = {
      ...newLeadData,
      id: `LD-${Math.floor(100 + Math.random() * 900)}`,
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  const handleUpdateLeadStatus = (id: string, status: LeadItem['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
  };

  const handleDeleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  // Task Operations
  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Visit Operations
  const handleAddVisit = (newVisitData: Omit<SiteVisitItem, 'id'>) => {
    const newVisit: SiteVisitItem = {
      ...newVisitData,
      id: `SV-${Math.floor(200 + Math.random() * 900)}`,
    };
    setSiteVisits((prev) => [newVisit, ...prev]);
  };

  const handleUpdateVisitStatus = (id: string, status: SiteVisitItem['status']) => {
    setSiteVisits((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status } : v))
    );
  };

  const handleScheduleVisitForLead = (lead: LeadItem) => {
    const newVisit: SiteVisitItem = {
      id: `SV-${Math.floor(200 + Math.random() * 900)}`,
      leadName: lead.name,
      phone: lead.phone,
      project: lead.project,
      date: new Date().toISOString().split('T')[0],
      timeSlot: '04:00 PM',
      status: 'Scheduled',
      salesExec: 'Rohit Pote',
      notes: `Scheduled via lead feed (${lead.id})`,
    };
    setSiteVisits((prev) => [newVisit, ...prev]);
    setActiveTab('site-visits');
  };

  // Convert Enquiry to Lead
  const handleConvertEnquiryToLead = (enq: EnquiryItem) => {
    handleAddLead({
      name: enq.name,
      phone: enq.phone,
      email: enq.email,
      project: enq.project,
      budget: 'Interested',
      status: 'New',
      source: 'Website Contact',
      lastContact: 'Just Now',
      nextFollowUp: 'Today, 5:00 PM',
      notes: enq.message,
      assignedTo: 'Rohit Pote',
    });
    setEnquiries((prev) =>
      prev.map((e) => (e.id === enq.id ? { ...e, status: 'Contacted' } : e))
    );
    setActiveTab('leads');
  };

  // Testimonials Operations
  const handleTogglePublishTestimonial = (id: string) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, published: !t.published } : t))
    );
  };

  const handleAddTestimonial = (tData: Omit<TestimonialAdminItem, 'id' | 'date'>) => {
    const newT: TestimonialAdminItem = {
      ...tData,
      id: `TST-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setTestimonials((prev) => [newT, ...prev]);
  };

  const handleDeleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="flex h-screen w-full bg-[#F5F5F0] dark:bg-[#0A0A0A] overflow-hidden text-black dark:text-white font-sans">
      {/* Sidebar Navigation */}
      <SidebarNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        newLeadsCount={leads.filter((l) => l.status === 'New').length}
        newEnquiriesCount={enquiries.filter((e) => e.status === 'New').length}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Global Header Bar */}
        <HeaderBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onQuickAddLead={() => setActiveTab('leads')}
        />

        {/* View Content Switcher */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {activeTab === 'dashboard' && (
            <HomeOverview
              leads={leads}
              siteVisits={siteVisits}
              tasks={tasks}
              enquiries={enquiries}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onToggleTask={handleToggleTask}
            />
          )}

          {activeTab === 'leads' && (
            <LeadsManager
              leads={leads}
              searchQuery={searchQuery}
              onAddLead={handleAddLead}
              onUpdateStatus={handleUpdateLeadStatus}
              onDeleteLead={handleDeleteLead}
              onScheduleVisitForLead={handleScheduleVisitForLead}
            />
          )}

          {activeTab === 'site-visits' && (
            <SiteVisitsManager
              siteVisits={siteVisits}
              onAddVisit={handleAddVisit}
              onUpdateVisitStatus={handleUpdateVisitStatus}
            />
          )}

          {activeTab === 'projects' && <ProjectsManager />}

          {activeTab === 'media' && <MediaManager />}

          {activeTab === 'testimonials' && (
            <TestimonialsManager
              testimonials={testimonials}
              onTogglePublish={handleTogglePublishTestimonial}
              onAddTestimonial={handleAddTestimonial}
              onDeleteTestimonial={handleDeleteTestimonial}
            />
          )}

          {activeTab === 'enquiries' && (
            <EnquiriesManager
              enquiries={enquiries}
              onConvertToLead={handleConvertEnquiryToLead}
              onArchiveEnquiry={(id) =>
                setEnquiries((prev) => prev.filter((e) => e.id !== id))
              }
            />
          )}

          {activeTab === 'settings' && (
            <SettingsManager
              settings={settings}
              onSaveSettings={(s) => setSettings(s)}
            />
          )}
        </main>
      </div>
    </div>
  );
}
