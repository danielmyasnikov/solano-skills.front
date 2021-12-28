import React, { useEffect, useState } from 'react';
import styles from './styles.module.less';
import cn from 'classnames';
import InputMask from 'react-input-mask';

export const RegistrationByPhone = ({ handleRegistrationMethod, handleChange, phoneNumber, errors }) => {
  return (
    <>
      <span className={cn(styles.subTitile)}>
        Номер телефона
      </span>
      <InputMask
        value={phoneNumber}
        className={styles.input}
        onChange={handleChange}
        maskChar="_"
        alwaysShowMask={true}
        mask="+7\ (999) 999-99-99"
      ></InputMask>
      <div onClick={() => handleRegistrationMethod()} className={styles.link}>
        Регистрация по почте
      </div>
    </>
  );
};
