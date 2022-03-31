import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as AuthStore from '@store/auth';

import { Input } from '@components/mui/Input';

import styles from './styles.module.less';
import { PasswordResetErrorModal } from '@components/auth/forgotPassword/passwordResetErrorModal';
import { Button } from '@mui/material';

export const Counter = ({ onCountDownIsOverHandler }) => {
  const [counter, setCounter] = useState(10);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      onCountDownIsOverHandler();
    }
  }, [counter, onCountDownIsOverHandler]);

  return <span>{(counter < 10 && `0${counter}`) || counter}</span>;
};

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [showResendButton, setShowResendButton] = useState(false);
  const [isShowErrorModal, setIsShowErrorModal] = useState(false);

  const { errors } = useSelector(AuthStore.Selectors.getAuth);
  const { recoveryPasswordStatus } = useSelector(AuthStore.Selectors.getAuth);

  const dispatch = useDispatch();

  const inputHandler = (e) => setEmail(e.target.value);

  const buttonClickHandler = () => {
    dispatch(AuthStore.Actions.requestPasswordReset(email));
  };

  const disabledButtonHandler = () => {
    return !email.toLowerCase().match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
  };

  const buttonResendClickHandler = () => {
    dispatch(AuthStore.Actions.requestPasswordReset(email));
    setShowResendButton(!showResendButton);
  };

  const onCountDownIsOverHandler = () => setShowResendButton(!showResendButton);

  useEffect(() => {
    if (recoveryPasswordStatus === 'success') {
      setEmailSent(!emailSent);
      setIsShowErrorModal(false);
    } else if (recoveryPasswordStatus === 'failure') {
      setIsShowErrorModal(true);
    }
  }, [recoveryPasswordStatus]);

  return (
    <div className={styles.wrapper}>
      <span className={styles.wrapperTitle}>
        {(emailSent && 'Проверьте почту') || 'Восстановление пароля'}
      </span>
      <span className={styles.wrapperText}>
        {(emailSent &&
          `Чтобы создать новый пароль, перейдите по ссылке в письме, мы отправили его на ${email}`) ||
          'Укажите, куда отправить инструкции для восстановления пароля.'}
      </span>
      {(emailSent &&
        ((showResendButton && (
          <Button
            className={styles.wrapperBtn}
            onClick={buttonResendClickHandler}
            variant="outlinePurple"
          >
            Отправить заново
          </Button>
        )) || (
          <span className={styles.wrapperText}>
            Если вы не получили письмо, нажмите «Отправить повторно» через 00:
            <Counter onCountDownIsOverHandler={onCountDownIsOverHandler} /> или напишите на &nbsp;
            support@deepskills.ru
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
            onClick={buttonClickHandler}
            variant="outlinePurple"
          >
            Отправить
          </Button>
        </>
      )}
      {errors.error && isShowErrorModal && (
        <PasswordResetErrorModal
          error={errors.error[0]}
          isShow={isShowErrorModal}
          onClose={() => setIsShowErrorModal(false)}
        />
      )}
    </div>
  );
};
