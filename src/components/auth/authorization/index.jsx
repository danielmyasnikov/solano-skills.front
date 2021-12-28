import React, { useEffect, useState } from 'react';
import styles from './styles.module.less';
import { InputPassword } from '@components/mui/inputPassword';
import { Input } from '@components/mui/input';
import Button from '@components/mui/button';
import { useDispatch, useSelector } from 'react-redux';
import * as AuthStore from '@store/auth';
import { Link, useHistory } from 'react-router-dom';
import { AuthContainer } from './../authContainer';
import { SocialNetworks } from './../socialNetworks';

export const Authorization = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { errors, headers } = useSelector(AuthStore.Selectors.getAuth);

  function handleChange(e) {
    const { value, name } = e.target;
    switch (name) {
      case 'email':
        dispatch(AuthStore.Actions.clearErrors({ errorMassege: '' }));
        setEmail(value);
        break;
      case 'password':
        dispatch(AuthStore.Actions.clearErrors({ errorMassege: '' }));
        setPassword(value);
        break;
      default:
        return undefined;
    }
  }

  function submit() {
    dispatch(AuthStore.Actions.singIn(email, password));
  }

  useEffect(() => {
    if (headers.uid && headers.client && headers['access-token']) {
      history.push('/courses');
    }
  }, [headers]);

  return (
    <AuthContainer>
      <h1 className={styles.title}>Добро пожаловать</h1>
      <span className={styles.subTitile}>E-mail</span>
      <div className={styles.inputWrapper}>
        <Input value={email} handleChange={handleChange} name="email" />
      </div>
      <span className={styles.subTitile}>Пароль</span>
      <div className={styles.inputWrapper}>
        <InputPassword value={password} handleChange={handleChange} name="password" />
      </div>

      <Button className={styles.btn} variant="outlinePurple" onClick={submit}>
        Войти
      </Button>
      <span className={styles.error}>{errors.errorMassege}</span>

      <div className={styles.socialNetworksWrap}>
        <SocialNetworks />
      </div>

      <div className={styles.toAuth}>
        <span className={styles.text}>
          {'У вас нет аккаунта? '}
          <Link className={styles.infoLink} to={'/registration'}>
            Зарегистрироваться
          </Link>
        </span>
      </div>
    </AuthContainer>
  );
};
