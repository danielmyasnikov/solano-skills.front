import { useEffect, useState } from 'react';

import { SettingsInputPassword } from './settingsInputPassword';

import styles from './styles.module.less';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfileNew } from '../../store/selectors';
import { changePassword } from '../../store/actions';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [width, setWidth] = useState(0);

  const dispatch = useDispatch();

  const profile = useSelector(selectProfileNew);

  const passwordChangeHandler = () => dispatch(changePassword({ newPassword, confirmNewPassword }));

  const disabledHandler = () => newPassword === confirmNewPassword && newPassword.length >= 6;

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (profile.changePasswordStatus === 'success') {
      setNewPassword('');
      setConfirmNewPassword('');
    } else if (profile.changePasswordStatus === 'failure') {
    }
  }, [profile]);

  return (
    <div className={styles.password}>
      <div className={styles.title}>Изменить пароль</div>
      <div className={styles.wrap}>
        <div className={styles.content}>
          <div className={styles.form}>
            <div className={styles.newPassword}>
              <span className={styles.preTitle}>Новый пароль</span>
              <div className={styles.passwordContainer}>
                <SettingsInputPassword
                  value={newPassword}
                  placeholder="Пароль"
                  handleChange={(e) => setNewPassword(e.target.value)}
                />
                <SettingsInputPassword
                  value={confirmNewPassword}
                  placeholder="Повторите пароль"
                  handleChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                {profile.changePasswordStatus === 'success' && (
                  <span className={styles.successChange}>Пароль изменен!</span>
                )}
                {profile.changePasswordStatus === 'failure' && (
                  <span className={styles.failureChange}>Произошла ошибка!</span>
                )}
              </div>
            </div>
            {width > 1512 && (
              <Button
                disabled={!disabledHandler()}
                variant="containedPurple"
                onClick={passwordChangeHandler}
              >
                Сохранить изменения
              </Button>
            )}
          </div>
          <div className={styles.requirements}>
            <div className={styles.requirements__text}>
              <span className={styles.preTitle}>Требования к паролю:</span>
              <ul>
                <li>Минимум 8 символов - чем больше, тем лучше</li>
                <li>Хотя бы один символ нижнего регистра</li>
                <li>Хотя бы один символ верхнего регистра</li>
                <li>Хотя бы одна цифра, символ или пробел</li>
              </ul>
            </div>
            {width <= 1512 && (
              <Button
                disabled={!disabledHandler()}
                variant="containedPurple"
                onClick={passwordChangeHandler}
              >
                Сохранить изменения
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
