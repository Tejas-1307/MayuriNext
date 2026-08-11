'use client';

import React, { useState, useEffect, useId } from 'react';
import { CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

export type FormType = 'site-visit' | 'general-enquiry' | 'project';

export interface BookingFormProps {
  type?: FormType;
  showTabs?: boolean;
  title?: string;
  subtitle?: string;
  projectName?: string;
  autoFilled?: boolean;
  sourcePage?: string;
  onSuccess?: () => void;
  compact?: boolean;
  className?: string;
}

const UNIT_TYPES = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Villa', 'Commercial'];

const TIME_SLOTS = [
  { id: 'Morning (10:00 AM)', label: 'Morning 10 AM' },
  { id: 'Afternoon (02:00 PM)', label: 'Afternoon 2 PM' },
  { id: 'Evening (05:00 PM)', label: 'Evening 5 PM' },
  { id: 'Weekend VIP', label: 'Weekend VIP' },
];

const AVAILABLE_PROJECTS = [
  'Mayuri Adhinathpuram',
  'Mayuri Infinity',
  'Mayuri Optimum',
  'Mayuri Residency',
  'Mayuri Adhinathpuram Sapphire',
  'Mayuri Vrindha',
  'Other / Custom Requirement',
];

export default function BookingForm({
  type = 'site-visit',
  showTabs = false,
  title,
  subtitle,
  projectName = '',
  autoFilled = false,
  sourcePage = 'Website Form',
  onSuccess,
  compact = false,
  className = '',
}: BookingFormProps) {
  const formId = useId();

  // Get today's date in YYYY-MM-DD for date input min attribute
  const todayStr = new Date().toISOString().split('T')[0];

  const [formMode, setFormMode] = useState<FormType>(type);
  const [focused, setFocused] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    project_name: projectName || AVAILABLE_PROJECTS[0],
    unit_type: '2 BHK',
    visit_date: todayStr,
    time_slot: 'Morning (10:00 AM)',
    message: '',
    website_hp: '', // Honeypot anti-spam
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Auto populate project if prop updates
  useEffect(() => {
    if (projectName) {
      setFormData((prev) => ({ ...prev, project_name: projectName }));
    }
  }, [projectName]);

  // Keep formMode synced if prop changes
  useEffect(() => {
    setFormMode(type);
  }, [type]);

  // Capture URL UTM parameters & Browser/Device metadata
  const getMetadata = () => {
    if (typeof window === 'undefined') return {};

    const urlParams = new URLSearchParams(window.location.search);
    const userAgent = navigator.userAgent;

    let device = 'Desktop';
    if (/Mobi|Android|iPhone|iPad/i.test(userAgent)) {
      device = /iPad|Tablet/i.test(userAgent) ? 'Tablet' : 'Mobile';
    }

    return {
      utm_source: urlParams.get('utm_source') || '',
      utm_campaign: urlParams.get('utm_campaign') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_content: urlParams.get('utm_content') || '',
      utm_term: urlParams.get('utm_term') || '',
      referrer: document.referrer || 'Direct',
      browser: userAgent,
      device: device,
      path: window.location.pathname,
    };
  };

  // Validation functions
  const validateField = (name: string, value: string) => {
    let error = '';

    if (name === 'full_name') {
      if (!value.trim()) {
        error = 'Full name is required';
      } else if (value.trim().length < 2) {
        error = 'Name must be at least 2 characters';
      }
    }

    if (name === 'phone') {
      const cleanPhone = value.replace(/[\s\-\+\(\)]/g, '');
      const digitsOnly = cleanPhone.startsWith('91') && cleanPhone.length === 12
        ? cleanPhone.slice(2)
        : cleanPhone;

      if (!value.trim()) {
        error = 'Phone number is required';
      } else if (!/^[6-9]\d{9}$/.test(digitsOnly)) {
        error = 'Please enter a valid 10-digit Indian mobile number';
      }
    }

    if (name === 'email') {
      if (!value.trim()) {
        error = 'Email address is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        error = 'Please enter a valid email address';
      }
    }

    if (name === 'visit_date' && formMode === 'site-visit') {
      if (!value) {
        error = 'Preferred visit date is required';
      } else if (value < todayStr) {
        error = 'Visit date cannot be in the past';
      }
    }

    return error;
  };

  const validateAll = () => {
    const newErrors: Record<string, string> = {};

    const nameErr = validateField('full_name', formData.full_name);
    if (nameErr) newErrors.full_name = nameErr;

    const phoneErr = validateField('phone', formData.phone);
    if (phoneErr) newErrors.phone = phoneErr;

    const emailErr = validateField('email', formData.email);
    if (emailErr) newErrors.email = emailErr;

    if (formMode === 'site-visit') {
      const dateErr = validateField('visit_date', formData.visit_date);
      if (dateErr) newErrors.visit_date = dateErr;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const fieldErr = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: fieldErr }));
    }
  };

  const handleBlur = (field: string) => {
    setFocused(null);
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldErr = validateField(field, (formData as any)[field] || '');
    setErrors((prev) => ({ ...prev, [field]: fieldErr }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Mark all as touched
    setTouched({
      full_name: true,
      phone: true,
      email: true,
      visit_date: true,
    });

    if (!validateAll()) {
      return;
    }

    setLoading(true);

    try {
      const metadata = getMetadata();
      const payload = {
        ...formData,
        form_type: formMode,
        source_page: sourcePage,
        timestamp: new Date().toISOString(),
        ...metadata,
      };

      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Submission failed. Please try again.');
      }

      setSubmitted(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      console.error('Form submission error:', err);
      setServerError(err.message || 'Something went wrong. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      full_name: '',
      phone: '',
      email: '',
      project_name: projectName || AVAILABLE_PROJECTS[0],
      unit_type: '2 BHK',
      visit_date: todayStr,
      time_slot: 'Morning (10:00 AM)',
      message: '',
      website_hp: '',
    });
    setErrors({});
    setTouched({});
    setServerError(null);
  };

  // Shared Floating Input Styling
  const getInputWrapperClass = (name: string) => `
    relative w-full transition-all duration-300
    ${errors[name] && touched[name] ? 'mb-1' : 'mb-0'}
  `;

  const inputClass = (name: string) => `
    w-full bg-transparent border-b-2 pl-0 pt-4 pb-1.5 text-black dark:text-white text-sm md:text-base font-medium
    placeholder-transparent outline-none transition-all duration-300 peer rounded-none
    ${
      errors[name] && touched[name]
        ? 'border-red-500 dark:border-red-400'
        : focused === name || (formData as any)[name]
        ? 'border-[#6CAFBF]'
        : 'border-black/15 dark:border-white/15 hover:border-black/30 dark:hover:border-white/30'
    }
  `;

  const labelClass = (name: string) => `
    absolute left-0 text-black/40 dark:text-white/40 font-medium tracking-wide transition-all duration-300 pointer-events-none
    ${
      focused === name || (formData as any)[name]
        ? 'top-0 text-[10px] text-[#6CAFBF] font-bold tracking-[0.15em] uppercase'
        : 'top-4 text-xs md:text-sm'
    }
    ${errors[name] && touched[name] ? 'text-red-500 dark:text-red-400' : ''}
  `;

  return (
    <div className={`w-full max-w-4xl mx-auto text-black dark:text-white ${className}`}>
      {/* Optional Custom Header */}
      {title && (
        <div className="mb-6 text-left space-y-2">
          <span className="text-[#6CAFBF] text-xs font-bold tracking-[0.3em] uppercase block">
            {formMode === 'site-visit' ? 'VIP Booking Portal' : 'Direct Enquiry'}
          </span>
          <h3 className="text-2xl md:text-3xl font-[magtis] uppercase font-extrabold tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-black/60 dark:text-white/60 text-xs md:text-sm font-medium">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Optional Form Mode Tabs (Only when showTabs is explicitly true) */}
      {showTabs && !title && (
        <div className="flex items-center gap-3 mb-8 border-b border-black/10 dark:border-white/10 pb-4">
          <button
            type="button"
            onClick={() => setFormMode('site-visit')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
              formMode === 'site-visit'
                ? 'bg-[#6CAFBF] text-black shadow-md scale-[1.02]'
                : 'bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
            }`}
          >
            Schedule Visit
          </button>
          <button
            type="button"
            onClick={() => setFormMode('general-enquiry')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
              formMode === 'general-enquiry'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-md scale-[1.02]'
                : 'bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
            }`}
          >
            Quick Inquiry
          </button>
        </div>
      )}

      {/* SUCCESS STATE */}
      {submitted ? (
        <div className="bg-black/5 dark:bg-white/5 border border-[#6CAFBF]/30 p-8 md:p-10 rounded-sm text-center space-y-6 animate-in fade-in zoom-in duration-500">
          <div className="w-16 h-16 rounded-full bg-[#6CAFBF]/20 text-[#6CAFBF] mx-auto flex items-center justify-center">
            <CheckCircle2 size={38} className="animate-bounce" />
          </div>

          <div className="space-y-2">
            <h4 className="font-[magtis] text-2xl font-extrabold uppercase tracking-tight text-black dark:text-white">
              Booking Request Confirmed
            </h4>
            <p className="text-black/70 dark:text-white/70 text-sm md:text-base font-medium leading-relaxed max-w-md mx-auto">
              Thank you, <span className="font-bold text-black dark:text-white">{formData.full_name}</span>. Our Senior Relationship Manager will contact you shortly to confirm your site visit details.
            </p>
          </div>

          <div className="bg-white dark:bg-[#141414] p-4 rounded-sm border border-black/10 dark:border-white/10 text-left text-xs space-y-2 max-w-md mx-auto">
            <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-2">
              <span className="text-black/50 dark:text-white/50 uppercase font-bold">Project:</span>
              <span className="font-bold text-[#6CAFBF]">{formData.project_name}</span>
            </div>
            {formMode === 'site-visit' && (
              <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-2">
                <span className="text-black/50 dark:text-white/50 uppercase font-bold">Date & Time:</span>
                <span className="font-bold text-black dark:text-white">{formData.visit_date} ({formData.time_slot})</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-black/50 dark:text-white/50 uppercase font-bold">Unit Preference:</span>
              <span className="font-bold text-black dark:text-white">{formData.unit_type}</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 bg-[#6CAFBF] text-black font-bold text-xs tracking-widest uppercase rounded-full hover:bg-white transition-all shadow-md"
            >
              Book Another Visit
            </button>
          </div>
        </div>
      ) : (
        /* FORM STATE */
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Honeypot field - anti spam */}
          <input
            type="text"
            name="website_hp"
            value={formData.website_hp}
            onChange={handleChange}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          {serverError && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-semibold rounded-sm">
              {serverError}
            </div>
          )}

          {/* Row 1: Name, Phone, Email (3-cols on desktop/tablet, 1-col on mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Name */}
            <div className={getInputWrapperClass('full_name')}>
              <div className="relative">
                <input
                  type="text"
                  name="full_name"
                  id={`name-${formId}`}
                  autoComplete="name"
                  required
                  value={formData.full_name}
                  onChange={handleChange}
                  onFocus={() => setFocused('full_name')}
                  onBlur={() => handleBlur('full_name')}
                  placeholder=""
                  className={inputClass('full_name')}
                />
                <label htmlFor={`name-${formId}`} className={labelClass('full_name')}>
                  Full Name *
                </label>
              </div>
              {errors.full_name && touched.full_name && (
                <p className="text-[11px] text-red-500 dark:text-red-400 mt-1 font-medium">
                  {errors.full_name}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className={getInputWrapperClass('phone')}>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  id={`phone-${formId}`}
                  autoComplete="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocused('phone')}
                  onBlur={() => handleBlur('phone')}
                  placeholder=""
                  className={inputClass('phone')}
                />
                <label htmlFor={`phone-${formId}`} className={labelClass('phone')}>
                  Phone Number *
                </label>
              </div>
              {errors.phone && touched.phone && (
                <p className="text-[11px] text-red-500 dark:text-red-400 mt-1 font-medium">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Email */}
            <div className={getInputWrapperClass('email')}>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id={`email-${formId}`}
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => handleBlur('email')}
                  placeholder=""
                  className={inputClass('email')}
                />
                <label htmlFor={`email-${formId}`} className={labelClass('email')}>
                  Email Address *
                </label>
              </div>
              {errors.email && touched.email && (
                <p className="text-[11px] text-red-500 dark:text-red-400 mt-1 font-medium">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Project Select & Date Input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Project Select */}
            <div className="relative w-full">
              <select
                name="project_name"
                id={`project-${formId}`}
                disabled={autoFilled}
                value={formData.project_name}
                onChange={handleChange}
                onFocus={() => setFocused('project_name')}
                onBlur={() => handleBlur('project_name')}
                className={`w-full bg-transparent border-b-2 pt-4 pb-1.5 text-black dark:text-white text-sm md:text-base font-medium outline-none transition-all duration-300 cursor-pointer ${
                  autoFilled ? 'opacity-80 cursor-not-allowed border-[#6CAFBF]' : 'border-black/15 dark:border-white/15 hover:border-black/30 dark:hover:border-white/30'
                }`}
                style={{ WebkitAppearance: 'none', background: 'transparent' }}
              >
                {AVAILABLE_PROJECTS.map((proj) => (
                  <option key={proj} value={proj} className="text-black bg-white dark:bg-[#1a1a1a] dark:text-white">
                    {proj}
                  </option>
                ))}
              </select>
              <label htmlFor={`project-${formId}`} className="absolute left-0 top-0 text-[10px] text-[#6CAFBF] font-bold tracking-[0.15em] uppercase pointer-events-none">
                Interested Project {autoFilled && '(Selected)'}
              </label>
            </div>

            {/* Visit Date */}
            {formMode === 'site-visit' && (
              <div className={getInputWrapperClass('visit_date')}>
                <div className="relative">
                  <input
                    type="date"
                    name="visit_date"
                    id={`date-${formId}`}
                    min={todayStr}
                    required
                    value={formData.visit_date}
                    onChange={handleChange}
                    onFocus={() => setFocused('visit_date')}
                    onBlur={() => handleBlur('visit_date')}
                    className={`w-full bg-transparent border-b-2 pl-0 pt-4 pb-1.5 text-black dark:text-white text-sm md:text-base font-medium outline-none transition-all duration-300 ${
                      errors.visit_date && touched.visit_date
                        ? 'border-red-500 dark:border-red-400'
                        : 'border-black/15 dark:border-white/15 hover:border-black/30 dark:hover:border-white/30'
                    }`}
                  />
                  <label htmlFor={`date-${formId}`} className="absolute left-0 top-0 text-[10px] text-[#6CAFBF] font-bold tracking-[0.15em] uppercase pointer-events-none">
                    Preferred Visit Date *
                  </label>
                </div>
                {errors.visit_date && touched.visit_date && (
                  <p className="text-[11px] text-red-500 dark:text-red-400 mt-1 font-medium">
                    {errors.visit_date}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Row 3: Unit Configuration (Left) & Time Slot (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start pt-1">
            {/* Interested Unit Type */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-black/50 dark:text-white/50 tracking-widest uppercase block">
                Interested Unit Configuration
              </span>
              <div className="flex flex-wrap gap-2">
                {UNIT_TYPES.map((unit) => {
                  const active = formData.unit_type === unit;
                  return (
                    <button
                      key={unit}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, unit_type: unit }))}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase transition-all duration-300 border ${
                        active
                          ? 'bg-[#6CAFBF] text-black border-[#6CAFBF] shadow-sm scale-105'
                          : 'bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70 border-black/10 dark:border-white/10 hover:border-[#6CAFBF]'
                      }`}
                    >
                      {unit}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slots */}
            {formMode === 'site-visit' && (
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-black/50 dark:text-white/50 tracking-widest uppercase block">
                  Preferred Time Slot
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const active = formData.time_slot === slot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, time_slot: slot.id }))}
                        className={`px-2.5 py-1.5 rounded-sm text-[11px] font-bold text-center uppercase transition-all duration-300 border ${
                          active
                            ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-sm'
                            : 'bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70 border-black/10 dark:border-white/10 hover:border-black/30'
                        }`}
                      >
                        {slot.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Row 4: Optional Message / Notes */}
          <div className="relative pt-2">
            <input
              type="text"
              name="message"
              id={`msg-${formId}`}
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocused('message')}
              onBlur={() => setFocused(null)}
              placeholder=""
              className="w-full bg-transparent border-b-2 border-black/15 dark:border-white/15 focus:border-[#6CAFBF] pt-4 pb-1.5 text-black dark:text-white text-sm outline-none transition-all duration-300 peer"
            />
            <label
              htmlFor={`msg-${formId}`}
              className={`absolute left-0 text-black/40 dark:text-white/40 font-medium tracking-wide transition-all duration-300 pointer-events-none ${
                focused === 'message' || formData.message
                  ? 'top-0 text-[10px] text-[#6CAFBF] font-bold tracking-[0.15em] uppercase'
                  : 'top-4 text-xs md:text-sm'
              }`}
            >
              Additional Notes (Optional)
            </label>
          </div>

          {/* Row 5: SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full relative group overflow-hidden bg-[#6CAFBF] hover:bg-[#7AB6C7] text-black font-extrabold text-xs md:text-sm tracking-[0.2em] uppercase py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin text-black" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Confirm Site Visit Booking</span>
                <ArrowRight size={16} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </>
            )}
          </button>

          <p className="text-[10px] text-center text-black/40 dark:text-white/40 uppercase tracking-widest font-mono pt-1">
            🔒 100% Secure & Confidential • Privacy Assured
          </p>
        </form>
      )}
    </div>
  );
}
