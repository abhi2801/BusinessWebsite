import React, { useState } from 'react';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Car, 
  Compass, 
  ShieldCheck, 
  Star, 
  ShoppingCart, 
  MessageSquare, 
  Heart, 
  ExternalLink,
  CheckCircle2,
  FileText,
  PhoneCall,
  User,
  Share2,
  Navigation
} from 'lucide-react';
import { formatINR, formatCompactINR, formatSqFt, getOdishaLandMetrics } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export const PropertyPreviewPane = ({ 
  property, 
  onBookNow, 
  onSendInquiry, 
  onViewDetails 
}) => {
  const { savedPropertyIds, toggleSaveProperty } = useAuth();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('overview'); // overview, reviews, about
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!property) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 p-8 text-center text-slate-400">
        Select a property from the list to preview details.
      </div>
    );
  }

  const isSaved = savedPropertyIds.includes(property.id);
  const images = property.images && property.images.length > 0 
    ? property.images 
    : ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"];

  const isLand = property.category === 'land';
  const landMetrics = property.areaSqFt ? getOdishaLandMetrics(property.areaSqFt) : null;

  const handleBookNow = () => {
    addToCart(property);
    if (onBookNow) onBookNow(property);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col h-full sticky top-28">
      
      {/* Photo Gallery: Main photo + side/bottom thumbnails */}
      <div className="p-4 pb-2">
        <div className="grid grid-cols-3 gap-2 h-64 sm:h-72">
          {/* Main Large Image */}
          <div className="col-span-2 relative rounded-xl overflow-hidden bg-slate-100 group">
            <img
              src={images[activeImageIndex] || images[0]}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 flex items-center gap-1.5">
              <span className="bg-navy-900/80 backdrop-blur-md text-white text-[11px] font-mono px-2 py-0.5 rounded border border-white/20">
                {property.id}
              </span>
              <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-bold px-2 py-0.5 rounded">
                {property.status}
              </span>
            </div>
          </div>

          {/* Side Thumbnails */}
          <div className="col-span-1 flex flex-col gap-2">
            {images.slice(0, 2).map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative flex-1 rounded-xl overflow-hidden bg-slate-100 cursor-pointer border-2 transition ${
                  activeImageIndex === idx ? 'border-emerald-600' : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </div>
            ))}
            {/* If only 1 image, duplicate thumbnail for UI symmetry */}
            {images.length === 1 && (
              <div className="relative flex-1 rounded-xl overflow-hidden bg-slate-100 opacity-60">
                <img src={images[0]} alt="Thumbnail" className="w-full h-full object-cover blur-[1px]" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pane Content */}
      <div className="px-5 py-3 flex-1 flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Title, Location & Price */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <h2 className="text-xl font-extrabold text-navy-900 leading-tight">
                {property.title}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{property.location}, {property.city}, Odisha</span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-2xl font-black text-navy-900">
                {formatINR(property.totalPrice)}
              </span>
              <span className="block text-[11px] text-slate-500">
                ₹{new Intl.NumberFormat('en-IN').format(property.pricePerSqFt)} / sq.ft
              </span>
            </div>
          </div>

          {/* Navigation Tabs (Overview, Reviews, About) */}
          <div className="flex items-center gap-6 border-b border-slate-200 mt-3 text-xs font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2 transition relative ${
                activeTab === 'overview'
                  ? 'text-navy-900 font-extrabold border-b-2 border-emerald-600'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-2 transition relative ${
                activeTab === 'reviews'
                  ? 'text-navy-900 font-extrabold border-b-2 border-emerald-600'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Reviews ({property.reviewsCount || 0})
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`pb-2 transition relative ${
                activeTab === 'about'
                  ? 'text-navy-900 font-extrabold border-b-2 border-emerald-600'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Seller & Legal Title
            </button>
          </div>

          {/* Tab Content */}
          <div className="py-3">
            {activeTab === 'overview' && (
              <div className="space-y-3">
                {/* Description */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Description :
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {property.description}
                  </p>
                </div>

                {/* Quick Spec Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                    <Maximize2 className="w-3.5 h-3.5 text-emerald-600" />
                    {formatSqFt(property.areaSqFt || property.builtUpArea)}
                  </span>
                  
                  {isLand ? (
                    <>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                        <Compass className="w-3.5 h-3.5 text-blue-600" />
                        Facing: {property.facing || 'East'}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                        <Navigation className="w-3.5 h-3.5 text-purple-600" />
                        Road: {property.roadAccess || '30 ft Road'}
                      </span>
                      {landMetrics && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
                          Odisha: {landMetrics.guntha}
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      {property.bedrooms && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                          <Bed className="w-3.5 h-3.5 text-blue-600" /> {property.bedrooms} Beds
                        </span>
                      )}
                      {property.bathrooms && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                          <Bath className="w-3.5 h-3.5 text-teal-600" /> {property.bathrooms} Baths
                        </span>
                      )}
                      {property.parking && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                          <Car className="w-3.5 h-3.5 text-amber-600" /> Parking Available
                        </span>
                      )}
                    </>
                  )}
                </div>

                {/* Calculation breakdown pill for Land */}
                {isLand && (
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-2.5 text-xs text-emerald-900">
                    <p className="font-bold mb-0.5">Automated Price Formula:</p>
                    <p className="font-mono text-[11px]">
                      {property.areaSqFt} sq.ft × ₹{property.pricePerSqFt}/sq.ft = <strong className="text-emerald-700 font-bold">{formatINR(property.totalPrice)}</strong>
                    </p>
                    {property.khataNo && (
                      <p className="text-[11px] text-emerald-700 mt-1">
                        Revenue Khata No: {property.khataNo} • Plot No: {property.plotNo} ({property.mouza || 'Mouza'})
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <div>
                    <span className="text-sm font-bold text-navy-900">{property.rating || 4.9} out of 5</span>
                    <p className="text-[11px] text-slate-500">Based on {property.reviewsCount || 12} verified buyer inspections</p>
                  </div>
                </div>
                <div className="text-xs text-slate-600 italic border-l-2 border-emerald-500 pl-3 py-1">
                  "Site visit completed with surveyor. Legal mutation and Khata records verified clear with Odisha Bhulekh portal."
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="font-bold text-navy-900">{property.seller?.name || "Verified Odisha Land Partner"}</p>
                  <p className="text-slate-500 text-[11px]">{property.seller?.type || "Registered Owner"}</p>
                  <p className="text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Identity & Title Verified
                  </p>
                </div>
                <div className="text-[11px] text-slate-500 space-y-1">
                  <p>• Title Type: Stitiban Freehold Gharabari</p>
                  <p>• Tehsil: {property.tehsil || 'Bhubaneswar'} Sadar</p>
                  <p>• Land Demarcation: Available on-site with total station</p>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Mini-Map Preview (As shown in user's image!) */}
          <div className="mt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Location Map Preview
            </span>
            <div className="relative h-28 rounded-xl overflow-hidden border border-slate-200 bg-emerald-50/40">
              {/* Map background illustration */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
              
              {/* River/road lines simulation */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 80 Q 80 40 180 60 T 360 40" fill="none" stroke="#93c5fd" strokeWidth="12" opacity="0.6" />
                <path d="M 40 0 L 120 120" fill="none" stroke="#cbd5e1" strokeWidth="4" />
                <path d="M 0 50 L 320 50" fill="none" stroke="#e2e8f0" strokeWidth="5" />
              </svg>

              {/* Pin indicator */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full shadow-lg border border-slate-200 animate-bounce">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold text-navy-900 truncate max-w-[130px]">
                  {property.location}
                </span>
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons: Contact Agent & Order / Book Now */}
        <div className="pt-4 mt-3 border-t border-slate-100 grid grid-cols-2 gap-3">
          <button
            onClick={() => onSendInquiry(property)}
            className="w-full py-2.5 px-3 rounded-xl border border-slate-300 text-navy-900 hover:bg-slate-50 text-xs font-bold transition flex items-center justify-center gap-1.5"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Contact Agent</span>
          </button>

          <button
            onClick={handleBookNow}
            className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition flex items-center justify-center gap-1.5"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Order Now</span>
          </button>
        </div>

      </div>
    </div>
  );
};
