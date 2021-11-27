import React from 'react';
import cn from 'classnames';
import styles from './styles.module.less';
import Error from '@assets/Error.js';

const ErrorMessage = ({ message }) => {
  return (
    <div className={cn(styles.errorMessage, {[styles.hidden]: !message})}>
      <Error />
      <div className={styles.content}>
        <h6>Некорректный ответ</h6>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;
