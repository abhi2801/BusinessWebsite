import React, { useState, useEffect } from 'react';
import { 
  X, 
  PlusCircle, 
  CheckCircle2, 
  MapPin, 
  IndianRupee, 
  Maximize2, 
  Compass, 
  Navigation, 
  FileText, 
  Upload, 
  AlertCircle,
  Calculator,
  ShieldAlert,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProperties } from '../../context/PropertyContext';
import { ODISHA_DISTRICTS } from '../../data/mockProperties';
import { calculateLandCost, formatINR } from '../../utils/formatters';
import { GoogleSignInModal } from '../common/GoogleSignInModal';

export const SellerSubmissionModal = ({ isOpen, onClose, onSuccess, onRequireLogin, initialCategory = 'land' }) => {
  const { currentUser } = useAuth();
  const { submitSellerLand } = useProperties();

  const [propertyCategory, setPropertyCategory] = useState(initialCategory);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: initialCategory,
    district: 'Khordha (Bhubaneswar)',
    city: 'Bhubaneswar',
    location: '',
    tehsil: '',
    mouza: '',
    khataNo: '',
    plotNo: '',
    areaSqFt: 2000,
    dimensions: '40 ft × 50 ft',
    pricePerSqFt: 1500,
    facing: 'East',
    roadAccess: '30 ft Pitch Road',
    type: 'Residential Gharabari',
    bhk: '3 BHK',
    description: '',
    sellerName: currentUser?.name || '',
    sellerPhone: currentUser?.phone || '',
    sellerEmail: currentUser?.email || '',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
  });

  // Keep seller contact details in sync with currentUser
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        sellerName: currentUser.name || prev.sellerName,
        sellerPhone: currentUser.phone || prev.sellerPhone,
        sellerEmail: currentUser.email || prev.sellerEmail
      }));
    }
  }, [currentUser]);

  // Keep category in sync with initialCategory prop
  useEffect(() => {
    if (initialCategory) {
      setPropertyCategory(initialCategory);
      setFormData(prev => ({
        ...prev,
        category: initialCategory,
        type: initialCategory === 'apartment' ? 'High-Rise Luxury Flat' : initialCategory === 'villa' ? 'Gated Duplex Villa' : initialCategory === 'house' ? 'Independent House' : 'Residential Gharabari'
      }));
    }
  }, [initialCategory, isOpen]);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedProp, setSubmittedProp] = useState(null);

  if (!isOpen) return null;

  // Auto calculated expected total price
  const expectedTotalCost = calculateLandCost(formData.areaSqFt, formData.pricePerSqFt);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      const result = submitSellerLand({
        ...formData,
        areaSqFt: Number(formData.areaSqFt),
        pricePerSqFt: Number(formData.pricePerSqFt),
        totalPrice: expectedTotalCost,
        images: [formData.imageUrl]
      }, currentUser);

      setSubmittedProp(result);
      setSubmitting(false);
      setSubmitted(true);
      if (onSuccess) onSuccess(result);
    }, 700);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/70 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-navy-900 text-white p-5 flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Seller Portal • Direct Listing
            </span>
            <h3 className="text-xl font-extrabold text-white mt-1">
              List Your Land for Sale
            </h3>
            <p className="text-xs text-slate-300">
              Submit your Odisha land details. Requires administrator verification before public display.
            </p>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {!currentUser ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-sm border border-emerald-200">
              <Lock className="w-8 h-8" />
            </div>

            <div className="max-w-md mx-auto space-y-2">
              <h4 className="text-xl font-black text-navy-900">
                Please Sign In to List Your Property
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                To prevent unverified spam and protect genuine property buyers across Odisha, you must be logged into your verified Jami Dunia account before listing land or residential properties.
              </p>
            </div>

            {/* Seller Benefits Card */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 text-xs text-left max-w-md mx-auto space-y-2.5">
              <p className="font-bold text-navy-900">Verified Seller Advantages:</p>
              <div className="space-y-2 text-slate-600">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Receive direct buyer phone calls & site visit requests</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Free Stitiban Patta / Bhulekh ROR legal verification</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero commission, 100% direct buyer connections</span>
                </p>
              </div>
            </div>

            {/* Authentication Actions */}
            <div className="space-y-3 max-w-md mx-auto pt-1">
              {/* Google / Gmail Sign-In Button */}
              <button
                type="button"
                onClick={() => setIsGoogleModalOpen(true)}
                className="w-full flex items-center justify-center gap-3 py-3.5 px-4 border border-slate-300 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-sm hover:shadow transition cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google (Gmail)</span>
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    if (onRequireLogin) onRequireLogin('login');
                  }}
                  className="w-full py-3 bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs rounded-2xl shadow transition cursor-pointer"
                >
                  Sign In with Email
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    if (onRequireLogin) onRequireLogin('signup');
                  }}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow transition cursor-pointer"
                >
                  Create Seller Account
                </button>
              </div>
            </div>
          </div>
        ) : submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <ShieldAlert className="w-10 h-10" />
            </div>

            <div>
              <h4 className="text-xl font-black text-navy-900">
                Land Submitted for Administrator Approval!
              </h4>
              <p className="text-xs text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                Your listing <strong className="text-navy-900">{submittedProp?.title}</strong> (ID: {submittedProp?.id}) has been entered into the Admin Review Queue.
              </p>
            </div>

            <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs text-amber-900 text-left space-y-1.5 max-w-md mx-auto">
              <p className="font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-700" />
                Next Steps for Public Visibility:
              </p>
              <p>• Our legal desk will cross-verify Khata #{formData.khataNo} and Plot #{formData.plotNo} against the Odisha Bhulekh revenue portal.</p>
              <p>• Once approved, your land listing will instantly appear in the public <strong>Buy Land</strong> section.</p>
              <p>• You can check its live status under your profile's <strong>"My Listed Properties"</strong> tab.</p>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3 bg-navy-900 hover:bg-emerald-600 text-white font-bold rounded-2xl transition"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            
            {/* Notice Banner */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-blue-700 shrink-0" />
              <span>All seller submissions require administrator verification before becoming publicly visible.</span>
            </div>

            {/* Title */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Land Title / Headline *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 2,000 sq.ft Gharabari Plot in CDA Sector 11"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Location & District */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  District *
                </label>
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
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  City / Town *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bhubaneswar / Cuttack"
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Street Location, Tehsil & Mouza */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Specific Locality / Colony *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Patia / CDA Sector 11"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Tehsil</label>
                <input
                  type="text"
                  placeholder="e.g. Bhubaneswar Sadar"
                  value={formData.tehsil}
                  onChange={(e) => setFormData(prev => ({ ...prev, tehsil: e.target.value }))}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Mouza / Village</label>
                <input
                  type="text"
                  placeholder="e.g. Bidanasi"
                  value={formData.mouza}
                  onChange={(e) => setFormData(prev => ({ ...prev, mouza: e.target.value }))}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200"
                />
              </div>
            </div>

            {/* Revenue Khata No. & Plot No. */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Khata No. (ROR Patta)</label>
                <input
                  type="text"
                  placeholder="e.g. 118/27"
                  value={formData.khataNo}
                  onChange={(e) => setFormData(prev => ({ ...prev, khataNo: e.target.value }))}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Plot No. (Mouza Map)</label>
                <input
                  type="text"
                  placeholder="e.g. 740/15"
                  value={formData.plotNo}
                  onChange={(e) => setFormData(prev => ({ ...prev, plotNo: e.target.value }))}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200"
                />
              </div>
            </div>

            {/* Total Area, Price per sqft & Automated Calculation */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Area in Sq. Ft. *
                </label>
                <input
                  type="number"
                  required
                  value={formData.areaSqFt}
                  onChange={(e) => setFormData(prev => ({ ...prev, areaSqFt: Number(e.target.value) }))}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Price Per Sq. Ft. (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.pricePerSqFt}
                  onChange={(e) => setFormData(prev => ({ ...prev, pricePerSqFt: Number(e.target.value) }))}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Dimensions (L × W)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 40 ft × 50 ft"
                  value={formData.dimensions}
                  onChange={(e) => setFormData(prev => ({ ...prev, dimensions: e.target.value }))}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200"
                />
              </div>
            </div>

            {/* Automated Price Display Box */}
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-900">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-700" />
                <span>Total Expected Land Price (Auto-Calculated):</span>
              </div>
              <span className="text-base font-black text-emerald-800">
                {formatINR(expectedTotalCost)}
              </span>
            </div>

            {/* Facing, Road Access, Land Type */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Facing Direction</label>
                <select
                  value={formData.facing}
                  onChange={(e) => setFormData(prev => ({ ...prev, facing: e.target.value }))}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="East">East</option>
                  <option value="North">North</option>
                  <option value="North-East">North-East</option>
                  <option value="West">West</option>
                  <option value="South">South</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Road Width / Access</label>
                <input
                  type="text"
                  placeholder="e.g. 30 ft Pitch Road"
                  value={formData.roadAccess}
                  onChange={(e) => setFormData(prev => ({ ...prev, roadAccess: e.target.value }))}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Land Classification</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="Residential Gharabari">Residential Gharabari</option>
                  <option value="Commercial Land">Commercial Land</option>
                  <option value="Agricultural Land">Agricultural Land</option>
                  <option value="Industrial Land">Industrial Land</option>
                </select>
              </div>
            </div>

            {/* Land Photograph (URL or preset) */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Land Photograph URL (or use default high-res demo image)
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Description & Seller Notes *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Describe key landmarks, boundaries, surrounding colonies, electricity & water status..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Seller Contact Info */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Seller Verification Contact:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <input
                  type="text"
                  required
                  placeholder="Seller Name"
                  value={formData.sellerName}
                  onChange={(e) => setFormData(prev => ({ ...prev, sellerName: e.target.value }))}
                  className="p-2 rounded-lg border border-slate-200"
                />
                <input
                  type="tel"
                  required
                  placeholder="Mobile Number"
                  value={formData.sellerPhone}
                  onChange={(e) => setFormData(prev => ({ ...prev, sellerPhone: e.target.value }))}
                  className="p-2 rounded-lg border border-slate-200"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={formData.sellerEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, sellerEmail: e.target.value }))}
                  className="p-2 rounded-lg border border-slate-200"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-lg transition flex items-center justify-center gap-2"
            >
              {submitting ? 'Submitting to Review Queue...' : 'Submit Land Listing for Review'}
            </button>
          </form>
        )}
      </div>

      {/* Google Sign In Modal Sheet */}
      <GoogleSignInModal
        isOpen={isGoogleModalOpen}
        preferredRole="seller"
        onClose={() => setIsGoogleModalOpen(false)}
        onSuccess={() => {
          setIsGoogleModalOpen(false);
        }}
      />
    </div>
  );
};
