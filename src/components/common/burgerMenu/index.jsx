import { useState } from 'react';
import cn from 'classnames';
import styles from './styles.module.less';
import BurgerExit from '@assets/BurgerExit.svg';
import { Link } from 'react-router-dom';
import Search from '@components/mui/Search';
import { useDispatch } from 'react-redux';
import { openFeedbackModal } from '@store/global/modals';

const BurgerMenu = ({ isShow, handleBurger }) => {
  const [showItems, setShowItems] = useState(false);

  const dispatch = useDispatch();

  return (
    <div className={cn(styles.menu, { [styles.shown]: isShow === true })}>
      <div className={styles.content}>
        <div className={styles.exit} onClick={() => handleBurger()}>
          <img src={BurgerExit} alt="Закрыть" />
        </div>
        <div className={styles.title}>Меню</div>
        <div className={styles.search}>
          <Search placeholder={'Какой курс вы ищите?'} />
        </div>
        <div className={styles.links}>
          <div className={styles.link}>
            <div className={styles.link__title} onClick={() => setShowItems(!showItems)}>
              <Link to="/learning">
                <span style={{ color: '#46445c' }}>Обучение</span>
              </Link>
              {/*
                (!showItems ? <KeyboardArrowDownIcon fontSize="small" />) : (
                <KeyboardArrowUpIcon fontSize="small" />
              )
               */}
            </div>
            {/*
               <div className={cn(styles.link__items, { [styles.hidden]: !showItems })}>
              <div className={styles.link__item}>Профессии</div>
              <div className={styles.link__item}>Курсы</div>
              <div className={styles.link__item}>Навыки</div>
            </div>
             */}
          </div>
          <div className={styles.link}>
            <Link to="/tariffs">
              <span style={{ color: '#46445c' }}>Тарифы</span>
            </Link>
          </div>
          <div className={styles.link} onClick={() => dispatch(openFeedbackModal({}))}>
            Поддержка
          </div>
          <div className={styles.link}>
            <Link to="/sign-in">
              <span style={{ color: '#46445c' }}>Войти</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
