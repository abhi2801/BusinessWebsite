import React from 'react';
import { StudioSplitView } from '../components/explorer/StudioSplitView';

export const VillasPage = ({ onBookNow, onSendInquiry, onViewDetails, searchParams }) => {
  return (
    <StudioSplitView
      initialCategory="villa"
      title="Buy Gated Luxury Villas in Odisha"
      subtitle="Exclusive Duplex and Triplex Villas in Khordha, Cuttack & Puri with Private Lawns & 24/7 Security"
      searchParams={searchParams}
      onBookNow={onBookNow}
      onSendInquiry={onSendInquiry}
      onViewDetails={onViewDetails}
    />
  );
};
