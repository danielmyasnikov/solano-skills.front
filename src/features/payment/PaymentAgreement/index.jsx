import { useDispatch } from 'react-redux';

import styles from './styles.module.less';
import { paySubscription } from '@src/features/payment/store/actions';
import { Button } from '@mui/material';

export const PaymentAgreement = ({ confirmationText, cycle, id }) => {
  const dispatch = useDispatch();

  const paymentHandler = () => {
    dispatch(paySubscription(id));
  };

  return (
    <div className={styles.paymentInfoContainer}>
      <ul className={styles.paymentInfoList}>
        <li className={styles.paymentInfoListItem}>Рекуррентный период: {cycle}</li>
        <li className={styles.paymentInfoListItem}>{confirmationText}</li>
      </ul>
      <span className={styles.paymentInfoAdditionally}>
        Выбранный вами план подписки может автоматически продлеваться, если вы не отмените его. Для
        получения дополнительной информации об автоматическом продлении, отмене и нашей политике
        возврата средств, пожалуйста, ознакомьтесь с нашими&nbsp;
        <a
          className={styles.link}
          href="https://docs.google.com/document/d/1afaS3Fe0YGKVXsxvDtz6obaMoAWkFVeVLVD2Pa2GUho/edit?usp=sharing"
          target="_blank"
          rel="noreferrer"
        >
          Условиями оплаты
        </a>
      </span>
      <div className={styles.btn}>
        <Button variant="containedPurple" onClick={paymentHandler}>
          Оплатить сейчас
        </Button>
      </div>
    </div>
  );
};
