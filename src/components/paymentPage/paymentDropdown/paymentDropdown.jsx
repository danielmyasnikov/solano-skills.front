import * as React from 'react';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from '@mui/styles';

import styles from './styles.module.less';

export const PaymentDropdown = ({
  placeholder,
  type,
  onChange,
  label,
  width = '100%',
  widthDropDown,
}) => {
  const [value, setValue] = React.useState('');

  const useStyles = makeStyles({
    customOutline: {
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
    },
    select: {
      marginLeft: -17,
      marginTop: 10,
      minWidth: { widthDropDown },
      // minWidth: 'calc(40% - 200px) !important',
      '& ul': {
        padding: '20px 20px 20px 30px',
        backgroundColor: 'var(--color-white)',
        boxShadow: '4px 4px 20px rgba(0, 0, 0, 0.05)',
        borderRadius: 7,
      },
      '& li': {
        fontFamily: 'Nunito',
        color: 'var(--very-dark-grayish-violet)',
        fontSize: 24,
      },
    },
  });

  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event.target.value, type);
  };

  const classes = useStyles();

  return (
    <div style={{ width: width }} className={styles.wrapper}>
      <label className={styles.wrapperLabel}>{label}</label>
      <FormControl classes={{ root: classes.customOutline }} fullWidth>
        <Select
          className={`${styles.wrapperSelect}`}
          displayEmpty
          MenuProps={{ classes: { paper: classes.select } }}
          id="demo-simple-select"
          value={value}
          onChange={handleChange}
          notchedOutline
        >
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

// import { useState } from 'react';

// import styles from './styles.module.less';
// import cn from 'classnames';

// export const PaymentDropdown = ({ placeholder, label, width = '100%' }) => {
//   return (
//     <div style={{ width: width }} className={styles.wrapper}>
//       <label className={styles.wrapperLabel}>{label}</label>
//       <select className={styles.wrapperSelect}>
//         <option value="" disabled selected>
//           {placeholder}
//         </option>
//         <option value="fruit">Fruit</option>
//         <option value="vegetable">Vegetable</option>
//         <option value="meat">Meat</option>
//       </select>
//     </div>
//   );
// };

// const data = [
//   { id: 0, label: 'Istanbul, TR (AHL)' },
//   { id: 1, label: 'Paris, FR (CDG)' },
// ];

// export const Dropdown = () => {
//   const [isOpen, setOpen] = useState(false);
//   const [items, setItem] = useState(data);
//   const [selectedItem, setSelectedItem] = useState(null);

//   const toggleDropdown = () => setOpen(!isOpen);

//   const handleItemClick = (id) => {
//     selectedItem === id ? setSelectedItem(null) : setSelectedItem(id);
//   };

//   return (
//     <div className={styles.dropdown}>
//       <div className={styles.dropdownHeader} onClick={toggleDropdown}>
//         {selectedItem
//           ? items.find((item) => item.id === selectedItem).label
//           : 'Select your destination'}
//         <i className={cn(styles.icon, { [styles.open]: isOpen })}></i>
//       </div>
//       <div className={cn(styles.dropdownBody, { [styles.open]: isOpen })}>
//         {items.map((item) => (
//           <div
//             className={styles.dropdownItem}
//             onClick={(e) => handleItemClick(e.target.id)}
//             id={item.id}
//           >
//             <span
//               className={cn(styles.dropdownItemDot, {
//                 [styles.selected]: item.id === selectedItem,
//               })}
//             >
//               •{' '}
//             </span>
//             {item.label}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
