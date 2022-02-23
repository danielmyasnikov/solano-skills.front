import React from 'react';
import cn from 'classnames';
import InputMask from 'react-input-mask';
import styles from './styles.module.less';

export const ByPhoneNumber = ({
  handleAuthMethod,
  authMethodText,
  handleChange,
  phoneNumber,
  countTime,
}) => (
  <>
    <span className={cn(styles.subTitile)}>Номер телефона</span>
    <InputMask
      value={phoneNumber}
      className={styles.input}
      onChange={handleChange}
      maskChar="_"
      alwaysShowMask
      mask="+7\ (999) 999-99-99"
      name="phone"
      type="tel"
    />
    {countTime > 0 && (
      <span className={styles.error}>
        Вы сможете отправить смс код повторно через {countTime} сек
      </span>
    )}
    <div onClick={() => handleAuthMethod()} className={styles.link} role="presentation">
      {authMethodText}
    </div>
  </>
);
