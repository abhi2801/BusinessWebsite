import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { POPULAR_LOCATIONS } from '../../data/mockProperties';

export const OdishaLocations = ({ onSelectLocation }) => {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200">
            Regional Hubs
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-navy-900 mt-2 tracking-tight">
            Popular Locations in Odisha
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Explore high-growth property corridors across Bhubaneswar, Cuttack, and Puri with fast appreciation and verified titles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {POPULAR_LOCATIONS.map((loc, idx) => (
            <div
              key={idx}
              onClick={() => onSelectLocation(loc.district)}
              className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-72 flex flex-col justify-end p-5"
            >
              {/* Background Photography */}
              <img
                src={loc.image}
                alt={loc.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent" />

              {/* Text content over photo */}
              <div className="relative z-10 text-white space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{loc.district}</span>
                </div>

                <h3 className="text-xl font-black text-white leading-tight">
                  {loc.name}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-1">
                  {loc.tagline}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs border-t border-white/20 mt-2">
                  <span className="text-emerald-300 font-bold">
                    {loc.activeListings} Active Plots
                  </span>
                  <span className="text-slate-300 flex items-center gap-1 font-semibold group-hover:text-white">
                    Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
