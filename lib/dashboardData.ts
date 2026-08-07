export interface LeadItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  project: string;
  budget: string;
  status: 'New' | 'Contacted' | 'Interested' | 'Site Visit Scheduled' | 'Negotiation' | 'Booked' | 'Sold' | 'Lost';
  source: string;
  lastContact: string;
  nextFollowUp: string;
  notes?: string;
  assignedTo?: string;
}

export interface SiteVisitItem {
  id: string;
  leadName: string;
  phone: string;
  project: string;
  date: string;
  timeSlot: string;
  status: 'Scheduled' | 'Completed' | 'Missed' | 'Rescheduled';
  salesExec: string;
  notes?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  dueTime: string;
  leadName: string;
  phone: string;
  project: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Normal';
  type: 'Call' | 'Follow-up' | 'Site Visit' | 'Send Brochure' | 'Price Update';
}

export interface EnquiryItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  project: string;
  message: string;
  date: string;
  status: 'New' | 'Contacted' | 'Archived';
}

export interface TestimonialAdminItem {
  id: string;
  name: string;
  project: string;
  role: string;
  quote: string;
  rating: number;
  image: string;
  published: boolean;
  date: string;
}

export interface CompanySettings {
  companyName: string;
  phone: string;
  salesPhone: string;
  email: string;
  whatsappNumber: string;
  address: string;
  mahaReraNo: string;
  googleMapsUrl: string;
  metaTitle: string;
  metaDescription: string;
}

export const initialLeads: LeadItem[] = [
  {
    id: 'LD-101',
    name: 'Rahul Patil',
    phone: '+91 98230 12345',
    email: 'rahul.patil@gmail.com',
    project: 'Mayuri Adhinathpuram',
    budget: '₹85 Lakh',
    status: 'Hot Lead' as any,
    source: 'Website Form',
    lastContact: 'Yesterday',
    nextFollowUp: 'Today, 11:00 AM',
    notes: 'Interested in 3 BHK garden facing apartment. Requesting site visit.',
    assignedTo: 'Rohit Pote',
  },
  {
    id: 'LD-102',
    name: 'Priya Sharma',
    phone: '+91 98765 43210',
    email: 'priya.sharma@yahoo.com',
    project: 'Mayuri Infinity',
    budget: '₹1.2 Cr',
    status: 'Site Visit Scheduled',
    source: 'Instagram Ad',
    lastContact: '2 days ago',
    nextFollowUp: 'Today, 4:00 PM',
    notes: 'Site visit confirmed for 4 PM. Wants to discuss home loan options.',
    assignedTo: 'Tejas Kulkarni',
  },
  {
    id: 'LD-103',
    name: 'Amit & Neha Joshi',
    phone: '+91 94220 88990',
    email: 'joshi.home@outlook.com',
    project: 'Mayuri Optimum',
    budget: '₹1.5 Cr',
    status: 'Negotiation',
    source: 'Referral',
    lastContact: '3 days ago',
    nextFollowUp: 'Tomorrow, 2:00 PM',
    notes: 'Commercial office suite. Finalizing payment terms with bank.',
    assignedTo: 'Rohit Pote',
  },
  {
    id: 'LD-104',
    name: 'Vikram Deshmukh',
    phone: '+91 97654 11223',
    email: 'vikram.d@techcorp.com',
    project: 'Mayuri Elite',
    budget: '₹2.8 Cr',
    status: 'Interested',
    source: 'Google Search',
    lastContact: '5 days ago',
    nextFollowUp: 'Today, 6:00 PM',
    notes: 'Inquired about villa floor plans and possession date.',
    assignedTo: 'Sales Team',
  },
  {
    id: 'LD-105',
    name: 'Suresh Kulkarni',
    phone: '+91 98112 33445',
    email: 'suresh.k@gmail.com',
    project: 'Mayuri Residency',
    budget: '₹75 Lakh',
    status: 'Booked',
    source: 'Walk-in',
    lastContact: '1 week ago',
    nextFollowUp: '10 Aug 2026',
    notes: 'Token amount received. Agreement registration scheduled.',
    assignedTo: 'Tejas Kulkarni',
  },
];

export const initialSiteVisits: SiteVisitItem[] = [
  {
    id: 'SV-201',
    leadName: 'Priya Sharma',
    phone: '+91 98765 43210',
    project: 'Mayuri Infinity',
    date: '2026-07-30',
    timeSlot: '04:00 PM',
    status: 'Scheduled',
    salesExec: 'Tejas Kulkarni',
    notes: 'Pickup requested from Wanowarie.',
  },
  {
    id: 'SV-202',
    leadName: 'Rahul Patil',
    phone: '+91 98230 12345',
    project: 'Mayuri Adhinathpuram',
    date: '2026-07-30',
    timeSlot: '11:00 AM',
    status: 'Scheduled',
    salesExec: 'Rohit Pote',
    notes: 'Visiting with family members.',
  },
  {
    id: 'SV-203',
    leadName: 'Rajesh Shah',
    phone: '+91 99220 55667',
    project: 'Mayuri Optimum',
    date: '2026-07-29',
    timeSlot: '02:30 PM',
    status: 'Completed',
    salesExec: 'Rohit Pote',
    notes: 'Impressed with building layout. Sent pricing proposal.',
  },
];

export const initialTasks: TaskItem[] = [
  {
    id: 'TK-1',
    title: 'Call Rahul Patil for Site Visit Confirmation',
    dueTime: '11:00 AM',
    leadName: 'Rahul Patil',
    phone: '+91 98230 12345',
    project: 'Mayuri Adhinathpuram',
    completed: false,
    priority: 'High',
    type: 'Call',
  },
  {
    id: 'TK-2',
    title: 'Site Visit with Priya Sharma at Mayuri Infinity',
    dueTime: '04:00 PM',
    leadName: 'Priya Sharma',
    phone: '+91 98765 43210',
    project: 'Mayuri Infinity',
    completed: false,
    priority: 'High',
    type: 'Site Visit',
  },
  {
    id: 'TK-3',
    title: 'Send Mayuri Optimum Commercial Brochure to Amit Joshi',
    dueTime: '02:00 PM',
    leadName: 'Amit & Neha Joshi',
    phone: '+91 94220 88990',
    project: 'Mayuri Optimum',
    completed: false,
    priority: 'Medium',
    type: 'Send Brochure',
  },
  {
    id: 'TK-4',
    title: 'Follow up with Vikram Deshmukh on Luxury Villa Pricing',
    dueTime: '06:00 PM',
    leadName: 'Vikram Deshmukh',
    phone: '+91 97654 11223',
    project: 'Mayuri Elite',
    completed: false,
    priority: 'Normal',
    type: 'Follow-up',
  },
];

export const initialEnquiries: EnquiryItem[] = [
  {
    id: 'ENQ-501',
    name: 'Sanjay Deshpande',
    phone: '+91 98900 11223',
    email: 'sanjay.d@yahoo.in',
    project: 'Mayuri Adhinathpuram',
    message: 'Interested in 2 BHK flat options and booking discount for early buyers.',
    date: '2026-07-29',
    status: 'New',
  },
  {
    id: 'ENQ-502',
    name: 'Ananya Roy',
    phone: '+91 97110 44556',
    email: 'ananya.roy@gmail.com',
    project: 'Mayuri Infinity',
    message: 'Looking for a penthouse or top floor apartment. Please share availability.',
    date: '2026-07-28',
    status: 'Contacted',
  },
];

export const initialTestimonialsAdmin: TestimonialAdminItem[] = [
  {
    id: 'TST-1',
    name: 'Rahul & Priya Sharma',
    project: 'Mayuri Infinity',
    role: 'Homeowners · 2023',
    quote: 'Mayuri Landmarks transformed our vision into a home beyond imagination. Craftsmanship and attention to detail speak of genuine care.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop',
    published: true,
    date: '2023-11-15',
  },
  {
    id: 'TST-2',
    name: 'Meera Kulkarni',
    project: 'Mayuri Optimum',
    role: 'Business Owner · 2022',
    quote: 'From first consultation to final handover, the team was extraordinary. Our commercial space is functional, elegant, and delivered on schedule.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=800&auto=format&fit=crop',
    published: true,
    date: '2022-08-20',
  },
];

export const initialSettings: CompanySettings = {
  companyName: 'Mayuri Landmarks LLP',
  phone: '+91 8237277775',
  salesPhone: '+91 8237277775',
  email: 'mayurilandmarks.sales@gmail.com',
  whatsappNumber: '+918237277775',
  address: 'Mayuri Adhinathpuram, 53/8, Wadachi Wadi Road, Undri, Pune - 411 060, Maharashtra, India',
  mahaReraNo: 'P52100049330',
  googleMapsUrl: 'https://maps.google.com/?q=Mayuri+Adhinathpuram+Pune',
  metaTitle: 'Mayuri Landmarks LLP | Luxury Real Estate Developer Pune',
  metaDescription: 'Discover luxury residential townships, commercial towers, and villas in Pune by Mayuri Landmarks LLP.',
};
