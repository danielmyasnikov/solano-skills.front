import styles from './styles.module.less';

export const PasswordResetErrorModal = () => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.wrapperTitle}>Произошла ошибка сброса пароля</span>
      <span className={styles.wrapperText}>
        Сейчас выбудете перенаправлены на страницу входа, для повторного сброса пароля
      </span>
    </div>
  );
};
