import React from 'react';
import { Switch as MuiSwitch } from '@mui/material';
import styles from './styles.module.less';

const Switch = ({ checked, handleChange }) => {
  return (
    <MuiSwitch
      checked={checked}
      onChange={handleChange}
    />
  );
};

export default Switch;
