import React from 'react';
import styles from './styles.module.less';
import Button from '@components/mui/button';
import { TimeWhite } from '@assets/TimeWhite';
import { CoursesWhite } from '@assets/CoursesWhite';
import { TestWhite } from '@assets/TestWhite';
import { pages, test } from './data';

export const WrapHeader = ({ variant }) => {
  return (
    <div className={styles.wrapHeader}>
      <div className={styles.pretitle}>{pages[variant].pretitle}</div>
      <div className={styles.titleBlock}>
        <h1 className={styles.title}>{pages[variant].title}</h1>
        {(variant === 'skill' || variant === 'profession') && (
          <div className={styles.titleBlock__items}>
            <div className={styles.titleBlock__item}>
              <TimeWhite />
              <div>{test.hours}</div>
            </div>
            <div className={styles.titleBlock__item}>
              <CoursesWhite />
              <div>{test.courses}</div>
            </div>
            <div className={styles.titleBlock__item}>
              <TestWhite />
              <div>{test.tests}</div>
            </div>
            {variant === 'profession' && (
              <div className={styles.titleBlock__item_certificate}>{test.certificate}</div>
            )}
          </div>
        )}
      </div>
      <div className={styles.subtitle}>{pages[variant].subtitle}</div>
      {(variant === 'skill' || variant === 'profession') && (
        <div className={styles.btn}>
          <Button variant={'containedWhite'}>Продолжить обучение</Button>
        </div>
      )}
    </div>
  );
};
