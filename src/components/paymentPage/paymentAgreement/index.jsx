import Button from '@components/mui/button';

import styles from './styles.module.less';

export const PaymentAgreement = () => {
  return (
    <div className={styles.paymentInfoContainer}>
      <ul className={styles.paymentInfoList}>
        <li className={styles.paymentInfoListItem}>
          Ваш план начинается сегодня и автоматически продлевается ежегодно, пока не будут внесены
          изменения в настройки учетной записи.
        </li>
        <li className={styles.paymentInfoListItem}>
          С вас будет взиматься плата в размере 3499₽ (включая налоги).
        </li>
      </ul>
      <span className={styles.paymentInfoAdditionally}>
        Выбранный вами план подписки может автоматически продлеваться, если вы не отмените его. Для
        получения дополнительной информации об автоматическом продлении, отмене и нашей политике
        возврата средств, пожалуйста, ознакомьтесь с нашими Условиями использования...
      </span>
      <div className={styles.btn}>
        <Button variant="containedPurple">Оплатить сейчас</Button>
      </div>
    </div>
  );
};
