import React from 'react';

import { Preloader } from '@components/mui/Preloader';

import styles from './styles.module.less';
import { Skeleton } from '@mui/material';

export const Auth = ({ instructor }) => {
  return (
    <div className={styles.wrapper}>
      {instructor?.avatar_url ? (
        <img src={instructor?.avatar_url} className={styles.avatar} alt="Аватар" />
      ) : (
        <Skeleton variant="circular" width={120} height={120} className={styles.avatar} />
      )}

      <div className={styles.infoWrap}>
        <div className={styles.label}>Преподаватель</div>
        {instructor ? (
          <h4 className={styles.title}>{`${instructor?.first_name} ${instructor?.last_name}`}</h4>
        ) : (
          <h4 className={styles.title}>
            <Skeleton variant="text" width="20%" /> <Skeleton variant="text" width="20%" />
          </h4>
        )}
        {instructor ? (
          <p
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: instructor?.description }}
          />
        ) : (
          <p className={styles.text}>
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="40%" />
          </p>
        )}
      </div>
    </div>
  );
};
