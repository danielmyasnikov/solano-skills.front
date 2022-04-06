import { useState } from 'react';

import Hide from './assets/hide.svg';
import Show from './assets/show.svg';

import styles from './styles.module.less';

export const SettingsInputPassword = ({ placeholder, value, handleChange }) => {
  const [isShowValue, setIsShowValue] = useState(false);

  return (
    <div className={styles.passwordWrap}>
      <input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        autocomplete="off"
        type={(isShowValue && 'text') || 'password'}
      />
      <div onClick={() => setIsShowValue(!isShowValue)}>
        <img src={(isShowValue && Hide) || Show} alt="actionIcon" />
      </div>
    </div>
  );
};
