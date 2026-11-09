import React from 'react';
import { StudioSplitView } from '../components/explorer/StudioSplitView';

export const BuyLandPage = ({ onBookNow, onSendInquiry, onViewDetails, searchParams }) => {
  return (
    <StudioSplitView
      initialCategory="land"
      title="Buy Verified Land & Plots in Odisha"
      subtitle="Residential Gharabari, Commercial & Layout Plots across Khordha, Cuttack & Puri with Automated Price Formulas"
      searchParams={searchParams}
      onBookNow={onBookNow}
      onSendInquiry={onSendInquiry}
      onViewDetails={onViewDetails}
    />
  );
};
