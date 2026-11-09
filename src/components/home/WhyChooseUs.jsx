import React from 'react';
import { 
  ShieldCheck, 
  Calculator, 
  Compass, 
  CheckCircle2, 
  FileSearch, 
  Award,
  Zap,
  Users
} from 'lucide-react';

export const WhyChooseUs = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      iconBg: 'bg-emerald-50 text-emerald-600',
      title: '100% Stitiban ROR Legal Clearance',
      description: 'Every property goes through revenue khata search, encumbrance check, and mutation verification before public listing.'
    },
    {
      icon: Calculator,
      iconBg: 'bg-blue-50 text-blue-600',
      title: 'Automated Transparent Calculations',
      description: 'Zero hidden agent fees. Exact formula: Area (sq.ft) × Rate (₹/sq.ft) = Total Price, with token advance clearly defined.'
    },
    {
      icon: Compass,
      iconBg: 'bg-amber-50 text-amber-600',
      title: 'Licensed Revenue Demarcation',
      description: 'In-house certified surveyors with electronic Total Station equipment for precise boundary marking and RCC pillars.'
    },
    {
      icon: Zap,
      iconBg: 'bg-purple-50 text-purple-600',
      title: 'Instant Online Priority Token',
      description: 'Secure any property for 15 days via Razorpay INR gateway while legal due diligence and site visits are scheduled.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200">
            Odisha Real Estate Trust Standard
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-navy-900 mt-2 tracking-tight">
            Why Buy & Sell Through Jami Dunia?
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Eliminating boundary disputes, hidden brokerage markups, and unclear title deeds with modern technology and legal integrity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-50/70 rounded-3xl p-6 border border-slate-200/80 hover:bg-white hover:shadow-xl hover:border-slate-300 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${pillar.iconBg} mb-5 shadow-inner`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-navy-900 mb-2 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats counter strip */}
        <div className="mt-14 p-6 sm:p-8 bg-navy-900 rounded-3xl text-white grid grid-cols-2 lg:grid-cols-4 gap-6 text-center border border-slate-800">
          <div>
            <span className="text-3xl sm:text-4xl font-black text-emerald-400">100%</span>
            <p className="text-xs text-slate-300 mt-1 uppercase font-semibold tracking-wider">ROR Verified Titles</p>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-black text-white">450+</span>
            <p className="text-xs text-slate-300 mt-1 uppercase font-semibold tracking-wider">Plots Demarcated</p>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-black text-emerald-400">₹85 Cr+</span>
            <p className="text-xs text-slate-300 mt-1 uppercase font-semibold tracking-wider">Transactions Handled</p>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-black text-white">0</span>
            <p className="text-xs text-slate-300 mt-1 uppercase font-semibold tracking-wider">Legal Disputes</p>
          </div>
        </div>

      </div>
    </section>
  );
};
