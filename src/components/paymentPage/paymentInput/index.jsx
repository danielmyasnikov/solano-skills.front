import InputMask from 'react-input-mask';

import styles from './styles.module.less';

export const PaymentInput = ({
  placeholder,
  value,
  mask,
  type,
  label,
  onChange,
  width = '100%',
}) => {
  const changeHandler = (e) => {
    onChange(e.target.value, type);
  };

  return (
    <div style={{ width: width }} className={styles.paymentInput}>
      <label className={styles.paymentInputLabel}>{label}</label>
      <InputMask
        value={value}
        onChange={(e) => changeHandler(e, type)}
        placeholder={placeholder}
        mask={mask}
        className={styles.paymentInputField}
      />
    </div>
  );
};
