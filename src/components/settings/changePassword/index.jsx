import Button from '@components/mui/button';
import styles from './styles.module.less';

const ChangePassword = () => {
  return (
    <div className={styles.content}>
      <div className={styles.form}>
        <div className={styles.oldPassword}>
          <span className={styles.preTitle}>Старый пароль</span>
          <input placeholder='Пароль' type="password" name="old_password" />
        </div>
        <div className={styles.newPassword}>
          <span className={styles.preTitle}>Новый пароль</span>
          <div className={styles.passwordWrap}>
            <input placeholder='Пароль' type="password" name="new_password" />
            <input placeholder='Повторите пароль' type="password" name="new_password_confirmation" />
          </div>
        </div>
        <Button variant="containedPurple">Сохранить изменения</Button>
      </div>
      <div className={styles.requirements}>
        <span className={styles.preTitle}>Требования к паролю:</span>
        <ul>
          <li>Минимум 8 символов - чем больше, тем лучше</li>
          <li>Хотя бы один символ нижнего регистра</li>
          <li>Хотя бы один символ верхнего регистра</li>
          <li>Хотя бы одна цифра, символ или пробел</li>
        </ul>
      </div>
    </div>
  );
};

export default ChangePassword;
