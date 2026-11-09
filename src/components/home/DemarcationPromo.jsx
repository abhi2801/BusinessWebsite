import React from 'react';
import { 
  Compass, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Crosshair,
  FileText,
  Clock
} from 'lucide-react';

export const DemarcationPromo = ({ onBookDemarcation }) => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-emerald-900 via-navy-900 to-navy-900 text-white relative overflow-hidden">
      {/* Background illustration */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Crosshair className="w-3.5 h-3.5" />
              <span>Certified Revenue Survey & Demarcation</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Avoid Boundary Disputes. <br />
              <span className="text-emerald-400">Measure Your Plot with Precision.</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Our licensed revenue surveyors visit your land in Odisha equipped with electronic Total Station & DGPS equipment. We match your official Tehsil Mouza Map & Khata Patta to fix concrete boundary pillars.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Electronic Total Station Survey</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Tehsil Mouza Map Matching</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>RCC Concrete Boundary Pillars</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Geo-Tagged Survey Certificate</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onBookDemarcation}
                className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm rounded-2xl shadow-lg hover:shadow-emerald-500/25 transition flex items-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>Book Demarcation (From ₹4,999)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Surveyor on-site in 48-72 Hours</span>
              </div>
            </div>
          </div>

          {/* Right Preview Card */}
          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl text-slate-100 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <span className="text-xs uppercase font-bold text-emerald-400">Odisha Revenue Standard</span>
                  <h4 className="text-lg font-bold text-white">Residential Demarcation</h4>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-white">₹4,999</span>
                  <span className="block text-[10px] text-slate-300">All Inclusive</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span>Coverage:</span>
                  <span className="font-semibold text-white">Up to 3,000 sq.ft (~3 Gunthas)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Districts Covered:</span>
                  <span className="font-semibold text-white">Khordha, Cuttack, Puri & more</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Deliverables:</span>
                  <span className="font-semibold text-emerald-300">CAD Map + Pillars + PDF Report</span>
                </div>
              </div>

              <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-[11px] text-slate-300 font-mono">
                Sample Reference: LD-OD-2026-8492
              </div>

              <button
                onClick={onBookDemarcation}
                className="w-full py-3 bg-white text-navy-900 hover:bg-slate-100 font-extrabold text-xs rounded-xl transition text-center shadow"
              >
                Fill Demarcation Booking Form
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
