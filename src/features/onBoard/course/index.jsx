import { useState } from 'react';

import styles from './styles.module.less';
import logo from '@assets/Python.svg';
import { CheckboxBtn } from '@components/mui/Checkbox';
import cn from 'classnames';

export const Course = ({
  id,
  title,
  description,
  isDevelopment,
  handleСhoice,
  handleRemoveChoice,
}) => {
  const [checked, setChecked] = useState(false);

  function handleClick() {
    !checked ? handleСhoice(id) : handleRemoveChoice(id);
    setChecked(!checked);
  }

  const handleChecked = (e) => {
    e.target.checked ? handleСhoice(id) : handleRemoveChoice(id);
    setChecked(!checked);
  };

  return (
    <div className={cn(styles.wrapper, { [styles.wrapperChecked]: checked })} onClick={handleClick}>
      <div className={styles.checkbox}>
        <CheckboxBtn value={checked} handleChange={handleChecked} />
      </div>
      <img className={styles.logo} src={logo} alt="Логотип компании" />
      <div className={cn(styles.info, { [styles.infoWithAttention]: isDevelopment && checked })}>
        <span className={styles.infoTitle}>{title}</span>
        <span className={styles.infoAbout}>{description}</span>
        {isDevelopment && checked && (
          <span className={styles.infoAttention}>
            Сейчас эта профессия в разработке. Как только она появится, мы Вас оповестим.
          </span>
        )}
      </div>
    </div>
  );
};
