import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import * as AuthStore from '@store/auth';

import { Input } from '@components/mui/input';
import Button from '@components/mui/button';

import styles from './styles.module.less';

export const Counter = ({ onСountdownIsOver }) => {
  const [counter, setCounter] = useState(10);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      onСountdownIsOver();
    }
  }, [counter, onСountdownIsOver]);

  return <span>{(counter < 10 && `0${counter}`) || counter}</span>;
};

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [showResendButton, setShowResendButton] = useState(false);

  const dispatch = useDispatch();

  const userEmail = 'kirarussell208@gmail.com';
  const helpEmail = 'helpMePleaseSOS@gmail.com';

  const inputHandler = (e) => {
    setEmail(e.target.value);
  };

  const ButtonClickhandler = () => {
    dispatch(AuthStore.Actions.requestPasswordReset(email));
    setEmailSent(!emailSent);
  };

  const disabledButtonHandler = () => {
    if (email.length) {
      return false;
    }
    return true;
  };

  const ButtonResendClickhandler = () => {
    dispatch(AuthStore.Actions.requestPasswordReset(email));
    setEmailSent(!emailSent);
    setShowResendButton(!showResendButton);
  };

  const onСountdownIsOverHandler = () => setShowResendButton(!showResendButton);

  return (
    <div className={styles.wrapper}>
      <span className={styles.wrapperTitle}>
        {(emailSent && 'Проверьте почту') || 'Восстановление пароля'}
      </span>
      <span className={styles.wrapperText}>
        {(emailSent &&
          `Чтобы создать новый пароль, перейдите по ссылке в письме, мы отправили его на ${userEmail}`) ||
          'Укажите, куда отправить инструкции для восстановления пароля.'}
      </span>
      {(emailSent &&
        ((showResendButton && (
          <Button
            className={styles.wrapperBtn}
            onClick={ButtonResendClickhandler}
            variant="outlinePurple"
          >
            Отправить заново
          </Button>
        )) || (
          <span className={styles.wrapperText}>
            Если вы не получили письмо, нажмите «Отправить повторно» через 00:
            <Counter onСountdownIsOver={onСountdownIsOverHandler} /> или напишите на &nbsp;
            {helpEmail}
          </span>
        ))) || (
        <>
          <div className={styles.wrapperInputContainer}>
            <label className={styles.wrapperLabel}>E-mail</label>
            <div className={styles.wrapperInput}>
              <Input value={email} handleChange={inputHandler} placeholder="Ваш e-mail" />
            </div>
          </div>
          <Button
            disabled={disabledButtonHandler()}
            className={styles.wrapperBtn}
            onClick={ButtonClickhandler}
            variant="outlinePurple"
          >
            Отправить
          </Button>
        </>
      )}
    </div>
  );
};