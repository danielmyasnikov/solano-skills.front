import React from 'react';
import { InputAdornment, InputUnstyled } from '@mui/material';
import Search from '@assets/Search';
import styles from './styles.module.less'

const Input = ({ placeholder }) => {
  return (
    <InputUnstyled
      placeholder={placeholder}
      className={styles.search}
      startAdornment={
        <InputAdornment position="start">
          <Search />
        </InputAdornment>
      }
    />
  );
};

export default Input;
