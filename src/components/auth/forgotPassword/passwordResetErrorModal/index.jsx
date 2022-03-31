import styles from './styles.module.less';
import { useState } from 'react';
import Close from '@assets/Close.js';

export const PasswordResetErrorModal = ({ error = null, isShow = false, onClose }) => {
  const [isShowModal, setIsShowModal] = useState(isShow);

  const closeHandler = () => {
    setIsShowModal(false);
    onClose();
  };

  return (
    <>
      {isShowModal && (
        <div className={styles.wrapper}>
          <div className={styles.closeButton} onClick={closeHandler}>
            <Close />
          </div>
          <span className={styles.wrapperTitle}>Произошла ошибка сброса пароля</span>
          <span className={styles.wrapperText}>
            {(error && error) ||
              'Сейчас вы будете перенаправлены на страницу входа, для повторного сброса пароля'}
          </span>
        </div>
      )}
    </>
  );
};
