import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PROPERTIES } from '../data/mockProperties';
import { calculateLandCost } from '../utils/formatters';
import { supabase, saveSellerSubmissionToSupabase } from '../lib/supabase';

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState(() => {
    try {
      const saved = localStorage.getItem('landhub_properties');
      return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
    } catch {
      return INITIAL_PROPERTIES;
    }
  });

  // Sync with Supabase on mount (pull seller submissions)
  useEffect(() => {
    const fetchSellerSubmissions = async () => {
      try {
        const { data, error } = await supabase
          .from('seller_submissions')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const mapped = data.map(sub => ({
            id: sub.id,
            title: sub.title,
            category: sub.category,
            type: sub.property_type,
            propertyType: sub.property_type,
            district: sub.district,
            city: sub.city,
            locality: sub.locality,
            tehsil: sub.tehsil,
            mouza: sub.mouza,
            khataNo: sub.khata_no,
            plotNo: sub.plot_no,
            areaSqFt: sub.area_sqft,
            pricePerSqFt: sub.price_per_sqft,
            totalPrice: sub.total_price,
            bookingToken: sub.booking_token,
            facing: sub.facing,
            roadAccess: sub.road_access,
            description: sub.description,
            images: sub.images && sub.images.length > 0 ? sub.images : ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"],
            status: sub.status,
            approvalStatus: sub.approval_status,
            isSellerListing: true,
            seller: {
              name: sub.seller_name,
              email: sub.seller_email,
              contact: sub.seller_phone,
              type: "Owner Seller",
              verified: sub.approval_status === 'Approved'
            },
            rating: 0,
            reviewsCount: 0,
            createdAt: sub.created_at
          }));

          setProperties(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const newSubs = mapped.filter(p => !existingIds.has(p.id));
            return [...newSubs, ...prev];
          });
        }
      } catch (err) {
        console.warn('Supabase seller submissions load notice:', err);
      }
    };

    fetchSellerSubmissions();
  }, []);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('landhub_properties', JSON.stringify(properties));
  }, [properties]);

  // Selected property for studio preview pane
  const [previewPropertyId, setPreviewPropertyId] = useState(INITIAL_PROPERTIES[0]?.id || "LH-LND-101");

  // Selected property for modal quick view
  const [quickViewProperty, setQuickViewProperty] = useState(null);

  // Active property for inquiry modal
  const [inquiryTargetProperty, setInquiryTargetProperty] = useState(null);

  // Add new property (admin)
  const addProperty = (newPropData) => {
    const isLand = newPropData.category === 'land';
    const computedPrice = isLand && newPropData.pricePerSqFt && newPropData.areaSqFt
      ? calculateLandCost(newPropData.areaSqFt, newPropData.pricePerSqFt)
      : Number(newPropData.totalPrice) || 0;

    const property = {
      ...newPropData,
      id: newPropData.id || `LH-${(newPropData.category || 'LND').slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`,
      totalPrice: computedPrice,
      status: "Available",
      approvalStatus: "Approved",
      rating: 5.0,
      reviewsCount: 1,
      createdAt: new Date().toISOString(),
    };

    setProperties(prev => [property, ...prev]);
    return property;
  };

  // Edit existing property
  const updateProperty = (id, updates) => {
    setProperties(prev => prev.map(p => {
      if (p.id === id) {
        const merged = { ...p, ...updates };
        if (merged.category === 'land' && updates.pricePerSqFt && updates.areaSqFt) {
          merged.totalPrice = calculateLandCost(updates.areaSqFt, updates.pricePerSqFt);
        }
        return merged;
      }
      return p;
    }));
  };

  // Delete property
  const deleteProperty = (id) => {
    setProperties(prev => prev.filter(p => p.id !== id));
    if (previewPropertyId === id) {
      const remaining = properties.filter(p => p.id !== id);
      if (remaining.length > 0) setPreviewPropertyId(remaining[0].id);
    }
  };

  // Toggle Featured status
  const toggleFeatured = (id) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, featured: !p.featured } : p));
  };

  // Seller submit land listing (Saves to state & Supabase backend!)
  const submitSellerLand = (sellerListing, currentUser) => {
    const computedPrice = calculateLandCost(sellerListing.areaSqFt, sellerListing.pricePerSqFt);
    const newSubmission = {
      ...sellerListing,
      id: `LH-LND-${Math.floor(1000 + Math.random() * 9000)}`,
      category: sellerListing.category || 'land',
      totalPrice: computedPrice,
      bookingToken: Math.round(computedPrice * 0.01) > 25000 ? Math.round(computedPrice * 0.01) : 25000,
      status: "Pending Review",
      approvalStatus: "Pending", // Requires admin approval!
      isSellerListing: true,
      seller: {
        name: currentUser?.name || sellerListing.sellerName,
        email: currentUser?.email || sellerListing.sellerEmail,
        contact: sellerListing.sellerPhone || currentUser?.phone,
        type: "Owner Seller",
        verified: false,
      },
      rating: 0,
      reviewsCount: 0,
      createdAt: new Date().toISOString(),
      images: sellerListing.images && sellerListing.images.length > 0 
        ? sellerListing.images 
        : ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"]
    };

    setProperties(prev => [newSubmission, ...prev]);

    // Persist to Supabase
    saveSellerSubmissionToSupabase(newSubmission).then(res => {
      if (res.success) {
        console.log('Seller listing persisted to Supabase backend successfully:', newSubmission.id);
      }
    });

    return newSubmission;
  };

  // Admin Approve seller listing (Syncs with Supabase)
  const approveSellerListing = async (id) => {
    setProperties(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          status: "Available",
          approvalStatus: "Approved",
          seller: { ...p.seller, verified: true }
        };
      }
      return p;
    }));

    try {
      await supabase.from('seller_submissions').update({
        approval_status: 'Approved',
        status: 'Available'
      }).eq('id', id);
    } catch (e) {
      console.warn('Failed to update seller submission status in Supabase:', e);
    }
  };

  // Admin Reject seller listing (Syncs with Supabase)
  const rejectSellerListing = async (id, reason = "Information verification pending") => {
    setProperties(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          status: "Rejected",
          approvalStatus: "Rejected",
          rejectionReason: reason
        };
      }
      return p;
    }));

    try {
      await supabase.from('seller_submissions').update({
        approval_status: 'Rejected',
        status: 'Rejected'
      }).eq('id', id);
    } catch (e) {
      console.warn('Failed to update seller submission rejection in Supabase:', e);
    }
  };

  // Public approved properties only (for public browsing)
  const publicProperties = properties.filter(p => p.approvalStatus !== 'Pending' && p.approvalStatus !== 'Rejected');

  // Currently previewed property
  const activePreviewProperty = properties.find(p => p.id === previewPropertyId) || properties[0];

  return (
    <PropertyContext.Provider
      value={{
        properties,
        publicProperties,
        previewPropertyId,
        setPreviewPropertyId,
        activePreviewProperty,
        quickViewProperty,
        setQuickViewProperty,
        inquiryTargetProperty,
        setInquiryTargetProperty,
        addProperty,
        updateProperty,
        deleteProperty,
        toggleFeatured,
        submitSellerLand,
        approveSellerListing,
        rejectSellerListing,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => useContext(PropertyContext);
