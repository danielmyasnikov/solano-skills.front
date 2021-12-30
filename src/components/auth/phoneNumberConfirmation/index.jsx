import React, { useEffect, useState } from 'react';
import styles from './styles.module.less';
import cn from 'classnames';
import InputMask from 'react-input-mask';

export const PhoneNumberConfirmation = ({
  handleAuthMethod,
  confirmationСode,
  handleChange,
}) => {
  return (
    <>
      <span className={cn(styles.subTitile)}>Код подтверждения</span>
      <InputMask
        value={confirmationСode}
        className={styles.input}
        onChange={handleChange}
        maskChar="_"
        placeholder="___ - ___"
        alwaysShowMask={false}
        name='confirmationCode'
        mask="999 - 999"
      ></InputMask>
      <div onClick={() => handleAuthMethod()} className={styles.link}>
        Изменить номер телефона
      </div>
    </>
  );
};
