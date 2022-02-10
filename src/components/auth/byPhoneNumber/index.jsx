import React, { useEffect, useState } from 'react';
import styles from './styles.module.less';
import cn from 'classnames';
import InputMask from 'react-input-mask';

export const ByPhoneNumber = ({
  handleAuthMethod,
  authMethodText,
  handleChange,
  phoneNumber,
  countTime,
}) => {
  return (
    <>
      <span className={cn(styles.subTitile)}>Номер телефона</span>
      <InputMask
        value={phoneNumber}
        className={styles.input}
        onChange={handleChange}
        maskChar="_"
        alwaysShowMask={true}
        mask="+7\ (999) 999-99-99"
        name="phone"
        type="tel"
      ></InputMask>
      {countTime > 0 && <span className={styles.error}>Вы сможете отправить смс код повторно через {countTime} сек</span>}
      <div onClick={() => handleAuthMethod()} className={styles.link}>
        {authMethodText}
      </div>
    </>
  );
};
