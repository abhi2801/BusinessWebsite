import React, { useState } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  MapPin, 
  PhoneCall, 
  Upload, 
  ArrowRight,
  BookOpen,
  Award,
  AlertCircle,
  HelpCircle,
  Search,
  Scale
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useInquiries } from '../context/InquiryContext';
import { ODISHA_DISTRICTS } from '../data/mockProperties';
import { formatINR } from '../utils/formatters';

export const LandPaperWorkPage = ({ setActivePage }) => {
  const { currentUser } = useAuth();
  const { submitInquiry } = useInquiries();

  const PAPERWORK_SERVICES = [
    {
      id: 'ror-patta',
      title: 'ROR / Khatiyan Patta Verification',
      badge: 'Bhulekh Odisha Certified',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      price: 1499,
      duration: '24 - 48 Hours',
      description: 'Comprehensive inspection of Bhulekh Odisha land records, tenant ownership status, Stitiban Gharabari classification, and government ceiling clearance.',
      deliverables: [
        'Official Bhulekh ROR record validation',
        'Ownership lineage & Khata validity check',
        'Gharabari / Kisam classification certificate',
        'Government land reservation clearance report'
      ]
    },
    {
      id: 'mutation',
      title: 'Mutation (Namajari) & Tahasil e-Pauchar',
      badge: 'Revenue Record Update',
      badgeColor: 'bg-blue-100 text-blue-800',
      price: 4999,
      duration: '7 - 14 Working Days',
      description: 'Complete Tahasildar record correction, updating buyer name in official land records, online mutation application filing, tracking & e-Pauchar receipt generation.',
      deliverables: [
        'Mutation petition drafting & online portal filing',
        'Liaison with local Tahasildar / Revenue Inspector (RI)',
        'Objection notice handling during 30-day window',
        'Official e-Pauchar rent receipt in owner name'
      ]
    },
    {
      id: 'deed-registration',
      title: 'Sale Deed Drafting & Sub-Registrar Support',
      badge: 'Legal Conveyance',
      badgeColor: 'bg-purple-100 text-purple-800',
      price: 6499,
      duration: '3 - 5 Days',
      description: 'Precise legal conveyance deed preparation by experienced property advocates, IGR Odisha stamp duty & registration fee calculation, and Sub-Registrar appointment assistance.',
      deliverables: [
        'Custom bilingual Sale Deed drafting (Odia & English)',
        'Accurate IGR stamp duty & registration fee estimation',
        'Sub-Registrar appointment booking & token generation',
        'On-site legal advocate assistance on execution day'
      ]
    },
    {
      id: 'title-search-ec',
      title: '30-Year Encumbrance Certificate (EC) & Title Search',
      badge: 'Zero Risk Guarantee',
      badgeColor: 'bg-amber-100 text-amber-800',
      price: 3499,
      duration: '3 - 7 Working Days',
      description: 'Detailed retrospective search of Sub-Registrar transaction books for the past 30 years to guarantee zero prior mortgages, bank liens, or legal encumbrances.',
      deliverables: [
        'Certified Form 15 / Form 16 Encumbrance Certificate',
        '30-year property transaction history report',
        'Bank loan non-encumbrance legal opinion',
        'Court litigation & lis pendens clearance check'
      ]
    }
  ];

  const [selectedService, setSelectedService] = useState(PAPERWORK_SERVICES[0]);
  const [formData, setFormData] = useState({
    customerName: currentUser?.name || '',
    mobile: currentUser?.phone || '',
    email: currentUser?.email || '',
    district: 'Khordha (Bhubaneswar)',
    tehsil: 'Bhubaneswar Sadar',
    village: 'Patia Mouza',
    khataNo: '124/85',
    plotNo: '712/1040',
    serviceType: PAPERWORK_SERVICES[0].title,
    preferredDate: '2026-11-20',
    additionalNotes: 'Need urgent ROR Patta verification and 30-year EC title search report.'
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      const refNumber = 'JD-DOC-' + Math.floor(100000 + Math.random() * 900000);
      if (submitInquiry) {
        submitInquiry({
          name: formData.customerName,
          email: formData.email,
          phone: formData.mobile,
          propertyId: refNumber,
          propertyTitle: `Land Paper Work: ${formData.serviceType}`,
          inquiryType: 'Paperwork Service',
          message: `District: ${formData.district}, Tahasil: ${formData.tehsil}, Mouza: ${formData.village}, Khata: ${formData.khataNo}, Plot: ${formData.plotNo}. Notes: ${formData.additionalNotes}`
        });
      }
      setSubmittedRef(refNumber);
      setSubmitting(false);
    }, 700);
  };

  return (
    <div className="py-8 sm:py-12 space-y-16">
      
      {/* Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-navy-900 rounded-3xl text-white p-8 sm:p-14 relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Odisha Revenue Department & Sub-Registrar Legal Services</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Land Paper Work & Legal Verification Services
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Eliminate property fraud and documentation hassles. Get verified Bhulekh ROR Khatiyan verification, Tahasildar mutation, bilingual Sale Deed drafting, and 30-year non-encumbrance reports handled by seasoned property advocates across Khordha, Cuttack, and Puri.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> 100% Stitiban Clear Titles
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <Scale className="w-4 h-4 text-emerald-400" /> High Court & Revenue Advocates
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <Clock className="w-4 h-4 text-amber-400" /> 24 to 48 Hr Turnaround
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Paperwork Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
            Transparent Fixed Pricing
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-navy-900 mt-2">
            Select Your Land Paper Work Service
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Choose a service package to book legal documentation and official revenue clearance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PAPERWORK_SERVICES.map((srv) => {
            const isSelected = selectedService.id === srv.id;
            return (
              <div
                key={srv.id}
                onClick={() => {
                  setSelectedService(srv);
                  setFormData(prev => ({ ...prev, serviceType: srv.title }));
                }}
                className={`p-6 sm:p-8 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected 
                    ? 'border-emerald-600 bg-white shadow-xl ring-4 ring-emerald-500/10 -translate-y-1' 
                    : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${srv.badgeColor}`}>
                      {srv.badge}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> {srv.duration}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-navy-900">
                    {srv.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                    {srv.description}
                  </p>

                  <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                    <p className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400">
                      Included Deliverables:
                    </p>
                    {srv.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Govt. Filing + Legal Fee</span>
                    <span className="text-2xl font-black text-navy-900">
                      {formatINR(srv.price)}
                    </span>
                  </div>

                  <button
                    type="button"
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      isSelected 
                        ? 'bg-emerald-600 text-white shadow-md' 
                        : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'
                    }`}
                  >
                    {isSelected ? 'Selected' : 'Select Package'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Booking Form Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          
          <div className="bg-gradient-to-r from-navy-900 to-navy-800 text-white p-6 sm:p-8">
            <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
              Online Request Portal
            </span>
            <h2 className="text-xl sm:text-2xl font-black mt-2">
              Book Paper Work & Document Verification
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Currently Selected: <strong className="text-emerald-400">{selectedService.title}</strong> ({formatINR(selectedService.price)})
            </p>
          </div>

          {submittedRef ? (
            <div className="p-8 sm:p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-navy-900">
                Paper Work Request Submitted!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your request has been registered under reference number:
              </p>
              <div className="inline-block px-5 py-2.5 rounded-xl bg-slate-100 border border-slate-300 text-navy-900 font-mono font-extrabold text-lg">
                {submittedRef}
              </div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                A senior revenue documentation specialist will contact you on <strong>{formData.mobile}</strong> within 2 hours to collect photocopies and initiate validation.
              </p>
              <div className="pt-4 flex justify-center gap-4">
                <button
                  onClick={() => setSubmittedRef(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
                >
                  Submit Another Request
                </button>
                <button
                  onClick={() => setActivePage('home')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
                >
                  Return to Home
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Customer Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="e.g. Asit Kumar Mohanty"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Mobile Number (WhatsApp Enabled) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="+91 98610 XXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    District in Odisha *
                  </label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white font-medium"
                  >
                    {ODISHA_DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Tahasil Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.tehsil}
                    onChange={(e) => setFormData({ ...formData, tehsil: e.target.value })}
                    placeholder="e.g. Bhubaneswar Sadar"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Village / Mouza Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    placeholder="e.g. Patia / Chandrasekharpur"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Khata No. & Plot No. *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={formData.khataNo}
                      onChange={(e) => setFormData({ ...formData, khataNo: e.target.value })}
                      placeholder="Khata"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                    <input
                      type="text"
                      required
                      value={formData.plotNo}
                      onChange={(e) => setFormData({ ...formData, plotNo: e.target.value })}
                      placeholder="Plot"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Specific Requirements / Existing Document Status
                </label>
                <textarea
                  rows={3}
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  placeholder="Mention if you have prior sale deeds, mutation status, or any pending doubts..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Confidential legal consultation under advocate privilege</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2"
                >
                  {submitting ? 'Registering Request...' : `Submit Request (${formatINR(selectedService.price)})`}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

        </div>
      </div>

    </div>
  );
};
