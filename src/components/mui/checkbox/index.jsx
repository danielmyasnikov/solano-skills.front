import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox terms' } };

export const CheckboxBtn = ({ value, handleChange, error, name }) => {
  return (
    <div>
      <Checkbox
        checked={value}
        onChange={handleChange}
        name={name}
        {...label}
        sx={{
          color: error ? '#F44336' : '#7469EF',
          '&.Mui-checked': {
            color: '#7469EF',
          },
        }}
      />
    </div>
  );
};
