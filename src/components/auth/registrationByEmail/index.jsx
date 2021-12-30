import React from 'react';
import cn from 'classnames';
import styles from './styles.module.less';
import { Link } from 'react-router-dom';
import { InputPassword } from '@components/mui/inputPassword';
import { Input } from '@components/mui/input';
import { CheckboxBtn } from '@components/mui/checkbox';

export const RegistrationByEmail = ({
  handleChacked,
  handleChange,
  email,
  password,
  passwordConfirmation,
  errors,
  checkedError,
  checked,
  handleAuthMethod,
}) => {
  return (
    <>
      <span className={cn(styles.subTitile, { [styles.subTitileError]: errors.emailError })}>
        E-mail
      </span>
      <div className={cn(styles.inputWrapper, { [styles.inputWrapperError]: errors.emailError })}>
        <Input value={email} handleChange={handleChange} name="email" />
        {errors.emailError && <span className={styles.error}>{errors.emailError}</span>}
      </div>
      <div onClick={() => handleAuthMethod()} className={styles.link}>
        Регистрация по номеру телефона
      </div>
      <span className={cn(styles.subTitile, { [styles.subTitileError]: errors.passwordError })}>
        Пароль
      </span>
      <div
        className={cn(styles.inputWrapper, { [styles.inputWrapperError]: errors.passwordError })}
      >
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
      <div className={styles.infoWrapper}>
        <CheckboxBtn error={!!checkedError} value={checked} handleChange={handleChacked} />
        <div className={styles.info} onClick={() => handleChacked()}>
          Я принимаю условия
          <Link className={styles.infoLink} to={'/'}>
            {' Пользовательского соглашения '}
          </Link>
          и даю своё согласие на обработку персональных данных на условиях, определенных
          <Link className={styles.infoLink} to={'/'}>
            {' Политикой конфиденциальности '}
          </Link>
          .
        </div>
      </div>
    </>
  );
};
