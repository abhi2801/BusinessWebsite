-- ========================================================
-- JAMI DUNIA (Odisha Real Estate Marketplace)
-- PostgreSQL / Supabase Database Schema
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Customers, Sellers, Administrators)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  role TEXT CHECK (role IN ('customer', 'seller', 'admin')) DEFAULT 'customer',
  city TEXT DEFAULT 'Bhubaneswar',
  district TEXT DEFAULT 'Khordha',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROPERTIES TABLE (Land, Apartments, Villas, Houses)
CREATE TABLE IF NOT EXISTS public.properties (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT CHECK (category IN ('land', 'apartment', 'villa', 'house')) NOT NULL,
  type TEXT NOT NULL,
  location TEXT NOT NULL,
  city TEXT NOT NULL,
  district TEXT NOT NULL,
  pincode TEXT,
  area_sqft NUMERIC NOT NULL,
  dimensions TEXT,
  price_per_sqft NUMERIC NOT NULL,
  total_price NUMERIC GENERATED ALWAYS AS (area_sqft * price_per_sqft) STORED,
  booking_token NUMERIC DEFAULT 25000,
  facing TEXT,
  road_access TEXT,
  khata_no TEXT,
  plot_no TEXT,
  tehsil TEXT,
  mouza TEXT,
  status TEXT CHECK (status IN ('Available', 'Under Booking', 'Sold', 'Pending Review', 'Rejected')) DEFAULT 'Available',
  approval_status TEXT CHECK (approval_status IN ('Approved', 'Pending', 'Rejected')) DEFAULT 'Approved',
  is_seller_listing BOOLEAN DEFAULT FALSE,
  seller_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  seller_name TEXT,
  seller_phone TEXT,
  seller_email TEXT,
  description TEXT,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  amenities TEXT[] DEFAULT ARRAY[]::TEXT[],
  bhk TEXT,
  bedrooms INT,
  bathrooms INT,
  floors TEXT,
  parking TEXT,
  featured BOOLEAN DEFAULT FALSE,
  rating NUMERIC DEFAULT 5.0,
  reviews_count INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.inquiries (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT NOT NULL,
  property_id TEXT REFERENCES public.properties(id) ON DELETE CASCADE,
  property_title TEXT NOT NULL,
  inquiry_type TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT CHECK (status IN ('New', 'Contacted', 'Site Visit Scheduled', 'Closed')) DEFAULT 'New',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BOOKINGS TABLE (Token Bookings)
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  booking_id TEXT UNIQUE NOT NULL,
  property_id TEXT REFERENCES public.properties(id) ON DELETE RESTRICT,
  property_title TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  billing_address TEXT,
  total_property_value NUMERIC NOT NULL,
  token_amount NUMERIC NOT NULL,
  amount_paid NUMERIC NOT NULL,
  payment_method TEXT DEFAULT 'Razorpay (UPI)',
  transaction_id TEXT NOT NULL,
  survey_date DATE,
  status TEXT DEFAULT 'Payment Verified - Site Visit Scheduled',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. DEMARCATION BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.demarcation_bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  reference_id TEXT UNIQUE NOT NULL,
  service_title TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT NOT NULL,
  district TEXT NOT NULL,
  tehsil TEXT NOT NULL,
  village TEXT NOT NULL,
  plot_no TEXT NOT NULL,
  khata_no TEXT,
  total_area TEXT NOT NULL,
  land_type TEXT NOT NULL,
  inspection_date DATE NOT NULL,
  address TEXT NOT NULL,
  instructions TEXT,
  supporting_doc_url TEXT,
  status TEXT DEFAULT 'Inspector Review Pending',
  assigned_surveyor TEXT DEFAULT 'Assigning Licensed Surveyor...',
  amount_paid NUMERIC DEFAULT 4999,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demarcation_bookings ENABLE ROW LEVEL SECURITY;

-- Public can view approved properties
CREATE POLICY "Public can view approved properties" 
  ON public.properties FOR SELECT 
  USING (approval_status = 'Approved');

-- Authenticated users can insert inquiries
CREATE POLICY "Anyone can insert inquiries" 
  ON public.inquiries FOR INSERT 
  WITH CHECK (true);

-- Authenticated users can insert demarcation requests
CREATE POLICY "Anyone can submit demarcation" 
  ON public.demarcation_bookings FOR INSERT 
  WITH CHECK (true);
