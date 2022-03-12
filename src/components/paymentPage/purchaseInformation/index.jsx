import styles from './styles.module.less';

export const PurchaseInformation = ({ title, price }) => (
  <div className={styles.paymentContainerTariff}>
    <div className={styles.tariffInfo}>
      <div className={styles.tariffInfoLeft}>
        <span className={styles.tariffInfoHeader}>Тариф</span>
        <span className={styles.tariffInfoLeftText}>{title}</span>
        <span className={styles.tariffInfoLeftText}>* В месяц</span>
      </div>
      <div className={styles.tariffInfoRight}>
        <span className={styles.tariffInfoHeader}>Стоимость</span>
        <span className={styles.tariffInfoRightText}>3 599 ₽</span>
        <span className={styles.tariffInfoRightText}>{price} ₽/месяц</span>
      </div>
    </div>
    <div className={styles.tariffCost}>
      <span>Итого:</span>
      <div className={styles.tariffCostDifference}>
        <span>3 599 ₽</span>
        <span className={styles.tariffCostOld}>12 299 ₽</span>
      </div>
    </div>
  </div>
);
