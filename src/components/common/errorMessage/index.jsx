/* eslint-disable react/no-danger */
import React from 'react';
import cn from 'classnames';
import Error from '@assets/Error.js';
import styles from './styles.module.less';

const ErrorMessage = ({ message }) => (
  <div className={cn(styles.errorMessage, { [styles.hidden]: !message })}>
    <Error />
    <div className={styles.content}>
      <h6>Некорректный ответ</h6>
      <div
        dangerouslySetInnerHTML={{
          __html: message ? message.replace(/`(.*?)`/g, '<code>$1</code>') : '',
        }}
      />
    </div>
  </div>
);

export default ErrorMessage;
