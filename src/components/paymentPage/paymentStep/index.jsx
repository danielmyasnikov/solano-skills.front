import styles from './styles.module.less';

export const PaymentStep = ({ stepNumber, text, marginTop = '0', marginBottom = '0' }) => {
  return (
    <div
      style={{ marginBottom: marginBottom, marginTop: marginTop }}
      className={styles.shortContainer}
    >
      <div className={styles.shortContainerPath}>{stepNumber}</div>
      <span className={styles.shortContainerText}>{text}</span>
    </div>
  );
};
