import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  FileText, 
  Upload, 
  Crosshair, 
  Award, 
  PhoneCall, 
  Printer, 
  AlertCircle,
  HelpCircle,
  Layers,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useInquiries } from '../context/InquiryContext';
import { DEMARCATION_SERVICES, ODISHA_DISTRICTS } from '../data/mockProperties';
import { formatINR } from '../utils/formatters';

export const DemarcationPage = ({ setActivePage }) => {
  const { currentUser } = useAuth();
  const { submitDemarcationBooking } = useInquiries();

  const [selectedService, setSelectedService] = useState(DEMARCATION_SERVICES[0]);

  const [formData, setFormData] = useState({
    customerName: currentUser?.name || '',
    mobile: currentUser?.phone || '',
    email: currentUser?.email || '',
    district: 'Khordha (Bhubaneswar)',
    tehsil: 'Bhubaneswar Sadar',
    village: 'Patia Mouza',
    plotNo: '712/1040',
    khataNo: '115/42',
    totalArea: '2,400 sq.ft (approx. 2.2 Gunthas)',
    landType: 'Gharabari Residential',
    inspectionDate: '2026-11-18',
    address: 'Plot 712, Lane 4, Near KIMS Hospital, Patia',
    instructions: 'Corner boundary pillars need to be verified with DGPS Total Station.',
    documentName: 'Patta_Copy_Sample.pdf'
  });

  const [submitting, setSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      const result = submitDemarcationBooking({
        ...formData,
        serviceTitle: selectedService.title,
        amountPaid: selectedService.price,
      });

      setConfirmedBooking(result);
      setSubmitting(false);
    }, 700);
  };

  return (
    <div className="py-8 space-y-16">
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-navy-900 rounded-3xl text-white p-8 sm:p-14 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              <Crosshair className="w-3.5 h-3.5" />
              <span>Odisha Revenue Department Certified Surveyors</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Professional Land Demarcation & Boundary Surveying
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Ensure accurate plot boundaries, eliminate neighbor boundary encroachments, and obtain legal geo-tagged measurement coordinates. Licensed surveyors equipped with electronic Total Station & DGPS across all 30 districts of Odisha.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                <ShieldCheck className="w-4 h-4" /> 100% Admissible in Revenue Courts
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Concrete RCC Pillars Installed
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <Award className="w-4 h-4 text-amber-400" /> Digital Mouza Map Overlay
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            Why Demarcation is Essential
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-navy-900 mt-2">
            Benefits of Professional Land Measurement
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Boundary Identification",
              desc: "Determine exact four-corner coordinates matching the official Tehsil Record of Rights (ROR) and Mouza sheet."
            },
            {
              title: "Dispute Prevention",
              desc: "Avoid costly legal land disputes and encroachment by adjacent plot owners prior to home construction."
            },
            {
              title: "Accurate Net Area",
              desc: "Verify whether the physical land on ground matches the exact square footage or Gunthas stated in your registered deed."
            },
            {
              title: "Bank & BDA Approvals",
              desc: "Essential requirement for obtaining BDA/CDA building plan sanction and nationalized bank construction loans."
            }
          ].map((b, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm mb-4">
                0{idx + 1}
              </div>
              <h3 className="font-extrabold text-navy-900 text-base mb-1.5">{b.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Service Packages Selection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            Transparent Fixed Pricing
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-navy-900 mt-2">
            Select Your Demarcation Package
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEMARCATION_SERVICES.map((pkg) => {
            const isSelected = selectedService.id === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedService(pkg)}
                className={`rounded-3xl p-6 border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-white border-2 border-emerald-600 shadow-xl ring-2 ring-emerald-500/20' 
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-500 uppercase">{pkg.category}</span>
                    {pkg.recommended && (
                      <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-black text-navy-900 mb-1">{pkg.title}</h3>
                  <div className="flex items-baseline gap-1 my-3">
                    <span className="text-3xl font-black text-navy-900">{formatINR(pkg.price)}</span>
                    <span className="text-xs text-slate-500">/ plot</span>
                  </div>

                  <div className="space-y-2 py-3 border-t border-slate-100 text-xs text-slate-700">
                    {pkg.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className={`w-full py-2.5 rounded-xl text-xs font-bold mt-5 transition ${
                    isSelected 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  {isSelected ? '✓ Selected Package' : 'Select Package'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Demarcation Booking Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          
          <div className="bg-navy-900 text-white p-6 sm:p-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Official Booking Form
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              Book Land Demarcation & Site Inspection
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Selected Package: <strong className="text-emerald-400">{selectedService.title} ({formatINR(selectedService.price)})</strong>
            </p>
          </div>

          {confirmedBooking ? (
            /* Successful Demarcation Submission */
            <div className="p-8 sm:p-12 text-center space-y-5">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Request Confirmed
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-navy-900 mt-2">
                  Demarcation Request Submitted!
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
                  Your official Land Demarcation Booking Reference Number is:
                </p>
                <div className="inline-block font-mono text-2xl font-black text-navy-900 bg-slate-100 px-6 py-2 rounded-2xl border border-slate-300 mt-3">
                  {confirmedBooking.referenceId}
                </div>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 max-w-lg mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold text-navy-900">{confirmedBooking.serviceTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Customer:</span>
                  <span className="font-semibold text-navy-900">{confirmedBooking.customerName} ({confirmedBooking.mobile})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-semibold text-navy-900">{confirmedBooking.village}, {confirmedBooking.tehsil}, {confirmedBooking.district}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Plot / Khata:</span>
                  <span className="font-mono text-navy-900">Plot #{confirmedBooking.plotNo} • Khata #{confirmedBooking.khataNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Scheduled Date:</span>
                  <span className="font-bold text-emerald-700">{confirmedBooking.inspectionDate}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-700">Status:</span>
                  <span className="font-bold text-amber-600">{confirmedBooking.status}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => { setActivePage('profile'); window.scrollTo(0, 0); }}
                  className="px-6 py-3 bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs rounded-xl shadow transition"
                >
                  Track in Profile
                </button>
                <button
                  onClick={() => setConfirmedBooking(null)}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                >
                  Book Another Demarcation
                </button>
              </div>
            </div>
          ) : (
            /* Demarcation Booking Form */
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 text-slate-800">
              
              {/* Row 1: Customer Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Mobile Number (India) *</label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              {/* Row 2: District, Tehsil, Village */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">District *</label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white"
                  >
                    {ODISHA_DISTRICTS.map(dist => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Tehsil *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bhubaneswar Sadar"
                    value={formData.tehsil}
                    onChange={(e) => setFormData(prev => ({ ...prev, tehsil: e.target.value }))}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Village / Mouza *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Patia Mouza"
                    value={formData.village}
                    onChange={(e) => setFormData(prev => ({ ...prev, village: e.target.value }))}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              {/* Row 3: Plot No, Khata No, Total Area */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Plot Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 712/1040"
                    value={formData.plotNo}
                    onChange={(e) => setFormData(prev => ({ ...prev, plotNo: e.target.value }))}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Khata Number (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. 115/42"
                    value={formData.khataNo}
                    onChange={(e) => setFormData(prev => ({ ...prev, khataNo: e.target.value }))}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Total Land Area *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2400 sq.ft or 2 Gunthas"
                    value={formData.totalArea}
                    onChange={(e) => setFormData(prev => ({ ...prev, totalArea: e.target.value }))}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              {/* Row 4: Land Type & Preferred Inspection Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Land Classification *</label>
                  <select
                    value={formData.landType}
                    onChange={(e) => setFormData(prev => ({ ...prev, landType: e.target.value }))}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Gharabari Residential">Gharabari Residential</option>
                    <option value="Commercial Land">Commercial Land</option>
                    <option value="Agricultural Land">Agricultural Land</option>
                    <option value="Industrial Land">Industrial Land</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Inspection Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.inspectionDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, inspectionDate: e.target.value }))}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 font-mono"
                  />
                </div>
              </div>

              {/* Complete On-Site Address */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Complete Physical Plot Address / Landmark *</label>
                <input
                  type="text"
                  required
                  placeholder="Plot number, nearest electricity pole, approach road or colony landmark"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200"
                />
              </div>

              {/* Additional Instructions */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Additional Instructions / Neighbor Disputes (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. South boundary is adjacent to public drain. Please fix red cement pillars."
                  value={formData.instructions}
                  onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200"
                />
              </div>

              {/* Upload Supporting Documents (optional) */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-center">
                <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                <span className="text-xs font-bold text-navy-900 block">Upload Supporting Documents (Optional)</span>
                <span className="text-[11px] text-slate-500">ROR Patta copy, registered deed, or hand-drawn rough sketch (PDF/JPG)</span>
                <div className="mt-2 text-xs font-mono text-emerald-700">
                  Attached: {formData.documentName}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl shadow-lg transition flex items-center justify-center gap-2"
              >
                {submitting ? 'Dispatching Surveyor Request...' : `Submit Booking Request (${formatINR(selectedService.price)})`}
              </button>
            </form>
          )}

        </div>
      </div>

    </div>
  );
};
