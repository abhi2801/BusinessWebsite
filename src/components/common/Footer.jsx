import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Clock, 
  Award,
} from 'lucide-react';

export const Footer = ({ setActivePage }) => {
  const handleNav = (e, pageId) => {
    e.preventDefault();
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Vision */}
          <div className="lg:col-span-2 space-y-4">
            <a 
              href="/" 
              onClick={(e) => handleNav(e, 'home')}
              className="flex items-center gap-3 group inline-block"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-emerald-600 flex items-center justify-center text-white shadow-md">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                JAMI<span className="text-emerald-400">DUNIA</span>
              </span>
            </a>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Odisha's premier verified real estate & land marketplace. Connecting buyers, sellers, and certified revenue surveyors with 100% clear titles, transparent automated land price calculations, and GPS total station land demarcation.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-navy-800 text-emerald-400 border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Stitiban ROR Verified
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-navy-800 text-amber-300 border border-amber-500/30">
                <Award className="w-3.5 h-3.5" /> Licensed Revenue Surveyors
              </span>
            </div>
          </div>

          {/* Quick Property Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Explore Properties
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a 
                  href="/buy-land" 
                  onClick={(e) => handleNav(e, 'buy-land')} 
                  className="hover:text-emerald-400 transition block"
                >
                  Buy Land in Odisha
                </a>
              </li>
              <li>
                <a 
                  href="/apartments" 
                  onClick={(e) => handleNav(e, 'apartments')} 
                  className="hover:text-emerald-400 transition block"
                >
                  Luxury Apartments
                </a>
              </li>
              <li>
                <a 
                  href="/villas" 
                  onClick={(e) => handleNav(e, 'villas')} 
                  className="hover:text-emerald-400 transition block"
                >
                  Gated Villas
                </a>
              </li>
              <li>
                <a 
                  href="/independent-houses" 
                  onClick={(e) => handleNav(e, 'houses')} 
                  className="hover:text-emerald-400 transition block"
                >
                  Independent Houses
                </a>
              </li>
              <li>
                <a 
                  href="/sell-land" 
                  onClick={(e) => handleNav(e, 'sell-land')} 
                  className="hover:text-emerald-400 transition block"
                >
                  List Property for Sale
                </a>
              </li>
            </ul>
          </div>

          {/* Demarcation & Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Land & Legal Services
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a 
                  href="/land-demarcation" 
                  onClick={(e) => handleNav(e, 'demarcation')} 
                  className="hover:text-emerald-400 transition block"
                >
                  Land Demarcation (GPS)
                </a>
              </li>
              <li>
                <a 
                  href="/land-paper-work" 
                  onClick={(e) => handleNav(e, 'land-paper-work')} 
                  className="hover:text-emerald-400 transition block"
                >
                  Land Paper Work & ROR
                </a>
              </li>
              <li>
                <a 
                  href="/land-dispute-solution" 
                  onClick={(e) => handleNav(e, 'land-dispute-solution')} 
                  className="hover:text-emerald-400 transition block"
                >
                  Land Dispute Solution
                </a>
              </li>
              <li>
                <a 
                  href="/land-paper-work" 
                  onClick={(e) => handleNav(e, 'land-paper-work')} 
                  className="hover:text-emerald-400 transition block"
                >
                  Mutation & e-Pauchar
                </a>
              </li>
              <li>
                <a 
                  href="/land-paper-work" 
                  onClick={(e) => handleNav(e, 'land-paper-work')} 
                  className="hover:text-emerald-400 transition block"
                >
                  30-Year EC & Title Search
                </a>
              </li>
            </ul>
          </div>

          {/* Corporate Office & Helpline */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Odisha Office
            </h4>
            <div className="space-y-2.5 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <span>Plot 42, Infocity Avenue, Patia, Bhubaneswar, Odisha 751024</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+916742501001" className="hover:text-white transition">+91 (0674) 2501001</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:support@jamidunia.in" className="hover:text-white transition">support@jamidunia.in</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mon - Sat: 9:00 AM - 7:00 PM IST</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} JAMI DUNIA Technologies Pvt. Ltd. All Rights Reserved. Built for India (Odisha Real Estate).</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Currency: <strong className="text-emerald-400">₹ INR</strong></span>
            <span>RERA Odisha Compliant</span>
            <span>Razorpay Secure Payments</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
