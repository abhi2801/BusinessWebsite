import React, { useState } from 'react';
import { Star, Quote, Send, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../../data/mockProperties';
import { saveInquiryToSupabase } from '../../lib/supabase';

export const Testimonials = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200">
            Real Stories, Real Verification
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-navy-900 mt-2 tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Hear from genuine buyers, property sellers, and investors across Odisha who transacted safely with Jami Dunia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <div 
              key={idx}
              className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-300" />
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-6">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500/20"
                />
                <div>
                  <h4 className="text-xs font-bold text-navy-900">{item.name}</h4>
                  <p className="text-[11px] text-slate-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export const QuickContact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    service: 'Buying Land in Bhubaneswar / Cuttack',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    saveInquiryToSupabase({
      fullName: formData.name,
      mobile: formData.mobile,
      email: `${formData.mobile.replace(/[^0-9]/g, '') || 'lead'}@inquiry.jamidunia.in`,
      inquiryType: formData.service,
      propertyTitle: `Homepage Quick Consultation: ${formData.service}`,
      message: formData.message
    }).then(res => {
      setLoading(false);
      setSubmitted(true);
    }).catch(() => {
      setLoading(false);
      setSubmitted(true);
    });
  };

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Get In Touch With Real Estate Experts
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mt-2">
              Have Questions About Buying or Demarcating Land in Odisha?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Send us your query and our Bhubaneswar team will respond with verified ROR guidance and site appointment options.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-lg font-bold text-navy-900">Message Received!</h4>
              <p className="text-xs text-slate-600">Our customer representative will call you shortly on your provided number.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sujit Das"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Mobile Number (India) *</label>
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="+91 94370 XXXXX"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 block mb-1">Interested Service *</label>
                <select 
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 bg-white"
                >
                  <option value="Buying Land in Bhubaneswar / Cuttack">Buying Land in Bhubaneswar / Cuttack</option>
                  <option value="Booking Land Demarcation & Survey">Booking Land Demarcation & Survey</option>
                  <option value="Selling Land / Free Valuation">Selling Land / Free Valuation</option>
                  <option value="Apartments or Villas">Apartments or Villas</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 block mb-1">Your Message / Specific Requirements *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please specify location preferences, budget, or plot details..."
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-navy-900 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow transition flex items-center justify-center gap-2"
                >
                  {loading ? 'Submitting...' : 'Submit Inquiry Request'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
