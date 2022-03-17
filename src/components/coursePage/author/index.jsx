import React from 'react';

import { Preloader } from '../../mui/preloader';

import styles from './styles.module.less';

export const Auth = ({ instructor }) => {
  return (
    <>
      {(instructor?.avatar_url && (
        <div className={styles.wrapper}>
          <img src={instructor?.avatar_url} className={styles.avatar} alt="Аватар" />

          <div className={styles.infoWrap}>
            <div className={styles.label}>Преподаватель</div>
            <h4 className={styles.title}>{`${instructor?.first_name} ${instructor?.last_name}`}</h4>
            <p
              className={styles.text}
              dangerouslySetInnerHTML={{ __html: instructor?.description }}
            />
          </div>
        </div>
      )) || (
        <div className={styles.preloaderContainer}>
          <Preloader size="60px" />
        </div>
      )}
    </>
  );
};
