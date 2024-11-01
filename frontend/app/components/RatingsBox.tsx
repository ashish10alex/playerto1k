import React from 'react';

interface RatingBoxProps {
  rating: string;
}

export const RatingBox: React.FC<RatingBoxProps> = ({ rating }) => {
  if (rating === "") return null;
  const _rating = Number(rating);
  const getBackgroundColor = (rating: number): string => {
    if (rating >= 8) return '#4CAF50'; // Green
    if (rating >= 7) return '#FFA500'; // Orange
    if (rating >= 6) return '#FFC107'; // Amber
    return '#F44336'; // Red
  };

  return (
    <span style={{
      backgroundColor: getBackgroundColor(_rating),
      color: 'white',
      padding: '2px 6px',
      borderRadius: '4px',
      fontWeight: 'bold',
      fontSize: '14px'
    }}>
      {_rating}
    </span>
  );
};

export default RatingBox;
