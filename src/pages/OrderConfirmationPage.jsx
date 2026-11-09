import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Printer, 
  ArrowRight, 
  Building2, 
  Calendar, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Download,
  FileText
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ReceiptModal } from '../components/common/ReceiptModal';
import { formatINR } from '../utils/formatters';

export const OrderConfirmationPage = ({ booking, setActivePage }) => {
  const { completedBookings } = useCart();
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  // Use provided booking or latest from context
  const activeBooking = booking || completedBookings[0] || {
    bookingId: "LH-BK-2026-7812",
    propertyId: "LH-LND-101",
    propertyTitle: "Prime Gharabari Residential Plot near Infocity",
    customerName: "Rajesh Mohanty",
    customerPhone: "+91 98610 98765",
    customerEmail: "rajesh.mohanty@gmail.com",
    amountPaid: 56980,
    tokenAmount: 50000,
    transactionId: "pay_od_live_99218274",
    status: "Payment Verified - Site Visit Scheduled",
    surveyDate: "2026-11-15",
    totalPropertyValue: 5280000
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      
      {/* Top Success Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 text-center shadow-lg space-y-5">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
          <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Payment Verified • INR Transaction Confirmed
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-navy-900 mt-2">
            Property Booking Successful!
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-lg mx-auto">
            Your booking reference number is <strong className="font-mono text-navy-900 text-base">{activeBooking.bookingId}</strong>. We have locked this property for you.
          </p>
        </div>

        {/* Key Transaction Summary Box */}
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 max-w-xl mx-auto text-left space-y-3 text-xs">
          <div className="flex justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500">Property Reserved:</span>
            <span className="font-bold text-navy-900 text-right max-w-[280px] truncate">{activeBooking.propertyTitle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Property ID:</span>
            <span className="font-mono font-bold text-navy-900">{activeBooking.propertyId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Customer Name:</span>
            <span className="font-semibold text-navy-900">{activeBooking.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Razorpay Transaction ID:</span>
            <span className="font-mono text-slate-700">{activeBooking.transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Target Inspection Date:</span>
            <span className="font-bold text-emerald-700">{activeBooking.surveyDate || 'To be coordinated'}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-slate-200 text-sm">
            <span className="font-bold text-navy-900">Total Amount Paid Now:</span>
            <span className="font-black text-emerald-700 font-mono text-base">{formatINR(activeBooking.amountPaid)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setIsReceiptOpen(true)}
            className="w-full sm:w-auto px-6 py-3.5 bg-navy-900 hover:bg-navy-800 text-white font-extrabold text-xs rounded-xl shadow transition flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>View & Print Tax Invoice Receipt</span>
          </button>

          <button
            onClick={() => { setActivePage('profile'); window.scrollTo(0, 0); }}
            className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
          >
            <span>Track in My Bookings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Step Legal Journey */}
        <div className="pt-8 border-t border-slate-100 text-left">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-4 text-center">
            What Happens Next? (Odisha Land Handover Process)
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs mb-2">1</span>
              <p className="font-bold text-navy-900 mb-1">Executive Call & Document Courier</p>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Our Bhubaneswar legal manager will call within 2 hours to confirm your ROR Patta copy & mutation certified paperwork.
              </p>
            </div>

            <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs mb-2">2</span>
              <p className="font-bold text-navy-900 mb-1">On-Site Demarcation</p>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Licensed revenue surveyor visits the plot with you to electronically survey coordinates and verify boundary corners.
              </p>
            </div>

            <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-100">
              <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-xs mb-2">3</span>
              <p className="font-bold text-navy-900 mb-1">Sub-Registrar Deed Execution</p>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Deed registration at the local Tehsil/Sub-Registrar office with balance property consideration settled securely.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Printable Receipt Modal */}
      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        booking={activeBooking}
      />

    </div>
  );
};
