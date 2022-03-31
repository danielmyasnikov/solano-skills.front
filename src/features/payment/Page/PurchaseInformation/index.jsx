import styles from './styles.module.less';

export const PurchaseInformation = ({ oldPrice, totalPrice, title, price }) => (
  <div className={styles.paymentContainerTariff}>
    <div className={styles.tariffInfo}>
      <div className={styles.tariffInfoLeft}>
        <span className={styles.tariffInfoHeader}>Тариф</span>
        <span className={styles.tariffInfoLeftText}>{title}</span>
        <span className={styles.tariffInfoLeftText}>* В месяц</span>
      </div>
      <div className={styles.tariffInfoRight}>
        <span className={styles.tariffInfoHeader}>Стоимость</span>
        <span className={styles.tariffInfoRightText}>{totalPrice} ₽</span>
        <span className={styles.tariffInfoRightText}>{price} ₽/месяц</span>
      </div>
    </div>
    <div className={styles.tariffCost}>
      <span>Итого:</span>
      <div className={styles.tariffCostDifference}>
        <span>{totalPrice} ₽</span>
        <span className={styles.tariffCostOld}>{oldPrice} ₽</span>
      </div>
    </div>
  </div>
);
