import { InputUnstyled } from '@mui/material';
import styles from './Input.module.less';

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
