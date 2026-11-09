import React, { useState } from 'react';
import heroBg from '../../assets/hero-bg.jpg';
import { 
  Search, 
  MapPin, 
  Building2, 
  IndianRupee, 
  Maximize2, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Compass
} from 'lucide-react';
import { ODISHA_DISTRICTS } from '../../data/mockProperties';
import { formatCompactINR } from '../../utils/formatters';

export const HeroBanner = ({ onSearch, setActivePage }) => {
  const [activeTab, setActiveTab] = useState('land'); // 'land', 'apartment', 'villa', 'demarcation'
  const [district, setDistrict] = useState('');
  const [budget, setBudget] = useState('');
  const [area, setArea] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'demarcation') {
      setActivePage('demarcation');
      return;
    }
    if (activeTab === 'paper-work') {
      setActivePage('land-paper-work');
      return;
    }
    if (activeTab === 'dispute-solution') {
      setActivePage('land-dispute-solution');
      return;
    }

    if (onSearch) {
      onSearch({
        category: activeTab,
        district: district,
        budget: budget,
        area: area,
      });
    }
  };

  return (
    <div className="relative bg-navy-900 text-white overflow-hidden py-16 sm:py-24">
      {/* Luxury Townhouses Background Photography with Enhanced Contrast Shading */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Jami Dunia Luxury Properties Odisha"
          className="w-full h-full object-cover object-right md:object-center opacity-70 scale-100 transition-opacity duration-300"
        />
        {/* Directional scrim: Solid dark navy behind hero text on left, smoothly opening up to transparent on right so townhouses & sky show */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 via-45% to-navy-950/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-navy-950/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl space-y-6">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold tracking-wide shadow-lg backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Jami Dunia • Odisha's Premier Land & Property Marketplace</span>
          </div>

          {/* Main Heading & Subtitle */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-xl">
            Find Your Perfect <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
              Land & Property
            </span>
          </h1>

          <p className="text-base sm:text-xl text-white font-medium leading-relaxed drop-shadow-md max-w-2xl">
            Buy, Sell and Discover Verified Properties with Confidence. 100% legal ROR clearance, automated price formulas, and licensed on-site land demarcation.
          </p>

          {/* Quick Category Tab Selectors */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {[
              { id: 'land', label: 'Buy Land' },
              { id: 'apartment', label: 'Apartments' },
              { id: 'villa', label: 'Villas' },
              { id: 'house', label: 'Houses' },
              { id: 'demarcation', label: 'Land Demarcation' },
              { id: 'paper-work', label: 'Land Paper Work' },
              { id: 'dispute-solution', label: 'Dispute Solution' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/30 scale-105'
                    : 'bg-navy-950/75 border border-white/20 text-slate-100 hover:bg-navy-900 hover:text-white backdrop-blur-md shadow-md'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Floating Comprehensive Search Box */}
        <div className="mt-8 bg-white/95 backdrop-blur-xl rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/20 text-slate-800">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Location / District */}
            <div className="space-y-1">
              <label className="text-[11px] uppercase font-bold text-slate-600 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Location / District
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full text-xs font-semibold p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="">All Locations (Khordha, Cuttack, Puri)</option>
                {ODISHA_DISTRICTS.map(dist => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>

            {/* Property Type / Category */}
            <div className="space-y-1">
              <label className="text-[11px] uppercase font-bold text-slate-600 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-600" /> Property Type
              </label>
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="w-full text-xs font-semibold p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="land">Residential Gharabari Land</option>
                <option value="commercial-land">Commercial Plot</option>
                <option value="apartment">Luxury Apartment</option>
                <option value="villa">Gated Villa</option>
                <option value="house">Independent House</option>
                <option value="demarcation">Book Land Demarcation</option>
              </select>
            </div>

            {/* Budget Filter */}
            <div className="space-y-1">
              <label className="text-[11px] uppercase font-bold text-slate-600 flex items-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5 text-emerald-600" /> Max Budget (INR)
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full text-xs font-semibold p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="">Any Budget</option>
                <option value="3000000">Up to ₹30 Lakhs</option>
                <option value="6000000">Up to ₹60 Lakhs</option>
                <option value="10000000">Up to ₹1 Crore</option>
                <option value="25000000">Up to ₹2.5 Crore</option>
                <option value="50000000">₹5 Crore+</option>
              </select>
            </div>

            {/* Area Filter & Search Button */}
            <div className="flex items-end gap-2">
              <div className="flex-1 space-y-1">
                <label className="text-[11px] uppercase font-bold text-slate-600 flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-amber-600" /> Min Area (sq.ft)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 2000"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full text-xs font-semibold p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="h-[42px] px-6 bg-navy-900 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>

          </form>

          {/* Quick trending tags below search */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <span className="font-semibold text-navy-900">Popular Searches:</span>
            <button onClick={() => { setDistrict('Khordha'); setActiveTab('land'); onSearch && onSearch({ category: 'land', district: 'Khordha' }); }} className="text-slate-600 hover:text-emerald-700 underline">Patia Gharabari Plot</button>
            <span>•</span>
            <button onClick={() => { setDistrict('Khordha'); setActiveTab('land'); onSearch && onSearch({ category: 'land', district: 'Khordha' }); }} className="text-slate-600 hover:text-emerald-700 underline">Pahala NH-16 Commercial</button>
            <span>•</span>
            <button onClick={() => { setDistrict('Cuttack'); setActiveTab('land'); onSearch && onSearch({ category: 'land', district: 'Cuttack' }); }} className="text-slate-600 hover:text-emerald-700 underline">CDA Sector 9 & 11</button>
            <span>•</span>
            <button onClick={() => { setActiveTab('demarcation'); setActivePage('demarcation'); }} className="text-emerald-700 font-bold hover:underline flex items-center gap-1">
              <Compass className="w-3 h-3" /> Total Station Demarcation ₹4,999
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
