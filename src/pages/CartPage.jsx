import React from 'react';
import { 
  ShoppingCart, 
  Trash2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  AlertCircle, 
  Building2, 
  MapPin, 
  Maximize2, 
  Compass, 
  CheckCircle2,
  FileCheck,
  Lock
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatINR, formatSqFt } from '../utils/formatters';

export const CartPage = ({ setActivePage, onProceedToCheckout }) => {
  const { cartItems, removeFromCart, clearCart, getTotals } = useCart();
  const totals = getTotals();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-sm max-w-xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-4">
            <ShoppingCart className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-navy-900">Your Booking Cart is Empty</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 mb-6">
            You haven't reserved any property yet. Browse our verified Odisha land plots, apartments, or villas and click <strong>"Book Now"</strong>.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setActivePage('buy-land')}
              className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition"
            >
              Browse Land Plots
            </button>
            <button
              onClick={() => setActivePage('home')}
              className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
            >
              Explore Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Secure Booking Cart
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-navy-900 mt-1">
            Selected Property Booking Cart ({cartItems.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Review your selected property details, booking token advance, and legal verification schedule.
          </p>
        </div>

        <button
          onClick={() => setActivePage('buy-land')}
          className="text-xs font-bold text-slate-600 hover:text-navy-900 flex items-center gap-1.5 transition self-start sm:self-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Browsing</span>
        </button>
      </div>

      {/* Main Grid: Cart Items (Left 8 cols) & Order Summary (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Selected Property Cards */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map(({ property, bookingToken }) => (
            <div
              key={property.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row gap-5"
            >
              {/* Thumbnail */}
              <div className="w-full sm:w-44 h-44 rounded-2xl overflow-hidden bg-slate-100 shrink-0 relative">
                <img
                  src={property.images?.[0] || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80"}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 font-mono text-[10px] font-bold bg-navy-900/80 backdrop-blur-sm text-white px-2 py-0.5 rounded">
                  {property.id}
                </span>
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {property.category.toUpperCase()} • {property.type || 'Verified'}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-navy-900 mt-1">
                        {property.title}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{property.location}, {property.city}, {property.district}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(property.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                      title="Remove Property from Cart"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Specs Strip */}
                  <div className="grid grid-cols-3 gap-2 my-3 p-2.5 bg-slate-50 rounded-xl text-xs text-slate-700">
                    <div>
                      <span className="text-[10px] text-slate-600 block">Total Area</span>
                      <strong className="font-bold text-navy-900">
                        {formatSqFt(property.areaSqFt || property.builtUpArea)}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-600 block">Price / Sq.Ft</span>
                      <strong className="font-bold text-navy-900">
                        ₹{new Intl.NumberFormat('en-IN').format(property.pricePerSqFt)}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-600 block">Facing / Access</span>
                      <strong className="font-bold text-navy-900 truncate block">
                        {property.facing || 'East'} • {property.roadAccess || '30ft Road'}
                      </strong>
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs pt-1">
                    <div>
                      <span className="text-[11px] text-slate-600">Full Property Purchase Price: </span>
                      <strong className="text-navy-900 font-extrabold text-sm">{formatINR(property.totalPrice)}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-emerald-700 font-semibold">Online Token Payable: </span>
                      <strong className="text-emerald-800 font-black text-sm bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {formatINR(bookingToken)}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" /> 15-Day Reservation Period
                  </span>
                  <span>Free Cancellation within 48 Hours</span>
                </div>
              </div>
            </div>
          ))}

          {/* Legal Clarification Banner */}
          <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex items-start gap-3 text-xs text-amber-900">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">Important Purchase Distinction:</p>
              <p className="leading-relaxed">
                The online payable amount is strictly a <strong>refundable token reservation advance</strong>. Full property valuation ({formatINR(totals.totalPropertyValue)}) is paid directly during the legal deed registration at the Sub-Registrar Office following physical site demarcation.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Booking Summary & Price Breakdown (4 cols) */}
        <div className="lg:col-span-4 sticky top-28">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-5">
            <h3 className="font-black text-navy-900 text-lg pb-3 border-b border-slate-100 flex items-center justify-between">
              <span>Booking Summary</span>
              <span className="text-xs font-mono font-bold text-slate-400">
                INR (₹)
              </span>
            </h3>

            {/* Price Breakdown */}
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Total Properties Value:</span>
                <span className="font-bold text-navy-900">{formatINR(totals.totalPropertyValue)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-700 pt-2 border-t border-slate-100">
                <span className="font-bold text-emerald-800">Refundable Token Advance:</span>
                <span className="font-bold text-emerald-700 text-sm">{formatINR(totals.totalTokenAdvance)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span>Legal Due Diligence & ROR Search:</span>
                <span className="font-mono">{formatINR(totals.legalDueDiligenceFee)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span>Platform & Inspection Fee:</span>
                <span className="font-mono">{formatINR(totals.platformFee)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span>GST (18% on platform & legal):</span>
                <span className="font-mono">{formatINR(totals.gst)}</span>
              </div>

              {/* Total Payable Now */}
              <div className="pt-3 border-t-2 border-slate-200 flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-bold text-navy-900 uppercase block">Total Payable Now</span>
                  <span className="text-[10px] text-slate-400 font-semibold">(Token + Legal + GST)</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-navy-900 block">
                    {formatINR(totals.totalPayableNow)}
                  </span>
                </div>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => {
                if (onProceedToCheckout) onProceedToCheckout();
                else setActivePage('checkout');
              }}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Security Guarantee */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center space-y-1 text-[11px] text-slate-500">
              <div className="flex items-center justify-center gap-1.5 text-emerald-700 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Refund Guarantee</span>
              </div>
              <p>Refundable if document search reveals encumbrances.</p>
            </div>

            {/* Clear Cart */}
            <button
              onClick={clearCart}
              className="w-full text-center text-xs text-slate-600 hover:text-rose-600 transition"
            >
              Clear Entire Cart
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
