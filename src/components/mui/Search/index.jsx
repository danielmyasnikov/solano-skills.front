import { InputAdornment, InputUnstyled } from '@mui/material';
import SearchIcon from '@assets/Search';
import styles from './styles.module.less';

const Search = ({ onFocus, onBlur, placeholder, onChange, search }) => (
  <InputUnstyled
    onFocus={onFocus}
    onBlur={onBlur}
    placeholder={placeholder}
    className={styles.search}
    onChange={onChange}
    value={search}
    startAdornment={
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    }
  />
);

export default Search;
