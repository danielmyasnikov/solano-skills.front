import React from 'react';
import { Link } from 'react-router-dom'
import cn from 'classnames'
import HeaderHome from '../headerHome';
import Footer from '../footer';
import Button from '@components/mui/button';
import { Input } from '@components/mui/input';
import { CheckboxBtn } from '@components/mui/checkbox';
import GoogleAccount from '@assets/homepage/GoogleAccount';
import FacebookAccount from '@assets/homepage/FacebookAccount';
import Join from '@assets/homepage/Join';
import Tochki from '@assets/homepage/Tochki';
import lectures from '@assets/homepage/lectures.png';
import practice from '@assets/homepage/practice.png';
import statement from '@assets/homepage/statement.png';
import offerBg from '@assets/homepage/offerBg.png';
import mathematic from '@assets/homepage/mathematic.png';
import trophy from '@assets/homepage/trophy.png';
import courses from '@assets/homepage/courses.png';
import signup from '@assets/homepage/signup.png';
import sloganOne from '@assets/homepage/sloganOne.png';
import sloganTwo from '@assets/homepage/sloganTwo.png';
import slideBg from '@assets/homepage/slideBg.png';
import styles from './styles.module.less'
import { slides, practices, feedbacks } from './data'

const HomePage = () => {
  const renderImage = (img) => {
    switch (img) {
      case "lectures": return lectures;
      case "practice": return practice;
      case "statement": return statement;
      case "offerBg": return offerBg;
      case "mathematic": return mathematic;
      case "trophy": return trophy;
      case "courses": return courses;
      case "signup": return signup;
      case "sloganOne": return sloganOne;
      case "sloganTwo": return sloganTwo;
      case "slideBg": return slideBg;
      default: return;
    }
  }

  return (
    <>
      <HeaderHome />
      <div className={styles.container}>
        <main>
          <section className={styles.offer}>
            <div className={styles.offer__bg}><img src={renderImage('offerBg')} /></div>
            <div className={cn(styles.offer__block, styles.offer__block__left)}>
              <div className={styles.offer__title}>Развивайте навыки работы с данными</div>
              <div className={styles.offer__subtitle}>Обучаем с нуля профессиям и предоставляем знания по востребованным специальностям и направлениям в сфере Информационных технологий.</div>
              <Button variant="outlinePurple">
                Посмотреть курсы
              </Button>
              <div className={styles.offer__facts}>
                <div className={styles.offer__fact}>
                  <div className={styles.offer__fact__number}>{'>25'}</div>
                  <div className={styles.offer__fact__text}>профессий</div>
                </div>
                <div className={styles.offer__fact}>
                  <div className={styles.offer__fact__number}>15000</div>
                  <div className={styles.offer__fact__text}>учеников</div>
                </div>
              </div>
            </div>
            <div className={cn(styles.offer__block, styles.offer__block__right)}>
              <div className={styles.offer__block__right__title}>Попробуйте бесплатно</div>
              <form className={styles.offer__form}>
                <label className={styles.offer__form__label}>E-mail</label>
                <div className={styles.offer__form__input}><Input placeholder='Email@gmail.com' /></div>
                <div className={styles.offer__form__link}>Регистрация по номеру телефона</div>
                <label className={styles.offer__form__label}>Password</label>
                <div className={styles.offer__form__input}><Input placeholder='Введите пароль' /></div>
                <div className={styles.offer__form__check}>
                  <CheckboxBtn />
                  <label>Я принимаю условия <span>Пользовательского соглашения</span> и даю своё согласие на обработку персональных данных на условиях, определенных <span>Политикой конфиденциальности.</span></label>
                </div>
                <Button variant="outlinePurple">
                  Перейти к обучению
                </Button>
                <div className={styles.offer__form__accounts}>
                  <div><GoogleAccount /></div>
                  <div><FacebookAccount /></div>
                  <div><GoogleAccount /></div>
                </div>
              </form>
            </div>
          </section>

          <section className={styles.ways}>
            <div className={styles.ways__title}>Пути обучения, <span>разработанные экспертами</span></div>
            {slides.map(block => (
              <div className={
                block.bg === 'blue' ?
                  cn(styles.ways__block, styles.ways__block_blue) :
                  block.bg === 'red' ?
                    cn(styles.ways__block, styles.ways__block_red) :
                    cn(styles.ways__block, styles.ways__block_green)
              }>
                <div className={styles.ways__skills}>
                  <div className={styles.ways__skills__img}><img src={renderImage(block.img)} /></div>
                  <div className={styles.ways__skills__title}>{block.title}</div>
                  <div className={styles.ways__skills__subtitle}>{block.subtitle}</div>
                  <div className={styles.ways__skills__btn}>
                    <Button variant="outlineWhite">{block.btn}</Button>
                  </div>
                </div>
                <div className={styles.ways__slides}>
                  {block.items.map(item => (
                    <div className={styles.ways__slideContainer}>
                      <div className={styles.ways__slide}>
                        <div className={styles.ways__slide__bg}><img src={renderImage(item.bg)} /></div>
                        <div className={styles.ways__slide__title}>{item.title}</div>
                        <div className={styles.ways__slide__text}>{item.text}</div>
                        <div className={styles.ways__slide__button}>
                          <Button variant="outlineBlue">{block.btnlearn}</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section className={styles.slogan}>
            {/* <div className={styles.slogan__bg}><img src={renderImage('sloganOne')}/></div>                       */}
            <div className={styles.slogan__title}>Что такое DeepSkills?</div>
            <div className={styles.slogan__description}>Изучайте необходимые вам навыки работы с данными онлайн в удобном для вас темпе — от основ, не связанных с кодированием, до науки о данных и машинного обучения.</div>
            <div className={styles.slogan__btn}>
              <Button variant="outlineWhite">Посмотреть курсы</Button>
            </div>
          </section>

          <section className={styles.practices}>
            <div className={styles.practices__title}><span>Практический</span> опыт обучения</div>
            <div className={styles.practices__subtitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. </div>
            {practices.map(practice => (
              <div className={styles.practice}>
                <div className={styles.practice__left}>
                  <div className={styles.practice__pretitle}>{practice.pretitle}</div>
                  <div className={styles.practice__title}>{practice.title}</div>
                  <div className={styles.practice__text}>{practice.text}</div>
                  <Link to={practice.route}>
                    {practice.link}
                  </Link>
                </div>
                <div className={styles.practice__right}>
                  <div className={styles.practice__tochki}><Tochki /></div>
                  <div className={styles.practice__img}><img src={renderImage(practice.img)} /></div>
                  <div className={styles.practice__textblock}>
                    <div className={styles.practice__textblock__title}>{practice.textblockTitle}</div>
                    <div className={styles.practice__textblock__subtitle}>{practice.textblockSubtitle}</div>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <section className={cn(styles.slogan, styles.slogan__center)}>
            {/* <div className={styles.slogan__bg}><img src={renderImage('sloganTwo')}/></div>                       */}
            <div className={styles.slogan__title}>Начните прямо сейчас</div>
            <div className={styles.slogan__description}>Изучайте необходимые вам навыки работы с данными онлайн в удобном для вас темпе — от основ, не связанных с кодированием, до науки о данных и машинного обучения.</div>
            <div className={styles.slogan__btn}>
              <Button variant="containedWhite">Посмотреть курсы</Button>
            </div>
          </section>

          <section className={styles.whatSays}>
            <div className={styles.whatSays__header}>
              <div className={styles.whatSays__header__title}>Что говорят наши пользователи</div>
              <div className={styles.whatSays__header__subtitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</div>
            </div>
            <div className={styles.whatSays__feedbacks}>
              {feedbacks.map(feedback => (
                <div className={styles.whatSays__feedback}>
                  <div className={styles.whatSays__feedback__photo}></div>
                  <div className={styles.whatSays__feedback__data}>
                    <div className={styles.whatSays__feedback__data__text}>{feedback.text}</div>
                    <div className={styles.whatSays__feedback__data__author}>{feedback.author}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.join}>
            <div className={styles.join__title}>Присоединяйтесь к команде преподавателей DeepSkills</div>
            <div className={styles.join__subtitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</div>
            <div className={styles.join__btn}><Button variant="containedPurple">Я преподаватель</Button></div>
            <div className={styles.join__img}><Join /></div>
          </section>

          <section className={styles.signup}>
            {/* <div className={styles.signup__bg}><img src={renderImage('signup')}/></div>                                   */}
            <div className={cn(styles.signup__block, styles.signup__block_left)}>
              <div className={styles.signup__title}>Зарегистрируйтесь,</div>
              <div className={styles.signup__subtitle}>чтобы начать обучение прямо сейчас</div>
            </div>
            <div className={styles.signup__block}>
              <form className={styles.signup__form}>
                <label className={styles.signup__form__label}>E-mail</label>
                <div className={styles.signup__form__input}><Input placeholder='Email@gmail.com' /></div>
                <div className={styles.signup__form__link}>Регистрация по номеру телефона</div>
                <label className={styles.signup__form__label}>Password</label>
                <div className={styles.signup__form__input}><Input placeholder='Введите пароль' /></div>
                <div className={styles.signup__form__check}>
                  <CheckboxBtn />
                  <label>Я принимаю условия <span>Пользовательского соглашения</span> и даю своё согласие на обработку персональных данных на условиях, определенных <span>Политикой конфиденциальности.</span></label>
                </div>
                <div className={styles.signup__form__btn}>
                  <Button variant="outlineWhite">
                    Перейти к обучению
                  </Button>
                </div>
              </form>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default HomePage;