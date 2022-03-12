import { useState } from 'react';

import Close from '@assets/Close.js';

import cn from 'classnames';

import styles from './styles.module.less';

export const PaymentErrorModal = ({ isShow = false }) => {
  const [isShowModal, setIsShowModal] = useState(isShow);

  return (
    <>
      {isShow && (
        <div className={cn(styles.wrapper, { [styles.wrapperHide]: !isShowModal })}>
          <div className={styles.closeButton} onClick={() => setIsShowModal(!isShowModal)}>
            <Close />
          </div>
          <span className={styles.wrapperTitle}>Оплата не выполнена</span>
          <span className={styles.wrapperText}>
            К сожалению, мы не смогли выполнить операцию, так как на вашем счете недостаточно
            средств. Попробуйте выбрать другой способ оплаты
          </span>
        </div>
      )}
    </>
  );
};
