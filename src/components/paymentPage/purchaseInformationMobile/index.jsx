import ArrowDown from '@assets/ArrowDown';
import { useState } from 'react';

import cn from 'classnames';

import styles from './styles.module.less';

export const PurchaseInformationMobile = ({ title, price }) => {
  const [isShowMore, setIsShowMore] = useState(false);

  const showMoreHandler = () => setIsShowMore(!isShowMore);

  return (
    <div className={styles.wrapper}>
      <div className={styles.TitleContainer}>
        <div className={styles.wrapperLeft}>
          <span>К оплате</span>
          <div
            onClick={showMoreHandler}
            className={cn(styles.wrapperLeftIcon, { [styles.wrapperLeftIconRotate]: isShowMore })}
          >
            <ArrowDown />
          </div>
        </div>
        <div className={styles.wrapperRight}>
          <span className={styles.wrapperRightText}>3 599 ₽</span>
          <span className={styles.wrapperRightOldPrice}>12 299 ₽</span>
        </div>
      </div>
      {isShowMore && (
        <div className={styles.tariffInfo}>
          <div className={styles.tariffInfoLeft}>
            <span className={styles.tariffInfoHeader}>Тариф</span>
            <span className={styles.tariffInfoLeftText}>{title}</span>
            <span className={styles.tariffInfoLeftText}>* В месяц</span>
          </div>
          <div className={styles.tariffInfoRight}>
            <span className={styles.tariffInfoHeader}>Стоимость</span>
            <span className={styles.tariffInfoRightText}>3 599 ₽</span>
            <span className={styles.tariffInfoRightText}>{price} ₽/месяц</span>
          </div>
        </div>
      )}
    </div>
  );
};
