import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Building2, 
  Trees, 
  Crown, 
  Home, 
  Users, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Edit3, 
  PlusCircle, 
  Search, 
  Compass, 
  CreditCard, 
  Star,
  Eye,
  Filter,
  Check,
  X,
  FileText
} from 'lucide-react';
import { useProperties } from '../context/PropertyContext';
import { useInquiries } from '../context/InquiryContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatINR, formatSqFt } from '../utils/formatters';

export const AdminPage = ({ setActivePage }) => {
  const { currentUser, login } = useAuth();
  const [adminUsername, setAdminUsername] = useState('admin');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [adminLoading, setAdminLoading] = useState(false);

  const { 
    properties, 
    addProperty, 
    updateProperty, 
    deleteProperty, 
    toggleFeatured, 
    approveSellerListing, 
    rejectSellerListing 
  } = useProperties();

  const { inquiries, updateInquiryStatus, demarcationBookings, updateDemarcationStatus } = useInquiries();
  const { completedBookings } = useCart();

  const [activeTab, setActiveTab] = useState('overview'); // overview, properties, seller-approvals, inquiries, bookings, demarcation
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false);

  // ADMIN SECURITY ACCESS GATE
  if (!currentUser || currentUser.role !== 'admin') {
    const handleAdminLoginSubmit = (e) => {
      e.preventDefault();
      setAdminError('');
      setAdminLoading(true);

      const res = login(adminUsername, adminPassword, true);
      setAdminLoading(false);

      if (!res.success) {
        setAdminError(res.error);
        return;
      }
    };

    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/90 p-8 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto shadow-sm">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-navy-900">Administrator Security Gate</h2>
            <p className="text-xs text-slate-500 mt-1.5">
              Access is strictly restricted to certified Jami Dunia administrators.
            </p>
          </div>

          {adminError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-semibold text-left animate-in fade-in">
              {adminError}
            </div>
          )}

          <form onSubmit={handleAdminLoginSubmit} className="space-y-4 text-left">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Admin Username or Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="admin"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-amber-500 transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Admin Password <span className="text-rose-500">*</span>
              </label>
              <input
                type="password"
                required
                placeholder="Enter admin password (pwd@123)"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-amber-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={adminLoading}
              className="w-full py-3.5 bg-navy-900 hover:bg-navy-800 text-white font-black text-xs rounded-xl shadow transition cursor-pointer"
            >
              {adminLoading ? 'Authenticating...' : 'Unlock Admin Master Dashboard'}
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400">
              Admin credentials: <strong className="text-navy-900">admin</strong> / <strong className="text-navy-900">pwd@123</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // New property form state
  const [newProp, setNewProp] = useState({
    title: '',
    category: 'land',
    type: 'Residential Gharabari',
    location: 'Patia',
    city: 'Bhubaneswar',
    district: 'Khordha',
    areaSqFt: 2400,
    pricePerSqFt: 2000,
    totalPrice: 4800000,
    bookingToken: 50000,
    facing: 'East',
    roadAccess: '30 ft Blacktop',
    khataNo: '102/14',
    plotNo: '540/12',
    description: 'BDA approved prime residential plot with immediate possession and clear Stitiban Patta.',
    featured: false,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
  });

  // Calculate stats
  const totalProperties = properties.length;
  const availableLand = properties.filter(p => p.category === 'land').length;
  const apartmentsCount = properties.filter(p => p.category === 'apartment').length;
  const villasCount = properties.filter(p => p.category === 'villa').length;
  const housesCount = properties.filter(p => p.category === 'house').length;
  const pendingApprovals = properties.filter(p => p.approvalStatus === 'Pending');
  const totalInquiries = inquiries.length;
  const totalBookings = completedBookings.length;
  const totalPaymentsCollected = completedBookings.reduce((sum, b) => sum + (Number(b.amountPaid) || 0), 0);

  const handleCreateProperty = (e) => {
    e.preventDefault();
    addProperty({
      ...newProp,
      areaSqFt: Number(newProp.areaSqFt),
      pricePerSqFt: Number(newProp.pricePerSqFt),
      totalPrice: Number(newProp.areaSqFt) * Number(newProp.pricePerSqFt),
      images: [newProp.image],
      seller: {
        name: "Jami Dunia Official Desk",
        type: "Verified Partner",
        contact: "+91 674 2501001",
        verified: true
      }
    });
    setIsAddPropertyModalOpen(false);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
      
      {/* Admin Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 border border-amber-500/20">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-navy-900">
              Administrator Master Dashboard
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Odisha Real Estate Control Center: Review seller listings, manage inventory, inquiries, payments and demarcation surveys.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddPropertyModalOpen(true)}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Property</span>
          </button>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 border-b border-slate-200 text-xs font-bold">
        {[
          { id: 'overview', label: 'Overview Metrics', count: null },
          { id: 'properties', label: 'All Properties', count: totalProperties },
          { id: 'seller-approvals', label: 'Seller Approvals', count: pendingApprovals.length, alert: pendingApprovals.length > 0 },
          { id: 'inquiries', label: 'Customer Inquiries', count: totalInquiries },
          { id: 'bookings', label: 'Bookings & Payments', count: totalBookings },
          { id: 'demarcation', label: 'Demarcation Requests', count: demarcationBookings.length },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-navy-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== null && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                tab.alert ? 'bg-amber-500 text-white animate-pulse' : activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* Top 10 Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Properties</span>
              <span className="text-3xl font-black text-navy-900 block mt-1">{totalProperties}</span>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Active Odisha Listings</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Available Land</span>
              <span className="text-3xl font-black text-emerald-600 block mt-1">{availableLand}</span>
              <span className="text-[11px] text-slate-500 mt-1 block">Gharabari & Commercial</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Apartments & Flats</span>
              <span className="text-3xl font-black text-amber-600 block mt-1">{apartmentsCount}</span>
              <span className="text-[11px] text-slate-500 mt-1 block">1 to 4 BHK Luxury</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Villas & Houses</span>
              <span className="text-3xl font-black text-purple-600 block mt-1">{villasCount + housesCount}</span>
              <span className="text-[11px] text-slate-500 mt-1 block">Duplex & Independent</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Token Payments (₹)</span>
              <span className="text-2xl font-black text-emerald-700 block mt-1 truncate">{formatINR(totalPaymentsCollected)}</span>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">{totalBookings} Bookings Received</span>
            </div>
          </div>

          {/* Pending Approvals Callout */}
          {pendingApprovals.length > 0 && (
            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                  {pendingApprovals.length}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-900">
                    Seller Listings Awaiting Verification
                  </h4>
                  <p className="text-xs text-amber-700">
                    Landowners have submitted plots requiring ROR/Khata document check before public display.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('seller-approvals')}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow transition shrink-0"
              >
                Review Pending Listings
              </button>
            </div>
          )}

          {/* Recent Inquiries and Recent Bookings side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Inquiries */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-extrabold text-navy-900 text-sm">Recent Property Inquiries</h3>
                <button onClick={() => setActiveTab('inquiries')} className="text-xs font-bold text-emerald-700 hover:underline">
                  View All ({inquiries.length})
                </button>
              </div>

              <div className="space-y-3">
                {inquiries.slice(0, 3).map(inq => (
                  <div key={inq.id} className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between font-bold text-navy-900">
                      <span>{inq.fullName}</span>
                      <span className="font-mono text-slate-500">{inq.id}</span>
                    </div>
                    <p className="text-slate-600">{inq.propertyTitle}</p>
                    <div className="flex justify-between text-[11px] pt-1">
                      <span className="text-emerald-700 font-semibold">{inq.inquiryType}</span>
                      <span className="text-slate-400">{inq.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Demarcation Requests */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-extrabold text-navy-900 text-sm">Recent Demarcation Bookings</h3>
                <button onClick={() => setActiveTab('demarcation')} className="text-xs font-bold text-emerald-700 hover:underline">
                  View All ({demarcationBookings.length})
                </button>
              </div>

              <div className="space-y-3">
                {demarcationBookings.slice(0, 3).map(dem => (
                  <div key={dem.referenceId} className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between font-bold text-navy-900">
                      <span>{dem.customerName}</span>
                      <span className="font-mono text-emerald-700">{dem.referenceId}</span>
                    </div>
                    <p className="text-slate-600">{dem.village}, {dem.tehsil} (Plot #{dem.plotNo})</p>
                    <div className="flex justify-between text-[11px] pt-1">
                      <span className="text-slate-500">Scheduled: {dem.inspectionDate}</span>
                      <span className="font-semibold text-amber-700">{dem.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: PROPERTIES MANAGEMENT */}
      {activeTab === 'properties' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="font-black text-navy-900 text-base">All Properties Catalog ({properties.length})</h3>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Filter by title, ID, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-xs p-2 rounded-xl border border-slate-200 w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Property</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Area & Rate</th>
                  <th className="py-3 px-4">Total Price (INR)</th>
                  <th className="py-3 px-4">Featured</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {properties
                  .filter(p => !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(property => (
                    <tr key={property.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={property.images?.[0] || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=100&q=80"}
                            alt={property.title}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-bold text-navy-900 line-clamp-1">{property.title}</p>
                            <p className="text-[11px] text-slate-400 font-mono">{property.id} • {property.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold capitalize text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                          {property.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-800">{formatSqFt(property.areaSqFt || property.builtUpArea)}</span>
                        <span className="block text-[11px] text-slate-400">₹{property.pricePerSqFt}/sq.ft</span>
                      </td>
                      <td className="py-3 px-4 font-black text-navy-900 font-mono">
                        {formatINR(property.totalPrice)}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleFeatured(property.id)}
                          className={`p-1 rounded-lg transition ${property.featured ? 'text-amber-500 bg-amber-50' : 'text-slate-300 hover:text-slate-500'}`}
                        >
                          <Star className={`w-4 h-4 ${property.featured ? 'fill-amber-400' : ''}`} />
                        </button>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          property.status === 'Available' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {property.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => deleteProperty(property.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition"
                          title="Delete Property"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SELLER SUBMISSIONS (APPROVAL WORKFLOW) */}
      {activeTab === 'seller-approvals' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-black text-navy-900 text-base mb-1">
              Seller Submitted Land Listings Review Queue
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              As per policy, all seller submissions require administrative title verification before becoming publicly visible on Buy Land.
            </p>

            {pendingApprovals.length === 0 ? (
              <div className="p-12 text-center text-slate-400">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                <p className="font-bold text-navy-900">No Pending Seller Submissions</p>
                <p className="text-xs text-slate-500">All submitted lands have been processed and verified.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingApprovals.map(submission => (
                  <div 
                    key={submission.id}
                    className="p-5 rounded-2xl border-2 border-amber-200 bg-amber-50/40 flex flex-col md:flex-row gap-5 justify-between items-start"
                  >
                    <div className="flex gap-4">
                      <img
                        src={submission.images?.[0] || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=200&q=80"}
                        alt={submission.title}
                        className="w-24 h-24 rounded-xl object-cover shrink-0"
                      />
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-navy-900 bg-white px-2 py-0.5 rounded border">ID: {submission.id}</span>
                          <span className="bg-amber-500 text-white px-2 py-0.5 rounded text-[10px] font-bold">Pending Review</span>
                        </div>
                        <h4 className="text-sm font-black text-navy-900">{submission.title}</h4>
                        <p className="text-slate-600">{submission.location}, {submission.city}, {submission.district}</p>
                        <p className="font-mono text-slate-500">
                          Khata #{submission.khataNo} • Plot #{submission.plotNo} ({submission.tehsil} Tehsil)
                        </p>
                        <div className="pt-1 flex items-center gap-3">
                          <span>Area: <strong>{formatSqFt(submission.areaSqFt)}</strong></span>
                          <span>Rate: <strong>₹{submission.pricePerSqFt}/sq.ft</strong></span>
                          <span>Total: <strong className="text-emerald-700">{formatINR(submission.totalPrice)}</strong></span>
                        </div>
                        <p className="text-[11px] text-slate-500 italic mt-1">
                          Seller: {submission.seller?.name} • Phone: {submission.seller?.contact} • Email: {submission.seller?.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col gap-2 shrink-0 w-full md:w-auto">
                      <button
                        onClick={() => approveSellerListing(submission.id)}
                        className="flex-1 md:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-1.5"
                      >
                        <Check className="w-4 h-4" />
                        <span>Approve Listing</span>
                      </button>

                      <button
                        onClick={() => rejectSellerListing(submission.id)}
                        className="flex-1 md:flex-none px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
                      >
                        <X className="w-4 h-4" />
                        <span>Reject Listing</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: INQUIRIES MANAGEMENT */}
      {activeTab === 'inquiries' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-black text-navy-900 text-base">Customer Inquiries Database ({inquiries.length})</h3>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {inquiries.map(inq => (
              <div key={inq.id} className="p-5 hover:bg-slate-50 transition flex flex-col md:flex-row justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-navy-900 text-sm">{inq.fullName}</span>
                    <span className="text-[10px] font-mono text-slate-400">({inq.id})</span>
                    <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      {inq.inquiryType}
                    </span>
                  </div>

                  <p className="text-slate-700 font-semibold">{inq.propertyTitle} (ID: {inq.propertyId})</p>
                  <p className="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                    "{inq.message}"
                  </p>

                  <div className="flex items-center gap-4 text-slate-500 text-[11px] pt-1">
                    <span>Phone: <strong className="text-navy-900">{inq.mobile}</strong></span>
                    <span>Email: <strong className="text-navy-900">{inq.email}</strong></span>
                    <span>Submitted: {new Date(inq.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-start">
                  <select
                    value={inq.status}
                    onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                    className="p-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white cursor-pointer"
                  >
                    <option value="New">Status: New</option>
                    <option value="Contacted">Status: Contacted</option>
                    <option value="Site Visit Scheduled">Status: Site Visit Scheduled</option>
                    <option value="Closed">Status: Closed</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: BOOKINGS & PAYMENTS */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-black text-navy-900 text-base">Token Bookings & Razorpay Payments ({completedBookings.length})</h3>
            <span className="text-xs font-bold text-emerald-700">Total Collected: {formatINR(totalPaymentsCollected)}</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {completedBookings.map(b => (
              <div key={b.bookingId} className="p-5 hover:bg-slate-50 transition flex flex-col md:flex-row justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-navy-900 bg-slate-100 px-2 py-0.5 rounded">#{b.bookingId}</span>
                    <span className="font-bold text-emerald-700">{formatINR(b.amountPaid)}</span>
                    <span className="text-[10px] text-slate-400 font-mono">Txn: {b.transactionId}</span>
                  </div>

                  <p className="text-sm font-bold text-navy-900">{b.propertyTitle} (ID: {b.propertyId})</p>
                  <p className="text-slate-600">Customer: {b.customerName} • {b.customerPhone} • {b.customerEmail}</p>
                  <p className="text-slate-500 text-[11px]">Inspection Scheduled: {b.surveyDate}</p>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    {b.status || 'Verified'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: DEMARCATION REQUESTS */}
      {activeTab === 'demarcation' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-black text-navy-900 text-base">Land Demarcation & Survey Requests ({demarcationBookings.length})</h3>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {demarcationBookings.map(d => (
              <div key={d.referenceId} className="p-5 hover:bg-slate-50 transition flex flex-col lg:flex-row justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      Ref: {d.referenceId}
                    </span>
                    <span className="font-bold text-navy-900">{d.serviceTitle}</span>
                  </div>

                  <p className="font-semibold text-slate-800">
                    Location: {d.village}, {d.tehsil}, {d.district} (Plot #{d.plotNo}, Khata #{d.khataNo || 'N/A'})
                  </p>
                  <p className="text-slate-600">Customer: {d.customerName} • {d.mobile} • {d.email}</p>
                  <p className="text-slate-500 text-[11px]">Address: {d.address}</p>
                  {d.instructions && <p className="text-[11px] text-slate-500 italic">Notes: "{d.instructions}"</p>}
                  
                  <div className="pt-1 text-[11px] text-slate-600">
                    Assigned Surveyor: <strong className="text-navy-900">{d.assignedSurveyor || 'Pending Assignment'}</strong>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col gap-2">
                  <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 font-bold rounded-xl text-center">
                    {d.status}
                  </span>
                  <button
                    onClick={() => updateDemarcationStatus(d.referenceId, "Surveyor Assigned", "Er. Subhash Mohapatra (License REV/BBS/2018/42)")}
                    className="px-3 py-1.5 bg-navy-900 hover:bg-emerald-600 text-white rounded-xl font-bold transition text-xs"
                  >
                    Assign Senior Surveyor
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Property Modal */}
      {isAddPropertyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/70 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border p-6 my-8 animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b mb-4">
              <h3 className="font-black text-navy-900 text-lg">Add New Property to Jami Dunia</h3>
              <button onClick={() => setIsAddPropertyModalOpen(false)} className="p-1 text-slate-400 hover:text-navy-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProperty} className="space-y-4 max-h-[70vh] overflow-y-auto text-xs">
              <div>
                <label className="font-bold block mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={newProp.title}
                  onChange={(e) => setNewProp(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. 2,400 sq.ft Prime Gharabari Plot in Patia"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Category *</label>
                  <select
                    value={newProp.category}
                    onChange={(e) => setNewProp(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="land">Land</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="house">Independent House</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1">District *</label>
                  <input
                    type="text"
                    required
                    value={newProp.district}
                    onChange={(e) => setNewProp(prev => ({ ...prev, district: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold block mb-1">Area (sq.ft) *</label>
                  <input
                    type="number"
                    required
                    value={newProp.areaSqFt}
                    onChange={(e) => setNewProp(prev => ({ ...prev, areaSqFt: Number(e.target.value) }))}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Price / Sq.Ft (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newProp.pricePerSqFt}
                    onChange={(e) => setNewProp(prev => ({ ...prev, pricePerSqFt: Number(e.target.value) }))}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Facing</label>
                  <input
                    type="text"
                    value={newProp.facing}
                    onChange={(e) => setNewProp(prev => ({ ...prev, facing: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Image URL</label>
                <input
                  type="url"
                  value={newProp.image}
                  onChange={(e) => setNewProp(prev => ({ ...prev, image: e.target.value }))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newProp.description}
                  onChange={(e) => setNewProp(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow"
              >
                Publish Property to Marketplace
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
