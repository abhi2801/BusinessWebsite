import React from 'react';
import { StudioSplitView } from '../components/explorer/StudioSplitView';

export const IndependentHousesPage = ({ onBookNow, onSendInquiry, onViewDetails, searchParams }) => {
  return (
    <StudioSplitView
      initialCategory="house"
      title="Buy Independent Houses & Bungalows in Odisha"
      subtitle="Freehold Residential Homes in Khordha, Cuttack & Puri with Clear Mutation Titles"
      searchParams={searchParams}
      onBookNow={onBookNow}
      onSendInquiry={onSendInquiry}
      onViewDetails={onViewDetails}
    />
  );
};
