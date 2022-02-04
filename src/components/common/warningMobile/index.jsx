import React from 'react';
import styles from './styles.module.less';
import Close from '@assets/Close';

const WarningMobile = ({ handleClose }) => {
  return (
    <div className={styles.warning}>
      Обращаем Ваше внимание, что оптимальным способом обучения на нашей платформе является ПК или
      планшет.
      <div className={styles.close} onClick={() => handleClose()}>
        <Close />
      </div>
    </div>
  );
};

export default WarningMobile;
