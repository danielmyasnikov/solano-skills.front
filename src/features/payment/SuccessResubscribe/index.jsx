import LogoInfo from './assets/logoInfo.svg';

import styles from './styles.module.less';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { closeTariffsModal } from '@store/global/modals';

export const ResubscribePayment = () => {
  const dispatch = useDispatch();

  dispatch(closeTariffsModal({}));

  return (
    <div className={styles.wrapper}>
      <Helmet title="Страница успешной оплаты">
        <meta name="description" content="Ваш тарифный план успешно обновлен!" />
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
