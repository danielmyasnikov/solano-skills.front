import LogoInfo from './assets/logoInfo.svg';

import styles from './styles.module.less';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkOrderStatus } from '@src/features/payment/store/actions';
import { Button } from '@mui/material';
import { selectPaymentStatus } from '@src/features/payment/store/selectors';
import { Redirect } from 'react-router';

export const SuccessPayment = () => {
  const dispatch = useDispatch();
  const useQuery = () => new URLSearchParams(useLocation().search);

  const status = useSelector(selectPaymentStatus);

  const query = useQuery();

  useEffect(() => {
    if (query.get('orderId')) {
      dispatch(checkOrderStatus(query.get('orderId')));
    }
  }, []);

  if (status === 'idle' || status === 'loading') {
    return 'Loading...';
  }

  if (status === 'failure') {
    return <Redirect to="/courses" />;
  }

  return (
    <div className={styles.wrapper}>
      <span className={styles.wrapperTitle}>Добро пожаловать</span>
      <img src={LogoInfo} alt="logo" />
      <div className={styles.wrapperButton}>
        <Link to="/courses">
          <Button variant="containedWhite">Начать обучение!</Button>
        </Link>
      </div>
    </div>
  );
};
