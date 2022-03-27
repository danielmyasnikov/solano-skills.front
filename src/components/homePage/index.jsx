import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import HeaderHome from '../headerHome';
import Footer from '../footer';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Button from '@components/mui/button';
import styles from './styles.module.less';
import { HashLink } from 'react-router-hash-link';
import { feedbacks, images, practices, slides } from './data';
import { Registration } from '@components/auth/registration';
import BurgerMenu from '@components/common/burgerMenu';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '@store/profile/selector';

export const HomePage = () => {
  const [showMenu, setShowMenu] = useState(false);

  const isAuth = useSelector(selectIsAuth);

  const handleBurger = () => setShowMenu(!showMenu);

  const renderImage = (img) => images[img];

  const renderSlides = useMemo(() => {
    return slides.map(({ bg, title, subtitle, link, btn, items, btnlearn }) => (
      <div
        key={title}
        className={
          (bg === 'blue' && cn(styles.ways__block, styles.ways__block_blue)) ||
          (bg === 'red' && cn(styles.ways__block, styles.ways__block_red)) ||
          cn(styles.ways__block, styles.ways__block_green)
        }
      >
        <div className={styles.ways__skills}>
          <div className={styles.ways__skills__title}>{title}</div>
          <div className={styles.ways__skills__subtitle}>{subtitle}</div>
          <div className={styles.ways__skills__btn}>
            <Link to={link}>
              <Button variant="outlineWhiteHome">
                {btn}
                <KeyboardArrowRightIcon />
              </Button>
            </Link>
          </div>
        </div>
        <div className={styles.ways__slides}>
          {items.map(({ title, text, link }, i) => (
            <div key={title + i} className={styles.ways__slideContainer}>
              <div className={styles.ways__slide}>
                <div className={styles.ways__slide__bg}>
                  <div className={styles.ways__slide__title}>{title}</div>
                  <div className={styles.ways__slide__text}>{text}</div>
                  <div className={styles.ways__slide__button}>
                    <Link to={link}>
                      <Button variant="outlineBlue">{btnlearn}</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ));
  }, []);

  const renderPractices = useMemo(() => {
    return practices.map(({ pretitle, title, text, img, textblockTitle, textblockSubtitle }) => (
      <section className={styles.practice} key={title + pretitle}>
        <div className={styles.practice__left}>
          <div className={styles.practice__pretitle}>{pretitle}</div>
          <div className={styles.practice__title}>{title}</div>
          <div className={styles.practice__text}>{text}</div>
          {/* <Link to={route}>
              {link}
              <KeyboardDoubleArrowRightIcon />
            </Link> */}
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
    ));
  }, []);

  const renderFeedbacks = useMemo(() => {
    return feedbacks.map(({ avatar, text, author }) => (
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
  }, [feedbacks]);

  return (
    <div className={styles.home}>
      <div
        className={cn({ [styles.blur]: showMenu === true })}
        onTouchStart={() => handleBurger()}
      />
      <HeaderHome handleBurger={handleBurger} isAuth={isAuth} />
      <BurgerMenu isShow={showMenu} handleBurger={handleBurger} />
      <div className={styles.wrap}>
        <div className={styles.container}>
          <main>
            <section className={styles.offer}>
              <div className={cn(styles.offer__block, styles.offer__block__left)}>
                <div className={styles.offer__title}>Развивайте навыки работы с данными</div>
                <div className={styles.offer__subtitle}>
                  Обучаем с нуля профессиям и предоставляем знания по востребованным специальностям
                  и направлениям в сфере Информационных технологий.
                </div>
                <div className={styles.offer__btnDiv}>
                  <HashLink to="/#ways">
                    <Button variant="outlinePurpleWithoutBorder">Посмотреть курсы</Button>
                  </HashLink>
                </div>
                <div className={styles.offer__facts}>
                  <div className={styles.offer__fact}>
                    <div className={styles.offer__fact__number}>{'>25'}</div>
                    <div className={styles.offer__fact__text}>профессий</div>
                  </div>
                  <div className={styles.offer__fact}>
                    <div className={styles.offer__fact__number}>15 000</div>
                    <div className={styles.offer__fact__text}>учеников</div>
                  </div>
                </div>
              </div>
              <div className={cn(styles.offer__block, styles.offer__block__right)}>
                <div className={styles.offer__block__right__title}>Попробуйте бесплатно</div>
                <Registration key={'home_offer'} isModal={true} variant={'home_offer'} />
              </div>
            </section>

            <section className={styles.ways} id="ways">
              <div className={styles.ways__title}>
                Подход к обучению программирования, <span>разработанный экспертами</span>
              </div>
              {renderSlides}
            </section>

            <section className={styles.slogan}>
              <div className={styles.slogan__title}>Особенности обучения от DeepSkills?</div>
              <div className={styles.slogan__description}>
                Изучение принципов работы с языком программирования Python происходит удаленно с
                помощью видеоуроков. Функционал платформы обучения (в вашем личном кабинете)
                позволяет выполнять практические задачи по программированию и проверять правильность
                их выполнения в режиме онлайн. Мы соединили воедино лучшие мировые методики онлайн
                обучения.
              </div>
              <div className={styles.slogan__btn}>
                <Link to={'/courses'}>
                  <Button variant="containedWhite">Посмотреть курсы</Button>
                </Link>
              </div>
            </section>

            <section className={styles.practices}>
              <div className={styles.practices__title}>
                <span>Наш практический</span> опыт обучения
              </div>
              <div className={styles.practices__subtitle}>
                Наши специалисты прежде чем создать данную платформу обучения, проанализировали
                лучшие мировые методики. Мы провели опрос учеников этих компаний и на основе этой
                информации разработали свою платформу обучения с уникальной методикой.
              </div>
            </section>

            {renderPractices}

            <section className={cn(styles.slogan, styles.slogan__center)}>
              <div className={styles.slogan__title}>
                Начните обучение программированию на Python прямо сейчас
              </div>
              <div className={styles.slogan__description}>
                Обучатся Вы можете по своему собственному графику занятий. Удаленное обучение
                программированию не привязывает обучающегося к месту обязательного нахождения. Вы
                можете обучаться с любой точки планеты где есть Интернет.
              </div>
              <div className={styles.slogan__btn}>
                <Link to={'/courses'}>
                  <Button variant="containedWhite">Посмотреть курсы</Button>
                </Link>
              </div>
            </section>

            <section className={styles.whatSays}>
              <div className={styles.whatSays__header}>
                <div className={styles.whatSays__header__title}>Отзывы наших учеников</div>
                <div className={styles.whatSays__header__subtitle}>
                  {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt */}
                </div>
              </div>
              <div className={styles.whatSays__feedbacks}>{renderFeedbacks}</div>
            </section>

            <section className={styles.join}>
              <div className={styles.join__title}>
                Присоединяйтесь к команде преподавателей DeepSkills
              </div>
              <div className={styles.join__subtitle}>
                Если у Вас есть фундаментальные знания и практика в работе с языком программирования
                Python, то Вы можете стать преподавателем в нашей компании. Методике изложения
                материала - мы научим. Для того чтобы стать преподавателем нужно отправить заявку в
                компанию. Мы обещаем провести собеседование в удобное для Вас время и дать свое
                заключение в течение 24 часов.
              </div>
              <div className={styles.join__btn}>
                <a target="_blank" href="https://forms.gle/nCKa2D3JK756E9eg7" rel="noreferrer">
                  <Button variant="containedPurple">Я преподаватель</Button>
                </a>
              </div>
            </section>

            <section className={styles.signup}>
              <div className={cn(styles.signup__block, styles.signup__block_left)}>
                <div className={styles.signup__title}>Зарегистрируйтесь,</div>
                <div className={styles.signup__subtitle}>чтобы начать обучение прямо сейчас</div>
              </div>
              <div className={styles.signup__block}>
                <Registration key={'home_end'} isModal={true} variant={'home_end'} />
              </div>
            </section>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
};
