import React from 'react';
import cn from 'classnames';
import InputMask from 'react-input-mask';
import styles from './styles.module.less';

export const PhoneNumberConfirmation = ({
  handleAuthMethod,
  confirmationСode,
  handleChange,
  errors,
}) => (
  <>
    <span className={cn(styles.subTitile)}>Код подтверждения</span>
    <InputMask
      value={confirmationСode}
      className={styles.input}
      onChange={handleChange}
      maskChar="_"
      placeholder="__"
      alwaysShowMask={false}
      name="confirmationCode"
      mask="99"
    />
    {errors?.errorVerify && <span className={styles.error}>{errors?.errorVerify}</span>}
    <div onClick={() => handleAuthMethod()} className={styles.link} role="presentation">
      Изменить номер телефона
    </div>
  </>
);
