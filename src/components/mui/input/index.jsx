import React from 'react';
import { InputUnstyled } from '@mui/material';
import styles from './styles.module.less';

export const Input = ({ value, handleChange, name, placeholder }) => (
  <InputUnstyled
    name={name}
    type="email"
    placeholder={placeholder}
    value={value}
    onChange={handleChange}
    className={styles.input}
  />
);
