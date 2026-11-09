import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  CheckCircle2, 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Calendar,
  FileText
} from 'lucide-react';
import { formatINR } from '../../utils/formatters';

export const ReceiptModal = ({ booking, isOpen, onClose }) => {
  if (!isOpen || !booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/70 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden my-6 print:m-0 print:shadow-none print:w-full animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Actions (hidden during print) */}
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Official Verified Tax Invoice
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-navy-900 rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Paper */}
        <div className="p-8 space-y-6 text-slate-800 bg-white" id="printable-receipt">
          
          {/* Header & Logo */}
          <div className="flex items-start justify-between border-b pb-6 border-slate-200">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center text-emerald-400 font-black text-sm">
                  JD
                </div>
                <span className="text-2xl font-black text-navy-900 tracking-tight">
                  JAMI<span className="text-emerald-600">DUNIA</span>
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Jami Dunia Technologies Pvt. Ltd. (Odisha Division)
              </p>
              <p className="text-xs text-slate-500">
                Plot 42, Infocity Avenue, Patia, Bhubaneswar, 751024
              </p>
              <p className="text-xs text-slate-500 font-mono">
                GSTIN: 21AAACL9821N1ZM • RERA: ODISHA/REG/2026/0412
              </p>
            </div>

            <div className="text-right">
              <span className="inline-block bg-emerald-50 text-emerald-800 text-xs font-mono font-bold px-3 py-1 rounded-lg border border-emerald-200 mb-2">
                RECEIPT #{booking.bookingId}
              </span>
              <p className="text-xs text-slate-500">
                Date: {new Date(booking.bookingDate || booking.createdAt || Date.now()).toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'short', year: 'numeric'
                })}
              </p>
              <p className="text-xs font-mono text-slate-600">
                Txn Ref: {booking.transactionId || 'pay_od_live_99218274'}
              </p>
            </div>
          </div>

          {/* Customer & Booking Details */}
          <div className="grid grid-cols-2 gap-6 text-xs">
            <div className="space-y-1">
              <span className="text-slate-400 uppercase font-bold text-[10px]">Billed To / Customer:</span>
              <p className="text-sm font-bold text-navy-900">{booking.customerName}</p>
              <p className="text-slate-600">{booking.customerPhone}</p>
              <p className="text-slate-600">{booking.customerEmail}</p>
              {booking.billingAddress && <p className="text-slate-600">{booking.billingAddress}</p>}
            </div>

            <div className="space-y-1 text-right">
              <span className="text-slate-400 uppercase font-bold text-[10px]">Property & Survey Status:</span>
              <p className="text-xs font-bold text-navy-900 font-mono">ID: {booking.propertyId}</p>
              <p className="text-xs font-semibold text-emerald-700">{booking.status || 'Token Advance Confirmed'}</p>
              {booking.surveyDate && (
                <p className="text-xs text-slate-600">
                  Target Inspection Date: <strong>{booking.surveyDate}</strong>
                </p>
              )}
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4">Item & Description</th>
                  <th className="py-2.5 px-4 text-center">Qty</th>
                  <th className="py-2.5 px-4 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 px-4">
                    <p className="font-bold text-navy-900">{booking.propertyTitle}</p>
                    <p className="text-[11px] text-slate-500">
                      Refundable Online Token Advance (deductible from total value of {formatINR(booking.totalPropertyValue || 0)})
                    </p>
                  </td>
                  <td className="py-3 px-4 text-center">1</td>
                  <td className="py-3 px-4 text-right font-bold font-mono">
                    {formatINR(booking.tokenAmount || 25000)}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4">
                    <p className="font-bold text-navy-900">Legal Due Diligence & ROR Mutation Verification</p>
                    <p className="text-[11px] text-slate-500">
                      Patta search at Sub-Registrar / Tehsil + Surveyor site inspection
                    </p>
                  </td>
                  <td className="py-3 px-4 text-center">1</td>
                  <td className="py-3 px-4 text-right font-mono">₹4,500</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">
                    <p className="font-bold text-navy-900">Platform Convenience & Documentation Fee</p>
                  </td>
                  <td className="py-3 px-4 text-center">1</td>
                  <td className="py-3 px-4 text-right font-mono">₹1,500</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-700">GST on Services (18% on ₹6,000)</p>
                  </td>
                  <td className="py-3 px-4 text-center">-</td>
                  <td className="py-3 px-4 text-right font-mono">₹1,080</td>
                </tr>
              </tbody>
              <tfoot className="bg-slate-50 border-t border-slate-200 font-bold">
                <tr>
                  <td colSpan={2} className="py-3 px-4 text-navy-900 text-sm">
                    Total Amount Paid Now:
                  </td>
                  <td className="py-3 px-4 text-right text-base text-emerald-700 font-mono">
                    {formatINR(booking.amountPaid || 32080)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Legal Notice */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 space-y-1">
            <p className="font-bold text-slate-700">Important Terms:</p>
            <p>1. This payment reserves priority booking rights on the referenced property for 15 calendar days.</p>
            <p>2. A dedicated Jami Dunia legal executive will meet you for physical document verification & mutation review.</p>
            <p>3. Balance property consideration is payable only via Cheque/RTGS during deed registration at the Sub-Registrar office.</p>
          </div>

          {/* Authorized Signatory Stamp */}
          <div className="pt-4 flex items-center justify-between text-xs text-slate-500 border-t border-slate-200">
            <div>
              <p className="text-emerald-700 font-bold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Digitally Authenticated by Razorpay Gateway
              </p>
            </div>
            <div className="text-right">
              <div className="w-32 border-b border-slate-400 mb-1"></div>
              <p className="font-bold text-slate-800">Authorized Signatory</p>
              <p className="text-[10px]">Jami Dunia Technologies</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
