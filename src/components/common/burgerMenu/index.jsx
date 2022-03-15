import React, { useState } from 'react';
import cn from 'classnames';
import styles from './styles.module.less';
import BurgerExit from '@assets/BurgerExit.svg';
import Input from '@components/mui/inputSearch';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const BurgerMenu = ({ isShow, handleBurger }) => {
  const [showItems, setShowItems] = useState(false);

  return (
    <div className={cn(styles.menu, { [styles.shown]: isShow === true })}>
      <div className={styles.content}>
        <div className={styles.exit} onClick={() => handleBurger()}>
          <img src={BurgerExit} alt="Закрыть" />
        </div>
        <div className={styles.title}>Меню</div>
        <div className={styles.search}>
          <Input placeholder={'Какой курс вы ищите?'} />
        </div>
        <div className={styles.links}>
          <div className={styles.link}>
            <div className={styles.link__title} onClick={() => setShowItems(!showItems)}>
              Обучение{' '}
              {showItems !== true && (
                <KeyboardArrowDownIcon fontSize="small" />
              ) || (
                <KeyboardArrowUpIcon fontSize="small" />
              )}
            </div>
            <div className={cn(styles.link__items, { [styles.hidden]: showItems !== true })}>
              <div className={styles.link__item}>Профессии</div>
              <div className={styles.link__item}>Курсы</div>
              <div className={styles.link__item}>Навыки</div>
            </div>
          </div>
          <div className={styles.link}>Тарифы</div>
          <div className={styles.link}>Поддержка</div>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;