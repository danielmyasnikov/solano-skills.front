import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox terms' } };

export const CheckboxBtn = ({ variant, value, handleChange, error, name }) => {
  return (
    <div>
      <Checkbox
        checked={value}
        onChange={handleChange}
        name={name}
        {...label}
        sx={{
          color: error ? '#F44336' : variant === 'home_end' ? 'rgba(255, 255, 255, 0.26)' : '#7469EF',
          '&.Mui-checked': {
            color: variant === 'home_end' ? 'rgba(255, 255, 255, 0.4)' : '#7469EF',
          },
        }}
      />
    </div>
  );
};
