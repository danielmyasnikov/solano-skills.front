import React, { useEffect, useState } from 'react';
import styles from './styles.module.less';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@components/mui/button';
import Close from '@assets/Close.js';
import * as AuthStore from '@store/auth';
import { AuthContainer } from './../authContainer';
import { RegistrationByEmail } from '../registrationByEmail';
import { ByPhoneNumber } from '../byPhoneNumber';
import { PhoneNumberConfirmation } from '../phoneNumberConfirmation';
import Terms from '../terms';
import cn from 'classnames';
import { selectIsAuth } from '@store/profile/selector';

export const Registration = ({ variant, isModal, onClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [buttonTitle, setButtonTitle] = useState('Перейти к обучению');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const isAuth = useSelector(selectIsAuth);
  const [isPhoneNumberConfirmation, setIsPhoneNumberConfirmation] = useState(false);
  const [isRegistrationByPhone, setIsRegistrationByPhone] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [checked, setChecked] = useState(false);
  const [phoneTermsChecked, setPhoneTermsChecked] = useState(false);

  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [checkedError, setCheckedError] = useState('');
  const [phoneTermsCheckedError, setPhoneTermsCheckedError] = useState('');

  const { errors: reduxErrors, headers } = useSelector(AuthStore.Selectors.getAuth);
  const { isReg } = useSelector(AuthStore.Selectors.getAuth);

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
    setIsSubmit(true);
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
    if (isSubmit) {
      setErrors(reduxErrors);
      setIsSubmit(false);
    }
  }, [reduxErrors]);

  useEffect(() => {
    if (isAuth) {
      history.push('/courses');
      if (isReg) {
        history.push('/onBoard');
      } else {
        history.push('/courses');
      }
    }
  }, [isAuth]);

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
      <div className={cn(styles.wrapper, styles[variant])}>
        {variant !== 'home_offer' && variant !== 'home_end' && (
          <div className={styles.closeModal} onClick={onClose}>
            <Close />
          </div>
        )}
        <h1 className={cn(styles.title)}>Создайте аккаунт, чтобы начать обучение</h1>
        {!isRegistrationByPhone && !isPhoneNumberConfirmation && (
          <RegistrationByEmail
            variant={variant}
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
              variant={variant}
              handleAuthMethod={handleAuthMethod}
              authMethodText="Регистрация по Email"
              handleChange={handleChange}
              phoneNumber={phoneNumber}
            />
            <Terms
              variant={variant}
              checked={phoneTermsChecked}
              handleChecked={handlePhoneTermsChecked}
              checkedError={phoneTermsCheckedError}
            />
          </>
        )}
        {isPhoneNumberConfirmation && (
          <PhoneNumberConfirmation
            variant={variant}
            handleChange={handleChange}
            confirmationСode={confirmationCode}
            handleAuthMethod={() => {
              setConfirmationCode('');
              setIsPhoneNumberConfirmation(false);
            }}
          />
        )}
        <div className={styles.btnDiv}>
          <Button
            className={styles.btn}
            variant={variant === 'home_end' ? 'outlineWhite' : 'outlinePurple'}
            onClick={submit}
          >
            {buttonTitle}
          </Button>
        </div>
        {errors.fullMessagesError && (
          <div className={styles.errorDiv}>
            {errors.fullMessagesError.reverse().map((text) => (
              <p className={styles.error}>{text || checkedError}</p>
            ))}
          </div>
        )}
        {/* <SocialNetworks variant={variant} /> */}
        <div className={styles.toAuth}>
          <span className={styles.text}>
            {'Уже есть аккаунт? '}
            <Link className={styles.infoLink} to={'/sign-in'}>
              Войти
            </Link>
          </span>
        </div>
      </div>
    );
  };

  return isModal ? renderRegistration() : <AuthContainer>{renderRegistration()}</AuthContainer>;
};
