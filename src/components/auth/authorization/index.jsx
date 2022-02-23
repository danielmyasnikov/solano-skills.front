import React, { useEffect, useState } from 'react';
import Button from '@components/mui/button';
import { useDispatch, useSelector } from 'react-redux';
import * as AuthStore from '@store/auth';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContainer } from '../authContainer';
import { SocialNetworks } from '../socialNetworks';
import { PhoneNumberConfirmation } from '../phoneNumberConfirmation';
import styles from './styles.module.less';
import { ByPhoneNumber } from '../byPhoneNumber';
import { AuthorizationByEmail } from '../authorizationByEmail';
import Terms from '../terms';

export const Authorization = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [buttonTitle, setButtonTitle] = useState('Авторизоваться');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmationСode, setConfirmationCode] = useState('');
  const [isPhoneNumberConfirmation, setIsPhoneNumberConfirmation] = useState(false);
  const [isRegistrationByPhone, setIsRegistrationByPhone] = useState(false);
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [countTime, setCountTime] = useState(0);
  const { errors, headers } = useSelector(AuthStore.Selectors.getAuth);
  const [checked, setChecked] = useState(false);
  const [checkedError, setCheckedError] = useState(false);

  const handleChecked = () => {
    setCheckedError('');
    setChecked(!checked);
  };

  useEffect(() => {
    if (!isPhoneNumberConfirmation && !isRegistrationByPhone) {
      setButtonTitle('Авторизоваться');
    } else if (isRegistrationByPhone && isPhoneNumberConfirmation) {
      setButtonTitle('Авторизоваться');
    } else if (isRegistrationByPhone && !isPhoneNumberConfirmation) {
      setButtonTitle('Отправить код');
    }
  }, [isPhoneNumberConfirmation, isRegistrationByPhone]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    switch (name) {
      case 'email':
        dispatch(AuthStore.Actions.clearErrors({ errorMassege: '' }));
        setEmail(value);
        break;
      case 'phone':
        setPhoneNumber(value.replace(/[^0-9]/g, ''));
        break;
      case 'confirmationCode':
        setConfirmationCode(value);
        break;
      case 'password':
        dispatch(AuthStore.Actions.clearErrors({ errorMassege: '' }));
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const submit = () => {
    if (!isRegistrationByPhone) {
      dispatch(AuthStore.Actions.singIn(email, password));
    }
    if (isRegistrationByPhone && !isPhoneNumberConfirmation && !checked) {
      setCheckedError('Неверные данные');
    }
    if (isRegistrationByPhone && !isPhoneNumberConfirmation && checked) {
      const sendCode = async () => {
        await axios
          .get(`${process.env.REACT_APP_API_COURSE}/api/v1/request_signature_code`, {
            phone_number: phoneNumber,
          })
          .then(() => setIsPhoneNumberConfirmation(true))
          .catch((error) => {
            setCountTime(Number(error.response.data.errors).toFixed());
          });
      };
      sendCode();
    }
    if (isPhoneNumberConfirmation && isRegistrationByPhone) {
      dispatch(AuthStore.Actions.signInByPhoneVerify(confirmationСode));
    }
  };

  useEffect(() => {
    if (headers.uid && headers.client && headers['access-token']) {
      history.push('/courses');
    }
  }, [headers]);

  const handleRemberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleAuthMethod = () => {
    dispatch(
      AuthStore.Actions.clearErrors({
        errorMassege: '',
      }),
    );
    setIsRegistrationByPhone(!isRegistrationByPhone);
  };

  useEffect(() => {
    let timer;
    if (countTime > 0) {
      timer = setTimeout(() => setCountTime((count) => count - 1), 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [countTime]);

  return (
    <AuthContainer>
      <h1 className={styles.title}>Добро пожаловать</h1>
      {!isRegistrationByPhone && !isPhoneNumberConfirmation && (
        <AuthorizationByEmail
          handleChange={handleChange}
          email={email}
          password={password}
          errors={errors}
          rememberMe={rememberMe}
          handleRemberMe={handleRemberMe}
          handleAuthMethod={handleAuthMethod}
        />
      )}
      {isRegistrationByPhone && !isPhoneNumberConfirmation && (
        <>
          <ByPhoneNumber
            errors={errors}
            handleAuthMethod={handleAuthMethod}
            authMethodText="Авторизоваться по Email"
            handleChange={handleChange}
            phoneNumber={phoneNumber}
            countTime={countTime}
          />
          <Terms
            isPhoneNumber={isRegistrationByPhone}
            checked={checked}
            handleChecked={handleChecked}
            checkedError={checkedError}
          />
        </>
      )}
      {isPhoneNumberConfirmation && (
        <PhoneNumberConfirmation
          errors={errors}
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
      <span className={styles.error}>{errors.errorMassege}</span>

      <div className={styles.socialNetworksWrap}>
        <SocialNetworks />
      </div>

      <div className={styles.toAuth}>
        <span className={styles.text}>
          {'У вас нет аккаунта? '}
          <Link className={styles.infoLink} to="/registration">
            Зарегистрироваться
          </Link>
        </span>
      </div>
    </AuthContainer>
  );
};
