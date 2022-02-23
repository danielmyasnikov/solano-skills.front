import React from 'react';
import { Rating as MuiRating } from '@mui/material';
import { ratingTheme } from '../theme';

const Rating = ({ value, className, readonly }) => {
  return <MuiRating value={value} className={className} readOnly={readonly} theme={ratingTheme} />;
};

export default Rating;
