import React from 'react';
import { 
  Building2, 
  PlusCircle, 
  FileText, 
  Scale, 
  ArrowRight,
  Trees,
  Crown,
  Home,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Compass,
  Crosshair,
  Layers,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const CategoryCards = ({ setActivePage, onOpenSellerModal }) => {
  const handleSellClick = (category) => {
    if (onOpenSellerModal) {
      onOpenSellerModal(category);
    } else {
      setActivePage('sell-land');
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-black tracking-wider uppercase shadow-xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Odisha's Premier Real Estate Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-navy-900 tracking-tight leading-tight">
            Explore Our Marketplace Categories
          </h2>
          <p className="text-base sm:text-lg text-slate-500 mt-3 leading-relaxed">
            Verified properties to buy, zero-brokerage listings, official Bhulekh revenue paperwork, and on-site dispute arbitration — tailored exclusively for Odisha.
          </p>
        </div>

        {/* 4 Pillars Grid (2x2 on Desktop, highly responsive) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          
          {/* ========================================================
              CARD 1: LAND BUY (Apartment, Villa, Independent House)
             ======================================================== */}
          <div className="group bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div>
              {/* Card Hero Photography Banner */}
              <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-navy-950">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" 
                  alt="Land Buy in Odisha"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent" />
                
                {/* Floating Top Elements */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg">
                    <Trees className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-md bg-emerald-500/90 text-white border border-emerald-300/40 shadow-sm">
                    Verified Inventory
                  </span>
                </div>

                {/* Bottom Overlay Title on Image */}
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-md">
                    Land Buy
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 font-medium drop-shadow-sm mt-0.5">
                    Plots • Luxury Apartments • Gated Villas • Freehold Houses
                  </p>
                </div>
              </div>

              {/* Card Body Content */}
              <div className="p-6 sm:p-7">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Discover 100% legal ROR-verified residential Gharabari plots, ready flats, luxury duplexes, and independent bungalows across Bhubaneswar, Cuttack & Puri.
                </p>

                {/* Sub-menu options: Land, Apartment, Villa, Independent House */}
                <div className="mt-6 space-y-2.5">
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                    Browse by Property Category:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    
                    {/* Land & Plots */}
                    <button
                      type="button"
                      onClick={() => setActivePage('buy-land')}
                      className="p-3 rounded-2xl border border-slate-200/90 hover:border-emerald-500 bg-slate-50/80 hover:bg-emerald-50/60 text-left transition flex items-center gap-3 cursor-pointer group/sub"
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-100/90 text-emerald-700 flex items-center justify-center shrink-0 group-hover/sub:scale-105 transition-transform">
                        <Trees className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-navy-900 group-hover/sub:text-emerald-700">Land & Plots</p>
                        <p className="text-[10px] text-slate-500 truncate">Residential & Commercial</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover/sub:text-emerald-600 group-hover/sub:translate-x-0.5 transition" />
                    </button>

                    {/* Apartment */}
                    <button
                      type="button"
                      onClick={() => setActivePage('apartments')}
                      className="p-3 rounded-2xl border border-slate-200/90 hover:border-amber-500 bg-slate-50/80 hover:bg-amber-50/60 text-left transition flex items-center gap-3 cursor-pointer group/sub"
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-100/90 text-amber-700 flex items-center justify-center shrink-0 group-hover/sub:scale-105 transition-transform">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-navy-900 group-hover/sub:text-amber-700">Apartments</p>
                        <p className="text-[10px] text-slate-500 truncate">1, 2, 3 & 4 BHK Flats</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover/sub:text-amber-600 group-hover/sub:translate-x-0.5 transition" />
                    </button>

                    {/* Villa */}
                    <button
                      type="button"
                      onClick={() => setActivePage('villas')}
                      className="p-3 rounded-2xl border border-slate-200/90 hover:border-purple-500 bg-slate-50/80 hover:bg-purple-50/60 text-left transition flex items-center gap-3 cursor-pointer group/sub"
                    >
                      <div className="w-10 h-10 rounded-xl bg-purple-100/90 text-purple-700 flex items-center justify-center shrink-0 group-hover/sub:scale-105 transition-transform">
                        <Crown className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-navy-900 group-hover/sub:text-purple-700">Villas</p>
                        <p className="text-[10px] text-slate-500 truncate">Luxury Duplex & Triplex</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover/sub:text-purple-600 group-hover/sub:translate-x-0.5 transition" />
                    </button>

                    {/* Independent House */}
                    <button
                      type="button"
                      onClick={() => setActivePage('houses')}
                      className="p-3 rounded-2xl border border-slate-200/90 hover:border-blue-500 bg-slate-50/80 hover:bg-blue-50/60 text-left transition flex items-center gap-3 cursor-pointer group/sub"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-100/90 text-blue-700 flex items-center justify-center shrink-0 group-hover/sub:scale-105 transition-transform">
                        <Home className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-navy-900 group-hover/sub:text-blue-700">Independent Houses</p>
                        <p className="text-[10px] text-slate-500 truncate">Freehold Homes & Bungalows</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover/sub:text-blue-600 group-hover/sub:translate-x-0.5 transition" />
                    </button>

                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer CTA */}
            <div className="px-6 sm:px-7 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                120+ Verified Listings
              </span>
              <button
                type="button"
                onClick={() => setActivePage('buy-land')}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm hover:shadow transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Browse All Buy</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>


          {/* ========================================================
              CARD 2: LAND SELL (Apartment, Villa, Independent House)
             ======================================================== */}
          <div className="group bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div>
              {/* Card Hero Photography Banner */}
              <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-navy-950">
                <img 
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80" 
                  alt="Sell Land in Odisha"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent" />
                
                {/* Floating Top Elements */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg">
                    <PlusCircle className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-md bg-blue-600/90 text-white border border-blue-300/40 shadow-sm">
                    Zero Brokerage
                  </span>
                </div>

                {/* Bottom Overlay Title on Image */}
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-md">
                    Land Sell
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 font-medium drop-shadow-sm mt-0.5">
                    Direct Owner Listing • Title Screened • Verified Buyers
                  </p>
                </div>
              </div>

              {/* Card Body Content */}
              <div className="p-6 sm:p-7">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  List your land plot, apartment, villa, or independent house directly with legal title verification. Connect directly with serious genuine buyers across Odisha.
                </p>

                {/* Sub-menu options: Sell Land, Sell Apartment, Sell Villa, Sell Independent House */}
                <div className="mt-6 space-y-2.5">
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                    Select Category to List & Sell:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    
                    {/* Sell Land & Plots */}
                    <button
                      type="button"
                      onClick={() => handleSellClick('land')}
                      className="p-3 rounded-2xl border border-slate-200/90 hover:border-emerald-500 bg-slate-50/80 hover:bg-emerald-50/60 text-left transition flex items-center gap-3 cursor-pointer group/sub"
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-100/90 text-emerald-700 flex items-center justify-center shrink-0 group-hover/sub:scale-105 transition-transform">
                        <Trees className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-navy-900 group-hover/sub:text-emerald-700">Sell Land / Plot</p>
                        <p className="text-[10px] text-slate-500 truncate">Gharabari & Layouts</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover/sub:text-emerald-600 group-hover/sub:translate-x-0.5 transition" />
                    </button>

                    {/* Sell Apartment */}
                    <button
                      type="button"
                      onClick={() => handleSellClick('apartment')}
                      className="p-3 rounded-2xl border border-slate-200/90 hover:border-amber-500 bg-slate-50/80 hover:bg-amber-50/60 text-left transition flex items-center gap-3 cursor-pointer group/sub"
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-100/90 text-amber-700 flex items-center justify-center shrink-0 group-hover/sub:scale-105 transition-transform">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-navy-900 group-hover/sub:text-amber-700">Sell Apartment</p>
                        <p className="text-[10px] text-slate-500 truncate">Flats & Penthouses</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover/sub:text-amber-600 group-hover/sub:translate-x-0.5 transition" />
                    </button>

                    {/* Sell Villa */}
                    <button
                      type="button"
                      onClick={() => handleSellClick('villa')}
                      className="p-3 rounded-2xl border border-slate-200/90 hover:border-purple-500 bg-slate-50/80 hover:bg-purple-50/60 text-left transition flex items-center gap-3 cursor-pointer group/sub"
                    >
                      <div className="w-10 h-10 rounded-xl bg-purple-100/90 text-purple-700 flex items-center justify-center shrink-0 group-hover/sub:scale-105 transition-transform">
                        <Crown className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-navy-900 group-hover/sub:text-purple-700">Sell Villa</p>
                        <p className="text-[10px] text-slate-500 truncate">Reach Premium Buyers</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover/sub:text-purple-600 group-hover/sub:translate-x-0.5 transition" />
                    </button>

                    {/* Sell Independent House */}
                    <button
                      type="button"
                      onClick={() => handleSellClick('house')}
                      className="p-3 rounded-2xl border border-slate-200/90 hover:border-blue-500 bg-slate-50/80 hover:bg-blue-50/60 text-left transition flex items-center gap-3 cursor-pointer group/sub"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-100/90 text-blue-700 flex items-center justify-center shrink-0 group-hover/sub:scale-105 transition-transform">
                        <Home className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-navy-900 group-hover/sub:text-blue-700">Sell House</p>
                        <p className="text-[10px] text-slate-500 truncate">Freehold Bungalows</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover/sub:text-blue-600 group-hover/sub:translate-x-0.5 transition" />
                    </button>

                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer CTA */}
            <div className="px-6 sm:px-7 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Verified Buyers Waiting
              </span>
              <button
                type="button"
                onClick={() => handleSellClick('land')}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-sm hover:shadow transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>List for Free</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>


          {/* ========================================================
              CARD 3: LAND PAPER WORK
             ======================================================== */}
          <div className="group bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div>
              {/* Card Hero Photography Banner */}
              <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-navy-950">
                <img 
                  src="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80" 
                  alt="Land Paper Work Legal Odisha"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent" />
                
                {/* Floating Top Elements */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg">
                    <FileText className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-md bg-amber-600/90 text-white border border-amber-300/40 shadow-sm">
                    Revenue Legal Clearance
                  </span>
                </div>

                {/* Bottom Overlay Title on Image */}
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-md">
                    Land Paper Work
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 font-medium drop-shadow-sm mt-0.5">
                    Bhulekh ROR • Mutation • Sub-Registrar Deeds • 30-Yr EC
                  </p>
                </div>
              </div>

              {/* Card Body Content */}
              <div className="p-6 sm:p-7">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Complete Odisha revenue documentation and legal assistance. Certified Bhulekh ROR check, Tahasil mutation, bilingual sale deeds, and 30-year non-encumbrance reports.
                </p>

                {/* 4 Paperwork Services */}
                <div className="mt-6 space-y-2.5">
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                    Documentation & Legal Services:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    
                    {/* ROR Patta Verification */}
                    <button
                      type="button"
                      onClick={() => setActivePage('land-paper-work')}
                      className="p-3 rounded-2xl border border-slate-200/90 hover:border-amber-500 bg-slate-50/80 hover:bg-amber-50/60 text-left transition flex items-center gap-3 cursor-pointer group/sub"
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-100/90 text-amber-700 flex items-center justify-center shrink-0 group-hover/sub:scale-105 transition-transform">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-navy-900 group-hover/sub:text-amber-700">ROR / Patta Check</p>
                        <p className="text-[10px] text-slate-500 truncate">Bhulekh Khatiyan Validation</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover/sub:text-amber-600 group-hover/sub:translate-x-0.5 transition" />
                    </button>

                    {/* Mutation & e-Pauchar */}
                    <button
                      type="button"
                      onClick={() => setActivePage('land-paper-work')}
                      className="p-3 rounded-2xl border border-slate-200/90 hover:border-blue-500 bg-slate-50/80 hover:bg-blue-50/60 text-left transition flex items-center gap-3 cursor-pointer group/sub"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-100/90 text-blue-700 flex items-center justify-center shrink-0 group-hover/sub:scale-105 transition-transform">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-navy-900 group-hover/sub:text-blue-700">Mutation (Namajari)</p>
                        <p className="text-[10px] text-slate-500 truncate">Tahasil e-Pauchar Receipt</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover/sub:text-blue-600 group-hover/sub:translate-x-0.5 transition" />
                    </button>

                    {/* Sale Deed Drafting */}
                    <button
                      type="button"
                      onClick={() => setActivePage('land-paper-work')}
                      className="p-3 rounded-2xl border border-slate-200/90 hover:border-purple-500 bg-slate-50/80 hover:bg-purple-50/60 text-left transition flex items-center gap-3 cursor-pointer group/sub"
                    >
                      <div className="w-10 h-10 rounded-xl bg-purple-100/90 text-purple-700 flex items-center justify-center shrink-0 group-hover/sub:scale-105 transition-transform">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-navy-900 group-hover/sub:text-purple-700">Deed Registration</p>
                        <p className="text-[10px] text-slate-500 truncate">Sub-Registrar Conveyance</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover/sub:text-purple-600 group-hover/sub:translate-x-0.5 transition" />
                    </button>

                    {/* 30-Year EC Search */}
                    <button
                      type="button"
                      onClick={() => setActivePage('land-paper-work')}
                      className="p-3 rounded-2xl border border-slate-200/90 hover:border-emerald-500 bg-slate-50/80 hover:bg-emerald-50/60 text-left transition flex items-center gap-3 cursor-pointer group/sub"
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-100/90 text-emerald-700 flex items-center justify-center shrink-0 group-hover/sub:scale-105 transition-transform">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-navy-900 group-hover/sub:text-emerald-700">30-Year EC Search</p>
                        <p className="text-[10px] text-slate-500 truncate">Non-Encumbrance Report</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover/sub:text-emerald-600 group-hover/sub:translate-x-0.5 transition" />
                    </button>

                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer CTA */}
            <div className="px-6 sm:px-7 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                Fixed Pricing from ₹1,499
              </span>
              <button
                type="button"
                onClick={() => setActivePage('land-paper-work')}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold shadow-sm hover:shadow transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Book Paper Work</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>


          {/* ========================================================
              CARD 4: LAND DISPUTE SOLUTION
             ======================================================== */}
          <div className="group bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div>
              {/* Card Hero Photography Banner */}
              <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-navy-950">
                <img 
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80" 
                  alt="Land Dispute Solution Odisha"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent" />
                
                {/* Floating Top Elements */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg">
                    <Scale className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-md bg-rose-600/90 text-white border border-rose-300/40 shadow-sm">
                    Dispute Resolution
                  </span>
                </div>

                {/* Bottom Overlay Title on Image */}
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-md">
                    Land Dispute Solution
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 font-medium drop-shadow-sm mt-0.5">
                    Boundary Encroachment • Revenue Appeals • GPS Demarcation
                  </p>
                </div>
              </div>

              {/* Card Body Content */}
              <div className="p-6 sm:p-7">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Legally settle boundary overlaps, neighbor encroachments, partition conflicts, and revenue court litigation with licensed Total Station surveyors & property advocates.
                </p>

                {/* 4 Dispute Resolution Services */}
                <div className="mt-6 space-y-2.5">
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                    Arbitration & Mediation Services:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    
                    {/* Boundary Encroachment */}
                    <button
                      type="button"
                      onClick={() => setActivePage('land-dispute-solution')}
                      className="p-3 rounded-2xl border border-slate-200/90 hover:border-rose-500 bg-slate-50/80 hover:bg-rose-50/60 text-left transition flex items-center gap-3 cursor-pointer group/sub"
                    >
                      <div className="w-10 h-10 rounded-xl bg-rose-100/90 text-rose-700 flex items-center justify-center shrink-0 group-hover/sub:scale-105 transition-transform">
                        <Crosshair className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-navy-900 group-hover/sub:text-rose-700">Boundary & Encroachment</p>
                        <p className="text-[10px] text-slate-500 truncate">DGPS Laser Demarcation</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover/sub:text-rose-600 group-hover/sub:translate-x-0.5 transition" />
                    </button>

                    {/* Revenue Court Petitions */}
                    <button
                      type="button"
                      onClick={() => setActivePage('land-dispute-solution')}
                      className="p-3 rounded-2xl border border-slate-200/90 hover:border-amber-500 bg-slate-50/80 hover:bg-amber-50/60 text-left transition flex items-center gap-3 cursor-pointer group/sub"
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-100/90 text-amber-700 flex items-center justify-center shrink-0 group-hover/sub:scale-105 transition-transform">
                        <Scale className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-navy-900 group-hover/sub:text-amber-700">Revenue Court Appeals</p>
                        <p className="text-[10px] text-slate-500 truncate">Tahasildar Petitions</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover/sub:text-amber-600 group-hover/sub:translate-x-0.5 transition" />
                    </button>

                    {/* Family Partition */}
                    <button
                      type="button"
                      onClick={() => setActivePage('land-dispute-solution')}
                      className="p-3 rounded-2xl border border-slate-200/90 hover:border-emerald-500 bg-slate-50/80 hover:bg-emerald-50/60 text-left transition flex items-center gap-3 cursor-pointer group/sub"
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-100/90 text-emerald-700 flex items-center justify-center shrink-0 group-hover/sub:scale-105 transition-transform">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-navy-900 group-hover/sub:text-emerald-700">Family Partition</p>
                        <p className="text-[10px] text-slate-500 truncate">Amicable Settlement Deeds</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover/sub:text-emerald-600 group-hover/sub:translate-x-0.5 transition" />
                    </button>

                    {/* Total Station Demarcation */}
                    <button
                      type="button"
                      onClick={() => setActivePage('demarcation')}
                      className="p-3 rounded-2xl border border-slate-200/90 hover:border-teal-500 bg-slate-50/80 hover:bg-teal-50/60 text-left transition flex items-center gap-3 cursor-pointer group/sub"
                    >
                      <div className="w-10 h-10 rounded-xl bg-teal-100/90 text-teal-700 flex items-center justify-center shrink-0 group-hover/sub:scale-105 transition-transform">
                        <Compass className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-navy-900 group-hover/sub:text-teal-700">GPS Demarcation</p>
                        <p className="text-[10px] text-slate-500 truncate">Licensed Surveyor Survey</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover/sub:text-teal-600 group-hover/sub:translate-x-0.5 transition" />
                    </button>

                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer CTA */}
            <div className="px-6 sm:px-7 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-rose-600" />
                48hr On-Site Dispatch
              </span>
              <button
                type="button"
                onClick={() => setActivePage('land-dispute-solution')}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold shadow-sm hover:shadow transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Resolve Dispute</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
