import LogoInfo from './assets/logoInfo.svg';

import styles from './styles.module.less';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkOrderStatus } from '@src/features/payment/store/actions';
import { Button } from '@mui/material';
import { selectPaymentStatus } from '@src/features/payment/store/selectors';
import { Redirect } from 'react-router';
import { getProfile } from '@store/profile/actions';
import { Helmet } from 'react-helmet';

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

  useEffect(() => {
    if (status === 'success') {
      const uid = localStorage.getItem('uid');
      const client = localStorage.getItem('client');
      const accessToken = localStorage.getItem('access-token');

      dispatch(
        getProfile({
          headers: {
            uid,
            client,
            'access-token': accessToken,
          },
        }),
      );
    }
  }, [status]);

  if (status === 'idle' || status === 'loading') {
    return <>'Loading...'</>;
  }

  if (status === 'failure') {
    return <Redirect to="/courses" />;
  }

  return (
    <div className={styles.wrapper}>
      <Helmet title="Страница успешной оплаты">
        <meta name="description" content="Оплата произведена успешно, можно начинать обучение." />
      </Helmet>
      <span className={styles.wrapperTitle}>Добро пожаловать</span>
      <img src={LogoInfo} alt="Логотип компании" />
      <div className={styles.wrapperButton}>
        <Link to="/courses">
          <Button variant="containedWhite">Начать обучение!</Button>
        </Link>
      </div>
    </div>
  );
};
