import React, { useEffect, useState } from 'react';
import styles from './styles.module.less';
import cn from 'classnames';
import InputMask from 'react-input-mask';

export const PhoneNumberConfirmation = ({
  handleAuthMethod,
  confirmationСode,
  handleChange,
  errors,
}) => {
  return (
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
      ></InputMask>
      {errors.errorVerify && <span className={styles.error}>{errors.errorVerify}</span>}
      <div onClick={() => handleAuthMethod()} className={styles.link}>
        Изменить номер телефона
      </div>
    </>
  );
};
