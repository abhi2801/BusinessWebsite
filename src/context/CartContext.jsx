import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, saveBookingOrderToSupabase } from '../lib/supabase';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('landhub_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Recent completed bookings history
  const [completedBookings, setCompletedBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('landhub_bookings');
      return saved ? JSON.parse(saved) : [
        {
          bookingId: "LH-BK-2026-7812",
          propertyId: "LH-LND-101",
          propertyTitle: "Prime Gharabari Residential Plot near Infocity",
          customerName: "Rajesh Mohanty",
          customerPhone: "+91 98610 98765",
          customerEmail: "rajesh.mohanty@gmail.com",
          amountPaid: 56980,
          tokenAmount: 50000,
          paymentMethod: "Razorpay (UPI / NetBanking)",
          transactionId: "pay_od_live_99218274",
          bookingDate: "2026-11-05T10:30:00Z",
          status: "Payment Verified - Site Visit Scheduled",
          surveyDate: "2026-11-12",
          totalPropertyValue: 5280000
        }
      ];
    } catch {
      return [];
    }
  });

  // Fetch bookings from Supabase on mount
  useEffect(() => {
    const fetchBookingsFromSupabase = async () => {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const mapped = data.map(b => ({
            bookingId: b.booking_id,
            propertyId: b.property_id,
            propertyTitle: b.property_title,
            customerName: b.customer_name,
            customerPhone: b.customer_phone,
            customerEmail: b.customer_email,
            amountPaid: b.amount_paid,
            tokenAmount: b.token_amount,
            paymentMethod: b.payment_method,
            transactionId: b.transaction_id,
            bookingDate: b.created_at,
            status: b.status,
            surveyDate: b.survey_date,
            totalPropertyValue: b.total_property_value,
            items: b.items
          }));

          setCompletedBookings(prev => {
            const existingIds = new Set(prev.map(item => item.bookingId));
            const newFromRemote = mapped.filter(item => !existingIds.has(item.bookingId));
            return [...newFromRemote, ...prev];
          });
        }
      } catch (err) {
        console.warn('Supabase bookings fetch notice:', err);
      }
    };

    fetchBookingsFromSupabase();
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('landhub_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('landhub_bookings', JSON.stringify(completedBookings));
  }, [completedBookings]);

  // Add property to Cart
  const addToCart = (property) => {
    const existingIndex = cartItems.findIndex(item => item.property.id === property.id);
    if (existingIndex !== -1) {
      return { added: false, message: "This property is already in your booking cart." };
    }

    const tokenAmount = property.bookingToken || 25000;
    const cartItem = {
      property,
      bookingToken: tokenAmount,
      addedAt: new Date().toISOString(),
    };

    setCartItems(prev => [...prev, cartItem]);
    return { added: true, message: "Property added to your booking cart!" };
  };

  // Remove from cart
  const removeFromCart = (propertyId) => {
    setCartItems(prev => prev.filter(item => item.property.id !== propertyId));
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate pricing breakdown
  const getTotals = () => {
    const totalPropertyValue = cartItems.reduce((acc, item) => acc + (Number(item.property.totalPrice) || 0), 0);
    const totalTokenAdvance = cartItems.reduce((acc, item) => acc + (Number(item.bookingToken) || 25000), 0);
    const legalDueDiligenceFee = cartItems.length > 0 ? 4500 : 0; // ROR & title search fee
    const platformFee = cartItems.length > 0 ? 1500 : 0;
    const subtotalService = legalDueDiligenceFee + platformFee;
    const gst = Math.round(subtotalService * 0.18); // 18% GST on services only
    const totalPayableNow = totalTokenAdvance + subtotalService + gst;

    return {
      totalPropertyValue,
      totalTokenAdvance,
      legalDueDiligenceFee,
      platformFee,
      gst,
      totalPayableNow,
      itemsCount: cartItems.length,
    };
  };

  // Record completed booking (Saves to state & Supabase backend!)
  const recordBooking = (bookingData) => {
    const newBooking = {
      ...bookingData,
      bookingId: bookingData.bookingId || `LH-BK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: "Payment Verified - Site Visit Scheduled",
    };
    
    setCompletedBookings(prev => [newBooking, ...prev]);
    clearCart();

    // Persist to Supabase
    saveBookingOrderToSupabase(newBooking).then(res => {
      if (res.success) {
        console.log('Booking order persisted to Supabase backend successfully:', newBooking.bookingId);
      }
    });

    return newBooking;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotals,
        completedBookings,
        recordBooking,
        cartCount: cartItems.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
