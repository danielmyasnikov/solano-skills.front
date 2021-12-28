import React from 'react';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

const RadioButton = ({ checked, value, className, onChange }) => {
  return (
    <RadioGroup
      sx={{
        '&.MuiFormGroup-root': {
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'start',
        },
      }}
      className={className}
      row
    >
      <Radio
        sx={{
          '& .MuiSvgIcon-root': {
            fontSize: 21,
          },
          color: '#7469EF',
          '&.Mui-checked': {
            color: '#7469EF',
          },
          '&.MuiRadio-root': {
            padding: '0 9px',
          },
        }}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label onClick={onChange} dangerouslySetInnerHTML={{ __html: value }} />
    </RadioGroup>
  );
};

export default RadioButton;
