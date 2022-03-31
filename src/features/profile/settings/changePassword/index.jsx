import { useEffect, useState } from 'react';

import { SettingsInputPassword } from './settingsInputPassword';

import styles from './styles.module.less';
import { Button } from '@mui/material';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
              </div>
            </div>
            {width > 1512 && <Button variant="containedPurple">Сохранить изменения</Button>}
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
            {width <= 1512 && <Button variant="containedPurple">Сохранить изменения</Button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
