import React from 'react';
import styles from './styles.module.less';
import cn from 'classnames';
import Python from '@assets/Python.png';
import ArrowRight from '@assets/ArrowRight';
import { Link } from 'react-router-dom';

const Card = () => {
  const renderImg = (type) => {
    switch (type) {
      case 'python':
        return <img src={Python} />;

      default:
        break;
    }
  };
  return (
    <>
      <div className={cn(styles.card, styles.progress)}>
        <div className={styles.title}>
          Завершенные курсы
          <Link>
            Все <ArrowRight />
          </Link>
        </div>
        <div className={styles.items}>
          <div className={styles.item}>{renderImg('python')} Введение в Python</div>
          <div className={styles.item}>{renderImg('python')} Введение в Python</div>
          <div className={styles.item}>
            {renderImg('python')} Машинное обучение с древовидными моделями на Python
          </div>
          <div className={styles.item}>{renderImg('python')} Введение в Python</div>
          <div className={styles.item}>{renderImg('python')} Введение в Python</div>
          <div className={styles.item}>
            {renderImg('python')} Машинное обучение с древовидными моделями на Python
          </div>
        </div>
      </div>
      <div className={cn(styles.card, styles.progress)}>
        <div className={styles.title}>Завершенные курсы</div>
        <div className={styles.items}>
          <div className={styles.item}>{renderImg('python')} Введение в Python</div>
          <div className={styles.item}>{renderImg('python')} Введение в Python</div>
          <div className={styles.item}>
            {renderImg('python')} Машинное обучение с древовидными моделями на Python
          </div>
          <div className={styles.item}>{renderImg('python')} Введение в Python</div>
          <div className={styles.item}>{renderImg('python')} Введение в Python</div>
          <div className={styles.item}>
            {renderImg('python')} Машинное обучение с древовидными моделями на Python
          </div>
        </div>
      </div>
      <div className={cn(styles.card, styles.progress)}>
        <div className={styles.title}>Завершенные курсы</div>
        <div className={styles.items}>
          <div className={styles.item}>{renderImg('python')} Введение в Python</div>
          <div className={styles.item}>{renderImg('python')} Введение в Python</div>
          <div className={styles.item}>
            {renderImg('python')} Машинное обучение с древовидными моделями на Python
          </div>
          <div className={styles.item}>{renderImg('python')} Введение в Python</div>
          <div className={styles.item}>{renderImg('python')} Введение в Python</div>
          <div className={styles.item}>
            {renderImg('python')} Машинное обучение с древовидными моделями на Python
          </div>
        </div>
      </div>
      <div className={cn(styles.card, styles.progress)}>
        <div className={styles.title}>Завершенные курсы</div>
        <div className={styles.items}>
          <div className={styles.item}>{renderImg('python')} Введение в Python</div>
          <div className={styles.item}>{renderImg('python')} Введение в Python</div>
          <div className={styles.item}>
            {renderImg('python')} Машинное обучение с древовидными моделями на Python
          </div>
          <div className={styles.item}>{renderImg('python')} Введение в Python</div>
          <div className={styles.item}>{renderImg('python')} Введение в Python</div>
          <div className={styles.item}>
            {renderImg('python')} Машинное обучение с древовидными моделями на Python
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
