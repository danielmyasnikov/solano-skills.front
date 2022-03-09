import LogoInfo from './assets/logoInfo.svg';

import Button from '@components/mui/button';

import styles from './styles.module.less';

export const SuccessPayment = () => (
  <div className={styles.wrapper}>
    <span className={styles.wrapperTitle}>Добро пожаловать</span>
    <img src={LogoInfo} alt="logo" />
    <div className={styles.wrapperButton}>
      <Button variant="containedWhite">Начать обучение!</Button>
    </div>
  </div>
);
