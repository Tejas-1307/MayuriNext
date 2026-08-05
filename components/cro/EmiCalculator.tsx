'use client';

import React, { useState, useId } from 'react';
import ScheduleSiteVisit from '@/components/projects/ScheduleSiteVisit';

interface EmiCalculatorProps {
  defaultPrice?: number;
  projectName?: string;
}

export default function EmiCalculator({
  defaultPrice = 8500000,
  projectName = 'Mayuri Adhinathpuram',
}: EmiCalculatorProps) {
  const propertyPriceId = useId();
  const downPaymentId = useId();
  const interestRateId = useId();
  const loanTenureId = useId();

  const [propertyPrice, setPropertyPrice] = useState<number>(defaultPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Math calculation
  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPaymentAmount;
  const monthlyInterestRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  const monthlyEmi =
    monthlyInterestRate > 0
      ? Math.round(
          (loanAmount *
            monthlyInterestRate *
            Math.pow(1 + monthlyInterestRate, totalMonths)) /
            (Math.pow(1 + monthlyInterestRate, totalMonths) - 1)
        )
      : Math.round(loanAmount / totalMonths);

  const totalAmountPayable = monthlyEmi * totalMonths;
  const totalInterestPayable = totalAmountPayable - loanAmount;

  const formatCurrency = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakh`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <section className="w-full bg-[#F5F5F0] dark:bg-[#0E0E0E] text-black dark:text-white py-[10vh] px-4 md:px-[6vw] border-t border-black/10 dark:border-white/10 select-none">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-[6vh]">
        <div>
          <span className="text-[#6CAFBF] text-xs font-bold tracking-[0.3em] uppercase block mb-2">
            Smart Financial Planner
          </span>
          <h2 className="font-[magtis] text-3xl md:text-5xl uppercase font-extrabold tracking-tight">
            Home Loan <span className="text-[#6CAFBF]">EMI Calculator</span>
          </h2>
        </div>
        <p className="text-black/60 dark:text-white/60 text-sm md:text-base font-medium max-w-md leading-relaxed">
          Estimate your monthly investment for <span className="font-bold text-black dark:text-white">{projectName}</span> with pre-approved banking partner rates (SBI, HDFC, ICICI, Axis).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white dark:bg-[#141414] border border-black/10 dark:border-white/10 rounded-sm p-6 md:p-10 shadow-2xl">
        {/* Sliders & Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Property Price */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold uppercase">
              <label htmlFor={propertyPriceId} className="text-black/60 dark:text-white/60">Property Price</label>
              <span className="text-[#6CAFBF] font-extrabold text-sm">{formatCurrency(propertyPrice)}</span>
            </div>
            <input
              id={propertyPriceId}
              type="range"
              min={3000000}
              max={30000000}
              step={500000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full accent-[#6CAFBF] cursor-pointer"
            />
          </div>

          {/* Down Payment % */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold uppercase">
              <label htmlFor={downPaymentId} className="text-black/60 dark:text-white/60">
                Down Payment ({downPaymentPercent}%)
              </label>
              <span className="text-black dark:text-white font-extrabold text-sm">
                {formatCurrency(downPaymentAmount)}
              </span>
            </div>
            <input
              id={downPaymentId}
              type="range"
              min={10}
              max={50}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-[#6CAFBF] cursor-pointer"
            />
          </div>

          {/* Interest Rate % */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold uppercase">
              <label htmlFor={interestRateId} className="text-black/60 dark:text-white/60">Interest Rate (% p.a.)</label>
              <span className="text-black dark:text-white font-extrabold text-sm">{interestRate}%</span>
            </div>
            <input
              id={interestRateId}
              type="range"
              min={7.5}
              max={12}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-[#6CAFBF] cursor-pointer"
            />
          </div>

          {/* Loan Tenure (Years) */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold uppercase">
              <label htmlFor={loanTenureId} className="text-black/60 dark:text-white/60">Loan Tenure</label>
              <span className="text-black dark:text-white font-extrabold text-sm">{tenureYears} Years</span>
            </div>
            <input
              id={loanTenureId}
              type="range"
              min={5}
              max={30}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full accent-[#6CAFBF] cursor-pointer"
            />
          </div>

          {/* Bank Partner Logos */}
          <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-black/40 dark:text-white/40 uppercase">
            <span>Pre-Approved Bank Partners:</span>
            <div className="flex items-center gap-4 text-black dark:text-white font-extrabold">
              <span>SBI</span>
              <span>•</span>
              <span>HDFC BANK</span>
              <span>•</span>
              <span>ICICI BANK</span>
              <span>•</span>
              <span>AXIS BANK</span>
            </div>
          </div>
        </div>

        {/* Results Card (5 cols) */}
        <div className="lg:col-span-5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 md:p-8 rounded-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-black/40 dark:text-white/40 block">
              Estimated Monthly EMI
            </span>
            <div className="font-[magtis] text-4xl md:text-5xl font-extrabold text-[#6CAFBF]">
              ₹{monthlyEmi.toLocaleString('en-IN')}<span className="text-xs font-sans text-black/50 dark:text-white/50">/month</span>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-black/10 dark:border-white/10 text-xs">
              <div className="flex justify-between">
                <span className="text-black/60 dark:text-white/60">Loan Amount</span>
                <span className="font-bold text-black dark:text-white">{formatCurrency(loanAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/60 dark:text-white/60">Total Interest Payable</span>
                <span className="font-bold text-black dark:text-white">{formatCurrency(totalInterestPayable)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-black/10 dark:border-white/10 font-bold text-sm">
                <span>Total Amount Payable</span>
                <span className="text-[#6CAFBF]">{formatCurrency(totalAmountPayable)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-3.5 bg-[#6CAFBF] text-black font-bold text-xs tracking-widest uppercase rounded-sm hover:bg-black hover:text-white transition-colors text-center block"
            >
              Speak with Home Loan Advisor
            </button>
            <a
              href="https://wa.me/918237277775?text=Hi%20Mayuri%20Landmarks%2C%20I%20calculated%20my%20EMI%20for%20a%20property%20and%20would%20like%20to%20discuss%20pre-approved%20loan%20offers."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 border border-black/15 dark:border-white/15 text-black dark:text-white font-bold text-xs tracking-widest uppercase rounded-sm hover:border-[#6CAFBF] hover:text-[#6CAFBF] transition-colors text-center block"
            >
              Get WhatsApp Loan Offers
            </a>
          </div>
        </div>
      </div>

      {/* Modal Trigger */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-[#F5F5F0] dark:bg-[#0A0A0A] rounded-md overflow-hidden shadow-2xl my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-50 text-black dark:text-white bg-black/10 dark:bg-white/10 hover:bg-black/20 p-3 rounded-full transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="p-4 md:p-8">
              <ScheduleSiteVisit projectName={projectName} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
