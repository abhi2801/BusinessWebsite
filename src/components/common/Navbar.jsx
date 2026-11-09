import React, { useState, useRef, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  ShoppingCart, 
  Heart, 
  User, 
  LogOut, 
  Menu, 
  X, 
  ShieldCheck, 
  Compass, 
  PlusCircle, 
  ChevronDown,
  Trees,
  Crown,
  Home,
  Check,
  ArrowRight,
  FileText,
  Scale
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export const Navbar = ({ activePage, setActivePage, onOpenSellerModal }) => {
  const { currentUser, isAuthenticated, logout, savedPropertyIds } = useAuth();
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  // Dropdown states for Buy, Sell, and Services
  const [buyDropdownOpen, setBuyDropdownOpen] = useState(false);
  const [sellDropdownOpen, setSellDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const buyDropdownRef = useRef(null);
  const sellDropdownRef = useRef(null);
  const servicesDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buyDropdownRef.current && !buyDropdownRef.current.contains(event.target)) {
        setBuyDropdownOpen(false);
      }
      if (sellDropdownRef.current && !sellDropdownRef.current.contains(event.target)) {
        setSellDropdownOpen(false);
      }
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setServicesDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    setBuyDropdownOpen(false);
    setSellDropdownOpen(false);
    setServicesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSellCategory = (category) => {
    setSellDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onOpenSellerModal) {
      onOpenSellerModal(category);
    } else {
      setActivePage('sell-land');
    }
  };

  const isBuyActive = ['buy-land', 'apartments', 'villas', 'houses'].includes(activePage);
  const isSellActive = activePage === 'sell-land';
  const isServicesActive = ['demarcation', 'land-paper-work', 'land-dispute-solution'].includes(activePage);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm transition-all">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo: JAMI DUNIA */}
          <a 
            href="/"
            onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            title="Jami Dunia Home"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-navy-900 to-navy-800 flex items-center justify-center text-emerald-400 shadow-md group-hover:scale-105 transition-transform border border-emerald-500/30">
              <Building2 className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-navy-900">
                  JAMI<span className="text-emerald-600">DUNIA</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200">
                  Odisha
                </span>
              </div>
              <p className="text-[11px] text-slate-600 -mt-0.5 font-semibold tracking-wide">
                Land • Villas • Demarcation
              </p>
            </div>
          </a>

          {/* Desktop Nav Links - Single Line, Clean & Short */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 whitespace-nowrap">
            
            {/* 1. Home */}
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
              className={`px-3 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
                activePage === 'home'
                  ? 'text-emerald-600 bg-emerald-50 font-extrabold'
                  : 'text-slate-700 hover:text-navy-900 hover:bg-slate-100'
              }`}
            >
              Home
            </a>

            {/* 2. Buy Land Menu with Clickable Sub-menu (Never Vanishes) */}
            <div 
              ref={buyDropdownRef}
              className="relative"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setBuyDropdownOpen(prev => !prev);
                  setSellDropdownOpen(false);
                }}
                className={`px-3 py-2 rounded-xl text-sm font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isBuyActive || buyDropdownOpen
                    ? 'text-emerald-600 bg-emerald-50 font-extrabold'
                    : 'text-slate-700 hover:text-navy-900 hover:bg-slate-100'
                }`}
              >
                <span>Buy</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${buyDropdownOpen ? 'rotate-180 text-emerald-600' : 'text-slate-400'}`} />
              </button>

              {/* Sub-menu Dropdown with Click Support & Solid Positioning */}
              {buyDropdownOpen && (
                <div 
                  className="absolute top-full left-0 pt-2 w-72 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-2 text-slate-800">
                    <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider border-b border-slate-100 mb-1">
                      Buy Properties in Odisha
                    </div>
                    
                    <a
                      href="/buy-land"
                      onClick={(e) => { e.preventDefault(); handleNavClick('buy-land'); }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2.5 cursor-pointer ${
                        activePage === 'buy-land' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-emerald-700 flex items-center justify-center shrink-0">
                        <Trees className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-navy-900">Land & Plots</p>
                        <p className="text-[10px] text-slate-500 font-normal">Gharabari, Commercial & Layouts</p>
                      </div>
                    </a>

                    <a
                      href="/apartments"
                      onClick={(e) => { e.preventDefault(); handleNavClick('apartments'); }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2.5 cursor-pointer ${
                        activePage === 'apartments' ? 'bg-amber-50 text-amber-700' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-100/70 text-amber-700 flex items-center justify-center shrink-0">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-navy-900">Apartments</p>
                        <p className="text-[10px] text-slate-500 font-normal">1, 2, 3 & 4 BHK Flats & Penthouses</p>
                      </div>
                    </a>

                    <a
                      href="/villas"
                      onClick={(e) => { e.preventDefault(); handleNavClick('villas'); }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2.5 cursor-pointer ${
                        activePage === 'villas' ? 'bg-purple-50 text-purple-700' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-100/70 text-purple-700 flex items-center justify-center shrink-0">
                        <Crown className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-navy-900">Villas</p>
                        <p className="text-[10px] text-slate-500 font-normal">Luxury Gated Duplex & Triplex</p>
                      </div>
                    </a>

                    <a
                      href="/independent-houses"
                      onClick={(e) => { e.preventDefault(); handleNavClick('houses'); }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2.5 cursor-pointer ${
                        activePage === 'houses' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-blue-700 flex items-center justify-center shrink-0">
                        <Home className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-navy-900">Independent Houses</p>
                        <p className="text-[10px] text-slate-500 font-normal">Freehold Homes & Bungalows</p>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Sell Land Menu with Clickable Sub-menu (Never Vanishes) */}
            <div 
              ref={sellDropdownRef}
              className="relative"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSellDropdownOpen(prev => !prev);
                  setBuyDropdownOpen(false);
                }}
                className={`px-3 py-2 rounded-xl text-sm font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isSellActive || sellDropdownOpen
                    ? 'text-emerald-600 bg-emerald-50 font-extrabold'
                    : 'text-slate-700 hover:text-navy-900 hover:bg-slate-100'
                }`}
              >
                <span>Sell</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${sellDropdownOpen ? 'rotate-180 text-emerald-600' : 'text-slate-400'}`} />
              </button>

              {/* Sell Sub-menu Dropdown */}
              {sellDropdownOpen && (
                <div 
                  className="absolute top-full left-0 pt-2 w-72 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-2 text-slate-800">
                    <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider border-b border-slate-100 mb-1">
                      List & Sell (0% Brokerage)
                    </div>

                    <a
                      href="/sell-land"
                      onClick={(e) => { e.preventDefault(); handleSellCategory('land'); }}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2.5 text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-emerald-700 flex items-center justify-center shrink-0">
                        <Trees className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-navy-900">Sell Land / Plot</p>
                        <p className="text-[10px] text-slate-500 font-normal">Free listing with title check</p>
                      </div>
                    </a>

                    <a
                      href="/sell-land"
                      onClick={(e) => { e.preventDefault(); handleSellCategory('apartment'); }}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2.5 text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-100/70 text-amber-700 flex items-center justify-center shrink-0">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-navy-900">Sell Apartment</p>
                        <p className="text-[10px] text-slate-500 font-normal">Connect with verified buyers</p>
                      </div>
                    </a>

                    <a
                      href="/sell-land"
                      onClick={(e) => { e.preventDefault(); handleSellCategory('villa'); }}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2.5 text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-100/70 text-purple-700 flex items-center justify-center shrink-0">
                        <Crown className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-navy-900">Sell Villa</p>
                        <p className="text-[10px] text-slate-500 font-normal">Reach premium NRI investors</p>
                      </div>
                    </a>

                    <a
                      href="/sell-land"
                      onClick={(e) => { e.preventDefault(); handleSellCategory('house'); }}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2.5 text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-blue-700 flex items-center justify-center shrink-0">
                        <Home className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-navy-900">Sell Independent House</p>
                        <p className="text-[10px] text-slate-500 font-normal">Duplexes & bungalows</p>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Services Menu with Dropdown (Demarcation, Paper Work, Dispute Solution) */}
            <div 
              ref={servicesDropdownRef}
              className="relative"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setServicesDropdownOpen(prev => !prev);
                  setBuyDropdownOpen(false);
                  setSellDropdownOpen(false);
                }}
                className={`px-3 py-2 rounded-xl text-sm font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isServicesActive || servicesDropdownOpen
                    ? 'text-emerald-600 bg-emerald-50 font-extrabold'
                    : 'text-slate-700 hover:text-navy-900 hover:bg-slate-100'
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-emerald-600' : 'text-slate-400'}`} />
              </button>

              {servicesDropdownOpen && (
                <div 
                  className="absolute top-full left-0 pt-2 w-72 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-2 text-slate-800">
                    <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider border-b border-slate-100 mb-1">
                      Odisha Land Services
                    </div>
                    
                    <a
                      href="/land-demarcation"
                      onClick={(e) => { e.preventDefault(); handleNavClick('demarcation'); }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2.5 cursor-pointer ${
                        activePage === 'demarcation' ? 'bg-teal-50 text-teal-700' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-teal-100/70 text-teal-700 flex items-center justify-center shrink-0">
                        <Compass className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-navy-900">Land Demarcation</p>
                        <p className="text-[10px] text-slate-500 font-normal">Total Station GPS Survey</p>
                      </div>
                    </a>

                    <a
                      href="/land-paper-work"
                      onClick={(e) => { e.preventDefault(); handleNavClick('land-paper-work'); }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2.5 cursor-pointer ${
                        activePage === 'land-paper-work' ? 'bg-amber-50 text-amber-700' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-100/70 text-amber-700 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-navy-900">Land Paper Work</p>
                        <p className="text-[10px] text-slate-500 font-normal">ROR, Mutation & Deed Registration</p>
                      </div>
                    </a>

                    <a
                      href="/land-dispute-solution"
                      onClick={(e) => { e.preventDefault(); handleNavClick('land-dispute-solution'); }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2.5 cursor-pointer ${
                        activePage === 'land-dispute-solution' ? 'bg-rose-50 text-rose-700' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-rose-100/70 text-rose-700 flex items-center justify-center shrink-0">
                        <Scale className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-navy-900">Land Dispute Solution</p>
                        <p className="text-[10px] text-slate-500 font-normal">Boundary & Revenue Mediation</p>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* 5. About Us */}
            <a
              href="/about-us"
              onClick={(e) => { e.preventDefault(); handleNavClick('about-us'); }}
              className={`px-3 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                activePage === 'about-us' || activePage === 'about'
                  ? 'text-emerald-600 bg-emerald-50 font-extrabold'
                  : 'text-slate-700 hover:text-navy-900 hover:bg-slate-100'
              }`}
            >
              About Us
            </a>

            {/* 6. Contact Us */}
            <a
              href="/contact-us"
              onClick={(e) => { e.preventDefault(); handleNavClick('contact-us'); }}
              className={`px-3 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                activePage === 'contact-us' || activePage === 'contact'
                  ? 'text-emerald-600 bg-emerald-50 font-extrabold'
                  : 'text-slate-700 hover:text-navy-900 hover:bg-slate-100'
              }`}
            >
              Contact Us
            </a>

          </nav>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* Quick List Property button */}
            <button
              onClick={() => {
                if (onOpenSellerModal) onOpenSellerModal('land');
                else handleNavClick('sell-land');
              }}
              className="hidden md:flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-sm hover:shadow transition cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Property</span>
            </button>

            {/* Saved properties button */}
            <a
              href="/user-dashboard"
              onClick={(e) => { e.preventDefault(); handleNavClick('profile'); }}
              title="Saved Properties"
              className="relative p-2.5 text-slate-600 hover:text-navy-900 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            >
              <Heart className="w-5 h-5" />
              {savedPropertyIds.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {savedPropertyIds.length}
                </span>
              )}
            </a>

            {/* Cart Icon */}
            <a
              href="/cart"
              onClick={(e) => { e.preventDefault(); handleNavClick('cart'); }}
              title="Booking Cart"
              className="relative p-2.5 text-slate-600 hover:text-emerald-600 hover:bg-slate-100 rounded-xl transition group cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-105 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-emerald-600 text-white text-[11px] font-black rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </a>

            {/* User Profile / Auth State */}
            {currentUser ? (
              <div ref={userDropdownRef} className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-2xl hover:bg-slate-100 transition border border-slate-200/80 cursor-pointer"
                >
                  <img
                    src={currentUser.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentUser.name)}`}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-xl object-cover border border-emerald-500"
                  />
                  <div className="hidden xl:block text-left text-xs leading-tight">
                    <p className="font-bold text-navy-900 truncate max-w-[100px]">{currentUser.name}</p>
                    <p className="text-[10px] font-semibold text-emerald-700 uppercase">{currentUser.role || 'User'}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* User Dropdown Menu */}
                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 text-slate-800 z-50 animate-in fade-in zoom-in-95"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-navy-900 truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {currentUser.role === 'admin' ? 'Administrator' : currentUser.role === 'seller' ? 'Property Seller' : 'Verified Buyer'}
                      </span>
                    </div>

                    <div className="py-1">
                      <a
                        href="/user-dashboard"
                        onClick={(e) => { e.preventDefault(); handleNavClick('profile'); setUserDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                      >
                        <User className="w-4 h-4 text-slate-500" /> My Profile & Dashboard
                      </a>
                      <a
                        href="/cart"
                        onClick={(e) => { e.preventDefault(); handleNavClick('cart'); setUserDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                      >
                        <ShoppingCart className="w-4 h-4 text-slate-500" /> Booking Cart ({cartCount})
                      </a>
                      <a
                        href="/land-demarcation"
                        onClick={(e) => { e.preventDefault(); handleNavClick('demarcation'); setUserDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                      >
                        <Compass className="w-4 h-4 text-slate-500" /> Demarcation Services
                      </a>
                      
                      {currentUser.role === 'admin' && (
                        <a
                          href="/admin-dashboard"
                          onClick={(e) => { e.preventDefault(); handleNavClick('admin'); setUserDropdownOpen(false); }}
                          className="w-full text-left px-4 py-2 text-xs font-bold text-amber-700 bg-amber-50/60 hover:bg-amber-100/60 flex items-center gap-2 cursor-pointer"
                        >
                          <ShieldCheck className="w-4 h-4 text-amber-600" /> Administrator Center
                        </a>
                      )}
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                      <button
                        type="button"
                        onClick={() => { logout(); setUserDropdownOpen(false); handleNavClick('home'); }}
                        className="w-full text-left px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <a
                  href="/sign-in"
                  onClick={(e) => { e.preventDefault(); handleNavClick('auth-login'); }}
                  className="px-3.5 py-2 text-xs font-bold text-navy-900 hover:text-emerald-600 rounded-xl hover:bg-slate-100 transition cursor-pointer"
                >
                  Sign In
                </a>
                <a
                  href="/sign-up"
                  onClick={(e) => { e.preventDefault(); handleNavClick('auth-signup'); }}
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm hover:shadow transition cursor-pointer"
                >
                  Sign Up
                </a>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
              className={`block w-full text-left px-3 py-2 rounded-xl text-sm font-bold ${
                activePage === 'home' ? 'text-emerald-700 bg-emerald-50' : 'text-slate-700'
              }`}
            >
              Home
            </a>

            {/* Mobile Buy Accordion */}
            <div className="p-2 bg-slate-50 rounded-xl space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400 block px-2">Buy Properties</span>
              <a href="/buy-land" onClick={(e) => { e.preventDefault(); handleNavClick('buy-land'); }} className="block w-full text-left px-2 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700">
                • Land & Plots
              </a>
              <a href="/apartments" onClick={(e) => { e.preventDefault(); handleNavClick('apartments'); }} className="block w-full text-left px-2 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700">
                • Apartments (1, 2, 3, 4 BHK)
              </a>
              <a href="/villas" onClick={(e) => { e.preventDefault(); handleNavClick('villas'); }} className="block w-full text-left px-2 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700">
                • Luxury Villas
              </a>
              <a href="/independent-houses" onClick={(e) => { e.preventDefault(); handleNavClick('houses'); }} className="block w-full text-left px-2 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700">
                • Independent Houses
              </a>
            </div>

            {/* Mobile Sell Accordion */}
            <div className="p-2 bg-slate-50 rounded-xl space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400 block px-2">Sell Properties</span>
              <a href="/sell-land" onClick={(e) => { e.preventDefault(); handleSellCategory('land'); }} className="block w-full text-left px-2 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700">
                • Sell Land / Plot
              </a>
              <a href="/sell-land" onClick={(e) => { e.preventDefault(); handleSellCategory('apartment'); }} className="block w-full text-left px-2 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700">
                • Sell Apartment
              </a>
              <a href="/sell-land" onClick={(e) => { e.preventDefault(); handleSellCategory('villa'); }} className="block w-full text-left px-2 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700">
                • Sell Villa
              </a>
              <a href="/sell-land" onClick={(e) => { e.preventDefault(); handleSellCategory('house'); }} className="block w-full text-left px-2 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700">
                • Sell Independent House
              </a>
            </div>

            {/* Mobile Services Accordion */}
            <div className="p-2 bg-slate-50 rounded-xl space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400 block px-2">Land & Legal Services</span>
              <a href="/land-demarcation" onClick={(e) => { e.preventDefault(); handleNavClick('demarcation'); }} className="block w-full text-left px-2 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700">
                • Land Demarcation (GPS Survey)
              </a>
              <a href="/land-paper-work" onClick={(e) => { e.preventDefault(); handleNavClick('land-paper-work'); }} className="block w-full text-left px-2 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700">
                • Land Paper Work (ROR, Mutation, EC)
              </a>
              <a href="/land-dispute-solution" onClick={(e) => { e.preventDefault(); handleNavClick('land-dispute-solution'); }} className="block w-full text-left px-2 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700">
                • Land Dispute Solution (Mediation)
              </a>
            </div>
            <a
              href="/about-us"
              onClick={(e) => { e.preventDefault(); handleNavClick('about-us'); }}
              className={`block w-full text-left px-3 py-2 rounded-xl text-sm font-bold ${
                activePage === 'about-us' || activePage === 'about' ? 'text-emerald-700 bg-emerald-50' : 'text-slate-700'
              }`}
            >
              About Us
            </a>
            <a
              href="/contact-us"
              onClick={(e) => { e.preventDefault(); handleNavClick('contact-us'); }}
              className={`block w-full text-left px-3 py-2 rounded-xl text-sm font-bold ${
                activePage === 'contact-us' || activePage === 'contact' ? 'text-emerald-700 bg-emerald-50' : 'text-slate-700'
              }`}
            >
              Contact Us
            </a>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                if (onOpenSellerModal) onOpenSellerModal('land');
                else handleNavClick('sell-land');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold py-2.5 rounded-xl shadow-sm text-xs cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" /> List Your Property for Sale
            </button>

            {!currentUser && (
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <a
                  href="/sign-in"
                  onClick={(e) => { e.preventDefault(); handleNavClick('auth-login'); }}
                  className="text-center py-2 text-xs font-bold text-navy-900 border border-slate-200 rounded-xl"
                >
                  Sign In
                </a>
                <a
                  href="/sign-up"
                  onClick={(e) => { e.preventDefault(); handleNavClick('auth-signup'); }}
                  className="text-center py-2 text-xs font-bold text-white bg-emerald-600 rounded-xl"
                >
                  Sign Up
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
