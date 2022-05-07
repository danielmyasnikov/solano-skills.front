import { useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import HeaderHome from '../../Layout/headers/HomeHeader';
import Footer from '../../Layout/footers/Footer';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import styles from './styles.module.less';
import Helmet from 'react-helmet';
import { feedbacks, images, practices, slides } from './data';
import { Registration } from '@components/auth/signUp';
import BurgerMenu from '@components/common/burgerMenu';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '@store/profile/selector';
import { Button } from '@mui/material';

export const HomePage = () => {
  const [showMenu, setShowMenu] = useState(false);

  const isAuth = useSelector(selectIsAuth);

  const handleBurger = () => setShowMenu(!showMenu);

  const renderImage = (img) => images[img];

  const renderSlides = slides.map(({ bg, title, subtitle, link, btn, items, btnlearn }) => (
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

  const renderPractices = practices.map(
    ({ pretitle, title, text, img, textblockTitle, textblockSubtitle }) => (
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
    ),
  );

  const renderFeedbacks = feedbacks.map(({ avatar, text, author }) => (
    <div className={styles.whatSays__feedback} key={text + author}>
      <div className={styles.whatSays__feedback__photo}>
        <img src={renderImage(avatar)} alt="Аватар" />
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
      <Helmet title="Домашняя страница">
        <meta
          name="description"
          content="Обучаем с нуля профессиям и предоставляем знания по востребованным специальностям
                  и направлениям в сфере Информационных технологий."
        />
      </Helmet>
      <div className={cn({ [styles.blur]: showMenu })} onTouchStart={() => handleBurger()} />
      <HeaderHome handleBurger={handleBurger} isAuth={isAuth} />
      <BurgerMenu isShow={showMenu} handleBurger={handleBurger} />
      <div className={styles.wrap}>
        <div className={styles.container}>
          <main>
            <section className={styles.offer}>
              <div className={cn(styles.offer__block, styles.offer__block__left)}>
                <h1 className={styles.offer__title}>Master your Solano Skills</h1>
                <div className={styles.offer__subtitle}>
                  Where people onboard on web3 and Solano Blockchain
                </div>
                <div className={styles.offer__btnDiv}>
                  <Link to="/courses">
                    <Button variant="outlinePurpleWithoutBorder">Review Courses</Button>
                  </Link>
                </div>
                <div className={styles.offer__facts}>
                  <div className={styles.offer__fact}>
                    <div className={styles.offer__fact__number}>{'>15'}</div>
                    <div className={styles.offer__fact__text}>courses</div>
                  </div>
                  <div className={styles.offer__fact}>
                    <div className={styles.offer__fact__number}>15 000</div>
                    <div className={styles.offer__fact__text}>students</div>
                  </div>
                </div>
              </div>
              <div className={cn(styles.offer__block, styles.offer__block__right)}>
                <div className={styles.offer__block__right__title}>Try for free</div>
                <Registration isModal variant="home_offer" />
              </div>
            </section>

            <section className={styles.ways} id="ways">
              <div className={styles.ways__title}>
                Expert driven approach to , <span>Solano Blockchain</span>
              </div>
              {renderSlides}
            </section>

            <section className={styles.slogan}>
              <div className={styles.slogan__title}>Why we are different Solano Skills?</div>
              <div className={styles.slogan__description}>
                Solano Skills is the education platform where Edutech2.0 and Web3.0 joins each other.
                We advocate for microlearning and learn by doing approach.
              </div>
              <div className={styles.slogan__btn}>
                <Link to={'/courses'}>
                  <Button variant="containedWhite">Courses</Button>
                </Link>
              </div>
            </section>

            <section className={styles.practices}>
              <div className={styles.practices__title}>
                <span>We use </span> proven learning methodology
              </div>
              <div className={styles.practices__subtitle}>
                Our tutors are highly trained to provider easy to follow .
              </div>
            </section>

            {renderPractices}

            <section className={cn(styles.slogan, styles.slogan__center)}>
              <div className={styles.slogan__title}>
                Start learning Solano Blockchain right now
              </div>
              <div className={styles.slogan__description}>
                Learn the skills you need online at your own pace—from non-coding essentials
                to Blockchain and Solano.
              </div>
              <div className={styles.slogan__btn}>
                <Link to={'/courses'}>
                  <Button variant="containedWhite">Review Courses</Button>
                </Link>
              </div>
            </section>

            <section className={styles.join}>
              <div className={styles.join__title}>
                Are you an educator?
              </div>
              <div className={styles.join__subtitle}>
                Solano Skills has lots of Classrooms for free for you and your students.
              </div>
              <div className={styles.join__btn}>
                <a target="_blank" href="https://forms.gle/nCKa2D3JK756E9eg7" rel="noreferrer">
                  <Button variant="containedPurple">I'm a educator</Button>
                </a>
              </div>
            </section>

            <section className={styles.signup}>
              <div className={cn(styles.signup__block, styles.signup__block_left)}>
                <div className={styles.signup__title}>Registration,</div>
                <div className={styles.signup__subtitle}>to start learning today</div>
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
