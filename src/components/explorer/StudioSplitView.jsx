import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowUpDown, 
  Grid, 
  Columns, 
  Search, 
  Sparkles,
  MapPin,
  Filter
} from 'lucide-react';
import { FilterSidebar } from '../common/FilterSidebar';
import { PropertyCard } from '../common/PropertyCard';
import { PropertyPreviewPane } from './PropertyPreviewPane';
import { useProperties } from '../../context/PropertyContext';

export const StudioSplitView = ({ 
  initialCategory = 'all', 
  title = "Explore Properties",
  subtitle = "Odisha's most trusted verified real estate listings",
  searchParams = null,
  onBookNow,
  onSendInquiry,
  onViewDetails
}) => {
  const { publicProperties, previewPropertyId, setPreviewPropertyId } = useProperties();

  // Filters State
  const [filters, setFilters] = useState(() => ({
    searchQuery: '',
    category: searchParams?.category ? (searchParams.category === 'commercial-land' ? 'land' : searchParams.category) : initialCategory,
    districts: searchParams?.district ? [searchParams.district] : [],
    maxPrice: searchParams?.budget ? Number(searchParams.budget) : 35000000,
    minArea: searchParams?.area ? String(searchParams.area) : '',
    maxArea: '',
    facing: '',
    bhk: '',
    amenities: [],
    sortBy: 'newest'
  }));

  // Sync when searchParams change
  useEffect(() => {
    if (searchParams) {
      setFilters(prev => ({
        ...prev,
        category: searchParams.category ? (searchParams.category === 'commercial-land' ? 'land' : searchParams.category) : prev.category,
        districts: searchParams.district ? [searchParams.district] : prev.districts,
        maxPrice: searchParams.budget ? Number(searchParams.budget) : prev.maxPrice,
        minArea: searchParams.area ? String(searchParams.area) : prev.minArea
      }));
    }
  }, [searchParams]);

  const [viewMode, setViewMode] = useState('split'); // 'split' (Studio 3-column) or 'grid' (Full width grid)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      category: initialCategory,
      districts: [],
      maxPrice: 35000000,
      minArea: '',
      maxArea: '',
      facing: '',
      bhk: '',
      amenities: [],
      sortBy: 'newest'
    });
  };

  // Filter & Sort Logic
  const filteredProperties = useMemo(() => {
    return publicProperties.filter(property => {
      // Category filter
      if (filters.category && filters.category !== 'all') {
        const targetCat = filters.category === 'commercial-land' ? 'land' : filters.category;
        if (property.category !== targetCat) {
          return false;
        }
      }

      // Search query (title, location, city, id, mouza)
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = property.title.toLowerCase().includes(query);
        const matchesLoc = property.location.toLowerCase().includes(query);
        const matchesCity = property.city.toLowerCase().includes(query);
        const matchesId = property.id.toLowerCase().includes(query);
        const matchesMouza = property.mouza ? property.mouza.toLowerCase().includes(query) : false;
        if (!matchesTitle && !matchesLoc && !matchesCity && !matchesId && !matchesMouza) {
          return false;
        }
      }

      // Strict District / Location filter (Specific location matching)
      if (filters.districts && filters.districts.length > 0) {
        const matched = filters.districts.some(selectedDist => {
          const sel = (selectedDist || '').toLowerCase();
          const propDist = (property.district || '').toLowerCase();
          const propCity = (property.city || '').toLowerCase();
          const propLoc = (property.location || '').toLowerCase();

          // Match Khordha or Bhubaneswar
          if (sel.includes('khordha') || sel.includes('bhubaneswar')) {
            return propDist.includes('khordha') || propDist.includes('bhubaneswar') || 
                   propCity.includes('bhubaneswar') || propCity.includes('khordha') ||
                   propLoc.includes('bhubaneswar') || propLoc.includes('patia') || 
                   propLoc.includes('pahala') || propLoc.includes('khandagiri') || propLoc.includes('jayadev');
          }

          // Match Cuttack
          if (sel.includes('cuttack')) {
            return propDist.includes('cuttack') || propCity.includes('cuttack') || 
                   propLoc.includes('cuttack') || propLoc.includes('cda') || propLoc.includes('trisulia');
          }

          // Match Puri
          if (sel.includes('puri')) {
            return propDist.includes('puri') || propCity.includes('puri') || 
                   propLoc.includes('puri') || propLoc.includes('marine drive');
          }

          return propDist.includes(sel) || propCity.includes(sel) || propLoc.includes(sel);
        });
        if (!matched) return false;
      }

      // Max price / Budget filter
      if (filters.maxPrice && Number(filters.maxPrice) > 0 && property.totalPrice > Number(filters.maxPrice)) {
        return false;
      }

      // Min & Max Area (sq.ft) filter
      const area = Number(property.areaSqFt || property.builtUpArea || property.plotArea || 0);
      if (filters.minArea && Number(filters.minArea) > 0 && area < Number(filters.minArea)) {
        return false;
      }
      if (filters.maxArea && Number(filters.maxArea) > 0 && area > Number(filters.maxArea)) {
        return false;
      }

      // Facing
      if (filters.facing && property.facing && property.facing !== filters.facing) {
        return false;
      }

      // BHK
      if (filters.bhk && property.bhk && property.bhk !== filters.bhk) {
        return false;
      }

      // Amenities
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(amenity => 
          property.amenities?.some(a => a.toLowerCase().includes(amenity.toLowerCase()))
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.totalPrice - b.totalPrice;
      if (filters.sortBy === 'price-desc') return b.totalPrice - a.totalPrice;
      if (filters.sortBy === 'area-desc') {
        const areaA = a.areaSqFt || a.builtUpArea || 0;
        const areaB = b.areaSqFt || b.builtUpArea || 0;
        return areaB - areaA;
      }
      // default: newest / id
      return b.id.localeCompare(a.id);
    });
  }, [publicProperties, filters]);

  // Selected property for preview pane
  const activeProperty = useMemo(() => {
    return filteredProperties.find(p => p.id === previewPropertyId) || filteredProperties[0] || null;
  }, [filteredProperties, previewPropertyId]);

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
      
      {/* Top Header & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-6 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
              {title}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {subtitle} • <strong className="text-emerald-700">{filteredProperties.length} verified listings</strong> found
            </p>
          </div>

          {/* Quick Search & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Patia, CDA, plot no, ID..."
                value={filters.searchQuery}
                onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 bg-slate-50 focus:bg-white transition"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                className="bg-transparent font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="newest">Newest Listings</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="area-desc">Largest Area</option>
              </select>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-1.5 bg-navy-900 text-white px-3.5 py-2 rounded-xl text-xs font-semibold"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {/* View Mode Toggle (Studio Split vs Grid) */}
            <div className="hidden xl:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('split')}
                title="Studio Split View (Reference UI)"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  viewMode === 'split' ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-500 hover:text-navy-900'
                }`}
              >
                <Columns className="w-3.5 h-3.5 text-emerald-600" />
                <span>Studio View</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                title="Full Grid View"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  viewMode === 'grid' ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-500 hover:text-navy-900'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Grid View</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile filter drawer */}
        {mobileFilterOpen && (
          <div className="mt-4 pt-4 border-t border-slate-200 lg:hidden">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              onResetFilters={resetFilters}
            />
          </div>
        )}
      </div>

      {/* Main Content Layout */}
      {viewMode === 'split' ? (
        /* 3-Column Studio Layout inspired by reference image */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Custom Filter Sidebar (Col 1-3) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-28">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              onResetFilters={resetFilters}
            />
          </div>

          {/* Middle Column: Property Cards Grid (Col 4-8) */}
          <div className="lg:col-span-5 space-y-4">
            {filteredProperties.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h4 className="font-bold text-navy-900">No properties match your filter</h4>
                <p className="text-xs text-slate-500 mt-1 mb-4">Try clearing filters or adjusting your budget/area criteria.</p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredProperties.map(property => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isSelected={activeProperty?.id === property.id}
                    onBookNow={onBookNow}
                    onSendInquiry={onSendInquiry}
                    onViewDetails={onViewDetails}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Live Property Details Preview Pane (Col 9-12) */}
          <div className="hidden lg:block lg:col-span-4">
            <PropertyPreviewPane
              property={activeProperty}
              onBookNow={onBookNow}
              onSendInquiry={onSendInquiry}
              onViewDetails={onViewDetails}
            />
          </div>

        </div>
      ) : (
        /* Full Grid Layout */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          <div className="hidden lg:block lg:col-span-1 sticky top-28">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              onResetFilters={resetFilters}
            />
          </div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProperties.map(property => (
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
      )}

    </div>
  );
};
