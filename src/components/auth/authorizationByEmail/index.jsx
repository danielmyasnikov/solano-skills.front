import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './styles.module.less';
import { InputPassword } from '@components/mui/inputPassword';
import { Input } from '@components/mui/input';
import Button from '@components/mui/button';
import { Link, useHistory } from 'react-router-dom';
import { SocialNetworks } from './../socialNetworks';
import { CheckboxBtn } from '@components/mui/checkbox';

export const AuthorizationByEmail = ({
  handleChange,
  email,
  password,
  rememberMe,
  handleRemberMe,
  errors,
  checkedError,
  checked,
  handleAuthMethod,
  onForgotPassword,
}) => {
  const forgotPasswordHandler = () => onForgotPassword();

  return (
    <>
      <span className={cn(styles.subTitile, { [styles.subTitileError]: errors.errorMassege })}>
        E-mail
      </span>
      <div className={cn(styles.inputWrapper, { [styles.inputWrapperError]: errors.errorMassege })}>
        <Input value={email} handleChange={handleChange} name="email" placeholder="Ваш e-mail" />
      </div>
      <div onClick={() => handleAuthMethod()} className={styles.link}>
        {/* Авторизоваться по номеру телефона */}
      </div>
      <span className={cn(styles.subTitile, { [styles.subTitileError]: errors.errorMassege })}>
        Пароль
      </span>
      <div className={cn(styles.inputWrapper, { [styles.inputWrapperError]: errors.errorMassege })}>
        <InputPassword
          value={password}
          handleChange={handleChange}
          name="password"
          placeholder="Введите пароль"
        />
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.rememberMe}>
          <CheckboxBtn value={rememberMe} handleChange={handleRemberMe} />
          <div className={styles.rememberMeInfo} onClick={() => handleRemberMe()}>
            Запомнить меня
          </div>
        </div>
        <div className={styles.forgotPassword} onClick={forgotPasswordHandler}>
          Забыли пароль?
        </div>
      </div>
    </>
  );
};
