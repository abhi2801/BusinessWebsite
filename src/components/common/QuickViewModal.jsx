import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Maximize2, 
  Compass, 
  Navigation, 
  ShieldCheck, 
  Bed, 
  Bath, 
  Car, 
  ShoppingCart, 
  MessageSquare, 
  Heart, 
  Star,
  CheckCircle2,
  FileCheck,
  Building
} from 'lucide-react';
import { formatINR, formatCompactINR, formatSqFt, getOdishaLandMetrics } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export const QuickViewModal = ({ property, isOpen, onClose, onBookNow, onSendInquiry }) => {
  const { savedPropertyIds, toggleSaveProperty } = useAuth();
  const { addToCart } = useCart();
  const [activeImg, setActiveImg] = useState(0);

  if (!isOpen || !property) return null;

  const isSaved = savedPropertyIds.includes(property.id);
  const images = property.images && property.images.length > 0 ? property.images : [
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
  ];
  const isLand = property.category === 'land';
  const landMetrics = property.areaSqFt ? getOdishaLandMetrics(property.areaSqFt) : null;

  const handleBook = () => {
    addToCart(property);
    onClose();
    if (onBookNow) onBookNow(property);
  };

  const handleInquiry = () => {
    onClose();
    if (onSendInquiry) onSendInquiry(property);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/70 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-navy-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
              ID: {property.id}
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full uppercase">
              {property.type || property.category}
            </span>
            <span className="text-xs font-bold text-slate-700 bg-slate-200/60 px-2 py-1 rounded-full">
              {property.status}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveProperty(property.id)}
              className="p-2 rounded-xl border border-slate-200 hover:bg-white text-slate-600 hover:text-rose-500 transition"
              title="Save Property"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-navy-900 hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Gallery Carousel */}
          <div>
            <div className="h-72 sm:h-96 rounded-2xl overflow-hidden bg-slate-100 relative">
              <img
                src={images[activeImg] || images[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full">
                Photo {activeImg + 1} of {images.length}
              </div>
            </div>

            {images.length > 1 && (
              <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImg(idx)}
                    className={`w-20 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition ${
                      activeImg === idx ? 'border-emerald-600 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Price Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{property.location}, {property.city}, {property.district}, Odisha</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-navy-900">
                {property.title}
              </h2>
            </div>

            <div className="sm:text-right">
              <span className="text-xs uppercase font-bold text-slate-400 block">Total Price</span>
              <span className="text-3xl font-black text-navy-900">
                {formatINR(property.totalPrice)}
              </span>
              <span className="block text-xs font-semibold text-emerald-700">
                ₹{new Intl.NumberFormat('en-IN').format(property.pricePerSqFt)} / sq.ft
              </span>
            </div>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Total Area</span>
              <span className="text-sm font-bold text-navy-900 block mt-0.5">
                {formatSqFt(property.areaSqFt || property.builtUpArea)}
              </span>
              {landMetrics && (
                <span className="text-[11px] text-emerald-700 font-semibold">{landMetrics.guntha}</span>
              )}
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Facing Direction</span>
              <span className="text-sm font-bold text-navy-900 block mt-0.5">
                {property.facing || 'East Facing'}
              </span>
              <span className="text-[11px] text-slate-500">Vastu Compliant</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Road Access</span>
              <span className="text-sm font-bold text-navy-900 block mt-0.5 truncate">
                {property.roadAccess || '30 ft Pitch'}
              </span>
              <span className="text-[11px] text-slate-500">Blacktop Road</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Online Token</span>
              <span className="text-sm font-extrabold text-emerald-800 block mt-0.5">
                {formatINR(property.bookingToken || 25000)}
              </span>
              <span className="text-[11px] text-emerald-700">Reserves 15 Days</span>
            </div>
          </div>

          {/* Formula calculation box for Land */}
          {isLand && (
            <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-1 text-xs text-emerald-900">
              <p className="font-bold flex items-center gap-1.5 text-sm">
                <FileCheck className="w-4 h-4 text-emerald-700" />
                Automatic Price Calculation:
              </p>
              <p className="font-mono text-xs">
                Total Land Cost = Area ({property.areaSqFt} sq.ft) × Rate (₹{property.pricePerSqFt}/sq.ft) = <strong>{formatINR(property.totalPrice)}</strong>
              </p>
              {property.khataNo && (
                <p className="text-[11px] text-emerald-700 pt-1">
                  • Revenue Khata No: {property.khataNo} • Plot No: {property.plotNo} • Tehsil: {property.tehsil || 'Bhubaneswar'}
                </p>
              )}
            </div>
          )}

          {/* Description */}
          <div>
            <h4 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-2">
              Property Description
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Amenities / Key Features */}
          {property.amenities && property.amenities.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-2.5">
                Highlights & Features
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {property.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Seller / Legal Details */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70 flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase">Listing Source</p>
              <p className="text-sm font-bold text-navy-900">{property.seller?.name || "Odisha Certified Partner"}</p>
              <p className="text-xs text-emerald-700 flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Legal Document & Mutation Verified
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500">Title Status:</span>
              <span className="block text-xs font-bold text-navy-900">Stitiban Clear Freehold</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 hidden sm:block">
            Token advance is 100% refundable if title discrepancy is found within 15 days.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleInquiry}
              className="flex-1 sm:flex-none py-3 px-5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-2xl transition flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send Inquiry</span>
            </button>

            <button
              onClick={handleBook}
              className="flex-1 sm:flex-none py-3 px-6 text-xs font-extrabold text-white bg-navy-900 hover:bg-emerald-600 rounded-2xl shadow-lg transition flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Book Now (Add to Cart)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
