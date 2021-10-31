import React from 'react';
import styles from './styles.module.less';
import Error from 'assets/Error.svg';

const ErrorMessage = ({ message }) => {
  return (
    <div className={styles.errorMessage}>
      <Error />
      <div className={styles.content}>
        <h6>Некорректный ответ</h6>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;
