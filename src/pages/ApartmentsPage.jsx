import React from 'react';
import { StudioSplitView } from '../components/explorer/StudioSplitView';

export const ApartmentsPage = ({ onBookNow, onSendInquiry, onViewDetails, searchParams }) => {
  return (
    <StudioSplitView
      initialCategory="apartment"
      title="Buy Luxury Apartments in Odisha"
      subtitle="1 BHK, 2 BHK, 3 BHK & 4 BHK Flats across Khordha, Cuttack & Puri with Dedicated Parking"
      searchParams={searchParams}
      onBookNow={onBookNow}
      onSendInquiry={onSendInquiry}
      onViewDetails={onViewDetails}
    />
  );
};
