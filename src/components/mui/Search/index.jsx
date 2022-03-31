import { InputAdornment, InputUnstyled } from '@mui/material';
import SearchIcon from '@assets/Search';
import styles from './styles.module.less';

const Search = ({ placeholder, onChange, search }) => (
  <InputUnstyled
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
