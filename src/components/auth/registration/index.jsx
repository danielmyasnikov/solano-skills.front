import React, { useEffect, useState } from 'react';
import styles from './styles.module.less';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@components/mui/button';
import { SocialNetworks } from './../socialNetworks';
import * as AuthStore from '@store/auth';
import { AuthContainer } from './../authContainer';
import { RegistrationByEmail } from '../registrationByEmail';
import { ByPhoneNumber } from '../byPhoneNumber';
import { PhoneNumberConfirmation } from '../phoneNumberConfirmation';
import Terms from '../terms';

export const Registration = ({ isModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [buttonTitle, setButtonTitle] = useState('Перейти к обучению');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmationСode, setConfirmationCode] = useState('');
  const [isPhoneNumberConfirmation, setIsPhoneNumberConfirmation] = useState(false);
  const [isRegistrationByPhone, setIsRegistrationByPhone] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [checked, setChecked] = useState(false);
  const [phoneTermsChecked, setPhoneTermsChecked] = useState(false);
  const { errors, headers } = useSelector(AuthStore.Selectors.getAuth);
  const [checkedError, setCheckedError] = useState('');
  const [phoneTermsCheckedError, setPhoneTermsCheckedError] = useState('');

  useEffect(() => {
    if (!isPhoneNumberConfirmation && !isRegistrationByPhone) {
      setButtonTitle('Перейти к обучению');
    }
    if (isRegistrationByPhone && isPhoneNumberConfirmation) {
      setButtonTitle('Перейти к обучению');
    }
    if (isRegistrationByPhone && !isPhoneNumberConfirmation) {
      setButtonTitle('Отправить код');
    }
  }, [isPhoneNumberConfirmation, isRegistrationByPhone]);

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
      case 'phone':
        setPhoneNumber(value);
        break;
      case 'confirmationCode':
        setConfirmationCode(value);
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
    if (checked && !isRegistrationByPhone) {
      dispatch(AuthStore.Actions.registration(email, password, passwordConfirmation));
    }
    if (isRegistrationByPhone && phoneTermsChecked) {
      setPhoneNumber(phoneNumber.replace(/[^0-9]/g, ''));
      setIsPhoneNumberConfirmation(true);
    }
    if (isRegistrationByPhone && !phoneTermsChecked) {
      setPhoneTermsCheckedError('Неверные данные');
    }
    if (!checked) {
      setCheckedError('Ошибка ввода данных');
    }
  }

  useEffect(() => {
    if (headers.uid && headers.client && headers['access-token']) {
      history.push('/courses');
    }
  }, [headers]);

  function handleChecked() {
    setCheckedError('');
    setChecked(!checked);
  }

  function handlePhoneTermsChecked() {
    setPhoneTermsCheckedError('');
    setPhoneTermsChecked(!phoneTermsChecked);
  }

  function handleAuthMethod() {
    dispatch(
      AuthStore.Actions.clearErrors({
        emailError: '',
        passwordError: '',
        passwordConfirmationError: '',
        fullMessagesError: '',
      }),
    );
    setIsRegistrationByPhone(!isRegistrationByPhone);
  }

  const renderRegistration = () => {
    return (
      <>
        <h1 className={styles.title}>Создайте аккаунт, чтобы начать обучение</h1>
        {!isRegistrationByPhone && !isPhoneNumberConfirmation && (
          <RegistrationByEmail
            handleChecked={handleChecked}
            handleChange={handleChange}
            email={email}
            password={password}
            passwordConfirmation={passwordConfirmation}
            errors={errors}
            checkedError={checkedError}
            checked={checked}
            handleAuthMethod={handleAuthMethod}
          />
        )}
        {isRegistrationByPhone && !isPhoneNumberConfirmation && (
          <>
            <ByPhoneNumber
              handleAuthMethod={handleAuthMethod}
              authMethodText="Регистрация по Email"
              handleChange={handleChange}
              phoneNumber={phoneNumber}
            />
            <Terms
              isPhoneNumber={isRegistrationByPhone}
              checked={phoneTermsChecked}
              handleChecked={handlePhoneTermsChecked}
              checkedError={phoneTermsCheckedError}
            />
          </>
        )}
        {isPhoneNumberConfirmation && (
          <PhoneNumberConfirmation
            handleChange={handleChange}
            confirmationСode={confirmationСode}
            handleAuthMethod={() => {
              setConfirmationCode('');
              setIsPhoneNumberConfirmation(false);
            }}
          />
        )}
        <Button className={styles.btn} variant="outlinePurple" onClick={submit}>
          {buttonTitle}
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
      </>
    );
  };

  return isModal ? renderRegistration() : <AuthContainer>{renderRegistration()}</AuthContainer>;
};
