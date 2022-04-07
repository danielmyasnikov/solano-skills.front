import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputUnstyled from '@mui/base/InputUnstyled';
import styles from './styles.module.less';

export const InputPassword = ({ value, handleChange, name, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputUnstyled
      name={name}
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={handleChange}
      className={styles.input}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => setShowPassword(!showPassword)}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
      label="Password"
      placeholder={placeholder}
    />
  );
};
