'use client';

import React, { useState, useId } from 'react';

interface EmiCalculatorProps {
  defaultPrice?: number;
  projectName?: string;
}

const BANK_PARTNERS = [
  { name: 'SBI', rate: 8.4 },
  { name: 'HDFC BANK', rate: 8.5 },
  { name: 'ICICI BANK', rate: 8.55 },
  { name: 'AXIS BANK', rate: 8.6 },
];

const TENURE_PRESETS = [10, 15, 20, 25, 30];

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
  const [selectedBank, setSelectedBank] = useState<string | null>('HDFC BANK');
  const [showTaxBreakdown, setShowTaxBreakdown] = useState<boolean>(false);

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
  const totalInterestPayable = Math.max(0, totalAmountPayable - loanAmount);

  // Split Percentages for Visual Progress Bar
  const principalPercent =
    totalAmountPayable > 0
      ? Math.min(100, Math.max(0, Math.round((loanAmount / totalAmountPayable) * 100)))
      : 50;
  const interestPercent = 100 - principalPercent;

  // Estimated Tax Savings (Sec 24b max 2L on interest, Sec 80C max 1.5L on principal)
  const annualInterest = Math.min(200000, Math.round(totalInterestPayable / tenureYears));
  const totalTaxSavingYearly = annualInterest + 150000;

  const formatCurrency = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakh`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  };

  const handleBankSelect = (bankName: string, rate: number) => {
    setSelectedBank(bankName);
    setInterestRate(rate);
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
          Estimate your monthly investment for <span className="font-bold text-black dark:text-white">{projectName}</span> with interactive pre-approved banking partner rates.
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
              step={0.05}
              value={interestRate}
              onChange={(e) => {
                setInterestRate(Number(e.target.value));
                setSelectedBank(null);
              }}
              className="w-full accent-[#6CAFBF] cursor-pointer"
            />
          </div>

          {/* Loan Tenure (Years) & Preset Chips */}
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

            {/* Quick Tenure Presets */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] font-bold uppercase text-black/40 dark:text-white/40 tracking-wider">Quick Tenure:</span>
              <div className="flex flex-wrap gap-1.5">
                {TENURE_PRESETS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTenureYears(t)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all border ${
                      tenureYears === t
                        ? 'bg-[#6CAFBF] text-black border-[#6CAFBF] shadow-sm'
                        : 'bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70 border-black/10 dark:border-white/10 hover:border-[#6CAFBF]'
                    }`}
                  >
                    {t} Yrs
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Pre-Approved Bank Partner Rates Selector */}
          <div className="pt-4 border-t border-black/10 dark:border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">
              <span>Select Pre-Approved Bank Partner Rate:</span>
              <span className="text-[10px] text-[#6CAFBF] font-mono">⚡ Click to Apply Rate</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {BANK_PARTNERS.map((bank) => {
                const isSelected = selectedBank === bank.name || interestRate === bank.rate;
                return (
                  <button
                    key={bank.name}
                    type="button"
                    onClick={() => handleBankSelect(bank.name, bank.rate)}
                    className={`px-3 py-2.5 rounded-sm text-xs font-bold text-center uppercase transition-all duration-300 border flex flex-col items-center justify-center gap-0.5 ${
                      isSelected
                        ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-md scale-[1.02]'
                        : 'bg-black/5 dark:bg-white/5 text-black/80 dark:text-white/80 border-black/10 dark:border-white/10 hover:border-[#6CAFBF]'
                    }`}
                  >
                    <span className="font-extrabold tracking-wider">{bank.name}</span>
                    <span className={`text-[11px] font-mono ${isSelected ? 'text-[#6CAFBF]' : 'text-black/50 dark:text-white/50'}`}>
                      {bank.rate}% p.a.
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results & Interactive Engagement Card (5 cols) */}
        <div className="lg:col-span-5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 md:p-8 rounded-sm flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-black/40 dark:text-white/40 block mb-1">
                Estimated Monthly EMI
              </span>
              <div className="font-[magtis] text-4xl md:text-5xl font-extrabold text-[#6CAFBF]">
                ₹{monthlyEmi.toLocaleString('en-IN')}<span className="text-xs font-sans text-black/50 dark:text-white/50">/month</span>
              </div>
            </div>

            {/* Interactive Visual Payment Split Bar (Principal vs Interest) */}
            <div className="space-y-2 pt-2 border-t border-black/10 dark:border-white/10">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-black/70 dark:text-white/70 uppercase tracking-wider">Payment Breakdown</span>
                <span className="text-[#6CAFBF] font-mono text-[11px]">{principalPercent}% Principal • {interestPercent}% Interest</span>
              </div>
              {/* Segmented Dual Bar */}
              <div className="w-full h-3 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden flex shadow-inner">
                <div
                  style={{ width: `${principalPercent}%` }}
                  className="h-full bg-[#6CAFBF] transition-all duration-500"
                  title={`Principal: ${principalPercent}%`}
                />
                <div
                  style={{ width: `${interestPercent}%` }}
                  className="h-full bg-slate-700 dark:bg-slate-400 transition-all duration-500 opacity-80"
                  title={`Interest: ${interestPercent}%`}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold text-black/50 dark:text-white/50 pt-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#6CAFBF]" />
                  <span>Principal: {formatCurrency(loanAmount)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-700 dark:bg-slate-400 opacity-80" />
                  <span>Interest: {formatCurrency(totalInterestPayable)}</span>
                </div>
              </div>
            </div>

            {/* Loan Details List */}
            <div className="space-y-2.5 pt-3 border-t border-black/10 dark:border-white/10 text-xs">
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

          {/* Interactive Tax Savings & Financial Benefits Card (Replaces the 2 CTA buttons) */}
          <div className="pt-2">
            <div className="bg-white dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-sm p-4 space-y-3 transition-all duration-300 hover:border-[#6CAFBF]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">💡</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                    Estimated Tax Savings
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowTaxBreakdown(!showTaxBreakdown)}
                  className="text-[10px] font-bold text-[#6CAFBF] uppercase tracking-widest hover:underline"
                >
                  {showTaxBreakdown ? 'Hide Info ▲' : 'View Details ▼'}
                </button>
              </div>

              <div className="text-xs font-semibold text-black/80 dark:text-white/80 leading-relaxed">
                Save up to <span className="font-extrabold text-[#6CAFBF]">{formatCurrency(totalTaxSavingYearly)}</span>/yr on income tax under Sec 24(b) & 80C.
              </div>

              {showTaxBreakdown && (
                <div className="pt-2.5 border-t border-black/10 dark:border-white/10 space-y-2 text-[11px] animate-in fade-in duration-300">
                  <div className="flex justify-between">
                    <span className="text-black/60 dark:text-white/60">Sec 24(b) Interest Deduction</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">Up to ₹2,00,000 / yr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/60 dark:text-white/60">Sec 80C Principal Deduction</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">Up to ₹1,50,000 / yr</span>
                  </div>
                  <p className="text-[10px] text-black/40 dark:text-white/40 italic pt-1">
                    *Applicable under the Old Tax Regime for self-occupied residential property.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

