import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  FileText,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useInquiries } from '../../context/InquiryContext';
import { formatINR } from '../../utils/formatters';

export const InquiryModal = ({ property, isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { submitInquiry } = useInquiries();

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    inquiryType: 'Schedule Site Visit',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        fullName: currentUser.name || '',
        mobile: currentUser.phone || '',
        email: currentUser.email || ''
      }));
    }
  }, [currentUser, isOpen]);

  if (!isOpen || !property) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      submitInquiry({
        fullName: formData.fullName,
        mobile: formData.mobile,
        email: formData.email,
        propertyId: property.id,
        propertyTitle: property.title,
        inquiryType: formData.inquiryType,
        message: formData.message,
      });

      setSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-sm animate-in fade-in">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-navy-900 text-white p-5 flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Direct Property Inquiry
            </span>
            <h3 className="text-lg font-extrabold text-white">
              Send Inquiry & Site Visit Request
            </h3>
            <p className="text-xs text-slate-300 truncate max-w-sm">
              {property.title}
            </p>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h4 className="text-xl font-extrabold text-navy-900">
                Inquiry Submitted Successfully!
              </h4>
              <p className="text-xs text-slate-600 mt-2 max-w-sm mx-auto leading-relaxed">
                Thank you! Your request for <strong className="text-navy-900">{property.title}</strong> (ID: {property.id}) has been forwarded to our verified property executive. We will call you within 2 working hours.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600">
              <p>Reference: <strong className="font-mono text-navy-900">INQ-CONFIRMED</strong></p>
              <p className="mt-1">Executive assigned: <strong>Odisha Property Desk (+91 674 2501001)</strong></p>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow transition"
            >
              Back to Properties
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Auto-populated Property Summary Box */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center gap-3">
              <img
                src={property.images?.[0] || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=200&q=80"}
                alt={property.title}
                className="w-14 h-14 rounded-xl object-cover shrink-0"
              />
              <div className="min-w-0 flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-navy-900">ID: {property.id}</span>
                  <span className="font-extrabold text-emerald-700">{formatINR(property.totalPrice)}</span>
                </div>
                <p className="font-bold text-slate-800 truncate">{property.title}</p>
                <p className="text-slate-500 truncate">{property.location}, {property.city}</p>
              </div>
            </div>

            {/* Customer Name */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Priyabrata Mohanty"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Mobile & Email in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Mobile Number (India) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98610 XXXXX"
                    value={formData.mobile}
                    onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Inquiry Type */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Inquiry Type *
              </label>
              <select
                value={formData.inquiryType}
                onChange={(e) => setFormData(prev => ({ ...prev, inquiryType: e.target.value }))}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 bg-white"
              >
                <option value="Schedule Site Visit">Schedule On-site Inspection Visit</option>
                <option value="Request ROR & Patta Copies">Request Legal Title / ROR Patta Verification</option>
                <option value="Price Negotiation">Price Negotiation & Token Terms</option>
                <option value="Bank Home Loan Assistance">Bank Home / Land Loan Assistance</option>
                <option value="Land Demarcation Query">Plot Boundary & Demarcation Query</option>
                <option value="General Question">General Inquiry</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Your Message or Preferred Visit Date & Time *
              </label>
              <textarea
                required
                rows={3}
                placeholder="I would like to visit this plot this weekend. Please confirm availability of representative."
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-navy-900 hover:bg-emerald-600 text-white font-bold text-sm rounded-2xl shadow hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              {submitting ? (
                <span>Submitting to Database...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Property Inquiry</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
