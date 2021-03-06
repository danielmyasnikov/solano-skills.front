import styles from './styles.module.less';
import cn from 'classnames';
import InputMask from 'react-input-mask';

export const PhoneNumberConfirmation = ({
  variant,
  handleAuthMethod,
  confirmationСode,
  handleChange,
  errors,
}) => {
  return (
    <div className={styles[variant]}>
      <span className={cn(styles.subTitile)}>Код подтверждения</span>
      <InputMask
        value={confirmationСode}
        className={styles.input}
        onChange={handleChange}
        maskChar="_"
        placeholder="__"
        alwaysShowMask={false}
        name="confirmationCode"
        mask="99"
      />
      {errors?.errorVerify && <span className={styles.error}>{errors?.errorVerify}</span>}
      <div onClick={() => handleAuthMethod()} className={styles.link}>
        Изменить номер телефона
      </div>
    </div>
  );
};
