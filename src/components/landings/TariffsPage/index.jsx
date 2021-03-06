import { useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import HeaderHome from '../../Layout/headers/HomeHeader';
import Footer from '../../Layout/footers/Footer';
import styles from './styles.module.less';
import { feedbacks, images, practices, slides } from './data';
import BurgerMenu from '@components/common/burgerMenu';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '@store/profile/selector';
import { Grid, ThemeProvider } from '@mui/material';
import { Tariffs } from '@components/modals/TariffsModal/Tariffs';
import { useGetTariffsQuery } from '@src/features/payment/store/tariffs.api';
import { MailingList } from './ MailingList';
import { LandingHeader } from '@components/landings/Header';
import Helmet from 'react-helmet';

export const TariffsPage = () => {
  const { data: tariffs, isLoading } = useGetTariffsQuery();

  const [showMenu, setShowMenu] = useState(false);

  const isAuth = useSelector(selectIsAuth);

  const handleBurger = () => setShowMenu(!showMenu);

  const renderImage = (img) => images[img];

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

  if (isLoading) {
    return null;
  }

  return (
    <div className={styles.home}>
      <Helmet title="Тарифы">
        <meta
          name="description"
          content="Изучите навыки работы с данными, необходимые для продвижения по карьерной лестнице."
        />
      </Helmet>
      <div className={cn({ [styles.blur]: showMenu })} onTouchStart={() => handleBurger()} />
      <HeaderHome handleBurger={handleBurger} isAuth={isAuth} />
      <BurgerMenu isShow={showMenu} handleBurger={handleBurger} />
      <div className={styles.wrap}>
        <div className={styles.container}>
          <main style={{ paddingBottom: '24px' }}>
            <LandingHeader
              title="Выберите свой тариф"
              desc="Изучите навыки работы с данными, необходимые для продвижения по карьерной лестнице."
            />

            <section className={styles.about}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={12} lg={8}>
                  <Tariffs tariffList={tariffs} isTariffs />
                </Grid>
                <Grid item xs={12} md={12} lg={4} className={styles.mailing}>
                  <MailingList />
                </Grid>
              </Grid>
            </section>

            <section className={styles.whatSays}>
              <div className={styles.whatSays__header}>
                <div className={styles.whatSays__header__title}>Отзывы наших учеников</div>
              </div>
              <div className={styles.whatSays__feedbacks}>{renderFeedbacks}</div>
            </section>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
};
