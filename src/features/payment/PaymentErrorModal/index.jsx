import { useState } from 'react';

import Close from '@assets/Close';

import cn from 'classnames';

import styles from './styles.module.less';
import { useHistory } from 'react-router';

export const PaymentErrorModal = () => {
  const history = useHistory();
  return (
    <div className={cn(styles.wrapper)}>
      <div className={styles.closeButton} onClick={() => history.push('/courses')}>
        <Close />
      </div>
      <span className={styles.wrapperTitle}>Оплата не выполнена</span>
      <span className={styles.wrapperText}>
        К сожалению, мы не смогли выполнить операцию, так как на вашем счете недостаточно средств.
        Попробуйте выбрать другой способ оплаты
      </span>
    </div>
  );
};
