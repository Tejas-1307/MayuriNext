import { NextRequest, NextResponse } from 'next/server';
import { saveLeadSubmission, LeadSubmissionPayload } from '@/lib/leadsStore';
import { sendDualEmails } from '@/lib/email';

// Simple in-memory rate limiting per IP address
const ipRequestMap = new Map<string, { count: number; expiresAt: number }>();

function checkRateLimit(ip: string, maxRequests = 5, windowMs = 15 * 60 * 1000): boolean {
  const now = Date.now();
  const record = ipRequestMap.get(ip);

  if (!record || now > record.expiresAt) {
    ipRequestMap.set(ip, { count: 1, expiresAt: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count += 1;
  return true;
}

// Input sanitization helper
function sanitizeInput(str: string): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';

    // Rate Limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again in a few minutes.' },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Honeypot check (anti-spam)
    if (body.website_hp) {
      return NextResponse.json(
        { success: true, message: 'Enquiry received.' }, // Silently drop spam
        { status: 200 }
      );
    }

    // Extract & Sanitize fields
    const full_name = sanitizeInput(body.full_name);
    const phone = sanitizeInput(body.phone);
    const email = sanitizeInput(body.email);
    const project_name = sanitizeInput(body.project_name || 'Mayuri Adhinathpuram');
    const unit_type = sanitizeInput(body.unit_type || '2 BHK');
    const visit_date = sanitizeInput(body.visit_date);
    const time_slot = sanitizeInput(body.time_slot);
    const message = sanitizeInput(body.message);
    const form_type = (body.form_type as any) || 'site-visit';
    const source_page = sanitizeInput(body.source_page || 'Website');

    // Validation
    if (!full_name || full_name.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Full name is required (at least 2 characters).' },
        { status: 400 }
      );
    }

    const cleanPhone = phone.replace(/[\s\-\+\(\)]/g, '');
    const digitsOnly = cleanPhone.startsWith('91') && cleanPhone.length === 12
      ? cleanPhone.slice(2)
      : cleanPhone;

    if (!phone || !/^[6-9]\d{9}$/.test(digitsOnly)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid 10-digit Indian mobile number.' },
        { status: 400 }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (form_type === 'site-visit') {
      const todayStr = new Date().toISOString().split('T')[0];
      if (!visit_date || visit_date < todayStr) {
        return NextResponse.json(
          { success: false, error: 'Please select a valid future visit date.' },
          { status: 400 }
        );
      }
    }

    const payload: LeadSubmissionPayload = {
      full_name,
      phone,
      email,
      project_name,
      unit_type,
      visit_date,
      time_slot,
      message,
      form_type,
      source_page,
      timestamp: body.timestamp || new Date().toISOString(),
      utm_source: sanitizeInput(body.utm_source),
      utm_campaign: sanitizeInput(body.utm_campaign),
      utm_medium: sanitizeInput(body.utm_medium),
      utm_content: sanitizeInput(body.utm_content),
      utm_term: sanitizeInput(body.utm_term),
      referrer: sanitizeInput(body.referrer),
      browser: sanitizeInput(body.browser),
      device: sanitizeInput(body.device),
      path: sanitizeInput(body.path),
    };

    // 1. Send Dual Emails (Admin & Customer)
    const emailRes = await sendDualEmails(payload);

    // 2. Store Lead locally / server-side
    const leadRecord = saveLeadSubmission(payload, emailRes.success);

    return NextResponse.json({
      success: true,
      leadId: leadRecord.id,
      message: 'Thank you. Our relationship manager will contact you shortly to confirm your booking.',
    });
  } catch (error: any) {
    console.error('API /api/enquiry Error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
