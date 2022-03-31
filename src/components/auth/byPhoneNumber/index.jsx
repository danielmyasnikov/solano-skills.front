import styles from './styles.module.less';
import cn from 'classnames';
import InputMask from 'react-input-mask';

export const ByPhoneNumber = ({
  variant,
  handleAuthMethod,
  authMethodText,
  handleChange,
  phoneNumber,
  countTime,
}) => {
  return (
    <div className={styles[variant]}>
      <span className={cn(styles.subTitile)}>Номер телефона</span>
      <InputMask
        value={phoneNumber}
        className={styles.input}
        onChange={handleChange}
        maskChar="_"
        alwaysShowMask={true}
        mask="+7\ (999) 999-99-99"
        name="phone"
        type="tel"
      />
      {countTime > 0 && (
        <span className={styles.error}>
          Вы сможете отправить смс код повторно через {countTime} сек
        </span>
      )}
      <div onClick={() => handleAuthMethod()} className={styles.link}>
        {authMethodText}
      </div>
    </div>
  );
};
