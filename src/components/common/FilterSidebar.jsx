import React from 'react';
import { 
  SlidersHorizontal, 
  RotateCcw, 
  MapPin, 
  IndianRupee, 
  Maximize2, 
  Home, 
  Sparkles,
  ChevronDown,
  Check
} from 'lucide-react';
import { formatCompactINR } from '../../utils/formatters';
import { ODISHA_DISTRICTS } from '../../data/mockProperties';

export const FilterSidebar = ({
  filters,
  setFilters,
  onResetFilters,
  className = ""
}) => {
  const districts = ODISHA_DISTRICTS;

  const categories = [
    { id: 'all', label: 'All Types' },
    { id: 'land', label: 'Buy Land' },
    { id: 'apartment', label: 'Apartments' },
    { id: 'villa', label: 'Villas' },
    { id: 'house', label: 'Houses' }
  ];

  const bhkOptions = ["1 BHK", "2 BHK", "3 BHK", "4 BHK+"];
  const facingOptions = ["Any", "East", "North", "North-East", "West", "South"];
  const amenityOptions = ["Garden", "Gym", "Garage", "24/7 Security", "Borewell Water", "Power Backup"];

  const handleDistrictToggle = (dist) => {
    setFilters(prev => {
      const current = prev.districts || [];
      const updated = current.includes(dist) 
        ? current.filter(d => d !== dist) 
        : [...current, dist];
      return { ...prev, districts: updated };
    });
  };

  const handleAmenityToggle = (amenity) => {
    setFilters(prev => {
      const current = prev.amenities || [];
      const updated = current.includes(amenity)
        ? current.filter(a => a !== amenity)
        : [...current, amenity];
      return { ...prev, amenities: updated };
    });
  };

  return (
    <aside className={`bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
          <h3 className="font-extrabold text-navy-900 text-sm tracking-wide uppercase">
            Custom Filter
          </h3>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition flex items-center gap-1 hover:underline"
        >
          <RotateCcw className="w-3 h-3" />
          Clear all
        </button>
      </div>

      {/* Property Category Tabs */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
          Category
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilters(prev => ({ ...prev, category: cat.id }))}
              className={`py-1.5 px-2.5 rounded-xl text-xs font-semibold transition text-left flex items-center justify-between ${
                filters.category === cat.id
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              <span>{cat.label}</span>
              {filters.category === cat.id && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Location / District Filter */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
          <span>Odisha District</span>
        </label>
        <div className="space-y-1.5">
          {districts.map(dist => {
            const isChecked = (filters.districts || []).includes(dist);
            return (
              <label
                key={dist}
                className="flex items-center gap-2.5 text-xs text-slate-700 hover:text-navy-900 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50 transition"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleDistrictToggle(dist)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 border-slate-300"
                />
                <span className={isChecked ? 'font-bold text-navy-900' : ''}>
                  {dist}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
            <span>Max Price</span>
          </label>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Up to {formatCompactINR(filters.maxPrice || 35000000)}
          </span>
        </div>
        <input
          type="range"
          min="1000000"
          max="40000000"
          step="500000"
          value={filters.maxPrice || 35000000}
          onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
        />
        <div className="flex justify-between text-[10px] text-slate-600 mt-1">
          <span>₹10 Lakh</span>
          <span>₹2 Crore</span>
          <span>₹4 Crore+</span>
        </div>
      </div>

      {/* Land Area Filter (sq.ft) */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
          <Maximize2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Area (Sq. Ft.)</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[10px] text-slate-600 mb-0.5 block">Min sq.ft</span>
            <input
              type="number"
              placeholder="Min (e.g. 1000)"
              value={filters.minArea || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, minArea: e.target.value }))}
              className="w-full text-xs p-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <span className="text-[10px] text-slate-600 mb-0.5 block">Max sq.ft</span>
            <input
              type="number"
              placeholder="Max (e.g. 5000)"
              value={filters.maxArea || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, maxArea: e.target.value }))}
              className="w-full text-xs p-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Facing Direction */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
          Facing Direction
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {facingOptions.map(face => (
            <button
              key={face}
              onClick={() => setFilters(prev => ({ ...prev, facing: face === 'Any' ? '' : face }))}
              className={`py-1.5 px-2 rounded-lg text-xs font-medium text-center transition ${
                (filters.facing || 'Any') === face || (!filters.facing && face === 'Any')
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {face}
            </button>
          ))}
        </div>
      </div>

      {/* BHK Options (Residential) */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
          Bedrooms / BHK
        </label>
        <div className="flex flex-wrap gap-1.5">
          {bhkOptions.map(bhk => {
            const isSelected = filters.bhk === bhk;
            return (
              <button
                key={bhk}
                onClick={() => setFilters(prev => ({ ...prev, bhk: isSelected ? '' : bhk }))}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  isSelected
                    ? 'bg-navy-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {bhk}
              </button>
            );
          })}
        </div>
      </div>

      {/* Amenities Tags */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Amenities</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {amenityOptions.map(amenity => {
            const isChecked = (filters.amenities || []).includes(amenity);
            return (
              <button
                key={amenity}
                onClick={() => handleAmenityToggle(amenity)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition ${
                  isChecked
                    ? 'bg-emerald-700 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {amenity}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
