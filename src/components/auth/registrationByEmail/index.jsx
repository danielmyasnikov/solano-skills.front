import React from 'react';
import cn from 'classnames';
import { InputPassword } from '@components/mui/inputPassword';
import { Input } from '@components/mui/input';
import styles from './styles.module.less';
import Terms from '../terms';

export const RegistrationByEmail = ({
  handleChecked,
  handleChange,
  email,
  password,
  passwordConfirmation,
  errors,
  checkedError,
  checked,
  handleAuthMethod,
}) => (
  <>
    <span className={cn(styles.subTitile, { [styles.subTitileError]: errors.emailError })}>
      E-mail
    </span>
    <div className={cn(styles.inputWrapper, { [styles.inputWrapperError]: errors.emailError })}>
      <Input value={email} handleChange={handleChange} name="email" />
      {errors.emailError && <span className={styles.error}>{errors.emailError}</span>}
    </div>
    <div onClick={() => handleAuthMethod()} className={styles.link} role="presentation">
      Регистрация по номеру телефона
    </div>
    <span className={cn(styles.subTitile, { [styles.subTitileError]: errors.passwordError })}>
      Пароль
    </span>
    <div className={cn(styles.inputWrapper, { [styles.inputWrapperError]: errors.passwordError })}>
      <InputPassword value={password} handleChange={handleChange} name="password" />
      {errors.passwordError && <span className={styles.error}>{errors.passwordError}</span>}
    </div>
    <div
      className={cn(styles.inputWrapper, {
        [styles.inputWrapperError]: errors.passwordConfirmationError,
      })}
    >
      <InputPassword
        value={passwordConfirmation}
        handleChange={handleChange}
        name="passwordConfirmation"
      />
      {errors.passwordConfirmationError && (
        <span className={styles.error}>{errors.passwordConfirmationError}</span>
      )}
    </div>
    <Terms handleChecked={handleChecked} checked={checked} checkedError={checkedError} />
  </>
);
