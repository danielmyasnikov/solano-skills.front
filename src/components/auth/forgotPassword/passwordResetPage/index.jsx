import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useParams, useHistory } from 'react-router-dom';

import { AuthContainer } from '../../authContainer';
import { PasswordResetErrorModal } from '../passwordResetErrorModal';

import * as AuthStore from '@store/auth';

import cn from 'classnames';
import styles from './styles.module.less';
import { getProfile } from '@store/profile/actions';
import { Button } from '@mui/material';
import { InputPassword } from '@components/mui/Password';
import { Helmet } from 'react-helmet';

export const PasswordResetPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const [errorMessagePassword, setErrorMessagePassword] = useState('');
  const [errorMessageConfirmPassword, setErrorMessageConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const history = useHistory();

  const { recoveryPasswordStatus } = useSelector(AuthStore.Selectors.getAuth);

  const disabledHandler = () => password === confirmPassword && password.length >= 6;

  const { resetToken } = useParams();

  const resetPasswordHandler = () => {
    dispatch(AuthStore.Actions.patchPassword(resetToken, password, confirmPassword));
  };

  useEffect(() => {
    if (recoveryPasswordStatus === 'failure') {
      setTimeout(() => {
        history.push('/sign-in');
      }, 3000);
    } else if (recoveryPasswordStatus === 'success') {
      const uid = localStorage.getItem('uid');
      const client = localStorage.getItem('client');
      const accessToken = localStorage.getItem('access-token');

      dispatch(
        getProfile({
          headers: {
            uid,
            client,
            'access-token': accessToken,
          },
        }),
      );

      history.push('/courses');
    }
  }, [recoveryPasswordStatus]);

  useEffect(() => {
    if (password.length && confirmPassword.length) {
      if (password.length < 6) {
        setIsPasswordValid(false);
        setErrorMessagePassword('Длина должна быть не менее 6 символов');
      }

      if (confirmPassword.length < 6) {
        setIsConfirmPasswordValid(false);
        setErrorMessageConfirmPassword('Длина должна быть не менее 6 символов');
      }

      if (password.length >= 6) {
        setIsPasswordValid(true);
        setErrorMessagePassword('');
      }

      if (confirmPassword.length >= 6) {
        setIsConfirmPasswordValid(true);
        setErrorMessageConfirmPassword('');
      }

      if (password !== confirmPassword) {
        setIsPasswordValid(false);
        setErrorMessagePassword('Пароли должны совпадать');
        setIsConfirmPasswordValid(false);
        setErrorMessagePassword('Пароли должны совпадать');
      }
    }

    if (!password.length && !confirmPassword.length) {
      setIsPasswordValid(true);
      setErrorMessagePassword('');
      setIsConfirmPasswordValid(true);
      setErrorMessageConfirmPassword('');
    }
  }, [password, confirmPassword]);

  return (
    <AuthContainer>
      <Helmet title="Сброс пароля">
        <meta name="description" content="Здесь вы можете сбросить пароль." />
      </Helmet>
      <div className={styles.wrapper}>
        {recoveryPasswordStatus === 'failure' && <PasswordResetErrorModal />}
        <h1 className={styles.title}>Придумайте пароль</h1>
        <span className={styles.label}>Пароль</span>
        <div className={cn(styles.password, { [styles.passwordError]: !isPasswordValid })}>
          <InputPassword
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder={'Новый пароль'}
          />
          {!isPasswordValid && errorMessagePassword && (
            <span className={styles.errorHint}>{errorMessagePassword}</span>
          )}
        </div>
        <div
          className={cn(styles.confirmPassword, {
            [styles.confirmPasswordError]: !isConfirmPasswordValid,
          })}
        >
          <InputPassword
            value={confirmPassword}
            handleChange={(e) => setConfirmPassword(e.target.value)}
            name="password"
            placeholder={'Пароль повторно'}
          />
          {!isConfirmPasswordValid && errorMessageConfirmPassword && (
            <span className={styles.errorHint}>{errorMessageConfirmPassword}</span>
          )}
        </div>
        <div className={styles.btn}>
          <Button
            disabled={!disabledHandler()}
            variant="outlinePurple"
            onClick={resetPasswordHandler}
          >
            Перейти к обучению
          </Button>
        </div>
      </div>
    </AuthContainer>
  );
};
