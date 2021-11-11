import { switchUnstyledClasses } from '@mui/core';
import cn from 'classnames';
import Button from '@components/mui/button';
import React, { useState } from 'react';
import styles from './styles.module.less';

export const CourseList = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.wrapper}>
      <div className={styles.descriptionBlock}>
        <span className={styles.descriptionTitle}>Описание курса</span>
        <span className={styles.descriptionText}>
          Python - это язык программирования общего назначения, который становится все более
          популярным в науке о данных. Компании по всему миру используют Python для сбора информации
          из своих данных и получения конкурентного преимущества. В отличие от других руководств по
          Python, этот курс посвящен Python специально для науки о данных. В нашем курсе «Введение в
          Python» вы узнаете о эффективных способах хранения и обработки данных, а также о полезных
          инструментах для анализа данных, чтобы начать свой собственный анализ. Начните онлайн-курс
          обучения Python в DataCamp прямо сейчас.
        </span>
      </div>

      <div className={styles.courseWrap}>
        <div className={styles.courseHead}>
          <div className={styles.info}>
            <span className={styles.courseTitle}>Основы Python</span>
            <span className={styles.courseDescription}>
              Введение в основные концепции Python. Узнайте, как использовать Python в интерактивном
              режиме и с помощью сценария. Создайте свои первые переменные и познакомьтесь с
              основными типами данных Python.
            </span>
          </div>
          <div className={styles.btnWrap}>
            <Button variant="containedPurple" className={styles.btn}>
              Изучать раздел
            </Button>
            <Button variant="outlineBlack" onClick={()=>setOpen(!open)}>Содержание раздела</Button>
          </div>
        </div>

        <div className={cn(styles.listWrap, { [styles.downOpen]: open })}>
          <div className={styles.item}>
            <div className={styles.itemLeft}>
              <span className={styles.itemTitle}>Привет, Python!</span>
            </div>
            <div className={styles.openRight}>
              <div className={styles.point} />
              <span className={styles.itemTitle}> 50px</span>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.itemLeft}>
              <span className={styles.itemTitle}>Привет, Python!</span>
            </div>
            <div className={styles.openRight}>
              <div className={styles.point} />
              <span className={styles.itemTitle}> 50px</span>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.itemLeft}>
              <span className={styles.itemTitle}>Привет, Python!</span>
            </div>
            <div className={styles.openRight}>
              <div className={styles.point} />
              <span className={styles.itemTitle}> 50px</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
