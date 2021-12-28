import React, { useEffect, useState } from 'react';
import styles from './styles.module.less';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@components/mui/button';
import { SocialNetworks } from './../socialNetworks';
import * as AuthStore from '@store/auth';
import { AuthContainer } from './../authContainer';
import { RegistrationByEmail } from '../registrationByEmail';
import { RegistrationByPhone } from '../registrationByPhone';

export const Registration = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isRegistrationByPhone, setIsRegistrationByPhone] = useState(false);
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
      //history.push('/courses');
    }
  }, [headers]);

  function handleChacked() {
    setCheckedError('');
    setChecked(!checked);
  }

  function handleRegistrationMethod() {
    setIsRegistrationByPhone(!isRegistrationByPhone);
  }

  return (
    <AuthContainer>
      <h1 className={styles.title}>Создайте аккаунт, чтобы начать обучение</h1>
      {!isRegistrationByPhone ? (
        <RegistrationByEmail
          handleChacked={handleChacked}
          handleChange={handleChange}
          email={email}
          password={password}
          passwordConfirmation={passwordConfirmation}
          errors={errors}
          checkedError={checkedError}
          checked={checked}
          handleRegistrationMethod={handleRegistrationMethod}
        />
      ) : (
        <RegistrationByPhone
          handleRegistrationMethod={handleRegistrationMethod}
          handleChange={(e) => setPhoneNumber(e.target.value)}
          phoneNumber={phoneNumber}
        />
      )}
      <Button className={styles.btn} variant="outlinePurple" onClick={submit}>
        Перейти к обучению
      </Button>
      {errors.fullMessagesError && (
        <span className={styles.error}>{errors.fullMessagesError || checkedError}</span>
      )}
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
