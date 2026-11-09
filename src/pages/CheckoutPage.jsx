import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { RazorpayModal } from '../components/common/RazorpayModal';
import { formatINR } from '../utils/formatters';

export const CheckoutPage = ({ setActivePage, onBookingComplete }) => {
  const { currentUser } = useAuth();
  const { cartItems, getTotals, recordBooking } = useCart();
  const totals = getTotals();

  const [formData, setFormData] = useState({
    customerName: '',
    mobile: '',
    email: '',
    panAadhaar: 'ABCDE1234F',
    billingAddress: 'Plot 104, HIG Colony, Patia, Bhubaneswar',
    city: 'Bhubaneswar',
    district: 'Khordha',
    pincode: '751024',
    surveyDate: '2026-11-15',
    agreeTerms: true
  });

  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        customerName: currentUser.name || 'Rajesh Mohanty',
        mobile: currentUser.phone || '+91 98610 98765',
        email: currentUser.email || 'rajesh.mohanty@gmail.com'
      }));
    }
  }, [currentUser]);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-navy-900">No Property in Checkout</h2>
        <p className="text-xs text-slate-500 mt-2 mb-4">Please add a property to your booking cart first.</p>
        <button
          onClick={() => setActivePage('buy-land')}
          className="px-6 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl"
        >
          Browse Lands
        </button>
      </div>
    );
  }

  const handleOpenPayment = (e) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      alert("Please accept the terms and conditions to proceed.");
      return;
    }
    setIsRazorpayOpen(true);
  };

  const handlePaymentSuccess = (paymentResponse) => {
    setIsRazorpayOpen(false);

    // Trigger celebratory confetti blast
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Ignore if confetti not supported
    }

    // Record booking
    const primaryItem = cartItems[0];
    const newBooking = recordBooking({
      bookingId: `LH-BK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      propertyId: primaryItem.property.id,
      propertyTitle: primaryItem.property.title,
      customerName: formData.customerName,
      customerPhone: formData.mobile,
      customerEmail: formData.email,
      billingAddress: `${formData.billingAddress}, ${formData.city}, ${formData.district} - ${formData.pincode}`,
      totalPropertyValue: totals.totalPropertyValue,
      tokenAmount: totals.totalTokenAdvance,
      amountPaid: totals.totalPayableNow,
      paymentMethod: `Razorpay (${paymentResponse.method?.toUpperCase() || 'UPI'})`,
      transactionId: paymentResponse.razorpay_payment_id || `pay_od_live_${Date.now()}`,
      surveyDate: formData.surveyDate,
      bookingDate: new Date().toISOString()
    });

    if (onBookingComplete) {
      onBookingComplete(newBooking);
    } else {
      setActivePage('order-confirmation');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Back button & Heading */}
      <div className="flex items-center gap-3 pb-6 mb-6 border-b border-slate-200">
        <button
          onClick={() => setActivePage('cart')}
          className="p-2 text-slate-500 hover:text-navy-900 rounded-xl hover:bg-slate-100 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
            Step 2 of 2 • Secure Checkout
          </span>
          <h1 className="text-2xl font-black text-navy-900">
            Confirm Booking & Legal Details
          </h1>
        </div>
      </div>

      <form onSubmit={handleOpenPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Customer Details, Billing & Verification (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section 1: Customer Personal Details */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-navy-900 flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-600" />
              <span>Customer / Buyer Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Full Legal Name (as per Aadhaar/PAN) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  PAN or Aadhaar Number (for Deed Verification) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.panAadhaar}
                  onChange={(e) => setFormData(prev => ({ ...prev, panAadhaar: e.target.value }))}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 uppercase font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Mobile Number (India) *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Billing & Permanent Address */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-navy-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Billing Address & Location</span>
            </h3>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Street Address / House / Colony *
              </label>
              <input
                type="text"
                required
                value={formData.billingAddress}
                onChange={(e) => setFormData(prev => ({ ...prev, billingAddress: e.target.value }))}
                className="w-full text-xs p-3 rounded-xl border border-slate-200"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">City / Town *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">District *</label>
                <input
                  type="text"
                  required
                  value={formData.district}
                  onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">PIN Code *</label>
                <input
                  type="text"
                  required
                  value={formData.pincode}
                  onChange={(e) => setFormData(prev => ({ ...prev, pincode: e.target.value }))}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 3: On-Site Demarcation & Document Handover Date */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-3">
            <h3 className="text-base font-extrabold text-navy-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>Preferred Site Inspection & Demarcation Date</span>
            </h3>

            <p className="text-xs text-slate-500">
              Select your preferred date for physical plot boundary inspection with our certified surveyor:
            </p>

            <input
              type="date"
              required
              value={formData.surveyDate}
              onChange={(e) => setFormData(prev => ({ ...prev, surveyDate: e.target.value }))}
              className="text-xs p-3 rounded-xl border border-slate-200 font-mono"
            />
          </div>

          {/* Terms & Conditions Acceptance */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={formData.agreeTerms}
                onChange={(e) => setFormData(prev => ({ ...prev, agreeTerms: e.target.checked }))}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
              />
              <span className="text-xs text-slate-700 leading-relaxed">
                I understand and agree that this token payment of <strong>{formatINR(totals.totalPayableNow)}</strong> reserves my selected property for 15 days for legal verification and site inspection. The balance property price will be settled separately upon executing the Sale Deed at the Sub-Registrar Office in Odisha.
              </span>
            </label>
          </div>
        </div>

        {/* Right Summary Pane (4 cols) */}
        <div className="lg:col-span-4 sticky top-28 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-5">
            <h3 className="font-extrabold text-navy-900 text-base pb-3 border-b border-slate-100">
              Payable Summary
            </h3>

            {/* Properties List in Checkout */}
            <div className="space-y-3 pb-3 border-b border-slate-100">
              {cartItems.map(({ property, bookingToken }) => (
                <div key={property.id} className="text-xs">
                  <div className="flex justify-between font-bold text-navy-900">
                    <span className="truncate max-w-[180px]">{property.title}</span>
                    <span className="font-mono">{formatINR(bookingToken)}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Total Val: {formatINR(property.totalPrice)}</span>
                </div>
              ))}
            </div>

            {/* Price lines */}
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Token Advance:</span>
                <span className="font-bold text-navy-900 font-mono">{formatINR(totals.totalTokenAdvance)}</span>
              </div>
              <div className="flex justify-between">
                <span>Legal ROR & Patta Search:</span>
                <span className="font-mono">₹4,500</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Inspection:</span>
                <span className="font-mono">₹1,500</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18% on services):</span>
                <span className="font-mono">{formatINR(totals.gst)}</span>
              </div>

              <div className="pt-3 border-t-2 border-slate-200 flex justify-between items-baseline">
                <span className="font-extrabold text-navy-900 text-sm">Total Payable Now:</span>
                <span className="text-2xl font-black text-emerald-700 font-mono">
                  {formatINR(totals.totalPayableNow)}
                </span>
              </div>
            </div>

            {/* Pay Button */}
            <button
              type="submit"
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl shadow-lg transition flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Pay {formatINR(totals.totalPayableNow)} via Razorpay</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <Lock className="w-3 h-3 text-emerald-600" />
              <span>UPI • Cards • NetBanking • Instant Receipt</span>
            </div>
          </div>
        </div>

      </form>

      {/* Razorpay Gateway Simulator Modal */}
      <RazorpayModal
        isOpen={isRazorpayOpen}
        onClose={() => setIsRazorpayOpen(false)}
        amount={totals.totalPayableNow}
        bookingDetails={formData}
        onSuccess={handlePaymentSuccess}
      />

    </div>
  );
};
