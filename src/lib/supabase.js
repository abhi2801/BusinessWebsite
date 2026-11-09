import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xikurxsrwqdcoygqyehl.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhpa3VyeHNyd3FkY295Z3F5ZWhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQyMzIzMzIsImV4cCI6MjEwOTgwODMzMn0.M3usignqfHdpKIXx7rQcv1VSv6-r_-F9054lOv6PGqM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Service helpers to save inquiries, demarcation bookings, seller submissions, and orders directly to Supabase.
 */

// 1. Save Property Inquiry / Paperwork / Dispute Inquiry
export const saveInquiryToSupabase = async (inquiry) => {
  try {
    const payload = {
      id: inquiry.id || `INQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      full_name: inquiry.fullName || inquiry.name || 'Anonymous',
      mobile: inquiry.mobile || inquiry.phone || '',
      email: inquiry.email || '',
      property_id: inquiry.propertyId || null,
      property_title: inquiry.propertyTitle || 'General Inquiry',
      inquiry_type: inquiry.inquiryType || 'General Inquiry',
      message: inquiry.message || '',
      status: inquiry.status || 'New',
      created_at: inquiry.createdAt || new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('inquiries')
      .insert([payload])
      .select();

    if (error) {
      console.warn('Supabase inquiry insert error:', error.message);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    console.error('Failed to save inquiry to Supabase:', err);
    return { success: false, error: err };
  }
};

// 2. Save Land Demarcation Booking
export const saveDemarcationToSupabase = async (booking) => {
  try {
    const payload = {
      reference_id: booking.referenceId || `LD-OD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      service_title: booking.serviceTitle || 'Standard Plot Demarcation',
      customer_name: booking.customerName || '',
      mobile: booking.mobile || '',
      email: booking.email || '',
      district: booking.district || 'Khordha (Bhubaneswar)',
      tehsil: booking.tehsil || '',
      village: booking.village || '',
      plot_no: booking.plotNo || '',
      khata_no: booking.khataNo || '',
      total_area: booking.totalArea || '',
      land_type: booking.landType || '',
      inspection_date: booking.inspectionDate || '',
      address: booking.address || '',
      instructions: booking.instructions || '',
      document_name: booking.documentName || '',
      amount_paid: Number(booking.amountPaid) || 0,
      status: booking.status || 'Inspector Review Pending',
      assigned_surveyor: booking.assignedSurveyor || 'Assigning Licensed Surveyor...',
      created_at: booking.createdAt || new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('demarcation_bookings')
      .insert([payload])
      .select();

    if (error) {
      console.warn('Supabase demarcation insert error:', error.message);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    console.error('Failed to save demarcation to Supabase:', err);
    return { success: false, error: err };
  }
};

// 3. Save Seller Submission (List Property for Sale)
export const saveSellerSubmissionToSupabase = async (submission) => {
  try {
    const payload = {
      id: submission.id || `LH-${(submission.category || 'LND').slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      title: submission.title || 'Land Listing',
      category: submission.category || 'land',
      property_type: submission.propertyType || submission.type || 'Residential Gharabari',
      district: submission.district || 'Khordha (Bhubaneswar)',
      city: submission.city || '',
      locality: submission.locality || '',
      tehsil: submission.tehsil || '',
      mouza: submission.mouza || '',
      khata_no: submission.khataNo || '',
      plot_no: submission.plotNo || '',
      area_sqft: Number(submission.areaSqFt) || 0,
      price_per_sqft: Number(submission.pricePerSqFt) || 0,
      total_price: Number(submission.totalPrice) || 0,
      booking_token: Number(submission.bookingToken) || 25000,
      facing: submission.facing || 'East',
      road_access: submission.roadAccess || '',
      description: submission.description || '',
      images: submission.images || [],
      seller_name: submission.seller?.name || submission.sellerName || '',
      seller_email: submission.seller?.email || submission.sellerEmail || '',
      seller_phone: submission.seller?.contact || submission.sellerPhone || '',
      approval_status: submission.approvalStatus || 'Pending',
      status: submission.status || 'Pending Review',
      created_at: submission.createdAt || new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('seller_submissions')
      .insert([payload])
      .select();

    if (error) {
      console.warn('Supabase seller submission insert error:', error.message);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    console.error('Failed to save seller submission to Supabase:', err);
    return { success: false, error: err };
  }
};

// 4. Save Booking Order (Checkout / Razorpay)
export const saveBookingOrderToSupabase = async (order) => {
  try {
    const payload = {
      booking_id: order.bookingId || `LH-BK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      property_id: order.propertyId || (order.items?.[0]?.property?.id) || null,
      property_title: order.propertyTitle || (order.items?.[0]?.property?.title) || 'Property Booking',
      customer_name: order.customerName || '',
      customer_phone: order.customerPhone || order.mobile || '',
      customer_email: order.customerEmail || order.email || '',
      amount_paid: Number(order.amountPaid) || Number(order.totalPayableNow) || 0,
      token_amount: Number(order.tokenAmount) || Number(order.totalTokenAdvance) || 0,
      payment_method: order.paymentMethod || 'Razorpay (UPI / NetBanking)',
      transaction_id: order.transactionId || `pay_rzp_${Date.now()}`,
      status: order.status || 'Payment Verified - Site Visit Scheduled',
      survey_date: order.surveyDate || order.inspectionDate || null,
      total_property_value: Number(order.totalPropertyValue) || 0,
      items: order.items || [],
      created_at: order.bookingDate || order.createdAt || new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('bookings')
      .insert([payload])
      .select();

    if (error) {
      console.warn('Supabase booking order insert error:', error.message);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    console.error('Failed to save booking order to Supabase:', err);
    return { success: false, error: err };
  }
};

// 5. Save General Contact Message
export const saveContactMessageToSupabase = async (message) => {
  try {
    const payload = {
      full_name: message.name || message.fullName || '',
      email: message.email || '',
      phone: message.phone || message.mobile || '',
      subject: message.subject || 'Website Inquiry',
      message: message.message || '',
      status: 'New',
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('contact_messages')
      .insert([payload])
      .select();

    if (error) {
      console.warn('Supabase contact message insert error:', error.message);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    console.error('Failed to save contact message to Supabase:', err);
    return { success: false, error: err };
  }
};
