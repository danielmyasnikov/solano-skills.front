import React, { useEffect, useState } from 'react';
import styles from './styles.module.less';
import { InputPassword } from '@components/mui/inputPassword';
import { Input } from '@components/mui/input';
import Button from '@components/mui/button';
import { CheckboxBtn } from '@components/mui/checkbox';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SocialNetworks } from './../socialNetworks';
import * as AuthStore from '@store/auth';

import { AuthContainer } from './../authContainer';

export const Registration = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [checked, setChecked] = useState(false);
  const { errors, headers } = useSelector(AuthStore.Selectors.getAuth);
  const [checkedError, setCheckedError] = useState('');

  function handleChange(e) {
    const { value, name } = e.target;
    switch (name) {
      case 'email':
        dispatch(AuthStore.Actions.clearErrors({ emailError: '', fullMessagesError: '' }));
        setEmail(value);
        break;
      case 'password':
        dispatch(AuthStore.Actions.clearErrors({ passwordError: '', fullMessagesError: '' }));
        setPassword(value);
        break;
      case 'passwordConfirmation':
        dispatch(
          AuthStore.Actions.clearErrors({ passwordConfirmationError: '', fullMessagesError: '' }),
        );
        setPasswordConfirmation(value);
        break;
      default:
        return undefined;
    }
  }

  function submit() {
    if (checked) {
      dispatch(AuthStore.Actions.registration(email, password, passwordConfirmation));
    } else {
      setCheckedError('Ошибка ввода данных');
    }
  }

  useEffect(() => {
    if (headers.uid && headers.client && headers['access-token']) {
      history.push('/courses');
    }
  }, [headers]);

  function handleChacked() {
    setCheckedError('');
    setChecked(!checked);
  }

  return (
    <AuthContainer>
      <h1 className={styles.title}>Создайте аккаунт, чтобы начать обучение</h1>
      <span className={styles.subTitile}>E-mail</span>
      <div className={styles.inputWrapper}>
        <Input value={email} handleChange={handleChange} name="email" />
        <span className={styles.error}>{errors.emailError}</span>
      </div>
      <span className={styles.subTitile}>Пароль</span>
      <div className={styles.inputWrapper}>
        <InputPassword value={password} handleChange={handleChange} name="password" />
        <span className={styles.error}>{errors.passwordError}</span>
      </div>
      <div className={styles.inputWrapper}>
        <InputPassword
          value={passwordConfirmation}
          handleChange={handleChange}
          name="passwordConfirmation"
        />
        <span className={styles.error}>{errors.passwordConfirmationError}</span>
      </div>
      <div className={styles.infoWrapper}>
        <CheckboxBtn error={!!checkedError} value={checked} handleChange={handleChacked} />
        <div className={styles.info}>
          Я принимаю условия
          <Link className={styles.infoLink} to={'/'}>
            {' Пользовательского '}
          </Link>
          соглашения и даю своё согласие на обработку персональных данных на условиях, определенных
          <Link className={styles.infoLink} to={'/'}>
            {' Политикой конфиденциальности '}
          </Link>
          .
        </div>
      </div>
      <Button className={styles.btn} variant="outlinePurple" onClick={submit}>
        Перейти к обучению
      </Button>
      <span className={styles.error}>{errors.fullMessagesError || checkedError}</span>

      <SocialNetworks />
      
      <div className={styles.toAuth}>
        <span className={styles.text}>
          {'Уже есть аккаунт? '}
          <Link className={styles.infoLink} to={'/sing-in'}>
            Войти
          </Link>
        </span>
      </div>
    </AuthContainer>
  );
};
