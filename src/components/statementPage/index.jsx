import React, { useState } from 'react';
import styles from './styles.module.less';
import { PDFViewer } from '@components/common/pdfViewer';
// import { Logo } from './images/logo';
// import { Signature } from './images/signature';

export const StatementPage = () => {
  const [name, setName] = useState('Фамилия Имя Отчество');
  const [course, setCourse] = useState('Введение в Python');
  const [date, setDate] = useState('20.01.2021');

  return (
    <div className={styles.wrapper}>
      <PDFViewer />

      {/*<div className={styles.statement}>*/}
      {/*  <div className={styles.statement__left}>*/}
      {/*    <Logo />*/}
      {/*  </div>*/}
      {/*  <div className={styles.statement__right}>*/}
      {/*    <div className={styles.statement__header}>*/}
      {/*      <div className={styles.statement__header__title}>сертификат</div>*/}
      {/*      <div className={styles.statement__header__subtitle}>о прохождении курса</div>*/}
      {/*    </div>*/}
      {/*    <div className={styles.statement__name}>*/}
      {/*      <div className={styles.statement__preInfo}>выдан</div>*/}
      {/*      <div className={styles.statement__info}>{name}</div>*/}
      {/*    </div>*/}
      {/*    <div className={styles.statement__course}>*/}
      {/*      <div className={styles.statement__preInfo}>по пройденной программе</div>*/}
      {/*      <div className={styles.statement__info}>{course}</div>*/}
      {/*    </div>*/}
      {/*    <div className={styles.statement__date}>*/}
      {/*      <div className={styles.statement__preInfo}>дата</div>*/}
      {/*      <div className={styles.statement__info}>{date}</div>*/}
      {/*    </div>*/}
      {/*    <div className={styles.statement__signature}>*/}
      {/*      <Signature />*/}
      {/*      <div>ФИО, должность</div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};
