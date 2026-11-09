import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  QrCode, 
  CreditCard, 
  Building, 
  Smartphone, 
  CheckCircle2, 
  AlertCircle,
  Check
} from 'lucide-react';
import { formatINR } from '../../utils/formatters';

export const RazorpayModal = ({
  isOpen,
  onClose,
  amount,
  bookingDetails,
  onSuccess
}) => {
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'card', 'netbanking'
  const [upiId, setUpiId] = useState('user@okhdfcbank');
  const [selectedApp, setSelectedApp] = useState('gpay');
  const [selectedBank, setSelectedBank] = useState('SBI');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('•••');
  const [cardHolder, setCardHolder] = useState(bookingDetails?.customerName || 'Rajesh Mohanty');

  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState('select'); // 'select', 'processing', 'success'

  if (!isOpen) return null;

  const handlePay = (e) => {
    e.preventDefault();
    setProcessing(true);
    setStep('processing');

    setTimeout(() => {
      setProcessing(false);
      setStep('success');

      // Generate simulated Razorpay payment signature & ID
      const paymentResponse = {
        razorpay_payment_id: `pay_od_${Math.random().toString(36).substring(2, 12)}`,
        razorpay_order_id: `order_${Math.random().toString(36).substring(2, 10)}`,
        razorpay_signature: `sig_${Math.random().toString(36).substring(2, 16)}`,
        amount: amount,
        currency: "INR",
        method: paymentMethod,
        timestamp: new Date().toISOString()
      };

      setTimeout(() => {
        if (onSuccess) onSuccess(paymentResponse);
      }, 1200);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/70 backdrop-blur-sm animate-in fade-in">
      <div 
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Razorpay Brand Header */}
        <div className="bg-[#0c2340] text-white p-5 flex items-start justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm tracking-tight text-white">
                JAMI<span className="text-emerald-400">DUNIA</span>
              </span>
              <span className="text-[10px] bg-blue-600/60 px-1.5 py-0.2 rounded font-mono">
                SECURE GATEWAY
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1">
              Token Property Booking Advance
            </p>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              {formatINR(amount)}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 relative z-10">
            <button
              onClick={onClose}
              disabled={processing}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1 text-[10px] text-slate-300 font-semibold bg-white/10 px-2 py-0.5 rounded-full">
              <Lock className="w-2.5 h-2.5 text-emerald-400" /> Razorpay Secured
            </div>
          </div>

          {/* Decorative background shape */}
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-blue-500/10 blur-xl" />
        </div>

        {/* Modal Body */}
        {step === 'processing' ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <div>
              <h4 className="text-base font-bold text-navy-900">
                Contacting Bank Gateway...
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Please do not refresh the page or press back. Encrypted token authentication in progress.
              </p>
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              Verified by NPCI / Razorpay INR Network
            </div>
          </div>
        ) : step === 'success' ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h4 className="text-xl font-black text-navy-900">
                Payment Authorized!
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Amount {formatINR(amount)} successfully debited. Generating your legal booking certificate...
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePay} className="p-5 space-y-4">
            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-2xl text-xs font-bold text-slate-600">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
                  paymentMethod === 'upi' ? 'bg-white text-navy-900 shadow-sm' : 'hover:text-navy-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
                  paymentMethod === 'card' ? 'bg-white text-navy-900 shadow-sm' : 'hover:text-navy-900'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                <span>Cards</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
                  paymentMethod === 'netbanking' ? 'bg-white text-navy-900 shadow-sm' : 'hover:text-navy-900'
                }`}
              >
                <Building className="w-3.5 h-3.5 text-purple-600" />
                <span>NetBanking</span>
              </button>
            </div>

            {/* UPI Option */}
            {paymentMethod === 'upi' && (
              <div className="space-y-3 pt-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Select Instant UPI App
                </span>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'gpay', label: 'Google Pay', color: 'border-blue-300' },
                    { id: 'phonepe', label: 'PhonePe', color: 'border-purple-300' },
                    { id: 'paytm', label: 'Paytm UPI', color: 'border-sky-300' }
                  ].map(app => (
                    <button
                      type="button"
                      key={app.id}
                      onClick={() => setSelectedApp(app.id)}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-slate-800 text-center transition flex flex-col items-center gap-1 ${
                        selectedApp === app.id ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span>{app.label}</span>
                      {selectedApp === app.id && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    Or Enter Any Virtual Payment Address (UPI ID)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="mobilenumber@upi or name@okaxis"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
                  <QrCode className="w-4 h-4 text-slate-700 shrink-0" />
                  <span>Scan QR code with any UPI app on checkout</span>
                </div>
              </div>
            )}

            {/* Cards Option */}
            {paymentMethod === 'card' && (
              <div className="space-y-2.5 pt-1">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    Card Number (RuPay, Visa, MasterCard)
                  </label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Expiry</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">CVV</label>
                    <input
                      type="password"
                      maxLength={4}
                      required
                      placeholder="•••"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    required
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>
            )}

            {/* NetBanking Option */}
            {paymentMethod === 'netbanking' && (
              <div className="space-y-3 pt-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Popular Indian Banks
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {["State Bank of India (SBI)", "HDFC Bank", "ICICI Bank", "Axis Bank", "Punjab National Bank", "Odisha Gramya Bank"].map(bank => (
                    <button
                      type="button"
                      key={bank}
                      onClick={() => setSelectedBank(bank)}
                      className={`p-2 rounded-xl border text-left text-xs font-semibold truncate transition ${
                        selectedBank === bank ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {bank}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Security Guarantee Note */}
            <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-bit Bank Grade Encryption • RERA Odisha Compliant</span>
            </div>

            {/* Pay Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
            >
              <span>Pay {formatINR(amount)}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
