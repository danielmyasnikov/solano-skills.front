import { useEffect, useState } from 'react';
import styles from './styles.module.less';
import { useDispatch, useSelector } from 'react-redux';
import * as AuthStore from '@store/auth';
import { Link } from 'react-router-dom';
import { AuthContainer } from './../authContainer';
import { AuthorizationByEmail } from '../authorizationByEmail';
import { ByPhoneNumber } from '../byPhoneNumber';
import { PhoneNumberConfirmation } from '../phoneNumberConfirmation';
import axios from 'axios';
import Terms from '../terms';
import { ForgotPassword } from '../forgotPassword';
import { selectIsAuth } from '@store/profile/selector';
import { Redirect } from 'react-router';
import { getProfile } from '@store/profile/actions';
import { Button } from '@mui/material';
import { env } from '@src/app/config/index.ts';
import api from '@src/http/api.ts';
import Helmet from 'react-helmet';

export const Authorization = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [buttonTitle, setButtonTitle] = useState('Авторизоваться');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const isAuth = useSelector(selectIsAuth);
  const [isPhoneNumberConfirmation, setIsPhoneNumberConfirmation] = useState(false);
  const [isRegistrationByPhone, setIsRegistrationByPhone] = useState(false);
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [countTime, setCountTime] = useState(0);
  const { errors, headers } = useSelector(AuthStore.Selectors.getAuth);
  const [checked, setChecked] = useState(false);
  const [checkedError, setCheckedError] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleChecked = () => {
    setCheckedError('');
    setChecked(!checked);
  };

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
        return undefined;
    }
  };

  const submit = async () => {
    if (!isRegistrationByPhone) {
      dispatch(AuthStore.Actions.singIn(email, password));
    }
    if (isRegistrationByPhone && !isPhoneNumberConfirmation && !checked) {
      setCheckedError('Неверные данные');
    }
    if (isRegistrationByPhone && !isPhoneNumberConfirmation && checked) {
      const sendCode = async () => {
        return await api
          .get(`/api/v1/request_signature_code`, {
            phone_number: phoneNumber,
          })
          .then(() => setIsPhoneNumberConfirmation(true))
          .catch((error) => {
            setCountTime(Number(error.response.data.errors).toFixed());
          });
      };
      await sendCode();
    }
    if (isPhoneNumberConfirmation && isRegistrationByPhone) {
      dispatch(AuthStore.Actions.signInByPhoneVerify(confirmationCode));
    }
  };

  const handleRememberMe = () => setRememberMe(!rememberMe);

  const handleAuthMethod = () => {
    dispatch(
      AuthStore.Actions.clearErrors({
        errorMassege: '',
      }),
    );
    setIsRegistrationByPhone(!isRegistrationByPhone);
  };

  const forgotPasswordHandler = () => setForgotPassword(!forgotPassword);

  useEffect(() => {
    if (!isPhoneNumberConfirmation && !isRegistrationByPhone) {
      setButtonTitle('Авторизоваться');
    }
    if (isRegistrationByPhone && isPhoneNumberConfirmation) {
      setButtonTitle('Авторизоваться');
    }
    if (isRegistrationByPhone && !isPhoneNumberConfirmation) {
      setButtonTitle('Отправить код');
    }
  }, [isPhoneNumberConfirmation, isRegistrationByPhone]);

  useEffect(() => {
    if (headers && headers.uid && headers.client) {
      dispatch(getProfile({ headers }));
    }
  }, [headers]);

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

  if (isAuth) {
    return <Redirect to="/courses" />;
  }

  return (
    <AuthContainer>
      <Helmet title="Авторизация" />
      {(forgotPassword && <ForgotPassword />) || (
        <>
          <h1 className={styles.title}>Добро пожаловать</h1>
          {!isRegistrationByPhone && !isPhoneNumberConfirmation && (
            <AuthorizationByEmail
              handleChange={handleChange}
              email={email}
              password={password}
              errors={errors}
              rememberMe={rememberMe}
              handleRemberMe={handleRememberMe}
              handleAuthMethod={handleAuthMethod}
              onForgotPassword={forgotPasswordHandler}
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
              confirmationСode={confirmationCode}
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
        </>
      )}

      {/* <div className={styles.socialNetworksWrap}>
        <SocialNetworks />
      </div> */}

      <div className={styles.toAuth}>
        {(forgotPassword && (
          <span className={styles.text}>
            {'У вас уже есть аккаунт? '}
            <span
              className={styles.infoLinkAsButton}
              onClick={() => setForgotPassword(!forgotPassword)}
            >
              Войдите
            </span>
          </span>
        )) || (
          <span className={styles.text}>
            {'У вас нет аккаунта? '}
            <Link className={styles.infoLink} to={'/sign-up'}>
              Зарегистрироваться
            </Link>
          </span>
        )}
      </div>
    </AuthContainer>
  );
};
