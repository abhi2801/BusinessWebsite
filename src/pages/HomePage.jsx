import React from 'react';
import { HeroBanner } from '../components/home/HeroBanner';
import { CategoryCards } from '../components/home/CategoryCards';
import { FeaturedSection } from '../components/home/FeaturedSection';
import { OdishaLocations } from '../components/home/OdishaLocations';
import { DemarcationPromo } from '../components/home/DemarcationPromo';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { Testimonials, QuickContact } from '../components/home/Testimonials';

export const HomePage = ({ 
  setActivePage, 
  onBookNow, 
  onSendInquiry, 
  onViewDetails,
  onOpenSellerModal,
  onSearch 
}) => {
  return (
    <div className="space-y-0">
      {/* 1. Large Hero Banner with Search */}
      <HeroBanner 
        onSearch={onSearch}
        setActivePage={setActivePage}
      />

      {/* 2. 6 Quick Category Cards */}
      <CategoryCards 
        setActivePage={setActivePage}
        onOpenSellerModal={onOpenSellerModal}
      />

      {/* 3. Featured & Recently Added Properties */}
      <FeaturedSection 
        onBookNow={onBookNow}
        onSendInquiry={onSendInquiry}
        onViewDetails={onViewDetails}
        setActivePage={setActivePage}
      />

      {/* 4. Popular Locations in Odisha */}
      <OdishaLocations 
        onSelectLocation={(district) => {
          if (onSearch) onSearch({ district });
        }}
      />

      {/* 5. Demarcation Service Promotion Banner */}
      <DemarcationPromo 
        onBookDemarcation={() => {
          setActivePage('demarcation');
          window.scrollTo(0, 0);
        }}
      />

      {/* 6. Why Choose Us */}
      <WhyChooseUs />

      {/* 7. Customer Testimonials */}
      <Testimonials />

      {/* 8. Quick Consultation Inquiry Form */}
      <QuickContact />
    </div>
  );
};
