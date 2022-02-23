import React from 'react';
import cn from 'classnames';
import { InputPassword } from '@components/mui/inputPassword';
import { Input } from '@components/mui/input';
import { CheckboxBtn } from '@components/mui/checkbox';
import styles from './styles.module.less';

export const AuthorizationByEmail = ({
  handleChange,
  email,
  password,
  rememberMe,
  handleRemberMe,
  errors,
  // eslint-disable-next-line no-unused-vars
  checkedError,
  // eslint-disable-next-line no-unused-vars
  checked,
  handleAuthMethod,
}) => (
  <>
    <span className={cn(styles.subTitile, { [styles.subTitileError]: errors.errorMassege })}>
      E-mail
    </span>
    <div className={cn(styles.inputWrapper, { [styles.inputWrapperError]: errors.errorMassege })}>
      <Input value={email} handleChange={handleChange} name="email" />
    </div>
    <div onClick={() => handleAuthMethod()} className={styles.link} role="presentation">
      Авторизоваться по номеру телефона
    </div>
    <span className={cn(styles.subTitile, { [styles.subTitileError]: errors.errorMassege })}>
      Пароль
    </span>
    <div className={cn(styles.inputWrapper, { [styles.inputWrapperError]: errors.errorMassege })}>
      <InputPassword value={password} handleChange={handleChange} name="password" />
    </div>
    <div className={styles.infoWrapper}>
      <div className={styles.rememberMe}>
        <CheckboxBtn value={rememberMe} handleChange={handleRemberMe} />
        <div className={styles.rememberMeInfo} onClick={() => handleRemberMe()} role="presentation">
          Запомнить меня
        </div>
      </div>
      <div className={styles.forgotPassword}>Забыли пароль?</div>
    </div>
  </>
);
