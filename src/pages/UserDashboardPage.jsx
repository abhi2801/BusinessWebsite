import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  ShoppingCart, 
  Heart, 
  Compass, 
  MessageSquare, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Printer, 
  ShieldCheck,
  Building2,
  Trash2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useProperties } from '../context/PropertyContext';
import { useInquiries } from '../context/InquiryContext';
import { ReceiptModal } from '../components/common/ReceiptModal';
import { PropertyCard } from '../components/common/PropertyCard';
import { formatINR } from '../utils/formatters';

export const UserDashboardPage = ({ 
  setActivePage, 
  onOpenSellerModal,
  onBookNow,
  onSendInquiry,
  onViewDetails
}) => {
  const { currentUser, switchDemoRole, savedPropertyIds, toggleSaveProperty } = useAuth();
  const { completedBookings } = useCart();
  const { properties } = useProperties();
  const { inquiries, demarcationBookings } = useInquiries();

  const [activeTab, setActiveTab] = useState('bookings'); // bookings, inquiries, listed, demarcations, saved
  const [selectedBookingForReceipt, setSelectedBookingForReceipt] = useState(null);

  // User's listed properties
  const myListedProperties = properties.filter(p => 
    p.isSellerListing && (p.seller?.email === currentUser?.email || p.seller?.name === currentUser?.name || currentUser?.role === 'seller')
  );

  // Saved properties
  const savedPropertiesList = properties.filter(p => savedPropertyIds.includes(p.id));

  // User's inquiries
  const myInquiries = inquiries.filter(inq => 
    inq.email === currentUser?.email || inq.fullName === currentUser?.name
  );

  // User's demarcations
  const myDemarcations = demarcationBookings.filter(d => 
    d.email === currentUser?.email || d.customerName === currentUser?.name
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      
      {/* User Header Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={currentUser?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"}
            alt={currentUser?.name}
            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-emerald-500/20 shadow-md"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-navy-900">
                {currentUser?.name || 'Jami Dunia User'}
              </h1>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                currentUser?.role === 'admin'
                  ? 'bg-amber-100 text-amber-800'
                  : currentUser?.role === 'seller'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                {currentUser?.role || 'Customer'}
              </span>
            </div>

            <p className="text-xs text-slate-500 flex items-center gap-2">
              <span>{currentUser?.email}</span>
              <span>•</span>
              <span>{currentUser?.phone}</span>
            </p>

            <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>{currentUser?.city || 'Bhubaneswar'}, {currentUser?.district || 'Khordha'}, Odisha</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
          <button
            onClick={() => onOpenSellerModal && onOpenSellerModal()}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List Land for Sale</span>
          </button>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 border-b border-slate-200 text-xs font-bold">
        {[
          { id: 'bookings', label: 'My Bookings', count: completedBookings.length },
          { id: 'inquiries', label: 'My Inquiries', count: myInquiries.length },
          { id: 'demarcations', label: 'Demarcation Requests', count: myDemarcations.length },
          { id: 'listed', label: 'My Listed Lands (Seller)', count: myListedProperties.length },
          { id: 'saved', label: 'Saved Properties', count: savedPropertiesList.length },
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
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* TAB 1: MY BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          {completedBookings.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
              <ShoppingCart className="w-12 h-12 mx-auto mb-2 text-slate-300" />
              <p className="font-bold text-navy-900">No Property Bookings Yet</p>
              <p className="text-xs text-slate-500 mt-1 mb-4">You have not paid a token reservation on any property.</p>
              <button
                onClick={() => setActivePage('buy-land')}
                className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold"
              >
                Browse Land Plots
              </button>
            </div>
          ) : (
            completedBookings.map(b => (
              <div
                key={b.bookingId}
                className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm hover:shadow-md transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-navy-900 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                      Booking #{b.bookingId}
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                      {b.status || 'Token Verified'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-navy-900">{b.propertyTitle}</h3>
                  <p className="text-slate-500">Property ID: <strong className="font-mono text-navy-900">{b.propertyId}</strong> • Amount Paid: <strong className="text-emerald-700 font-bold">{formatINR(b.amountPaid)}</strong></p>
                  <p className="text-slate-400 text-[11px]">Payment Reference: {b.transactionId} via {b.paymentMethod}</p>
                  {b.surveyDate && <p className="text-emerald-700 font-semibold text-[11px]">Scheduled On-Site Inspection: {b.surveyDate}</p>}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setSelectedBookingForReceipt(b)}
                    className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>View Receipt</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: MY INQUIRIES */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          {myInquiries.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
              <MessageSquare className="w-12 h-12 mx-auto mb-2 text-slate-300" />
              <p className="font-bold text-navy-900">No Inquiries Submitted</p>
              <p className="text-xs text-slate-500 mt-1">Send a direct inquiry from any property card to schedule a visit.</p>
            </div>
          ) : (
            myInquiries.map(inq => (
              <div key={inq.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-500">#{inq.id}</span>
                    <span className="font-bold text-navy-900 text-sm">{inq.propertyTitle}</span>
                  </div>
                  <span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded">
                    {inq.status}
                  </span>
                </div>
                <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  "{inq.message}"
                </p>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Type: {inq.inquiryType}</span>
                  <span>Date: {new Date(inq.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: DEMARCATION REQUESTS */}
      {activeTab === 'demarcations' && (
        <div className="space-y-4">
          {myDemarcations.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
              <Compass className="w-12 h-12 mx-auto mb-2 text-slate-300" />
              <p className="font-bold text-navy-900">No Demarcation Bookings</p>
              <p className="text-xs text-slate-500 mt-1 mb-4">Need your plot boundaries measured with electronic Total Station?</p>
              <button
                onClick={() => setActivePage('demarcation')}
                className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold"
              >
                Book Demarcation Service
              </button>
            </div>
          ) : (
            myDemarcations.map(d => (
              <div key={d.referenceId} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    Ref: {d.referenceId}
                  </span>
                  <span className="bg-amber-50 text-amber-800 font-bold px-2.5 py-0.5 rounded-full">
                    {d.status}
                  </span>
                </div>
                <h4 className="font-bold text-navy-900 text-sm">{d.serviceTitle}</h4>
                <p className="text-slate-600">Location: {d.village}, {d.tehsil}, {d.district} (Plot #{d.plotNo})</p>
                <p className="text-slate-500 text-[11px]">Inspection Scheduled: <strong>{d.inspectionDate}</strong> • Assigned Surveyor: <strong>{d.assignedSurveyor}</strong></p>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 4: MY LISTED PROPERTIES (FOR SELLER) */}
      {activeTab === 'listed' && (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-900 flex items-center justify-between">
            <span>All seller submissions require administrator verification before appearing on the public Buy Land section.</span>
            <button
              onClick={() => onOpenSellerModal && onOpenSellerModal()}
              className="px-3.5 py-1.5 bg-blue-600 text-white rounded-xl font-bold shrink-0 text-xs"
            >
              + List Another Land
            </button>
          </div>

          {myListedProperties.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
              <Building2 className="w-12 h-12 mx-auto mb-2 text-slate-300" />
              <p className="font-bold text-navy-900">You Haven't Listed Any Land Yet</p>
              <p className="text-xs text-slate-500 mt-1 mb-4">Sell your land in Odisha with zero intermediary broker commission.</p>
              <button
                onClick={() => onOpenSellerModal && onOpenSellerModal()}
                className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold"
              >
                List Your Land for Sale
              </button>
            </div>
          ) : (
            myListedProperties.map(prop => (
              <div key={prop.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                <div className="flex gap-4">
                  <img
                    src={prop.images?.[0]}
                    alt={prop.title}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-500">ID: {prop.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        prop.approvalStatus === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {prop.approvalStatus === 'Approved' ? 'Approved & Publicly Visible' : 'Pending Admin Verification'}
                      </span>
                    </div>
                    <h4 className="font-bold text-navy-900 text-sm">{prop.title}</h4>
                    <p className="text-slate-500">{prop.location}, {prop.city} • {prop.areaSqFt} sq.ft @ ₹{prop.pricePerSqFt}/sq.ft</p>
                    <p className="font-black text-navy-900 text-sm">{formatINR(prop.totalPrice)}</p>
                  </div>
                </div>

                <div className="text-right text-xs">
                  <span className="text-slate-400 block">Status</span>
                  <span className="font-bold text-navy-900">{prop.status}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 5: SAVED PROPERTIES */}
      {activeTab === 'saved' && (
        <div>
          {savedPropertiesList.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
              <Heart className="w-12 h-12 mx-auto mb-2 text-slate-300" />
              <p className="font-bold text-navy-900">No Saved Properties</p>
              <p className="text-xs text-slate-500 mt-1 mb-4">Click the heart icon on any card to save it for easy comparison.</p>
              <button
                onClick={() => setActivePage('buy-land')}
                className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold"
              >
                Browse Properties
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedPropertiesList.map(prop => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  onBookNow={onBookNow}
                  onSendInquiry={onSendInquiry}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Receipt Modal */}
      {selectedBookingForReceipt && (
        <ReceiptModal
          isOpen={!!selectedBookingForReceipt}
          onClose={() => setSelectedBookingForReceipt(null)}
          booking={selectedBookingForReceipt}
        />
      )}

    </div>
  );
};
