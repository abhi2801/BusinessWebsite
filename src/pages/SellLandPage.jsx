import React from 'react';
import { PlusCircle, ShieldCheck, CheckCircle2, ArrowRight, Trees, Building2, Crown, Home } from 'lucide-react';
import { StudioSplitView } from '../components/explorer/StudioSplitView';

export const SellLandPage = ({ onOpenSellerModal, onBookNow, onSendInquiry, onViewDetails }) => {
  return (
    <div className="space-y-6">
      {/* Top Seller Promotion Banner */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 pt-6">
        <div className="bg-gradient-to-r from-navy-900 via-navy-900 to-navy-800 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-slate-700 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
              Direct Owner Portal • 0% Broker Commission
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Sell Your Land or Property in Odisha
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              List your residential Gharabari plot, commercial land, flat, villa, or independent house on Jami Dunia. Our administrator desk verifies ROR Patta documents and connects you directly with serious buyers across India.
            </p>
            
            {/* Quick Category Sell Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-slate-400 font-bold mr-1">Direct Listing Options:</span>
              <button
                onClick={() => onOpenSellerModal('land')}
                className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition flex items-center gap-1.5"
              >
                <Trees className="w-3.5 h-3.5" />
                <span>+ Sell Land / Plot</span>
              </button>
              <button
                onClick={() => onOpenSellerModal('apartment')}
                className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition flex items-center gap-1.5"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>+ Sell Apartment</span>
              </button>
              <button
                onClick={() => onOpenSellerModal('villa')}
                className="px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 text-xs font-bold transition flex items-center gap-1.5"
              >
                <Crown className="w-3.5 h-3.5" />
                <span>+ Sell Villa</span>
              </button>
              <button
                onClick={() => onOpenSellerModal('house')}
                className="px-3 py-1.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 text-blue-300 text-xs font-bold transition flex items-center gap-1.5"
              >
                <Home className="w-3.5 h-3.5" />
                <span>+ Sell House</span>
              </button>
            </div>
          </div>

          <div className="shrink-0 w-full lg:w-auto">
            <button
              onClick={() => onOpenSellerModal('land')}
              className="w-full lg:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-5 h-5" />
              <span>List Your Property for Free</span>
            </button>
          </div>
        </div>
      </div>

      {/* Explorer with properties */}
      <StudioSplitView
        initialCategory="all"
        title="Verified Properties for Sale in Odisha"
        subtitle="Browse verified land plots, apartments, villas and houses listed by verified owners on Jami Dunia"
        onBookNow={onBookNow}
        onSendInquiry={onSendInquiry}
        onViewDetails={onViewDetails}
      />
    </div>
  );
};
