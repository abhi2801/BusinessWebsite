import React, { useState } from 'react';
import { 
  Scale, 
  ShieldAlert, 
  Crosshair, 
  Users, 
  Gavel, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  MapPin, 
  PhoneCall, 
  Upload, 
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Compass,
  FileCheck2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useInquiries } from '../context/InquiryContext';
import { ODISHA_DISTRICTS } from '../data/mockProperties';
import { formatINR } from '../utils/formatters';

export const LandDisputePage = ({ setActivePage }) => {
  const { currentUser } = useAuth();
  const { submitInquiry } = useInquiries();

  const DISPUTE_SERVICES = [
    {
      id: 'boundary-encroachment',
      title: 'Boundary & Encroachment Resolution',
      badge: 'Electronic DGPS Survey',
      badgeColor: 'bg-rose-100 text-rose-800',
      price: 5999,
      duration: '48 - 72 Hours',
      description: 'Pinpoint laser Total Station survey to detect illegal boundary wall construction, neighbor encroachment, and install permanent RCC demarcated boundary pillars.',
      deliverables: [
        'Total Station GPS on-site boundary verification',
        'Mouza Cadastral Map overlay comparison',
        'Clear encroachment measurement report (sq.ft accurate)',
        'Legal surveyor demarcation certificate'
      ]
    },
    {
      id: 'revenue-court',
      title: 'Revenue Court & Tahasildar Petitions',
      badge: 'Revenue Litigation',
      badgeColor: 'bg-amber-100 text-amber-800',
      price: 7999,
      duration: 'Case Specific',
      description: 'Expert revenue advocate assistance for demarcation disputes, Tahasildar boundary appeals, Sub-Collector revisions, and Land Settlement record corrections.',
      deliverables: [
        'Demarcation appeal petition drafting',
        'Filing before Tahasildar / Sub-Collector / ADM',
        'Official notice issuance to adjacent landowners',
        'Advocate representation during official revenue hearing'
      ]
    },
    {
      id: 'family-partition',
      title: 'Family Property Partition & Settlement Deeds',
      badge: 'Amicable Settlement',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      price: 6999,
      duration: '5 - 10 Working Days',
      description: 'Equitable land division among legal heirs, preventing family conflicts through registered mutual partition deeds and separate Khata mutation.',
      deliverables: [
        'Ancestral land share calculation among heirs',
        'Drafting of registered Family Settlement Deed',
        'Physical plot sub-division with individual boundary pegs',
        'Separate mutation application for each heir'
      ]
    },
    {
      id: 'arbitration-survey',
      title: 'Joint Demarcation & Survey Arbitration',
      badge: 'Impartial Mediation',
      badgeColor: 'bg-blue-100 text-blue-800',
      price: 4999,
      duration: '3 - 5 Days',
      description: 'Neutral mediation survey conducted in the presence of all disputing parties and village elders, adhering strictly to government revenue settlement records.',
      deliverables: [
        'Joint on-site measurement with both parties present',
        'Certified electronic coordinates matching govt records',
        'Mutual consensus boundary agreement sign-off',
        'Signed dispute settlement Panchanama report'
      ]
    }
  ];

  const [selectedService, setSelectedService] = useState(DISPUTE_SERVICES[0]);
  const [formData, setFormData] = useState({
    customerName: currentUser?.name || '',
    mobile: currentUser?.phone || '',
    email: currentUser?.email || '',
    district: 'Khordha (Bhubaneswar)',
    tehsil: 'Bhubaneswar Sadar',
    village: 'Patia Mouza',
    khataNo: '240/12',
    plotNo: '819',
    disputeType: 'Boundary Wall Encroachment by Neighbor',
    currentStatus: 'Need immediate surveyor inspection',
    inspectionDate: '2026-11-22',
    disputeDetails: 'Adjacent plot owner built boundary 3 feet inside my registered plot boundary.'
  });

  const [submitting, setSubmitting] = useState(false);
  const [caseRef, setCaseRef] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      const generatedRef = 'JD-DSP-' + Math.floor(100000 + Math.random() * 900000);
      if (submitInquiry) {
        submitInquiry({
          name: formData.customerName,
          email: formData.email,
          phone: formData.mobile,
          propertyId: generatedRef,
          propertyTitle: `Land Dispute: ${formData.disputeType}`,
          inquiryType: 'Dispute Mediation',
          message: `District: ${formData.district}, Tahasil: ${formData.tehsil}, Mouza: ${formData.village}, Khata: ${formData.khataNo}, Plot: ${formData.plotNo}. Status: ${formData.currentStatus}. Details: ${formData.disputeDetails}`
        });
      }
      setCaseRef(generatedRef);
      setSubmitting(false);
    }, 700);
  };

  return (
    <div className="py-8 sm:py-12 space-y-16">
      
      {/* Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-navy-900 rounded-3xl text-white p-8 sm:p-14 relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:20px_20px]" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-extrabold border border-rose-500/30">
              <Scale className="w-4 h-4 text-rose-400" />
              <span>Certified Revenue Mediators & Total Station Surveyors</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Land Dispute Solution & Boundary Arbitration
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Resolve boundary overlaps, illegal encroachments, inheritance disputes, and revenue department litigation quickly and legally without decades of courtroom delays.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 font-semibold text-rose-400">
                <Crosshair className="w-4 h-4" /> DGPS Sub-Centimeter Accuracy
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <FileCheck2 className="w-4 h-4 text-emerald-400" /> 100% Revenue Court Admissible
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <Clock className="w-4 h-4 text-amber-400" /> 48-Hour Rapid Dispatch
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Dispute Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-wider text-rose-700 bg-rose-100/70 px-3 py-1 rounded-full">
            Legal & Technical Arbitration
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-navy-900 mt-2">
            Dispute Resolution Packages
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Choose the right solution for boundary encroachments, family partitions, or revenue court disputes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DISPUTE_SERVICES.map((srv) => {
            const isSelected = selectedService.id === srv.id;
            return (
              <div
                key={srv.id}
                onClick={() => {
                  setSelectedService(srv);
                  setFormData(prev => ({ ...prev, disputeType: srv.title }));
                }}
                className={`p-6 sm:p-8 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected 
                    ? 'border-rose-600 bg-white shadow-xl ring-4 ring-rose-500/10 -translate-y-1' 
                    : 'border-slate-200 bg-white hover:border-rose-300 hover:shadow-md'
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
                      Service Deliverables:
                    </p>
                    {srv.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Survey & Legal Fee</span>
                    <span className="text-2xl font-black text-navy-900">
                      {formatINR(srv.price)}
                    </span>
                  </div>

                  <button
                    type="button"
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      isSelected 
                        ? 'bg-rose-600 text-white shadow-md' 
                        : 'bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-700'
                    }`}
                  >
                    {isSelected ? 'Selected' : 'Select Service'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dispute Registration Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          
          <div className="bg-gradient-to-r from-navy-950 to-navy-900 text-white p-6 sm:p-8">
            <span className="text-xs font-extrabold text-rose-400 uppercase tracking-widest bg-rose-950/60 px-3 py-1 rounded-full border border-rose-500/30">
              Dispute Resolution Center
            </span>
            <h2 className="text-xl sm:text-2xl font-black mt-2">
              Register Land Dispute Case
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Currently Selected: <strong className="text-rose-400">{selectedService.title}</strong> ({formatINR(selectedService.price)})
            </p>
          </div>

          {caseRef ? (
            <div className="p-8 sm:p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-navy-900">
                Dispute Case Registered Successfully!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your case file has been assigned reference ID:
              </p>
              <div className="inline-block px-5 py-2.5 rounded-xl bg-slate-100 border border-slate-300 text-navy-900 font-mono font-extrabold text-lg">
                {caseRef}
              </div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                A senior revenue advocate and licensed surveyor will call you on <strong>{formData.mobile}</strong> within 3 hours to schedule the site inspection.
              </p>
              <div className="pt-4 flex justify-center gap-4">
                <button
                  onClick={() => setCaseRef(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
                >
                  Register Another Case
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
                    Complainant / Landowner Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="e.g. Bijay Kumar Dash"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Contact Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="+91 98610 XXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    District in Odisha *
                  </label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-500 outline-none bg-white font-medium"
                  >
                    {ODISHA_DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Mouza / Village *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    placeholder="e.g. Patia Mouza"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Disputed Plot No. & Khata No. *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={formData.khataNo}
                      onChange={(e) => setFormData({ ...formData, khataNo: e.target.value })}
                      placeholder="Khata No."
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-rose-500 outline-none"
                    />
                    <input
                      type="text"
                      required
                      value={formData.plotNo}
                      onChange={(e) => setFormData({ ...formData, plotNo: e.target.value })}
                      placeholder="Plot No."
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-rose-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Current Dispute Status *
                  </label>
                  <select
                    value={formData.currentStatus}
                    onChange={(e) => setFormData({ ...formData, currentStatus: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-500 outline-none bg-white font-medium"
                  >
                    <option value="Need immediate surveyor inspection">Need immediate surveyor inspection</option>
                    <option value="Boundary dispute with neighbor">Boundary dispute with neighbor</option>
                    <option value="Tahasildar petition pending">Tahasildar petition pending</option>
                    <option value="Family partition disagreement">Family partition disagreement</option>
                    <option value="Encroachment on road access">Encroachment on road access</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Brief Summary of the Dispute / Problem *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.disputeDetails}
                  onChange={(e) => setFormData({ ...formData, disputeDetails: e.target.value })}
                  placeholder="Describe what occurred, any notices received, or which boundary is disputed..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-500 outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Confidential legal assessment by High Court registered counsel</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition flex items-center justify-center gap-2"
                >
                  {submitting ? 'Registering Dispute...' : `Register Dispute (${formatINR(selectedService.price)})`}
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
