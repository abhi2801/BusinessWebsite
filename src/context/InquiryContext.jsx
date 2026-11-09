import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, saveInquiryToSupabase, saveDemarcationToSupabase } from '../lib/supabase';

const InquiryContext = createContext();

export const InquiryProvider = ({ children }) => {
  // Inquiries store
  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('landhub_inquiries');
      return saved ? JSON.parse(saved) : [
        {
          id: "INQ-2026-101",
          fullName: "Debabrata Mishra",
          mobile: "+91 94371 55667",
          email: "deba.mishra@gmail.com",
          propertyId: "LH-LND-101",
          propertyTitle: "Prime Gharabari Residential Plot near Infocity",
          inquiryType: "Schedule Site Visit",
          message: "Interested in visiting the Patia plot this Saturday morning around 10:30 AM with my civil engineer. Please arrange on-site access.",
          status: "Site Visit Scheduled",
          createdAt: "2026-11-06T09:15:00Z"
        },
        {
          id: "INQ-2026-102",
          fullName: "Sanjukta Ray",
          mobile: "+91 98612 88990",
          email: "sanjukta.ray@outlook.com",
          propertyId: "LH-APT-201",
          propertyTitle: "Utkal Royal Residency 3 BHK Luxury Apartment",
          inquiryType: "Bank Loan Assistance",
          message: "Please share approved bank APF numbers for SBI and HDFC for Utkal Royal Residency flat.",
          status: "Contacted",
          createdAt: "2026-11-07T14:40:00Z"
        }
      ];
    } catch {
      return [];
    }
  });

  // Demarcation bookings store
  const [demarcationBookings, setDemarcationBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('landhub_demarcations');
      return saved ? JSON.parse(saved) : [
        {
          referenceId: "LD-OD-2026-4891",
          serviceTitle: "Standard Residential Plot Demarcation",
          customerName: "Pravat Kumar Jena",
          mobile: "+91 94370 44332",
          email: "pravat.jena@gmail.com",
          district: "Khordha (Bhubaneswar)",
          tehsil: "Bhubaneswar",
          village: "Patia Mouza",
          plotNo: "712/1040",
          khataNo: "115/42",
          totalArea: "2,400 sq.ft (2.2 Gunthas)",
          landType: "Gharabari Residential",
          inspectionDate: "2026-11-14",
          address: "Plot 712, Lane 4, Near KIMS Hospital, Patia",
          instructions: "Boundary pillars are broken from south-western edge. Need exact DGPS total station demarcation.",
          status: "Surveyor Assigned",
          assignedSurveyor: "Er. Subhash Mohapatra (License No. REV/BBS/2018/42)",
          amountPaid: 4999,
          createdAt: "2026-11-06T11:00:00Z"
        }
      ];
    } catch {
      return [];
    }
  });

  // Fetch inquiries and demarcations from Supabase on mount
  useEffect(() => {
    const fetchFromSupabase = async () => {
      try {
        // Fetch inquiries
        const { data: remoteInquiries, error: inqErr } = await supabase
          .from('inquiries')
          .select('*')
          .order('created_at', { ascending: false });

        if (!inqErr && remoteInquiries && remoteInquiries.length > 0) {
          const mapped = remoteInquiries.map(item => ({
            id: item.id,
            fullName: item.full_name,
            name: item.full_name,
            mobile: item.mobile,
            phone: item.mobile,
            email: item.email,
            propertyId: item.property_id,
            propertyTitle: item.property_title,
            inquiryType: item.inquiry_type,
            message: item.message,
            status: item.status,
            createdAt: item.created_at
          }));

          setInquiries(prev => {
            const existingIds = new Set(prev.map(i => i.id));
            const newFromRemote = mapped.filter(i => !existingIds.has(i.id));
            return [...newFromRemote, ...prev];
          });
        }

        // Fetch demarcation bookings
        const { data: remoteDemarcations, error: demErr } = await supabase
          .from('demarcation_bookings')
          .select('*')
          .order('created_at', { ascending: false });

        if (!demErr && remoteDemarcations && remoteDemarcations.length > 0) {
          const mappedDem = remoteDemarcations.map(item => ({
            referenceId: item.reference_id,
            serviceTitle: item.service_title,
            customerName: item.customer_name,
            mobile: item.mobile,
            email: item.email,
            district: item.district,
            tehsil: item.tehsil,
            village: item.village,
            plotNo: item.plot_no,
            khataNo: item.khata_no,
            totalArea: item.total_area,
            landType: item.land_type,
            inspectionDate: item.inspection_date,
            address: item.address,
            instructions: item.instructions,
            documentName: item.document_name,
            amountPaid: item.amount_paid,
            status: item.status,
            assignedSurveyor: item.assigned_surveyor,
            createdAt: item.created_at
          }));

          setDemarcationBookings(prev => {
            const existingRefs = new Set(prev.map(d => d.referenceId));
            const newFromRemote = mappedDem.filter(d => !existingRefs.has(d.referenceId));
            return [...newFromRemote, ...prev];
          });
        }
      } catch (err) {
        console.warn('Initial Supabase fetch warning:', err);
      }
    };

    fetchFromSupabase();
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('landhub_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('landhub_demarcations', JSON.stringify(demarcationBookings));
  }, [demarcationBookings]);

  // Submit new property inquiry (Saves to both state & Supabase backend!)
  const submitInquiry = (inquiryData) => {
    const newInquiry = {
      ...inquiryData,
      id: inquiryData.id || `INQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: inquiryData.fullName || inquiryData.name || 'Anonymous',
      mobile: inquiryData.mobile || inquiryData.phone || '',
      email: inquiryData.email || '',
      status: "New",
      createdAt: new Date().toISOString(),
    };

    // Update React local state immediately
    setInquiries(prev => [newInquiry, ...prev]);

    // Asynchronously persist to Supabase PostgreSQL backend
    saveInquiryToSupabase(newInquiry).then(res => {
      if (res.success) {
        console.log('Inquiry saved to Supabase backend successfully:', newInquiry.id);
      } else {
        console.warn('Inquiry Supabase sync notice:', res.error);
      }
    });

    return newInquiry;
  };

  // Update inquiry status (Syncs to Supabase)
  const updateInquiryStatus = async (id, newStatus) => {
    setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
    try {
      await supabase.from('inquiries').update({ status: newStatus }).eq('id', id);
    } catch (e) {
      console.warn('Failed to update inquiry status in Supabase:', e);
    }
  };

  // Submit land demarcation booking (Saves to both state & Supabase backend!)
  const submitDemarcationBooking = (formData) => {
    const referenceId = `LD-OD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking = {
      ...formData,
      referenceId,
      status: "Inspector Review Pending",
      assignedSurveyor: "Assigning Licensed Surveyor...",
      createdAt: new Date().toISOString(),
    };

    // Update React local state
    setDemarcationBookings(prev => [newBooking, ...prev]);

    // Persist to Supabase PostgreSQL backend
    saveDemarcationToSupabase(newBooking).then(res => {
      if (res.success) {
        console.log('Demarcation booking saved to Supabase backend:', referenceId);
      } else {
        console.warn('Demarcation Supabase sync notice:', res.error);
      }
    });

    return newBooking;
  };

  // Admin update demarcation status & surveyor (Syncs to Supabase)
  const updateDemarcationStatus = async (refId, status, surveyor) => {
    setDemarcationBookings(prev => prev.map(d => {
      if (d.referenceId === refId) {
        return {
          ...d,
          status: status || d.status,
          assignedSurveyor: surveyor || d.assignedSurveyor
        };
      }
      return d;
    }));

    try {
      const updates = {};
      if (status) updates.status = status;
      if (surveyor) updates.assigned_surveyor = surveyor;
      await supabase.from('demarcation_bookings').update(updates).eq('reference_id', refId);
    } catch (e) {
      console.warn('Failed to update demarcation status in Supabase:', e);
    }
  };

  return (
    <InquiryContext.Provider
      value={{
        inquiries,
        submitInquiry,
        updateInquiryStatus,
        demarcationBookings,
        submitDemarcationBooking,
        updateDemarcationStatus,
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
};

export const useInquiries = () => useContext(InquiryContext);
