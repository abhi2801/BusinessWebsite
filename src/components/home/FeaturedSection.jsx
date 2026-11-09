import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { PropertyCard } from '../common/PropertyCard';
import { useProperties } from '../../context/PropertyContext';

export const FeaturedSection = ({ onBookNow, onSendInquiry, onViewDetails, setActivePage }) => {
  const { publicProperties } = useProperties();

  // Featured properties
  const featuredList = publicProperties.filter(p => p.featured).slice(0, 4);

  // Recently added properties
  const recentList = [...publicProperties].reverse().slice(0, 4);

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* Featured Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Handpicked Premium Deals
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-navy-900 mt-2 tracking-tight">
                Featured Properties in Odisha
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Highest rated properties with 100% verified legal ROR, Patta documents, and immediate demarcation readiness.
              </p>
            </div>

            <button
              onClick={() => { setActivePage('buy-land'); window.scrollTo(0, 0); }}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 transition self-start sm:self-auto"
            >
              <span>View All Featured</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredList.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                onBookNow={onBookNow}
                onSendInquiry={onSendInquiry}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        </div>

        {/* Recently Added Section */}
        <div className="pt-8 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Fresh on Market
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-navy-900 mt-2 tracking-tight">
                Recently Added Properties
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Newly submitted land parcels and residential homes listed in the past 48 hours.
              </p>
            </div>

            <button
              onClick={() => { setActivePage('buy-land'); window.scrollTo(0, 0); }}
              className="text-xs font-bold text-navy-900 hover:text-emerald-700 flex items-center gap-1.5 transition self-start sm:self-auto"
            >
              <span>Browse All Recent</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentList.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                onBookNow={onBookNow}
                onSendInquiry={onSendInquiry}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
