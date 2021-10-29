import React from 'react';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

const RadioButton = ({ checked, value, className, onChange }) => {
  return (
    <RadioGroup className={className} row>
      <FormControlLabel
        control={
          <Radio
            sx={{
              '&.MuiFormControlLabel-root': {
                marginRight: '0',
              },
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
        }
        label={value}
      />
    </RadioGroup>
  );
};

export default RadioButton;
