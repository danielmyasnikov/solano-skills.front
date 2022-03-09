import React from 'react';
import HeaderHome from '@components/headerHome';
import NotFound from '@assets/NotFound';
import NotFoundMini from '@assets/NotFoundMini';
import Button from '@components/mui/button';
import styles from './styles.module.less';

export const Page404 = () => {
  return (
    <div className={styles.wrapper}>
      <HeaderHome />
      <div className={styles.content}>
        <div>Упс! Что-то пошло не так!</div>
        <div>Пожалуйста, вернитесь на главную страницу и попробуйте заново.</div>
        <Button variant={'containedPurple'}>На главную</Button>
      </div>
      <div className={styles.notFound}>
        <NotFound />
      </div>
      <div className={styles.notFoundMini}>
        <NotFoundMini />
      </div>
    </div>
  );
};
