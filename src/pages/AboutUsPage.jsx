import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Compass, 
  Users, 
  Award, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Trees,
  Check
} from 'lucide-react';

export const AboutUsPage = ({ setActivePage }) => {
  return (
    <div className="py-12 space-y-16">
      
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-navy-900 rounded-3xl text-white p-8 sm:p-14 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
              About Jami Dunia
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Odisha's Most Trusted Digital Real Estate & Land Demarcation Ecosystem
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Founded to eliminate boundary conflicts, opaque pricing markups, and unverified land records. Jami Dunia unites certified revenue surveyors, legal due diligence specialists, and direct buyers across Odisha.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-navy-900">Zero Unverified Titles</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every land plot on Jami Dunia undergoes physical mutation checks, Bhulekh Odisha verification, and title search for encumbrance clearance.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-navy-900">Scientific Land Demarcation</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Equipped with high-precision electronic Total Station instruments and DGPS receivers, our surveyors guarantee exact boundary pin accuracy.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-navy-900">Transparent Pricing Formulas</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Clear automated formulas: Total Price = Area (sq.ft) × Rate (₹/sq.ft). Fixed legal verification fees with no hidden agent percentage commissions.
            </p>
          </div>
        </div>
      </div>

      {/* Odisha Network Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200/90 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              Statewide Coverage
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-900">
              Surveyors & Inspection Units in Major Odisha Corridors
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Headquartered at Infocity Patia, Bhubaneswar, our field teams operate across Khordha (Bhubaneswar), Cuttack, and Puri to coordinate rapid 48-hour on-site property visits.
            </p>
            <div className="space-y-2 pt-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Licensed Revenue Inspectors with over 15+ years Tehsil experience</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Official Mouza sheets, Chakbandi records, and Sabik-Hal conversion maps</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Fast online token reservation with full INR payment safety via Razorpay</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-navy-900 uppercase tracking-wider">Corporate Leadership</h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="font-bold text-navy-900">Er. Subhash Chandra Mohapatra</p>
                <p className="text-slate-500 text-[11px]">Chief Revenue Surveyor (Former Odisha Revenue Service)</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="font-bold text-navy-900">Adv. Manas Ranjan Routray</p>
                <p className="text-slate-500 text-[11px]">Head of Legal Due Diligence & Sub-Registrar Advisory</p>
              </div>
            </div>
            <button
              onClick={() => setActivePage('demarcation')}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition"
            >
              Book Land Demarcation Now
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
