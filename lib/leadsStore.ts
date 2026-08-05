import { LeadItem, SiteVisitItem, EnquiryItem } from './dashboardData';

export interface LeadSubmissionPayload {
  full_name: string;
  phone: string;
  email: string;
  project_name: string;
  unit_type: string;
  visit_date?: string;
  time_slot?: string;
  message?: string;
  form_type: 'site-visit' | 'general-enquiry' | 'project';
  source_page: string;
  timestamp: string;
  utm_source?: string;
  utm_campaign?: string;
  utm_medium?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  browser?: string;
  device?: string;
  path?: string;
}

export interface StoredLeadRecord {
  id: string;
  submission: LeadSubmissionPayload;
  status: 'New' | 'Contacted' | 'Interested' | 'Site Visit Scheduled' | 'Negotiation' | 'Booked' | 'Sold' | 'Lost';
  emailSent: boolean;
  createdAt: string;
}

// In-memory server-side storage fallback (for dev/runtime session)
const serverLeadsStore: StoredLeadRecord[] = [];

/**
 * Save new lead submission to store
 */
export function saveLeadSubmission(payload: LeadSubmissionPayload, emailSent: boolean = true): StoredLeadRecord {
  const isSiteVisit = payload.form_type === 'site-visit';
  const idPrefix = isSiteVisit ? 'SV' : 'LD';
  const randomId = `${idPrefix}-${Math.floor(100 + Math.random() * 900)}`;

  const record: StoredLeadRecord = {
    id: randomId,
    submission: payload,
    status: 'New',
    emailSent,
    createdAt: payload.timestamp || new Date().toISOString(),
  };

  serverLeadsStore.unshift(record);

  return record;
}

/**
 * Retrieve all leads stored in server instance
 */
export function getStoredLeads(): StoredLeadRecord[] {
  return serverLeadsStore;
}

/**
 * Map stored record to LeadItem format for Sales OS Dashboard
 */
export function mapRecordToLeadItem(record: StoredLeadRecord): LeadItem {
  const sub = record.submission;
  return {
    id: record.id,
    name: sub.full_name,
    phone: sub.phone,
    email: sub.email,
    project: sub.project_name,
    budget: sub.unit_type || '2 BHK',
    status: sub.form_type === 'site-visit' ? 'Site Visit Scheduled' : record.status,
    source: sub.source_page || 'Website Form',
    lastContact: 'Just now',
    nextFollowUp: sub.visit_date ? `${sub.visit_date} (${sub.time_slot || 'Morning'})` : 'Today',
    notes: sub.message ? `[${sub.form_type.toUpperCase()}] ${sub.message}` : `Inquired via ${sub.source_page}`,
    assignedTo: 'Sales Team',
  };
}

/**
 * Map stored record to SiteVisitItem format for Sales OS Dashboard
 */
export function mapRecordToSiteVisitItem(record: StoredLeadRecord): SiteVisitItem {
  const sub = record.submission;
  return {
    id: record.id.replace('LD', 'SV'),
    leadName: sub.full_name,
    phone: sub.phone,
    project: sub.project_name,
    date: sub.visit_date || new Date().toISOString().split('T')[0],
    timeSlot: sub.time_slot || '10:00 AM',
    status: 'Scheduled',
    salesExec: 'Rohit Pote',
    notes: sub.message || `Booked via ${sub.source_page}`,
  };
}
