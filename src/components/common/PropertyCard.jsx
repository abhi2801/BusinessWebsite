import React from 'react';
import { 
  MapPin, 
  Compass, 
  Maximize2, 
  CheckCircle, 
  Eye, 
  ShoppingCart, 
  MessageSquare, 
  Heart, 
  Star, 
  Bed, 
  Bath, 
  Car, 
  Layers,
  ArrowRight,
  ShieldCheck,
  Building
} from 'lucide-react';
import { formatINR, formatCompactINR, formatSqFt, calculateLandCost, getOdishaLandMetrics } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useProperties } from '../../context/PropertyContext';

export const PropertyCard = ({ 
  property, 
  onBookNow, 
  onSendInquiry, 
  onViewDetails,
  isSelected = false 
}) => {
  const { savedPropertyIds, toggleSaveProperty } = useAuth();
  const { addToCart } = useCart();
  const { setPreviewPropertyId } = useProperties();

  const isSaved = savedPropertyIds.includes(property.id);

  // Category badge styles
  const getBadgeStyle = (category) => {
    switch (category) {
      case 'land':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'apartment':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'villa':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'house':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'land': return 'Land / Plot';
      case 'apartment': return property.bhk || 'Apartment';
      case 'villa': return 'Luxury Villa';
      case 'house': return 'Independent House';
      default: return 'Property';
    }
  };

  // Land metrics calculation
  const landMetrics = property.areaSqFt ? getOdishaLandMetrics(property.areaSqFt) : null;
  const isLand = property.category === 'land';

  // Handle Book Now click: Add to cart & trigger redirect
  const handleBookNowClick = (e) => {
    e.stopPropagation();
    addToCart(property);
    if (onBookNow) {
      onBookNow(property);
    }
  };

  const handleInquiryClick = (e) => {
    e.stopPropagation();
    if (onSendInquiry) {
      onSendInquiry(property);
    }
  };

  const handleViewDetailsClick = (e) => {
    e.stopPropagation();
    setPreviewPropertyId(property.id);
    if (onViewDetails) {
      onViewDetails(property);
    }
  };

  return (
    <div 
      onClick={() => setPreviewPropertyId(property.id)}
      className={`group bg-white rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-1 cursor-pointer ${
        isSelected 
          ? 'ring-2 ring-emerald-500 border-emerald-500 shadow-lg' 
          : 'border-slate-200/80 shadow-sm hover:border-slate-300'
      }`}
    >
      {/* Property Photograph & Top Badges */}
      <div className="relative h-56 sm:h-60 overflow-hidden bg-slate-100">
        <img
          src={property.images?.[0] || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm backdrop-blur-sm ${getBadgeStyle(property.category)}`}>
              {getCategoryLabel(property.category)}
            </span>
            {property.featured && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-white shadow-sm flex items-center gap-1">
                <Star className="w-3 h-3 fill-white" /> Featured
              </span>
            )}
          </div>

          {/* Bookmark / Favorite Heart */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveProperty(property.id);
            }}
            aria-label="Save Property"
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-rose-500 hover:bg-white shadow transition"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Bottom Photograph Overlay: Property ID & Status */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono bg-navy-900/80 px-2 py-0.5 rounded text-[11px] font-semibold border border-white/20">
              ID: {property.id}
            </span>
            {property.rating > 0 && (
              <span className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded text-[11px] font-medium backdrop-blur-sm">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span>{property.rating}</span>
                <span className="text-white/70">({property.reviewsCount})</span>
              </span>
            )}
          </div>

          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
            property.status === 'Available'
              ? 'bg-emerald-600/90 text-white'
              : property.status === 'Under Booking'
              ? 'bg-amber-600/90 text-white'
              : 'bg-slate-700/90 text-white'
          }`}>
            {property.status}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate font-medium">{property.location}, {property.city}</span>
          </div>

          {/* Property Title */}
          <h3 className="font-bold text-navy-900 text-base leading-snug group-hover:text-emerald-700 transition line-clamp-1 mb-2">
            {property.title}
          </h3>

          {/* Key Metric Pills */}
          <div className="grid grid-cols-2 gap-2 py-2.5 px-3 bg-slate-50 rounded-xl text-xs text-slate-700 border border-slate-100 my-2">
            {/* Total Area */}
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Total Area</span>
              <span className="font-bold text-navy-900">
                {formatSqFt(property.areaSqFt || property.builtUpArea)}
              </span>
              {landMetrics && (
                <span className="text-[10px] text-emerald-700 font-medium">
                  {landMetrics.guntha} ({landMetrics.decimal})
                </span>
              )}
            </div>

            {/* Rate Per Sq. Ft */}
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Rate / Sq.Ft</span>
              <span className="font-bold text-navy-900">
                ₹{new Intl.NumberFormat('en-IN').format(property.pricePerSqFt || 0)} / sq.ft
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                {property.facing ? `Facing: ${property.facing}` : 'Clear Title'}
              </span>
            </div>
          </div>

          {/* Land-specific specs or Residential specs */}
          {isLand ? (
            <div className="text-[11px] text-slate-600 space-y-1 mb-3 pt-1">
              <div className="flex items-center justify-between text-slate-600">
                <span>Dimensions:</span>
                <span className="font-semibold text-navy-900">{property.dimensions || "Regular Rectangular"}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Road Access:</span>
                <span className="font-semibold text-navy-900 truncate max-w-[170px]">{property.roadAccess || "30 ft Road"}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Land Type:</span>
                <span className="font-semibold text-emerald-700">{property.type || "Gharabari"}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-xs text-slate-600 py-2 border-b border-slate-100 mb-2">
              {property.bedrooms && (
                <span className="flex items-center gap-1 font-medium">
                  <Bed className="w-3.5 h-3.5 text-slate-500" /> {property.bedrooms} Beds
                </span>
              )}
              {property.bathrooms && (
                <span className="flex items-center gap-1 font-medium">
                  <Bath className="w-3.5 h-3.5 text-slate-500" /> {property.bathrooms} Baths
                </span>
              )}
              {property.parking && (
                <span className="flex items-center gap-1 font-medium truncate">
                  <Car className="w-3.5 h-3.5 text-slate-500" /> Parking
                </span>
              )}
            </div>
          )}

          {/* Automatic calculation formula badge for Land */}
          {isLand && (
            <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-lg p-2 text-[11px] text-emerald-800 mb-3">
              <span className="font-semibold">Calculation: </span>
              {property.areaSqFt} sq.ft × ₹{property.pricePerSqFt} = <strong className="font-bold">{formatINR(property.totalPrice)}</strong>
            </div>
          )}

          {/* Description Snippet */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
            {property.description}
          </p>
        </div>

        {/* Pricing & Action Buttons */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Property Price</span>
              <span className="text-xl font-extrabold text-navy-900 tracking-tight">
                {formatINR(property.totalPrice)}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-emerald-700 font-semibold block">Online Token Advance</span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                {formatINR(property.bookingToken || 25000)}
              </span>
            </div>
          </div>

          {/* 3 Mandatory Buttons: View Details, Book Now, Send Inquiry */}
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={handleViewDetailsClick}
              className="py-2 px-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center justify-center gap-1"
              title="View Complete Details"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Details</span>
            </button>

            <button
              onClick={handleInquiryClick}
              className="py-2 px-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition flex items-center justify-center gap-1"
              title="Send Direct Inquiry"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Inquiry</span>
            </button>

            <button
              onClick={handleBookNowClick}
              className="py-2 px-2 text-xs font-bold text-white bg-navy-900 hover:bg-emerald-600 rounded-xl shadow-sm hover:shadow transition flex items-center justify-center gap-1"
              title="Book Now & Go to Cart"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Book Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
