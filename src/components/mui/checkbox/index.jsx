import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const CheckboxBtn = ({ value, handleChange }) => {
  return (
    <div>
      <Checkbox
        checked={value}
        onChange={handleChange}
        {...label}
        sx={{
          color: '#7469EF',
          '&.Mui-checked': {
            color: '#7469EF',
          },
        }}
      />
    </div>
  );
};
