import React from 'react';
import Close from '@assets/Close';
import styles from './styles.module.less';

const WarningMobile = ({ handleClose }) => (
  <div className={styles.warning}>
    Обращаем Ваше внимание, что оптимальным способом обучения на нашей платформе является ПК или
    планшет.
    <div className={styles.close} onClick={() => handleClose()} role="presentation">
      <Close />
    </div>
  </div>
);

export default WarningMobile;
