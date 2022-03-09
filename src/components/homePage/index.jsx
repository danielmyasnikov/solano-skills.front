import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import HeaderHome from '../headerHome';
import Footer from '../footer';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Button from '@components/mui/button';
import styles from './styles.module.less';
import { feedbacks, images, practices, slides } from './data';
import { Registration } from '@components/auth/registration';

export const HomePage = () => {
  const renderImage = (img) => {
    switch (img) {
      case 'lectures':
        return images.lectures;
      case 'practice':
        return images.practice;
      case 'statement':
        return images.statement;
      case 'avatar':
        return images.avatar;
      default:
        return;
    }
  };

  return (
    <>
      <HeaderHome />
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
                  <Button variant="outlinePurpleWithoutBorder">Посмотреть курсы</Button>
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
                <Registration isModal={true} variant={'home_offer'} />
              </div>
            </section>

            <section className={styles.ways}>
              <div className={styles.ways__title}>
                Пути обучения, <span>разработанные экспертами</span>
              </div>
              {slides.map((block) => (
                <div
                  key={block.title}
                  className={
                    block.bg === 'blue'
                      ? cn(styles.ways__block, styles.ways__block_blue)
                      : block.bg === 'red'
                      ? cn(styles.ways__block, styles.ways__block_red)
                      : cn(styles.ways__block, styles.ways__block_green)
                  }
                >
                  <div className={styles.ways__skills}>
                    <div className={styles.ways__skills__title}>{block.title}</div>
                    <div className={styles.ways__skills__subtitle}>{block.subtitle}</div>
                    <div className={styles.ways__skills__btn}>
                      <Button variant="outlineWhiteHome">
                        {block.btn}
                        <KeyboardArrowRightIcon />
                      </Button>
                    </div>
                  </div>
                  <div className={styles.ways__slides}>
                    {block.items.map((item, i) => (
                      <div key={item.title + i} className={styles.ways__slideContainer}>
                        <div className={styles.ways__slide}>
                          <div className={styles.ways__slide__bg}>
                            <div className={styles.ways__slide__title}>{item.title}</div>
                            <div className={styles.ways__slide__text}>{item.text}</div>
                            <div className={styles.ways__slide__button}>
                              <Button variant="outlineBlue">{block.btnlearn}</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            <section className={styles.slogan}>
              <div className={styles.slogan__title}>Что такое DeepSkills?</div>
              <div className={styles.slogan__description}>
                Изучайте необходимые вам навыки работы с данными онлайн в удобном для вас темпе — от
                основ, не связанных с кодированием, до науки о данных и машинного обучения.
              </div>
              <div className={styles.slogan__btn}>
                <Button variant="containedWhite">Посмотреть курсы</Button>
              </div>
            </section>

            <section className={styles.practices}>
              <div className={styles.practices__title}>
                <span>Практический</span> опыт обучения
              </div>
              <div className={styles.practices__subtitle}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco.
              </div>
            </section>

            {practices.map((practice) => (
              <section className={styles.practice}>
                <div className={styles.practice__left}>
                  <div className={styles.practice__pretitle}>{practice.pretitle}</div>
                  <div className={styles.practice__title}>{practice.title}</div>
                  <div className={styles.practice__text}>{practice.text}</div>
                  <Link to={practice.route}>
                    {practice.link}
                    <KeyboardDoubleArrowRightIcon />
                  </Link>
                </div>
                <div className={styles.practice__right}>
                  <div className={styles.practice__tochki}>
                    <images.tochki />
                  </div>
                  <div className={styles.practice__img}>
                    <img src={renderImage(practice.img)} />
                  </div>
                  <div className={styles.practice__textblock}>
                    <div className={styles.practice__textblock__title}>
                      {practice.textblockTitle}
                    </div>
                    <div className={styles.practice__textblock__subtitle}>
                      {practice.textblockSubtitle}
                    </div>
                  </div>
                </div>
              </section>
            ))}

            <section className={cn(styles.slogan, styles.slogan__center)}>
              <div className={styles.slogan__title}>Начните прямо сейчас</div>
              <div className={styles.slogan__description}>
                Изучайте необходимые вам навыки работы с данными онлайн в удобном для вас темпе — от
                основ, не связанных с кодированием, до науки о данных и машинного обучения.
              </div>
              <div className={styles.slogan__btn}>
                <Button variant="containedWhite">Посмотреть курсы</Button>
              </div>
            </section>

            <section className={styles.whatSays}>
              <div className={styles.whatSays__header}>
                <div className={styles.whatSays__header__title}>Что говорят наши пользователи</div>
                <div className={styles.whatSays__header__subtitle}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt
                </div>
              </div>
              <div className={styles.whatSays__feedbacks}>
                {feedbacks.map((feedback) => (
                  <div className={styles.whatSays__feedback}>
                    <div className={styles.whatSays__feedback__photo}>
                      <img src={renderImage(feedback.avatar)} />
                    </div>
                    <div className={styles.whatSays__feedback__data}>
                      <div className={styles.whatSays__feedback__data__text}>{feedback.text}</div>
                      <div className={styles.whatSays__feedback__data__author}>
                        {feedback.author}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.join}>
              <div className={styles.join__title}>
                Присоединяйтесь к команде преподавателей DeepSkills
              </div>
              <div className={styles.join__subtitle}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna.
              </div>
              <div className={styles.join__btn}>
                <Button variant="containedPurple">Я преподаватель</Button>
              </div>
            </section>

            <section className={styles.signup}>
              <div className={cn(styles.signup__block, styles.signup__block_left)}>
                <div className={styles.signup__title}>Зарегистрируйтесь,</div>
                <div className={styles.signup__subtitle}>чтобы начать обучение прямо сейчас</div>
              </div>
              <div className={styles.signup__block}>
                <Registration isModal={true} variant={'home_end'} />
              </div>
            </section>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};
