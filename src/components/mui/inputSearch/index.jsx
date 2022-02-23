import React from 'react';
import { InputAdornment, InputUnstyled } from '@mui/material';
import Search from '@assets/Search';
import styles from './styles.module.less';

const Input = ({ placeholder, onChange, search }) => (
  <InputUnstyled
    placeholder={placeholder}
    className={styles.search}
    onChange={onChange}
    value={search}
    startAdornment={
      <InputAdornment position="start">
        <Search />
      </InputAdornment>
    }
  />
);

export default Input;
