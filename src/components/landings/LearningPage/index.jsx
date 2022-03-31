import { useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import HeaderHome from '../../Layout/headers/HomeHeader';
import Footer from '../../Layout/footers/Footer';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import styles from './styles.module.less';
import { feedbacks, images, practices, slides } from './data';
import { Registration } from '@components/auth/signUp';
import BurgerMenu from '@components/common/burgerMenu';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '@store/profile/selector';
import { Button } from '@mui/material';

export const LearningPage = () => {
  const [showMenu, setShowMenu] = useState(false);

  const isAuth = useSelector(selectIsAuth);

  const handleBurger = () => setShowMenu(!showMenu);

  const renderImage = (img) => images[img];

  const renderPractices = practices.map(
    ({ pretitle, title, text, img, textblockTitle, textblockSubtitle, link, route }) => (
      <section className={styles.practice} key={title + pretitle}>
        <div className={styles.practice__left}>
          <div className={styles.practice__pretitle}>{pretitle}</div>
          <div className={styles.practice__title}>{title}</div>
          <div className={styles.practice__text}>{text}</div>
          <Link to={route}>
            <span className={styles.link}>
              {link}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 1L4 5L1 9" stroke="#7469EF" strokeWidth="2" strokeLinecap="round" />
                <path d="M5 1L8 5L5 9" stroke="#7469EF" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </Link>
        </div>
        <div className={styles.practice__right}>
          <div className={styles.practice__tochki}>
            <images.tochki />
          </div>
          <div className={styles.practice__img}>
            <img src={renderImage(img)} alt={'Иконка'} />
          </div>
          <div className={styles.practice__textblock}>
            <div className={styles.practice__textblock__title}>{textblockTitle}</div>
            <div className={styles.practice__textblock__subtitle}>{textblockSubtitle}</div>
          </div>
        </div>
      </section>
    ),
  );

  const renderFeedbacks = feedbacks.map(({ avatar, text, author }) => (
    <div className={styles.whatSays__feedback} key={text + author}>
      <div className={styles.whatSays__feedback__photo}>
        <img src={renderImage(avatar)} />
      </div>
      <div className={styles.whatSays__feedback__data}>
        <div className={styles.whatSays__feedback__data__scroll}>
          <div className={styles.whatSays__feedback__data__text}>{text}</div>
        </div>
        <div className={styles.whatSays__feedback__data__author}>{author}</div>
      </div>
    </div>
  ));

  return (
    <div className={styles.home}>
      <div className={cn({ [styles.blur]: showMenu })} onTouchStart={() => handleBurger()} />
      <HeaderHome handleBurger={handleBurger} isAuth={isAuth} />
      <BurgerMenu isShow={showMenu} handleBurger={handleBurger} />
      <div className={styles.wrap}>
        <div className={styles.container}>
          <main>
            <section className={styles.slogan}>
              <div className={styles.slogan__title}>КАК ПРОХОДИТ ОБУЧЕНИЕ?</div>
              <div className={styles.slogan__description}>
                Изучите структуру работы платформы и её особенности
              </div>
            </section>

            {renderPractices}

            <section className={styles.whatSays}>
              <div className={styles.whatSays__header}>
                <div className={styles.whatSays__header__title}>Отзывы наших учеников</div>
                <div className={styles.whatSays__header__subtitle}></div>
              </div>
              <div className={styles.whatSays__feedbacks}>{renderFeedbacks}</div>
            </section>

            <section className={styles.signup}>
              <div className={cn(styles.signup__block, styles.signup__block_left)}>
                <div className={styles.signup__title}>Зарегистрируйтесь,</div>
                <div className={styles.signup__subtitle}>чтобы начать обучение прямо сейчас</div>
              </div>
              <div className={styles.signup__block}>
                <Registration key={'home_end'} isModal variant={'home_end'} />
              </div>
            </section>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
};
