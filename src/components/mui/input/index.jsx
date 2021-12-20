import React, { useState } from 'react';
import { InputUnstyled } from '@mui/material';
import styles from './styles.module.less';

export const Input = ({ value, handleChange, name }) => {
  return (
    <InputUnstyled
      name={name}
      type="email"
      value={value}
      onChange={handleChange}
      className={styles.input}
    />
  );
};
