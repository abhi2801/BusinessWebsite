import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building2, 
  MessageSquare
} from 'lucide-react';
import { saveContactMessageToSupabase } from '../lib/supabase';

export const ContactUsPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Property Consultation',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    saveContactMessageToSupabase(formData).then(res => {
      if (res.success) {
        console.log('Contact message saved to Supabase');
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-navy-900 mt-2">
          Contact Jami Dunia Odisha Desk
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Have inquiries about land titles, plot demarcation, apartment booking, or listing your property? Our representatives are ready to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Information Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
            <h3 className="font-black text-navy-900 text-base pb-2 border-b border-slate-100">
              Corporate Headquarters
            </h3>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-navy-900 block font-bold text-sm">Bhubaneswar Main Office:</strong>
                  <p className="mt-0.5">Plot 42, Infocity Avenue, Patia, Bhubaneswar, Odisha - 751024</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">(Near TCS Infotech Campus & KIIT)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-navy-900 block font-bold text-sm">Customer Helpline:</strong>
                  <p className="mt-0.5">+91 (0674) 2501001 / +91 94370 12890</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">Toll Free: 1800-419-JAMIDUNIA</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-navy-900 block font-bold text-sm">Email Address:</strong>
                  <p className="mt-0.5">support@jamidunia.in / legal@jamidunia.in</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-navy-900 block font-bold text-sm">Working Hours:</strong>
                  <p className="mt-0.5">Monday to Saturday: 9:00 AM – 7:00 PM IST</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">Sunday: 10:00 AM – 2:00 PM (Site Visits)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Regional Hubs Box */}
          <div className="bg-slate-50 rounded-3xl border border-slate-200/80 p-6 text-xs space-y-2">
            <h4 className="font-bold text-navy-900 text-sm">Field Coordination Hubs:</h4>
            <p>• <strong>Bhubaneswar Central:</strong> Infocity Patia & Master Canteen</p>
            <p>• <strong>Cuttack Desk:</strong> CDA Sector 9, Riverbank Road</p>
            <p>• <strong>Puri Coastal Desk:</strong> VIP Road, Near Sea Beach Police Station</p>
          </div>

        </div>

        {/* Right Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-sm">
            <h3 className="text-lg font-black text-navy-900 mb-1">
              Send Direct Message
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Our Bhubaneswar property desk will review your details and respond with official guidance.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-navy-900 text-base">Message Sent Successfully!</h4>
                <p className="text-xs text-slate-600">
                  Thank you for reaching out. We have logged your request and a dedicated representative will contact you.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priyabrata Mohanty"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98610 XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Subject / Query Type</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full p-3 rounded-xl border border-slate-200 bg-white"
                    >
                      <option value="Property Consultation">General Property Consultation</option>
                      <option value="Land Demarcation Query">Land Demarcation & Survey</option>
                      <option value="Selling Land">Listing Land for Sale</option>
                      <option value="Legal ROR Title Search">Legal ROR / Patta Verification</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about the property, plot dimensions, mouza, or assistance required..."
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-navy-900 hover:bg-emerald-600 text-white font-black text-xs rounded-xl shadow transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
