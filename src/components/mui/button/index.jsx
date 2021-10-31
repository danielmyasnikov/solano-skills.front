import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { buttonTheme } from '../theme';

const Button = ({ children, variant, className, onClick }) => {
  return (
    <MuiButton
      type="button"
      variant={variant}
      className={className}
      theme={buttonTheme}
      onClick={onClick}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
