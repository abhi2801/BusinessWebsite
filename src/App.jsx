import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { PropertyProvider } from './context/PropertyContext';
import { CartProvider } from './context/CartContext';
import { InquiryProvider } from './context/InquiryContext';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { InquiryModal } from './components/common/InquiryModal';
import { QuickViewModal } from './components/common/QuickViewModal';
import { SellerSubmissionModal } from './components/user/SellerSubmissionModal';

// Pages
import { HomePage } from './pages/HomePage';
import { BuyLandPage } from './pages/BuyLandPage';
import { SellLandPage } from './pages/SellLandPage';
import { ApartmentsPage } from './pages/ApartmentsPage';
import { VillasPage } from './pages/VillasPage';
import { IndependentHousesPage } from './pages/IndependentHousesPage';
import { DemarcationPage } from './pages/DemarcationPage';
import { LandPaperWorkPage } from './pages/LandPaperWorkPage';
import { LandDisputePage } from './pages/LandDisputePage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AuthPage } from './pages/AuthPage';
import { AdminPage } from './pages/AdminPage';
import { UserDashboardPage } from './pages/UserDashboardPage';

// SEO Title & Description Registry
const PAGE_SEO_METADATA = {
  'home': {
    title: 'Jami Dunia | Odisha\'s Premier Verified Land, Villas & Demarcation Portal',
    description: 'Explore verified land plots, gated villas, luxury apartments, and book licensed GPS total station land demarcation across Odisha.'
  },
  'buy-land': {
    title: 'Buy Verified Land & Plots in Odisha | Jami Dunia',
    description: 'Browse 100% legal ROR verified land plots for sale in Bhubaneswar, Cuttack, Puri, Sambalpur with automated price calculations.'
  },
  'apartments': {
    title: 'Luxury Apartments & Flats in Odisha - 1, 2, 3 & 4 BHK | Jami Dunia',
    description: 'Discover premium RERA-approved flats and penthouses in premier residential corridors of Odisha.'
  },
  'villas': {
    title: 'Luxury Villas & Duplexes for Sale in Odisha | Jami Dunia',
    description: 'Explore gated luxury villas, duplex and triplex homes with clubhouse amenities across Odisha.'
  },
  'houses': {
    title: 'Independent Houses & Bungalows in Odisha | Jami Dunia',
    description: 'Buy ready-to-move and freehold independent houses and bungalows with clear titles in Odisha.'
  },
  'sell-land': {
    title: 'Sell Land & Property Online in Odisha - 0% Brokerage | Jami Dunia',
    description: 'List your land plot, villa, apartment, or house for sale with verified title checks and direct buyer connections.'
  },
  'demarcation': {
    title: 'Book Licensed Total Station Land Demarcation in Odisha | Jami Dunia',
    description: 'Schedule certified revenue land measurement, DGPS boundary identification, and khata demarcation by licensed revenue surveyors.'
  },
  'land-paper-work': {
    title: 'Land Paper Work & Document Verification in Odisha | Jami Dunia',
    description: 'Certified Bhulekh ROR Khatiyan verification, Tahasil mutation, sale deed drafting and 30-year non-encumbrance reports in Odisha.'
  },
  'land-dispute-solution': {
    title: 'Land Dispute Solution & Boundary Arbitration in Odisha | Jami Dunia',
    description: 'Fast, legal resolution of land boundary clashes, encroachments, revenue appeals and family partition with certified surveyors.'
  },
  'about-us': {
    title: 'About Us - Odisha\'s Most Trusted Real Estate Ecosystem | Jami Dunia',
    description: 'Learn about Jami Dunia, founded to eliminate land boundary conflicts, opaque pricing markups, and unverified records.'
  },
  'contact-us': {
    title: 'Contact Us - Odisha Property Support Desk | Jami Dunia',
    description: 'Connect with Jami Dunia customer advisors in Bhubaneswar for site visits, demarcation queries, and property consultations.'
  },
  'cart': {
    title: 'Property Booking Cart | Jami Dunia',
    description: 'Review your selected properties and transparent booking advance calculations before proceeding to checkout.'
  },
  'checkout': {
    title: 'Secure Property Booking Checkout | Jami Dunia',
    description: 'Complete your booking with transparent INR pricing and Razorpay secure payment gateway integration.'
  },
  'order-confirmation': {
    title: 'Booking Confirmed | Jami Dunia',
    description: 'Your property booking request and demarcation order details.'
  },
  'auth-login': {
    title: 'Sign In to Your Account | Jami Dunia',
    description: 'Sign in to access your saved properties, inquiries, and customer dashboard.'
  },
  'auth-signup': {
    title: 'Create an Account | Jami Dunia',
    description: 'Register for a verified buyer or seller account on Jami Dunia.'
  },
  'auth': {
    title: 'Sign In / Sign Up | Jami Dunia',
    description: 'Sign in or create your verified real estate account on Jami Dunia.'
  },
  'admin': {
    title: 'Administrator Control Center | Jami Dunia',
    description: 'Manage property listings, verify seller submissions, update demarcation requests, and monitor bookings.'
  },
  'profile': {
    title: 'Customer Dashboard & Saved Properties | Jami Dunia',
    description: 'Track your scheduled site visits, demarcation status, inquiries, and saved properties.'
  }
};

// URL to internal page resolver
const getPageFromLocation = () => {
  // First check hash (e.g. #/buy-land)
  let raw = window.location.hash ? window.location.hash.replace(/^#\/?/, '') : '';
  // If no hash, check pathname (e.g. /buy-land)
  if (!raw && window.location.pathname) {
    raw = window.location.pathname.replace(/^\//, '');
  }
  const clean = raw.trim().toLowerCase();

  if (!clean || clean === 'home') return 'home';
  if (clean === 'buy' || clean === 'buy-land' || clean === 'land') return 'buy-land';
  if (clean === 'apartments' || clean === 'apartment') return 'apartments';
  if (clean === 'villas' || clean === 'villa') return 'villas';
  if (clean === 'houses' || clean === 'house' || clean === 'independent-houses') return 'houses';
  if (clean === 'sell' || clean === 'sell-land') return 'sell-land';
  if (clean === 'demarcation' || clean === 'land-demarcation') return 'demarcation';
  if (clean === 'paper-work' || clean === 'land-paper-work' || clean === 'land-paperwork' || clean === 'paperwork') return 'land-paper-work';
  if (clean === 'dispute' || clean === 'disputes' || clean === 'land-dispute' || clean === 'land-dispute-solution' || clean === 'dispute-solution') return 'land-dispute-solution';
  if (clean === 'about' || clean === 'about-us') return 'about-us';
  if (clean === 'contact' || clean === 'contact-us') return 'contact-us';
  if (clean === 'cart') return 'cart';
  if (clean === 'checkout') return 'checkout';
  if (clean === 'order-confirmation' || clean === 'confirmation') return 'order-confirmation';
  if (clean === 'sign-in' || clean === 'signin' || clean === 'login') return 'auth-login';
  if (clean === 'sign-up' || clean === 'signup' || clean === 'register') return 'auth-signup';
  if (clean === 'auth') return 'auth-login';
  if (clean === 'admin' || clean === 'admin-dashboard') return 'admin';
  if (clean === 'profile' || clean === 'dashboard' || clean === 'user-dashboard') return 'profile';

  return 'home';
};

// Map internal page to clean SEO URL slug
const getCanonicalSlug = (pageId) => {
  switch (pageId) {
    case 'home': return '';
    case 'buy-land': return 'buy-land';
    case 'apartments': return 'apartments';
    case 'villas': return 'villas';
    case 'houses': return 'independent-houses';
    case 'sell-land': return 'sell-land';
    case 'demarcation': return 'land-demarcation';
    case 'land-paper-work': return 'land-paper-work';
    case 'land-dispute-solution': return 'land-dispute-solution';
    case 'about-us': return 'about-us';
    case 'contact-us': return 'contact-us';
    case 'cart': return 'cart';
    case 'checkout': return 'checkout';
    case 'order-confirmation': return 'order-confirmation';
    case 'auth-login': return 'sign-in';
    case 'auth-signup': return 'sign-up';
    case 'auth': return 'sign-in';
    case 'admin': return 'admin-dashboard';
    case 'profile': return 'user-dashboard';
    default: return pageId;
  }
};

function JamiDuniaApp() {
  const [activePage, setActivePageState] = useState(() => getPageFromLocation());

  // Function to navigate and update URL so each menu redirects to a distinct, SEO-friendly page URL
  const setActivePage = (pageId) => {
    let normalized = pageId;
    if (pageId === 'about') normalized = 'about-us';
    if (pageId === 'contact') normalized = 'contact-us';
    if (pageId === 'login' || pageId === 'sign-in') normalized = 'auth-login';
    if (pageId === 'signup' || pageId === 'sign-up') normalized = 'auth-signup';

    setActivePageState(normalized);

    const slug = getCanonicalSlug(normalized);
    const targetUrl = slug ? `/${slug}` : '/';
    
    // Update browser URL via History API without reloading page
    if (window.location.pathname !== targetUrl) {
      window.history.pushState({ page: normalized }, '', targetUrl);
    }

    // Dynamic SEO title & description
    const meta = PAGE_SEO_METADATA[normalized] || PAGE_SEO_METADATA['home'];
    if (meta) {
      document.title = meta.title;
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute('content', meta.description);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync state if user uses Browser Back / Forward buttons or hash changes
  useEffect(() => {
    const handleLocationChange = () => {
      const page = getPageFromLocation();
      setActivePageState(page);
      const meta = PAGE_SEO_METADATA[page] || PAGE_SEO_METADATA['home'];
      if (meta) {
        document.title = meta.title;
        const desc = document.querySelector('meta[name="description"]');
        if (desc) desc.setAttribute('content', meta.description);
      }
    };

    // Set initial title & metadata
    const initialPage = getPageFromLocation();
    const meta = PAGE_SEO_METADATA[initialPage] || PAGE_SEO_METADATA['home'];
    if (meta) {
      document.title = meta.title;
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute('content', meta.description);
    }

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Modals state
  const [inquiryProperty, setInquiryProperty] = useState(null);
  const [quickViewProperty, setQuickViewProperty] = useState(null);
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const [sellerModalCategory, setSellerModalCategory] = useState('land');
  const [lastBooking, setLastBooking] = useState(null);

  const handleOpenSellerModal = (category = 'land') => {
    setSellerModalCategory(category);
    setIsSellerModalOpen(true);
  };

  // Search parameters forwarded from home banner
  const [searchParams, setSearchParams] = useState(null);

  // Handle Book Now click on any property card
  const handleBookNow = (property) => {
    setActivePage('cart');
  };

  // Handle Send Inquiry click on any property card
  const handleSendInquiry = (property) => {
    setInquiryProperty(property);
  };

  // Handle View Details click on any property card
  const handleViewDetails = (property) => {
    setQuickViewProperty(property);
  };

  // Handle Search submit from hero
  const handleHeroSearch = (filters) => {
    setSearchParams(filters);
    if (filters.category === 'land') setActivePage('buy-land');
    else if (filters.category === 'apartment') setActivePage('apartments');
    else if (filters.category === 'villa') setActivePage('villas');
    else if (filters.category === 'house') setActivePage('houses');
    else setActivePage('buy-land');
  };

  // Handle booking completion
  const handleBookingComplete = (booking) => {
    setLastBooking(booking);
    setActivePage('order-confirmation');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* Global Navbar with cart count, user profile & SEO navigation */}
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage}
        onOpenSellerModal={handleOpenSellerModal}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage 
            setActivePage={setActivePage}
            onBookNow={handleBookNow}
            onSendInquiry={handleSendInquiry}
            onViewDetails={handleViewDetails}
            onOpenSellerModal={handleOpenSellerModal}
            onSearch={handleHeroSearch}
          />
        )}

        {activePage === 'buy-land' && (
          <BuyLandPage 
            searchParams={searchParams}
            onBookNow={handleBookNow}
            onSendInquiry={handleSendInquiry}
            onViewDetails={handleViewDetails}
          />
        )}

        {activePage === 'sell-land' && (
          <SellLandPage 
            onOpenSellerModal={handleOpenSellerModal}
            onBookNow={handleBookNow}
            onSendInquiry={handleSendInquiry}
            onViewDetails={handleViewDetails}
          />
        )}

        {activePage === 'apartments' && (
          <ApartmentsPage 
            searchParams={searchParams}
            onBookNow={handleBookNow}
            onSendInquiry={handleSendInquiry}
            onViewDetails={handleViewDetails}
          />
        )}

        {activePage === 'villas' && (
          <VillasPage 
            searchParams={searchParams}
            onBookNow={handleBookNow}
            onSendInquiry={handleSendInquiry}
            onViewDetails={handleViewDetails}
          />
        )}

        {activePage === 'houses' && (
          <IndependentHousesPage 
            searchParams={searchParams}
            onBookNow={handleBookNow}
            onSendInquiry={handleSendInquiry}
            onViewDetails={handleViewDetails}
          />
        )}

        {activePage === 'demarcation' && (
          <DemarcationPage 
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'land-paper-work' && (
          <LandPaperWorkPage 
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'land-dispute-solution' && (
          <LandDisputePage 
            setActivePage={setActivePage}
          />
        )}

        {(activePage === 'about' || activePage === 'about-us') && (
          <AboutUsPage 
            setActivePage={setActivePage}
          />
        )}

        {(activePage === 'contact' || activePage === 'contact-us') && (
          <ContactUsPage />
        )}

        {activePage === 'cart' && (
          <CartPage 
            setActivePage={setActivePage}
            onProceedToCheckout={() => setActivePage('checkout')}
          />
        )}

        {activePage === 'checkout' && (
          <CheckoutPage 
            setActivePage={setActivePage}
            onBookingComplete={handleBookingComplete}
          />
        )}

        {activePage === 'order-confirmation' && (
          <OrderConfirmationPage 
            booking={lastBooking}
            setActivePage={setActivePage}
          />
        )}

        {(activePage === 'auth' || activePage === 'auth-login' || activePage === 'auth-signup') && (
          <AuthPage 
            setActivePage={setActivePage}
            initialMode={activePage === 'auth-signup' ? 'signup' : 'login'}
          />
        )}

        {activePage === 'admin' && (
          <AdminPage 
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'profile' && (
          <UserDashboardPage 
            setActivePage={setActivePage}
            onOpenSellerModal={handleOpenSellerModal}
            onBookNow={handleBookNow}
            onSendInquiry={handleSendInquiry}
            onViewDetails={handleViewDetails}
          />
        )}
      </main>

      {/* Global Footer with SEO anchor links */}
      <Footer setActivePage={setActivePage} />

      {/* Global Modals */}
      <InquiryModal
        property={inquiryProperty}
        isOpen={!!inquiryProperty}
        onClose={() => setInquiryProperty(null)}
      />

      <QuickViewModal
        property={quickViewProperty}
        isOpen={!!quickViewProperty}
        onClose={() => setQuickViewProperty(null)}
        onBookNow={handleBookNow}
        onSendInquiry={handleSendInquiry}
      />

      <SellerSubmissionModal
        isOpen={isSellerModalOpen}
        initialCategory={sellerModalCategory}
        onClose={() => setIsSellerModalOpen(false)}
        onRequireLogin={(targetMode) => {
          setIsSellerModalOpen(false);
          setActivePage(targetMode === 'signup' ? 'auth-signup' : 'auth-login');
        }}
        onSuccess={() => {}}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PropertyProvider>
        <CartProvider>
          <InquiryProvider>
            <JamiDuniaApp />
          </InquiryProvider>
        </CartProvider>
      </PropertyProvider>
    </AuthProvider>
  );
}
