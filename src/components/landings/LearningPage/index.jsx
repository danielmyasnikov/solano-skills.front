import { useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import HeaderHome from '../../Layout/headers/HomeHeader';
import Footer from '../../Layout/footers/Footer';
import styles from './styles.module.less';
import { feedbacks, images, practices, slides } from './data';
import { Registration } from '@components/auth/signUp';
import BurgerMenu from '@components/common/burgerMenu';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '@store/profile/selector';
import { Button, Grid } from '@mui/material';
import { FaqSection } from '@components/landings/FaqSection';
import Box from '@mui/material/Box';
import { LandingHeader } from '@components/landings/Header';
import { Helmet } from 'react-helmet';

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
        <img src={renderImage(avatar)} alt="Fdfnfh" />
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
      <Helmet title="Как проходит обучение">
        <meta name="description" content="Изучите структуру работы платформы и её особенности." />
      </Helmet>
      <div className={cn({ [styles.blur]: showMenu })} onTouchStart={() => handleBurger()} />
      <HeaderHome handleBurger={handleBurger} isAuth={isAuth} />
      <BurgerMenu isShow={showMenu} handleBurger={handleBurger} />
      <div className={styles.wrap}>
        <div className={styles.container}>
          <main>
            <LandingHeader
              title="КАК ПРОХОДИТ ОБУЧЕНИЕ?"
              desc="Изучите структуру работы платформы и её особенности"
            />

            {renderPractices}

            <section className={styles.whatSays}>
              <div className={styles.whatSays__header}>
                <div className={styles.whatSays__header__title}>Отзывы наших учеников</div>
              </div>
              <div className={styles.whatSays__feedbacks}>{renderFeedbacks}</div>
            </section>

            <section className={styles.slogan2}>
              <div className={styles.slogan2__title}>
                Учим делать <span>правильно!</span>
              </div>
              <div className={styles.slogan2__description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco.
              </div>
              <Grid container spacing={4}>
                <Grid
                  item
                  lg={3}
                  md={6}
                  xs={12}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: '250px',
                      height: '150px',
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'center',
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="164"
                      height="148"
                      viewBox="0 0 164 148"
                      fill="none"
                    >
                      <path
                        d="M49.2053 117H122.855C124.879 117.005 126.83 116.243 128.317 114.868C134.522 109.116 139.485 102.154 142.902 94.409C146.32 86.6645 148.119 78.3017 148.189 69.835C148.507 35.4083 120.561 7.08142 86.1807 7.00018C51.7813 6.91888 23.8699 34.8193 23.8699 69.248C23.8601 77.817 25.622 86.2952 29.0448 94.1488C32.4676 102.002 37.4771 109.061 43.7579 114.881C45.242 116.25 47.1877 117.007 49.2053 117Z"
                        fill="#2D2863"
                      />
                      <g style={{ mixBlendMode: 'luminosity' }}>
                        <g filter="url(#filter0_d_3728_15206)">
                          <path
                            d="M120.443 107.15H137.868C140.057 107.15 141.932 105.27 141.932 103.07V21.37C141.932 19.17 140.057 17.29 137.868 17.29H120.984"
                            fill="url(#paint0_linear_3728_15206)"
                          />
                        </g>
                        <g filter="url(#filter1_d_3728_15206)">
                          <path
                            d="M51.2561 107.15H34.3722C32.1831 107.15 30.3074 105.27 30.3074 103.07V21.37C30.3074 19.17 32.1831 17.29 34.3722 17.29H50.908"
                            fill="url(#paint1_linear_3728_15206)"
                          />
                        </g>
                        <path
                          d="M42.0537 33.6299H50.4957"
                          stroke="#D6DCE8"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                        />
                        <path
                          d="M42.0537 44.6201H50.4957"
                          stroke="#D6DCE8"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                        />
                        <path
                          d="M42.0537 55.9404H50.4957"
                          stroke="#D6DCE8"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                        />
                        <path
                          d="M42.0537 67.25H50.4957"
                          stroke="#D6DCE8"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                        />
                        <path
                          d="M42.0537 89.2393H50.4957"
                          stroke="#D6DCE8"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                        />
                        <path
                          d="M129.111 33.6299H120.983"
                          stroke="#D6DCE8"
                          stroke-width="2"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M129.111 44.6201H120.983"
                          stroke="#D6DCE8"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                        />
                        <path
                          d="M129.111 55.9404H120.983"
                          stroke="#D6DCE8"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                        />
                        <path
                          d="M129.111 67.25H120.983"
                          stroke="#D6DCE8"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                        />
                        <path
                          d="M129.111 89.2393H120.983"
                          stroke="#D6DCE8"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                        />
                        <g filter="url(#filter2_d_3728_15206)">
                          <path
                            d="M116.919 114.07H55.0094C52.8204 114.07 50.9446 112.18 50.9446 109.98V15.0901C50.9446 12.8901 52.8204 11 55.0094 11H116.919C119.107 11 120.983 12.8901 120.983 15.0901V109.98C120.983 112.18 119.107 114.07 116.919 114.07Z"
                            fill="url(#paint2_linear_3728_15206)"
                          />
                        </g>
                      </g>
                      <path
                        d="M109.414 41.7501H66.2652C65.3273 41.7501 64.7017 41.1802 64.7017 40.3202V36.6201C64.7017 35.7701 65.3273 35.2002 66.2652 35.2002H109.414C110.353 35.2002 110.977 35.7701 110.977 36.6201V40.3202C110.977 40.8902 110.353 41.7501 109.414 41.7501Z"
                        fill="#9DA3B1"
                      />
                      <path
                        d="M109.414 58.71H66.2652C65.3273 58.71 64.7017 58.1499 64.7017 57.2899V53.59C64.7017 52.74 65.3273 52.1699 66.2652 52.1699H109.414C110.353 52.1699 110.977 52.74 110.977 53.59V57.2899C110.977 58.1499 110.353 58.71 109.414 58.71Z"
                        fill="#9DA3B1"
                      />
                      <path
                        d="M109.414 76.0001H66.2652C65.3273 76.0001 64.7017 75.4302 64.7017 74.5702V70.8701C64.7017 70.0201 65.3273 69.4502 66.2652 69.4502H109.414C110.353 69.4502 110.977 70.0201 110.977 70.8701V74.5702C110.977 75.4302 110.353 76.0001 109.414 76.0001Z"
                        fill="#9DA3B1"
                      />
                      <path
                        d="M109.414 93.5901H92.2173C91.2794 93.5901 90.6538 93.02 90.6538 92.17V88.4701C90.6538 87.6101 91.2794 87.04 92.2173 87.04H109.414C110.352 87.04 110.978 87.6101 110.978 88.4701V92.17C110.978 93.02 110.352 93.5901 109.414 93.5901Z"
                        fill="#9DA3B1"
                      />
                      <path
                        d="M153.439 42.1801C156.157 42.1801 158.36 39.9701 158.36 37.2301C158.36 34.5001 156.157 32.29 153.439 32.29C150.721 32.29 148.518 34.5001 148.518 37.2301C148.518 39.9701 150.721 42.1801 153.439 42.1801Z"
                        fill="#F6D972"
                      />
                      <path
                        d="M160.639 22.8701C162.496 22.8701 164 21.3601 164 19.4901C164 17.6301 162.496 16.1201 160.639 16.1201C158.783 16.1201 157.279 17.6301 157.279 19.4901C157.279 21.3601 158.783 22.8701 160.639 22.8701Z"
                        fill="#F6D972"
                      />
                      <path
                        d="M26.7662 21.4192C28.6231 21.4192 30.1268 19.9092 30.1268 18.0392C30.1268 16.1692 28.6231 14.6592 26.7662 14.6592C24.9103 14.6592 23.4055 16.1692 23.4055 18.0392C23.4055 19.9092 24.9103 21.4192 26.7662 21.4192Z"
                        fill="#F6D972"
                      />
                      <path
                        d="M6.24095 86.5901C9.68814 86.5901 12.4829 83.7801 12.4829 80.3101C12.4829 76.8501 9.68814 74.04 6.24095 74.04C2.79475 74.04 0 76.8501 0 80.3101C0 83.7801 2.79475 86.5901 6.24095 86.5901Z"
                        fill="#F6D972"
                      />
                      <defs>
                        <filter
                          id="filter0_d_3728_15206"
                          x="98.4426"
                          y="6.29004"
                          width="65.4897"
                          height="133.86"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="11" />
                          <feGaussianBlur stdDeviation="11" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_3728_15206"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_3728_15206"
                            result="shape"
                          />
                        </filter>
                        <filter
                          id="filter1_d_3728_15206"
                          x="8.30737"
                          y="6.29004"
                          width="64.9487"
                          height="133.86"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="11" />
                          <feGaussianBlur stdDeviation="11" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_3728_15206"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_3728_15206"
                            result="shape"
                          />
                        </filter>
                        <filter
                          id="filter2_d_3728_15206"
                          x="28.9446"
                          y="0"
                          width="114.039"
                          height="147.07"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="11" />
                          <feGaussianBlur stdDeviation="11" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_3728_15206"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_3728_15206"
                            result="shape"
                          />
                        </filter>
                        <linearGradient
                          id="paint0_linear_3728_15206"
                          x1="131.18"
                          y1="15.21"
                          x2="131.18"
                          y2="108.12"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#FDFEFF" />
                          <stop offset="0.9964" stop-color="#ECF0F5" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_3728_15206"
                          x1="40.7743"
                          y1="15.21"
                          x2="40.7743"
                          y2="108.12"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#FDFEFF" />
                          <stop offset="0.9964" stop-color="#ECF0F5" />
                        </linearGradient>
                        <linearGradient
                          id="paint2_linear_3728_15206"
                          x1="85.9407"
                          y1="8.62"
                          x2="85.9407"
                          y2="115.18"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#FDFEFF" />
                          <stop offset="0.9964" stop-color="#ECF0F5" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </Box>

                  <span>Актуальные стандарты качества: Не нужно переучваться после курса</span>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={6}
                  xs={12}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: '250px',
                      height: '150px',
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'center',
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="230"
                      height="144"
                      viewBox="0 0 230 144"
                      fill="none"
                    >
                      <path
                        d="M87.4736 129H161.525C163.56 129.005 165.522 128.243 167.017 126.868C173.255 121.116 178.246 114.154 181.682 106.409C185.118 98.6645 186.927 90.3017 186.997 81.835C187.317 47.4083 159.218 19.0814 124.651 19.0002C90.0637 18.9189 62 46.8193 62 81.248C61.9902 89.817 63.7617 98.2952 67.2032 106.149C70.6447 114.002 75.6815 121.061 81.9965 126.881C83.4887 128.25 85.445 129.007 87.4736 129Z"
                        fill="#2D2863"
                      />
                      <path
                        d="M76.6897 31.24C78.9197 31.24 80.6597 29.51 80.6597 27.29C80.6597 25.07 78.9197 23.3301 76.6897 23.3301C74.4597 23.3301 72.7197 25.07 72.7197 27.29C72.7197 29.51 74.5597 31.24 76.6897 31.24Z"
                        fill="#FFE27B"
                      />
                      <path
                        d="M83.72 20.4099C85.17 20.4099 86.43 19.15 86.43 17.7C86.43 16.26 85.17 15 83.72 15C82.26 15 81 16.26 81 17.7C81 19.25 82.26 20.4099 83.72 20.4099Z"
                        fill="#FFE27B"
                      />
                      <path
                        d="M175.152 51.9609H73.442C71.352 51.9609 69.522 53.791 69.522 55.891V121.531C69.522 123.621 71.352 122.841 73.442 122.841H174.892C176.982 122.841 178.812 123.621 178.812 121.531V55.891C179.072 53.791 177.242 51.9609 175.152 51.9609Z"
                        fill="#D5DDEA"
                      />
                      <path
                        d="M171.732 55.7812H77.0817C75.1417 55.7812 73.4316 57.4213 73.4316 59.2913V118.061C73.4316 119.931 75.1417 119.231 77.0817 119.231H171.492C173.442 119.231 175.142 119.931 175.142 118.061V59.2913C175.382 57.4213 173.682 55.7812 171.732 55.7812Z"
                        fill="white"
                      />
                      <g filter="url(#filter0_d_3728_15295)">
                        <g style={{ mixBlendMode: 'difference' }} opacity="0.05">
                          <path
                            d="M159.002 98.1899C159.002 105.14 153.376 110.77 146.357 110.77C146.236 110.77 145.208 110.77 137.645 110.77C132.381 110.77 123.971 110.77 110.539 110.77H104.126C95.716 110.95 89 104.24 89 96.1298C89 87.9598 95.776 81.1898 104.307 81.6098C111.628 58.7398 145.147 61.9498 147.991 85.5998C154.283 86.3898 159.002 91.7099 159.002 98.1899Z"
                            fill="url(#paint0_linear_3728_15295)"
                          />
                        </g>
                      </g>
                      <g style={{ mixBlendMode: 'difference' }} opacity="0.05">
                        <path
                          d="M146.358 110.771C153.316 110.771 159.003 105.141 159.003 98.1907C159.003 91.2307 153.316 85.6006 146.358 85.6006C139.4 85.6006 133.713 91.2307 133.713 98.1907C133.713 105.141 139.4 110.771 146.358 110.771Z"
                          fill="url(#paint1_linear_3728_15295)"
                        />
                      </g>
                      <g style={{ mixBlendMode: 'difference' }} opacity="0.05">
                        <path
                          d="M125.727 110.89C138.13 110.89 148.234 100.85 148.234 88.4502C148.234 76.0402 138.13 66 125.727 66C113.323 66 103.219 76.0402 103.219 88.4502C103.219 100.85 113.263 110.89 125.727 110.89Z"
                          fill="url(#paint2_linear_3728_15295)"
                        />
                      </g>
                      <path
                        d="M119.782 88.9399C120.26 88.4599 120.26 87.7 119.782 87.22C119.304 86.75 118.73 86.8398 117.965 86.8398C120.165 81.3098 127.337 80.0698 131.066 84.5498C132.5 86.0798 134.795 84.0798 133.457 82.5498C129.536 77.9698 122.555 77.3998 117.965 81.3098C116.244 82.7398 115.097 84.6498 114.523 86.8398C112.993 86.8398 112.706 86.84 112.324 87.22C111.845 87.7 111.845 88.4599 112.324 88.9399C116.722 93.2299 115.575 93.2299 119.782 88.9399Z"
                        fill="#939CAD"
                      />
                      <path
                        d="M138.526 91.7101L135.849 88.9401C135.37 88.4601 134.605 88.4601 134.127 88.9401L131.354 91.7101C130.876 92.1801 130.876 92.9401 131.354 93.4201C131.832 93.9001 132.406 93.7999 133.171 93.7999C130.972 99.4299 123.609 100.57 119.879 95.81C119.305 95.04 118.349 94.9499 117.584 95.5199C115.194 97.5199 120.835 101.91 125.808 101.91C130.685 101.91 135.179 98.5701 136.327 93.7101C137.857 93.7101 138.144 93.71 138.526 93.33C139.004 93.04 139.004 92.2801 138.526 91.7101Z"
                        fill="#939CAD"
                      />
                      <path
                        d="M194.242 119.181V121.271C194.242 123.621 192.142 125.721 189.792 125.721H58.8018C56.4518 125.721 54.3618 123.621 54.3618 121.271V119.181H194.242Z"
                        fill="#D5DDEA"
                      />
                      <path
                        d="M136.462 119.181V119.961C136.462 121.271 135.412 122.581 133.842 122.581H114.492C113.192 122.581 111.882 121.531 111.882 119.961V119.181H136.462Z"
                        fill="#E9EFF8"
                      />
                      <g filter="url(#filter1_d_3728_15295)">
                        <path
                          d="M187.003 97.6393L146.09 79.2271L168.747 28.8892C169.485 27.2495 171.405 26.5107 173.051 27.2504L202.467 40.4939L207.146 52.8862L187.003 97.6393Z"
                          fill="url(#paint3_linear_3728_15295)"
                        />
                      </g>
                      <path
                        d="M202.307 40.8493L200.484 44.8998C199.362 47.3939 200.472 50.3149 202.96 51.4391L206.984 53.2497"
                        fill="#D5DDEA"
                      />
                      <g opacity="0.5">
                        <path
                          opacity="0.5"
                          d="M180.54 52.2356L173.574 48.8944C173.274 48.7542 173.156 48.4301 173.251 48.2099C173.361 47.9512 173.699 47.8872 173.954 48.013L180.919 51.3539C181.219 51.4941 181.338 51.8182 181.243 52.0387C181.149 52.2592 180.84 52.3758 180.54 52.2356Z"
                          fill="#D6DCE8"
                        />
                        <path
                          opacity="0.5"
                          d="M174.375 65.9287L167.411 62.5878C167.111 62.4476 166.992 62.1237 167.087 61.9032C167.198 61.6448 167.535 61.5805 167.79 61.7063L174.755 65.0475C175.055 65.1877 175.174 65.5116 175.08 65.7321C174.984 65.9523 174.674 66.0771 174.375 65.9287Z"
                          fill="#D6DCE8"
                        />
                        <path
                          opacity="0.5"
                          d="M197.153 59.7159L189.117 55.8819C188.819 55.7336 188.699 55.4176 188.793 55.1971C188.902 54.9466 189.239 54.8822 189.496 55.0002L197.487 58.8197C197.787 58.9599 197.906 59.2841 197.811 59.5045C197.761 59.7392 197.453 59.8561 197.153 59.7159Z"
                          fill="#EAECF3"
                        />
                        <path
                          opacity="0.5"
                          d="M190.989 73.4081L182.953 69.5741C182.653 69.4339 182.534 69.11 182.629 68.8895C182.738 68.639 183.074 68.5747 183.33 68.7004L191.323 72.5121C191.621 72.6604 191.742 72.9763 191.647 73.1967C191.597 73.4316 191.286 73.5561 190.989 73.4081Z"
                          fill="#EAECF3"
                        />
                        <path
                          opacity="0.5"
                          d="M187.219 67.4471L179.186 63.6053C178.886 63.465 178.765 63.149 178.86 62.9287C178.972 62.6704 179.305 62.6136 179.564 62.7318L187.596 66.5736C187.897 66.7139 188.015 67.0378 187.922 67.2502C187.811 67.5085 187.477 67.565 187.219 67.4471Z"
                          fill="#D6DCE8"
                        />
                        <path
                          opacity="0.5"
                          d="M181.056 81.1407L173.02 77.3063C172.722 77.1582 172.602 76.8424 172.696 76.6219C172.805 76.3714 173.142 76.3071 173.397 76.4329L181.432 80.2668C181.732 80.4071 181.851 80.7312 181.758 80.9435C181.648 81.2022 181.311 81.2665 181.056 81.1407Z"
                          fill="#D6DCE8"
                        />
                        <path
                          opacity="0.5"
                          d="M186.826 55.0105L182.943 53.098C182.642 52.9575 182.525 52.6255 182.623 52.3974C182.739 52.1234 183.077 52.0593 183.335 52.1775L187.218 54.0897C187.516 54.2381 187.633 54.5701 187.536 54.7984C187.464 55.0869 187.124 55.1588 186.826 55.0105Z"
                          fill="#AAB2C5"
                        />
                        <path
                          opacity="0.5"
                          d="M180.662 68.7038L176.777 66.7994C176.478 66.6508 176.362 66.3188 176.459 66.0905C176.573 65.8243 176.913 65.7524 177.169 65.8784L181.055 67.7831C181.353 67.9314 181.47 68.2637 181.372 68.4917C181.301 68.7805 180.961 68.8524 180.662 68.7038Z"
                          fill="#AAB2C5"
                        />
                        <path
                          opacity="0.5"
                          d="M170.787 47.743L167.914 46.3559C167.615 46.2076 167.498 45.8755 167.598 45.6394C167.714 45.3653 168.01 45.279 168.311 45.4197L171.184 46.8068C171.486 46.9476 171.6 47.2874 171.501 47.5236C171.384 47.7976 171.088 47.8837 170.787 47.743Z"
                          fill="#AAB2C5"
                        />
                        <path
                          opacity="0.5"
                          d="M164.624 61.4356L161.751 60.0485C161.449 59.9078 161.335 59.5679 161.434 59.3318C161.551 59.0577 161.847 58.9716 162.148 59.1121L165.021 60.4992C165.32 60.6478 165.437 60.9798 165.337 61.216C165.221 61.49 164.926 61.5764 164.624 61.4356Z"
                          fill="#AAB2C5"
                        />
                        <path
                          opacity="0.5"
                          d="M180.396 56.2227L176.213 54.1702C175.912 54.0297 175.796 53.698 175.893 53.4697C176.01 53.1956 176.347 53.1315 176.603 53.2576L180.788 55.3023C181.087 55.4506 181.203 55.7824 181.106 56.0107C181.051 56.2612 180.697 56.3632 180.396 56.2227Z"
                          fill="#D6DCE8"
                        />
                        <path
                          opacity="0.5"
                          d="M174.232 69.9159L170.049 67.8636C169.749 67.7231 169.633 67.3911 169.73 67.1628C169.843 66.8966 170.183 66.8247 170.44 66.9507L174.625 68.9954C174.923 69.1437 175.039 69.4755 174.942 69.7038C174.887 69.9544 174.533 70.0564 174.232 69.9159Z"
                          fill="#D6DCE8"
                        />
                        <path
                          opacity="0.5"
                          d="M193.411 62.1853L182.795 57.0673C182.496 56.9273 182.375 56.6111 182.469 56.3906C182.578 56.14 182.912 56.0836 183.17 56.2015L193.783 61.3271C194.083 61.4673 194.204 61.7836 194.111 61.996C194.017 62.2164 193.667 62.3111 193.411 62.1853Z"
                          fill="#D6DCE8"
                        />
                        <path
                          opacity="0.5"
                          d="M187.248 75.8785L176.632 70.7608C176.332 70.6206 176.211 70.3045 176.303 70.0919C176.414 69.8335 176.748 69.777 177.004 69.9028L187.619 75.0206C187.919 75.1608 188.04 75.4769 187.948 75.6895C187.853 75.9097 187.503 76.0043 187.248 75.8785Z"
                          fill="#D6DCE8"
                        />
                        <path
                          opacity="0.5"
                          d="M173.417 53.0328L166.395 49.7081C166.095 49.5678 165.976 49.2439 166.071 49.0234C166.182 48.7651 166.516 48.7086 166.774 48.8265L173.797 52.1515C174.097 52.2917 174.216 52.6157 174.12 52.8359C174.026 53.0563 173.717 53.173 173.417 53.0328Z"
                          fill="#EAECF3"
                        />
                        <path
                          opacity="0.5"
                          d="M167.254 66.7263L160.232 63.4016C159.932 63.2614 159.813 62.9373 159.908 62.7168C160.019 62.4584 160.353 62.4019 160.611 62.5199L167.633 65.8446C167.934 65.9851 168.052 66.309 167.957 66.5294C167.863 66.7499 167.554 66.8666 167.254 66.7263Z"
                          fill="#EAECF3"
                        />
                        <path
                          opacity="0.5"
                          d="M184.419 62.0841L174.715 57.4773C174.415 57.3371 174.294 57.0211 174.386 56.8085C174.495 56.5579 174.832 56.4936 175.087 56.6194L184.836 61.2406C185.136 61.3808 185.256 61.6968 185.162 61.9173C185.053 62.1678 184.719 62.2243 184.419 62.0841Z"
                          fill="#AAB2C5"
                        />
                        <path
                          opacity="0.5"
                          d="M178.255 75.7772L168.551 71.1705C168.251 71.0303 168.131 70.7144 168.223 70.5018C168.331 70.2513 168.667 70.1867 168.923 70.3125L178.671 74.9337C178.969 75.0818 179.09 75.3978 178.998 75.6105C178.889 75.861 178.555 75.9175 178.255 75.7772Z"
                          fill="#AAB2C5"
                        />
                        <path
                          opacity="0.5"
                          d="M171.903 56.3949L164.879 53.0781C164.581 52.93 164.46 52.6139 164.554 52.3934C164.666 52.1351 165.002 52.0707 165.258 52.1965L172.282 55.5134C172.58 55.6617 172.701 55.9776 172.606 56.198C172.512 56.4185 172.2 56.543 171.903 56.3949Z"
                          fill="#D6DCE8"
                        />
                        <path
                          opacity="0.5"
                          d="M165.74 70.0895L158.715 66.7726C158.417 66.6243 158.297 66.3082 158.391 66.0878C158.502 65.8294 158.839 65.7651 159.094 65.8909L166.116 69.2158C166.416 69.356 166.535 69.6799 166.443 69.8926C166.348 70.113 166.037 70.2375 165.74 70.0895Z"
                          fill="#D6DCE8"
                        />
                        <path
                          opacity="0.5"
                          d="M176.463 62.552L171.126 59.9619C170.826 59.8217 170.709 59.4897 170.804 59.2695C170.918 59.0032 171.254 58.9389 171.513 59.0571L176.851 61.6472C177.149 61.7956 177.268 62.1195 177.17 62.3476C177.059 62.6059 176.764 62.6925 176.463 62.552Z"
                          fill="#EAECF3"
                        />
                        <path
                          opacity="0.5"
                          d="M170.3 76.2454L164.962 73.6553C164.661 73.5148 164.545 73.183 164.64 72.9628C164.753 72.6964 165.091 72.6323 165.346 72.7581L170.685 75.3485C170.985 75.4887 171.104 75.8129 171.006 76.0409C170.892 76.3071 170.6 76.3859 170.3 76.2454Z"
                          fill="#EAECF3"
                        />
                        <path
                          opacity="0.5"
                          d="M167.681 58.5467L163.355 56.4739C163.054 56.3334 162.938 56.0016 163.035 55.7733C163.149 55.5071 163.487 55.4431 163.742 55.5689L168.071 57.6341C168.369 57.7824 168.488 58.1063 168.391 58.3346C168.319 58.6231 167.982 58.6872 167.681 58.5467Z"
                          fill="#AAB2C5"
                        />
                        <path
                          opacity="0.5"
                          d="M161.518 72.2391L157.189 70.1742C156.891 70.0258 156.774 69.6938 156.872 69.4658C156.986 69.1995 157.323 69.1352 157.579 69.2613L161.908 71.3265C162.206 71.4748 162.325 71.7987 162.228 72.027C162.156 72.3155 161.816 72.3874 161.518 72.2391Z"
                          fill="#AAB2C5"
                        />
                        <path
                          opacity="0.5"
                          d="M189.976 50.2033L170.299 41.0065C170 40.8665 169.873 40.5662 169.964 40.3616C170.069 40.1187 170.401 40.0699 170.658 40.1876L190.335 49.3844C190.634 49.5244 190.758 49.8328 190.668 50.0373C190.565 50.2724 190.275 50.3433 189.976 50.2033Z"
                          fill="#AAB2C5"
                        />
                      </g>
                      <path
                        d="M165.96 64.898L168.753 66.1554L181.728 54.4896L178.795 53.17L165.96 64.898Z"
                        fill="#9DA3B1"
                      />
                      <path
                        d="M182.308 57.0833L180.663 60.741L184.17 65.3196L178.421 65.7211L176.85 69.2126L187.191 68.269L188.386 65.6167L182.308 57.0833Z"
                        fill="#9DA3B1"
                      />
                      <g filter="url(#filter2_d_3728_15295)">
                        <path
                          d="M145 59.896L107.073 62.3943L104.006 15.7312C103.906 14.21 105.048 12.8911 106.573 12.7934L133.844 11L142.274 18.4179L145 59.896Z"
                          fill="url(#paint4_linear_3728_15295)"
                        />
                      </g>
                      <path
                        d="M133.867 11.3281L134.114 15.0893C134.266 17.3921 136.259 19.1437 138.566 18.9901L142.296 18.7458"
                        fill="#D5DDEA"
                      />
                      <g opacity="0.5">
                        <path
                          opacity="0.5"
                          d="M122.085 28.4037L115.578 28.9061C115.299 28.927 115.088 28.7386 115.078 28.5292C115.065 28.285 115.296 28.0897 115.535 28.0687L122.041 27.5661C122.321 27.5382 122.531 27.7336 122.542 27.943C122.553 28.1523 122.364 28.3757 122.085 28.4037Z"
                          fill="#D6DCE8"
                        />
                        <path
                          opacity="0.5"
                          d="M122.92 41.0977L116.413 41.6001C116.134 41.628 115.923 41.4326 115.913 41.2233C115.9 40.9791 116.13 40.7837 116.37 40.7628L122.876 40.2604C123.156 40.2394 123.366 40.4279 123.377 40.6372C123.388 40.8466 123.199 41.0768 122.92 41.0977Z"
                          fill="#D6DCE8"
                        />
                        <path
                          opacity="0.5"
                          d="M137.486 27.3779L129.985 27.9569C129.705 27.9849 129.495 27.7895 129.484 27.5871C129.471 27.3428 129.701 27.1475 129.941 27.1336L137.402 26.5543C137.682 26.5334 137.892 26.7218 137.903 26.9312C137.954 27.1335 137.765 27.3569 137.486 27.3779Z"
                          fill="#EAECF3"
                        />
                        <path
                          opacity="0.5"
                          d="M138.321 40.0711L130.819 40.6571C130.54 40.6781 130.33 40.4898 130.319 40.2804C130.306 40.0362 130.536 39.8477 130.776 39.8268L138.237 39.2477C138.517 39.2268 138.727 39.415 138.738 39.6244C138.789 39.8267 138.6 40.0501 138.321 40.0711Z"
                          fill="#EAECF3"
                        />
                        <path
                          opacity="0.5"
                          d="M133.13 37.1132L125.628 37.6923C125.349 37.7132 125.138 37.5249 125.128 37.3156C125.115 37.0783 125.345 36.8829 125.584 36.8689L133.086 36.2828C133.366 36.2619 133.576 36.4502 133.587 36.6595C133.599 36.9038 133.369 37.0923 133.13 37.1132Z"
                          fill="#D6DCE8"
                        />
                        <path
                          opacity="0.5"
                          d="M133.964 49.8055L126.463 50.3848C126.184 50.4127 125.973 50.2173 125.962 50.0149C125.949 49.7707 126.18 49.5822 126.419 49.5612L133.921 48.9822C134.2 48.9543 134.41 49.1497 134.421 49.352C134.434 49.5963 134.204 49.7846 133.964 49.8055Z"
                          fill="#D6DCE8"
                        />
                        <path
                          opacity="0.5"
                          d="M127.891 28.0134L124.252 28.2924C123.972 28.3134 123.762 28.1181 123.751 27.9018C123.738 27.6436 123.969 27.4411 124.209 27.4202L127.848 27.1481C128.128 27.1202 128.339 27.3226 128.35 27.5389C128.402 27.7901 128.171 27.9924 127.891 28.0134Z"
                          fill="#AAB2C5"
                        />
                        <path
                          opacity="0.5"
                          d="M128.726 40.7137L125.087 40.9859C124.807 41.0138 124.596 40.8114 124.585 40.5951C124.572 40.3439 124.803 40.1415 125.043 40.1206L128.682 39.8414C128.962 39.8205 129.172 40.0159 129.184 40.2322C129.236 40.4834 129.006 40.6857 128.726 40.7137Z"
                          fill="#AAB2C5"
                        />
                        <path
                          opacity="0.5"
                          d="M113.005 28.9688L110.325 29.2061C110.044 29.227 109.834 29.0246 109.822 28.8013C109.81 28.5501 110 28.3477 110.281 28.3198L112.961 28.0895C113.242 28.0616 113.452 28.264 113.464 28.4873C113.476 28.7455 113.285 28.9478 113.005 28.9688Z"
                          fill="#AAB2C5"
                        />
                        <path
                          opacity="0.5"
                          d="M113.84 41.663L111.159 41.9001C110.879 41.9211 110.668 41.7188 110.657 41.5025C110.644 41.2443 110.835 41.0418 111.115 41.0209L113.796 40.7837C114.075 40.7628 114.287 40.965 114.297 41.1814C114.311 41.4395 114.119 41.642 113.84 41.663Z"
                          fill="#AAB2C5"
                        />
                        <path
                          opacity="0.5"
                          d="M123.563 31.4743L119.645 31.7743C119.365 31.7953 119.154 31.593 119.144 31.3767C119.13 31.1255 119.361 30.923 119.601 30.9021L123.519 30.609C123.799 30.5811 124.009 30.7835 124.021 30.9999C124.072 31.2092 123.843 31.4464 123.563 31.4743Z"
                          fill="#D6DCE8"
                        />
                        <path
                          opacity="0.5"
                          d="M124.397 44.1677L120.479 44.4679C120.199 44.4888 119.988 44.2934 119.978 44.077C119.965 43.8258 120.196 43.6235 120.436 43.6026L124.354 43.3024C124.633 43.2745 124.844 43.4769 124.855 43.6932C124.906 43.9095 124.677 44.1467 124.397 44.1677Z"
                          fill="#D6DCE8"
                        />
                        <path
                          opacity="0.5"
                          d="M135.667 30.6864L125.733 31.3912C125.453 31.4121 125.243 31.2237 125.232 31.0213C125.22 30.784 125.45 30.5955 125.689 30.5746L135.623 29.8768C135.902 29.8489 136.113 30.0373 136.124 30.2397C136.135 30.449 135.907 30.6724 135.667 30.6864Z"
                          fill="#D6DCE8"
                        />
                        <path
                          opacity="0.5"
                          d="M136.502 43.3865L126.567 44.0843C126.288 44.1053 126.077 43.9168 126.067 43.7145C126.054 43.4772 126.284 43.2887 126.523 43.2678L136.458 42.57C136.737 42.549 136.948 42.7375 136.958 42.9398C136.969 43.1422 136.741 43.3656 136.502 43.3865Z"
                          fill="#D6DCE8"
                        />
                        <path
                          opacity="0.5"
                          d="M117.074 31.8302L110.53 32.3675C110.251 32.3884 110.041 32.2 110.03 31.9906C110.017 31.7464 110.248 31.5511 110.487 31.5371L117.031 30.9928C117.31 30.9719 117.52 31.1603 117.531 31.3697C117.542 31.579 117.354 31.8022 117.074 31.8302Z"
                          fill="#EAECF3"
                        />
                        <path
                          opacity="0.5"
                          d="M117.908 44.5235L111.365 45.0608C111.086 45.0887 110.875 44.8933 110.865 44.6839C110.851 44.4467 111.082 44.2514 111.322 44.2304L117.865 43.6931C118.144 43.6652 118.355 43.8606 118.365 44.0699C118.377 44.2723 118.188 44.5025 117.908 44.5235Z"
                          fill="#EAECF3"
                        />
                        <path
                          opacity="0.5"
                          d="M128.902 34.202L119.849 34.8998C119.57 34.9207 119.36 34.7325 119.349 34.5301C119.336 34.2928 119.566 34.1043 119.805 34.0834L128.899 33.3856C129.178 33.3577 129.388 33.5461 129.399 33.7484C129.412 33.9857 129.182 34.181 128.902 34.202Z"
                          fill="#AAB2C5"
                        />
                        <path
                          opacity="0.5"
                          d="M129.737 46.8963L120.684 47.5941C120.404 47.615 120.194 47.4266 120.183 47.2242C120.17 46.987 120.4 46.7985 120.64 46.7775L129.733 46.0797C130.013 46.0588 130.223 46.2472 130.234 46.4496C130.246 46.6868 130.016 46.8753 129.737 46.8963Z"
                          fill="#AAB2C5"
                        />
                        <path
                          opacity="0.5"
                          d="M117.28 34.9492L110.735 35.4866C110.456 35.5145 110.246 35.3191 110.235 35.1097C110.223 34.8725 110.453 34.6771 110.692 34.6562L117.236 34.1189C117.515 34.091 117.725 34.2864 117.736 34.4957C117.747 34.7051 117.559 34.9283 117.28 34.9492Z"
                          fill="#D6DCE8"
                        />
                        <path
                          opacity="0.5"
                          d="M118.114 47.6425L111.57 48.1868C111.291 48.2078 111.081 48.0193 111.07 47.81C111.057 47.5657 111.287 47.3704 111.527 47.3495L118.071 46.8121C118.35 46.7912 118.56 46.9796 118.571 47.189C118.582 47.3983 118.394 47.6216 118.114 47.6425Z"
                          fill="#D6DCE8"
                        />
                        <path
                          opacity="0.5"
                          d="M123.138 37.7542L118.144 38.145C117.865 38.166 117.654 37.9705 117.643 37.7542C117.631 37.51 117.861 37.3077 118.101 37.2867L123.094 36.9029C123.374 36.882 123.585 37.0774 123.595 37.2867C123.608 37.538 123.417 37.7333 123.138 37.7542Z"
                          fill="#EAECF3"
                        />
                        <path
                          opacity="0.5"
                          d="M123.972 50.4555L118.979 50.8394C118.7 50.8603 118.489 50.6649 118.478 50.4555C118.465 50.2043 118.696 50.009 118.936 49.9881L123.928 49.5972C124.208 49.5763 124.419 49.7717 124.429 49.9881C124.443 50.2323 124.252 50.4276 123.972 50.4555Z"
                          fill="#EAECF3"
                        />
                        <path
                          opacity="0.5"
                          d="M114.977 38.2642L110.942 38.6131C110.662 38.6341 110.451 38.4386 110.44 38.2223C110.428 37.9711 110.659 37.7688 110.898 37.7478L114.933 37.4059C115.213 37.378 115.423 37.5804 115.434 37.7967C115.487 38.041 115.257 38.2433 114.977 38.2642Z"
                          fill="#AAB2C5"
                        />
                        <path
                          opacity="0.5"
                          d="M115.811 50.9645L111.776 51.3064C111.496 51.3273 111.286 51.1321 111.275 50.9158C111.262 50.6645 111.493 50.4621 111.732 50.4481L115.768 50.0992C116.048 50.0783 116.258 50.2737 116.269 50.49C116.322 50.7412 116.091 50.9366 115.811 50.9645Z"
                          fill="#AAB2C5"
                        />
                        <path
                          opacity="0.5"
                          d="M128.334 23.0446L110.004 24.3845C109.725 24.4055 109.515 24.224 109.504 24.0356C109.491 23.8053 109.722 23.6308 109.96 23.6099L128.291 22.2771C128.57 22.2562 128.78 22.4306 128.79 22.626C128.803 22.8493 128.613 23.0237 128.334 23.0446Z"
                          fill="#AAB2C5"
                        />
                      </g>
                      <path
                        d="M117.059 32.4445L117.214 34.803C117.251 35.3613 117.167 36.066 115.997 36.1428L115.738 36.1568L115.902 38.662L116.162 38.641C116.941 38.5922 117.488 38.9759 117.543 39.8063L117.707 42.3046C117.853 44.5306 119.114 45.8426 121.323 45.696L122.232 45.6402L122.068 43.1349L121.158 43.1978C120.769 43.2257 120.24 43.121 120.176 42.1441L119.994 39.3668C119.929 38.3968 119.494 37.7268 118.687 37.357C119.439 36.8895 119.774 36.0312 119.719 35.2008L119.536 32.4166C119.482 31.5862 119.983 31.272 120.373 31.2511L121.153 31.1954L120.979 28.5576L120.07 28.6203C117.991 28.7529 116.904 30.0789 117.059 32.4445Z"
                        fill="#9DA3B1"
                      />
                      <path
                        d="M131.275 33.7699L131.122 31.4531C130.979 29.2689 129.694 27.9849 127.435 28.1314L126.505 28.1943L126.666 30.6506L127.463 30.5948C127.862 30.5668 128.402 30.6715 128.465 31.6275L128.644 34.3561C128.707 35.3121 129.15 35.9679 129.974 36.3238C129.337 36.7774 128.992 37.6218 129.046 38.4382L129.225 41.1668C129.288 42.1228 128.633 42.2972 128.367 42.3181L127.437 42.381L127.598 44.8303L128.528 44.7744C130.787 44.6209 131.902 43.3159 131.75 40.9991L131.597 38.6825C131.544 37.8591 131.916 37.4264 132.712 37.3775L132.978 37.3566L132.817 34.9002L132.551 34.9212C131.754 34.97 131.329 34.5863 131.275 33.7699Z"
                        fill="#9DA3B1"
                      />
                      <g filter="url(#filter3_d_3728_15295)">
                        <path
                          d="M92.3348 82.7726L47.9981 103.492L22.5072 48.944C21.6774 47.1683 22.4296 45.0507 24.2134 44.2171L56.0932 29.3192L69.672 34.2766L92.3348 82.7726Z"
                          fill="url(#paint5_linear_3728_15295)"
                        />
                      </g>
                      <path
                        d="M56.2737 29.709L58.0689 33.5505C59.4702 36.5492 63.0434 37.8486 66.0448 36.446L69.8535 34.6662"
                        fill="#D5DDEA"
                      />
                      <path
                        d="M38.4773 58.4463L63.4491 46.7766L73.1233 73.9241L64.0404 80.9281L52.7646 83.438L38.4773 58.4463Z"
                        fill="#9DA3B1"
                      />
                      <path
                        d="M62.643 48.7095L71.4507 73.469L63.7522 79.3847C63.5737 79.5343 63.3233 79.4636 63.2301 79.2643L51.5494 54.2688C51.4647 54.0876 51.5333 53.9012 51.7117 53.8178L62.643 48.7095Z"
                        fill="#D6DCE8"
                      />
                      <path
                        d="M48.5186 58.8756L51.6269 57.423L61.0595 77.6078L54.6951 79.4008C54.2029 79.5426 53.6892 79.308 53.4775 78.855L51.8434 75.3581L54.2339 74.9584L54.5811 75.635L56.0884 75.2066L48.5186 58.8756Z"
                        fill="white"
                      />
                      <path
                        d="M54.0735 56.2793L59.5984 68.1021L62.7838 66.6135L64.5556 71.5363L62.2911 73.7978L63.6161 76.6334L67.8352 73.0392C68.3241 72.6231 68.4819 71.9642 68.2702 71.3788L64.6062 61.0818L61.1926 62.677L58.9275 57.8301L63.2335 55.8178L61.7687 52.6832L54.0735 56.2793Z"
                        fill="white"
                      />
                      <path
                        d="M197.492 92.451L190.512 94.6011L196.072 102.811L191.542 105.881L185.982 97.6611L181.392 103.331L177.422 80.1211L197.492 92.451Z"
                        fill="url(#paint6_linear_3728_15295)"
                      />
                      <path
                        d="M211.275 105.55C214.741 105.55 217.551 102.74 217.551 99.27C217.551 95.81 214.741 93 211.275 93C207.81 93 205 95.81 205 99.27C205 102.74 207.81 105.55 211.275 105.55Z"
                        fill="#F6D972"
                      />
                      <defs>
                        <filter
                          id="filter0_d_3728_15295"
                          x="67"
                          y="55.0557"
                          width="114.002"
                          height="88.7178"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="11" />
                          <feGaussianBlur stdDeviation="11" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_3728_15295"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_3728_15295"
                            result="shape"
                          />
                        </filter>
                        <filter
                          id="filter1_d_3728_15295"
                          x="124.091"
                          y="15.9629"
                          width="105.055"
                          height="114.677"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="11" />
                          <feGaussianBlur stdDeviation="11" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_3728_15295"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_3728_15295"
                            result="shape"
                          />
                        </filter>
                        <filter
                          id="filter2_d_3728_15295"
                          x="82"
                          y="0"
                          width="85"
                          height="95.3945"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="11" />
                          <feGaussianBlur stdDeviation="11" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_3728_15295"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_3728_15295"
                            result="shape"
                          />
                        </filter>
                        <filter
                          id="filter3_d_3728_15295"
                          x="0.170166"
                          y="18.3193"
                          width="114.165"
                          height="118.173"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="11" />
                          <feGaussianBlur stdDeviation="11" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_3728_15295"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_3728_15295"
                            result="shape"
                          />
                        </filter>
                        <linearGradient
                          id="paint0_linear_3728_15295"
                          x1="124.001"
                          y1="84.5298"
                          x2="123.978"
                          y2="111.26"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="white" />
                          <stop offset="0.9964" stop-color="#ECF0F5" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_3728_15295"
                          x1="132.367"
                          y1="82.8906"
                          x2="143.577"
                          y2="95.1506"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#BCCBE1" />
                          <stop offset="0.9942" stop-color="white" stop-opacity="0" />
                        </linearGradient>
                        <linearGradient
                          id="paint2_linear_3728_15295"
                          x1="101.112"
                          y1="78.15"
                          x2="118.779"
                          y2="85.06"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#E2E8F0" />
                          <stop offset="0.9942" stop-color="white" stop-opacity="0" />
                        </linearGradient>
                        <linearGradient
                          id="paint3_linear_3728_15295"
                          x1="191.084"
                          y1="33.8817"
                          x2="166.275"
                          y2="89.0032"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#FDFEFF" />
                          <stop offset="0.9964" stop-color="#ECF0F5" />
                        </linearGradient>
                        <linearGradient
                          id="paint4_linear_3728_15295"
                          x1="122.701"
                          y1="10.5813"
                          x2="126.059"
                          y2="61.6825"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#FDFEFF" />
                          <stop offset="0.9964" stop-color="#ECF0F5" />
                        </linearGradient>
                        <linearGradient
                          id="paint5_linear_3728_15295"
                          x1="42.532"
                          y1="34.034"
                          x2="70.4445"
                          y2="93.7638"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#FDFEFF" />
                          <stop offset="0.9964" stop-color="#ECF0F5" />
                        </linearGradient>
                        <linearGradient
                          id="paint6_linear_3728_15295"
                          x1="177.562"
                          y1="97.6811"
                          x2="193.672"
                          y2="86.7911"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#B0BACC" />
                          <stop offset="1" stop-color="#969EAE" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </Box>

                  <span>Понимание полного цикла работы</span>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={6}
                  xs={12}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: '250px',
                      height: '150px',
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'center',
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="164"
                      height="131"
                      viewBox="0 0 164 131"
                      fill="none"
                    >
                      <path
                        d="M41.4736 116H115.525C117.56 116.005 119.522 115.243 121.017 113.868C127.255 108.116 132.246 101.154 135.682 93.409C139.118 85.6645 140.927 77.3017 140.997 68.835C141.317 34.4083 113.218 6.08142 78.6508 6.00018C44.0637 5.91888 16 33.8193 16 68.248C15.9902 76.817 17.7617 85.2952 21.2032 93.1488C24.6447 101.002 29.6815 108.061 35.9965 113.881C37.4887 115.25 39.445 116.007 41.4736 116Z"
                        fill="#2D2863"
                      />
                      <path
                        d="M11.7698 48.6902C13.9998 48.6902 15.7398 46.9602 15.7398 44.7402C15.7398 42.5202 13.9998 40.7803 11.7698 40.7803C9.53978 40.7803 7.7998 42.5202 7.7998 44.7402C7.7998 46.9602 9.63978 48.6902 11.7698 48.6902Z"
                        fill="#FFE27B"
                      />
                      <path
                        d="M7.80011 35.8601C9.25011 35.8601 10.5101 34.6001 10.5101 33.1501C10.5101 31.7101 9.25011 30.4502 7.80011 30.4502C6.34011 30.4502 5.08008 31.7101 5.08008 33.1501C5.08008 34.7001 6.34011 35.8601 7.80011 35.8601Z"
                        fill="#FFE27B"
                      />
                      <path
                        d="M149.91 58.6396C152.72 58.6396 154.95 56.4196 154.95 53.6196C154.95 50.8196 152.72 48.5996 149.91 48.5996C147.1 48.5996 144.87 50.8196 144.87 53.6196C144.87 56.4196 147.1 58.6396 149.91 58.6396Z"
                        fill="#FFE27B"
                      />
                      <g style={{ mixBlendMode: 'luminosity' }}>
                        <path
                          d="M107.27 115.55C98.1601 115.84 87.2201 115.549 79.4701 115.459C71.8101 115.739 60.7702 115.84 51.6602 115.55C60.6702 110.44 63.8701 100.879 64.2601 94.6094H94.4801C95.1601 100.779 98.3601 110.44 107.27 115.55Z"
                          fill="#D5DDEA"
                        />
                        <g filter="url(#filter0_d_3728_15337)">
                          <path
                            d="M136.53 14.6899V93.55C136.53 95.57 134.98 97.02 133.23 97.02H26.28C24.44 97.02 22.99 95.48 22.99 93.55V14.6899C22.99 12.8599 24.54 11.21 26.28 11.21H133.04C135.07 11.31 136.53 12.8599 136.53 14.6899Z"
                            fill="white"
                          />
                        </g>
                        <path
                          d="M137.03 14.1299V81.71H23.03V14.1299C23.03 12.2899 24.63 10.71 26.36 10.71H133.57C135.57 10.71 137.03 12.2899 137.03 14.1299Z"
                          fill="#989FB0"
                        />
                        <path d="M132.9 14.71H27.03V77.71H133.03V14.71H132.9Z" fill="#D3D3D3" />
                        <path
                          d="M79.5601 92.2896C81.1101 92.2896 82.37 91.1295 82.37 89.4895C82.37 87.9495 81.2101 86.6895 79.5601 86.6895C78.0101 86.6895 76.76 87.8495 76.76 89.4895C76.76 91.0395 77.9201 92.2896 79.5601 92.2896Z"
                          fill="#D6DDE8"
                        />
                        <path
                          d="M1 115.74H154.06"
                          stroke="#D6DDE8"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <g filter="url(#filter1_d_3728_15337)">
                          <path
                            d="M108.88 82.97H35.74C33.09 82.97 31.03 80.9199 31.03 78.3899V26.29C31.03 23.76 33.09 21.71 35.74 21.71H108.88C111.54 21.71 113.59 23.76 113.59 26.29V78.3899C113.47 80.9199 111.42 82.97 108.88 82.97Z"
                            fill="url(#paint0_linear_3728_15337)"
                          />
                        </g>
                        <path
                          d="M100.67 60.3H81.71C80.99 60.3 80.3799 59.7 80.3799 59.22C80.3799 58.61 80.99 58.1299 81.71 58.1299H100.67C101.4 58.1299 102 58.73 102 59.22C101.88 59.7 101.28 60.3 100.67 60.3Z"
                          fill="#D6DCE8"
                        />
                        <path
                          d="M76.3199 60.3H52.2299C51.4999 60.3 50.8999 59.7 50.8999 59.22C50.8999 58.61 51.4999 58.1299 52.2299 58.1299H76.3199C77.0399 58.1299 77.6499 58.73 77.6499 59.22C77.5199 59.7 76.9199 60.3 76.3199 60.3Z"
                          fill="#D6DCE8"
                        />
                        <path
                          d="M57.7399 66.4502H42.9999C42.2699 66.4502 41.6699 65.8501 41.6699 65.3701C41.6699 64.7601 42.2699 64.2803 42.9999 64.2803H57.7399C58.4699 64.2803 59.0699 64.8801 59.0699 65.3701C58.9499 65.9701 58.3499 66.4502 57.7399 66.4502Z"
                          fill="#D6DCE8"
                        />
                        <path
                          d="M71.4601 66.4502H63.13C62.4 66.4502 61.8 65.8501 61.8 65.3701C61.8 64.7601 62.4 64.2803 63.13 64.2803H71.4601C72.1901 64.2803 72.79 64.8801 72.79 65.3701C72.67 65.9701 72.0701 66.4502 71.4601 66.4502Z"
                          fill="#D6DCE8"
                        />
                        <path
                          d="M67.35 72.4805H60.5601C59.8401 72.4805 59.23 71.8804 59.23 71.4004C59.23 70.7904 59.8401 70.3105 60.5601 70.3105H67.35C68.08 70.3105 68.6801 70.9104 68.6801 71.4004C68.6801 72.0004 68.2 72.4805 67.35 72.4805Z"
                          fill="#D6DCE8"
                        />
                        <path
                          d="M45.9 78.75H38.65C37.92 78.75 37.3201 78.1499 37.3201 77.6699C37.3201 77.0699 37.92 76.5801 38.65 76.5801H45.9C46.62 76.5801 47.23 77.1899 47.23 77.6699C47.23 78.2699 46.74 78.75 45.9 78.75Z"
                          fill="#D6DCE8"
                        />
                        <path
                          d="M52.0602 78.75H50.4901C49.7701 78.75 49.1602 78.1499 49.1602 77.6699C49.1602 77.0699 49.7701 76.5801 50.4901 76.5801H52.0602C52.7902 76.5801 53.3901 77.1899 53.3901 77.6699C53.3901 78.2699 52.7902 78.75 52.0602 78.75Z"
                          fill="#D6DCE8"
                        />
                        <path
                          d="M41.7902 54.2698H38.2802C37.5602 54.2698 36.9502 53.6697 36.9502 53.1897C36.9502 52.5797 37.5602 52.0996 38.2802 52.0996H41.7902C42.5102 52.0996 43.1201 52.6997 43.1201 53.1897C43.1201 53.7897 42.5102 54.2698 41.7902 54.2698Z"
                          fill="#D6DCE8"
                        />
                        <path
                          d="M67.27 54.2698H48.38C47.66 54.2698 47.05 53.6697 47.05 53.1897C47.05 52.5797 47.66 52.0996 48.38 52.0996H67.27C68 52.0996 68.6 52.6997 68.6 53.1897C68.6 53.7897 68 54.2698 67.27 54.2698Z"
                          fill="#D6DCE8"
                        />
                        <path
                          d="M55.3302 47.8799H38.2802C37.5602 47.8799 36.9502 47.28 36.9502 46.79C36.9502 46.19 37.5602 45.71 38.2802 45.71H55.3302C56.0502 45.71 56.6602 46.31 56.6602 46.79C56.6602 47.4 56.1702 47.8799 55.3302 47.8799Z"
                          fill="#D6DCE8"
                        />
                        <path
                          opacity="0.3"
                          d="M134.41 74.75H93.4701C91.9701 74.75 90.8701 73.5499 90.8701 72.1599V28.72C90.8701 27.33 92.0701 26.1299 93.4701 26.1299H134.31C135.81 26.1299 136.91 27.33 136.91 28.72V72.1599C137.01 73.6499 135.81 74.75 134.41 74.75Z"
                          fill="#D6DDE8"
                        />
                        <g filter="url(#filter2_d_3728_15337)">
                          <path
                            d="M138.59 69.75H97.65C96.15 69.75 95.05 68.5499 95.05 67.1599V23.72C95.05 22.33 96.25 21.1299 97.65 21.1299H138.49C139.99 21.1299 141.09 22.33 141.09 23.72V67.1599C141.19 68.6499 139.99 69.75 138.59 69.75Z"
                            fill="url(#paint1_linear_3728_15337)"
                          />
                        </g>
                        <path
                          d="M132.4 34.4805H103.34C102.44 34.4805 101.64 33.6805 101.64 32.7905V29.5005C101.64 28.6005 102.44 27.8105 103.34 27.8105H132.4C133.3 27.8105 134.1 28.6005 134.1 29.5005V32.7905C134.2 33.7805 133.4 34.4805 132.4 34.4805Z"
                          fill="#E3E7EF"
                        />
                        <path
                          d="M120.12 45.8401H102.94C102.24 45.8401 101.64 45.2403 101.64 44.5403V40.4602C101.64 39.7602 102.24 39.1602 102.94 39.1602H120.02C120.72 39.1602 121.31 39.7602 121.31 40.4602V44.5403C121.41 45.2403 120.82 45.8401 120.12 45.8401Z"
                          fill="#E3E7EF"
                        />
                        <path
                          d="M133.2 45.8401H125.71C125.21 45.8401 124.81 45.4402 124.81 44.9402V40.0603C124.81 39.5603 125.21 39.1602 125.71 39.1602H133.2C133.7 39.1602 134.1 39.5603 134.1 40.0603V44.9402C134.2 45.3402 133.7 45.8401 133.2 45.8401Z"
                          fill="#E3E7EF"
                        />
                        <path
                          d="M101.64 53.4102H134.2"
                          stroke="#D6DDE8"
                          stroke-width="2"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M101.64 58.4902H134.2"
                          stroke="#D6DDE8"
                          stroke-width="2"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M101.64 63.5703H118.12"
                          stroke="#D6DDE8"
                          stroke-width="2"
                          stroke-miterlimit="10"
                        />
                      </g>
                      <path
                        d="M38.4001 30.27C39.5401 30.27 40.4602 29.35 40.4602 28.22C40.4602 27.09 39.5401 26.1699 38.4001 26.1699C37.2701 26.1699 36.3501 27.09 36.3501 28.22C36.3501 29.35 37.2701 30.27 38.4001 30.27Z"
                        fill="#FF7C60"
                      />
                      <path
                        d="M44.4502 30.27C45.5802 30.27 46.5001 29.35 46.5001 28.22C46.5001 27.09 45.5802 26.1699 44.4502 26.1699C43.3102 26.1699 42.3901 27.09 42.3901 28.22C42.3901 29.35 43.3102 30.27 44.4502 30.27Z"
                        fill="#FFE27B"
                      />
                      <path
                        d="M50.61 30.27C51.75 30.27 52.67 29.35 52.67 28.22C52.67 27.09 51.75 26.1699 50.61 26.1699C49.48 26.1699 48.5601 27.09 48.5601 28.22C48.5601 29.35 49.48 30.27 50.61 30.27Z"
                        fill="#67C080"
                      />
                      <path
                        d="M49.8901 41.6094H38.2802C37.5602 41.6094 36.9502 41.0095 36.9502 40.5195C36.9502 39.9195 37.5602 39.4395 38.2802 39.4395H49.8901C50.6101 39.4395 51.2201 40.0395 51.2201 40.5195C51.2201 41.1295 50.6101 41.6094 49.8901 41.6094Z"
                        fill="#9DA3B1"
                      />
                      <path
                        d="M47.1102 60.3H38.4003C37.6803 60.3 37.0703 59.7 37.0703 59.22C37.0703 58.61 37.6803 58.1299 38.4003 58.1299H47.1102C47.8302 58.1299 48.4403 58.73 48.4403 59.22C48.3203 59.7 47.7102 60.3 47.1102 60.3Z"
                        fill="#9DA3B1"
                      />
                      <path
                        d="M55.3302 72.4805H38.2802C37.5602 72.4805 36.9502 71.8804 36.9502 71.4004C36.9502 70.7904 37.5602 70.3105 38.2802 70.3105H55.3302C56.0502 70.3105 56.6602 70.9104 56.6602 71.4004C56.6602 72.0004 56.1702 72.4805 55.3302 72.4805Z"
                        fill="#9DA3B1"
                      />
                      <path
                        d="M77.61 47.8799H60.5601C59.8401 47.8799 59.23 47.28 59.23 46.79C59.23 46.19 59.8401 45.71 60.5601 45.71H77.61C78.33 45.71 78.9401 46.31 78.9401 46.79C78.9401 47.4 78.45 47.8799 77.61 47.8799Z"
                        fill="#9DA3B1"
                      />
                      <path
                        d="M89.7799 47.8799H82.9999C82.2699 47.8799 81.6699 47.28 81.6699 46.79C81.6699 46.19 82.2699 45.71 82.9999 45.71H89.7799C90.5099 45.71 91.1099 46.31 91.1099 46.79C91.1099 47.4 90.6299 47.8799 89.7799 47.8799Z"
                        fill="#9DA3B1"
                      />
                      <defs>
                        <filter
                          id="filter0_d_3728_15337"
                          x="0.98999"
                          y="0.209961"
                          width="157.54"
                          height="129.81"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="11" />
                          <feGaussianBlur stdDeviation="11" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_3728_15337"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_3728_15337"
                            result="shape"
                          />
                        </filter>
                        <filter
                          id="filter1_d_3728_15337"
                          x="9.03003"
                          y="10.71"
                          width="126.56"
                          height="105.26"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="11" />
                          <feGaussianBlur stdDeviation="11" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_3728_15337"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_3728_15337"
                            result="shape"
                          />
                        </filter>
                        <filter
                          id="filter2_d_3728_15337"
                          x="73.05"
                          y="10.1299"
                          width="90.0459"
                          height="92.6201"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="11" />
                          <feGaussianBlur stdDeviation="11" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_3728_15337"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_3728_15337"
                            result="shape"
                          />
                        </filter>
                        <linearGradient
                          id="paint0_linear_3728_15337"
                          x1="72.2801"
                          y1="20.29"
                          x2="72.2801"
                          y2="83.64"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#F3F6FB" />
                          <stop offset="0.9964" stop-color="#ECF0F5" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_3728_15337"
                          x1="118.06"
                          y1="20.0099"
                          x2="118.06"
                          y2="70.27"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#FDFEFF" />
                          <stop offset="0.9964" stop-color="#ECF0F5" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </Box>

                  <span>Фундаментальные и структурированные знания необходимых технологий</span>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={6}
                  xs={12}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: '250px',
                      height: '150px',
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'center',
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="134"
                      height="161"
                      viewBox="0 0 134 161"
                      fill="none"
                    >
                      <path
                        d="M25.4736 121H99.5247C101.56 121.005 103.522 120.243 105.017 118.868C111.255 113.116 116.246 106.154 119.682 98.409C123.118 90.6645 124.927 82.3017 124.997 73.835C125.317 39.4083 97.2183 11.0814 62.6508 11.0002C28.0637 10.9189 4.10685e-05 38.8193 4.10685e-05 73.248C-0.0098353 81.817 1.76173 90.2952 5.2032 98.1488C8.64466 106.002 13.6815 113.061 19.9965 118.881C21.4887 120.25 23.445 121.007 25.4736 121Z"
                        fill="#2D2863"
                      />
                      <path
                        d="M93.6341 19.2686C83.2421 39.7486 67.9891 47.8986 54.0091 52.7686C50.7641 53.9086 47.2331 54.9086 43.8931 54.0486C40.5531 53.1986 37.6421 49.8085 38.5491 46.4685C39.3601 43.3685 43.3681 41.8386 46.2791 43.0786C49.2371 44.3186 50.8591 47.7585 50.5731 50.9485C50.2871 54.1485 48.3311 56.9585 45.8491 58.9185C43.3211 60.8785 40.3141 62.0685 37.2611 62.9685C30.5331 64.9785 23.5191 65.9285 16.9821 68.4585C10.3981 70.9885 4.14714 75.5184 1.90414 82.1484C0.282145 86.8784 0.950141 92.2185 3.05014 96.6985C5.14914 101.188 8.72813 104.958 12.7361 107.958C18.8911 112.538 26.4771 115.398 34.1121 115.208C41.7461 115.018 49.4761 111.678 54.1991 105.668C58.9231 99.6585 60.3071 90.9285 56.9671 84.0085C54.6771 79.2385 49.4761 75.3285 44.2751 76.4785C40.1711 77.4285 37.1651 81.4385 36.7361 85.6785C36.3061 89.9285 38.1671 94.1286 40.9351 97.2786C43.7021 100.469 47.3761 102.708 51.1931 104.668C56.7761 107.478 63.3611 109.629 69.1341 107.249C74.6211 104.999 77.8181 99.3286 79.9171 93.8386C82.0171 88.3486 83.5911 82.3884 87.4091 77.8584C91.9891 72.4184 99.7191 69.8885 106.638 71.5085C113.556 73.1385 119.377 78.8585 121.095 85.7285C122.431 91.0685 120.809 97.7486 115.799 100.089C111.886 101.949 107.067 100.608 103.679 97.9385C100.292 95.2685 98.0011 91.4585 95.8061 87.7285"
                        stroke="#D6DCE8"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-dasharray="4 4"
                      />
                      <g filter="url(#filter0_d_4011_15726)">
                        <path
                          d="M55.1787 42.0985C63.5327 44.9285 72.5977 40.4485 75.4247 32.0985C78.2527 23.7385 73.7737 14.6785 65.4197 11.8485C57.0657 9.01848 48.0017 13.4982 45.1737 21.8582C42.3457 30.2082 46.8257 39.2685 55.1787 42.0985Z"
                          fill="url(#paint0_linear_4011_15726)"
                        />
                      </g>
                      <path
                        d="M59.7554 28.5789C60.6404 28.8789 61.6014 28.3989 61.9014 27.5189C62.2014 26.6289 61.7264 25.6687 60.8414 25.3687C59.9554 25.0687 58.9944 25.5488 58.6954 26.4288C58.3954 27.3188 58.8704 28.2789 59.7554 28.5789Z"
                        fill="#989FB0"
                      />
                      <path
                        d="M64.0749 17.4985C64.3359 17.3785 64.4339 17.0485 64.2939 16.7785C64.1549 16.4985 63.8299 16.3785 63.5699 16.4985C63.3089 16.6185 63.2109 16.9485 63.3509 17.2285C63.4909 17.4985 63.8149 17.6185 64.0749 17.4985Z"
                        fill="#989FB0"
                      />
                      <path
                        d="M57.3175 37.4281C57.5775 37.3081 57.6755 36.9882 57.5355 36.7082C57.3965 36.4282 57.0725 36.3081 56.8115 36.4381C56.5515 36.5581 56.4535 36.8781 56.5925 37.1581C56.7325 37.4381 57.0565 37.5581 57.3175 37.4281Z"
                        fill="#989FB0"
                      />
                      <path
                        d="M50.7198 24.1079C50.9798 23.9879 51.0778 23.6579 50.9388 23.3879C50.7988 23.1079 50.4748 22.9879 50.2138 23.1079C49.9538 23.2379 49.8558 23.5581 49.9948 23.8381C50.1348 24.1081 50.4588 24.2379 50.7198 24.1079Z"
                        fill="#989FB0"
                      />
                      <path
                        d="M70.6531 30.8686C70.9141 30.7486 71.012 30.4186 70.872 30.1486C70.733 29.8686 70.408 29.7486 70.148 29.8686C69.887 29.9986 69.7891 30.3188 69.9291 30.5988C70.0691 30.8688 70.3931 30.9886 70.6531 30.8686Z"
                        fill="#989FB0"
                      />
                      <path
                        d="M25.6919 57.3979L27.3429 56.8979C27.4629 56.8679 27.4629 56.6979 27.3429 56.6579L25.6919 56.1579C25.6499 56.1479 25.6189 56.118 25.6069 56.078L25.1099 54.4279C25.0749 54.3079 24.9009 54.3079 24.8669 54.4279L24.3689 56.078C24.3569 56.118 24.3259 56.1479 24.2839 56.1579L22.6369 56.6579C22.5169 56.6979 22.5169 56.8679 22.6369 56.8979L24.2879 57.3979C24.3299 57.4079 24.3609 57.4379 24.3729 57.4879L24.8699 59.1379C24.9049 59.2579 25.0789 59.2579 25.1129 59.1379L25.6109 57.4879C25.6189 57.4379 25.6499 57.4079 25.6919 57.3979Z"
                        fill="#D6DCE8"
                      />
                      <path
                        d="M37.8969 34.3783L39.5479 33.8883C39.6679 33.8483 39.6679 33.6783 39.5479 33.6383L37.8969 33.1483C37.8549 33.1283 37.824 33.0985 37.812 33.0585L37.3149 31.4084C37.2799 31.2884 37.1059 31.2884 37.0719 31.4084L36.5739 33.0585C36.5619 33.0985 36.531 33.1283 36.489 33.1483L34.842 33.6383C34.722 33.6783 34.722 33.8483 34.842 33.8883L36.493 34.3783C36.535 34.3983 36.5659 34.4284 36.5779 34.4684L37.075 36.1183C37.11 36.2383 37.2839 36.2383 37.3189 36.1183L37.816 34.4684C37.824 34.4284 37.8549 34.3983 37.8969 34.3783Z"
                        fill="#D6DCE8"
                      />
                      <path
                        d="M74.5359 109.278C74.5359 109.278 64.4219 118.648 63.7419 118.698C63.2929 118.878 59.3138 120.528 56.7788 121.588L56.1078 120.628C55.7728 120.158 55.4379 119.678 55.1309 119.038C55.2549 118.808 55.3118 118.478 55.3688 118.158C56.6658 114.108 60.6979 107.858 69.1949 108.168L74.5359 109.278Z"
                        fill="#F1F3F9"
                        stroke="#D6DCE8"
                        stroke-width="1.9781"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <g filter="url(#filter1_d_4011_15726)">
                        <path
                          d="M58.691 64.3179L61.978 69.0078C62.917 70.3378 63.559 71.4578 64.049 72.9678C65.881 77.8178 65.198 83.1478 62.676 87.4878C62.208 88.2478 61.97 89.1277 62.085 89.8977C62.105 90.7477 62.355 91.7078 62.892 92.4778C63.965 94.0078 65.765 94.7378 67.573 94.4678C73.38 93.3878 79.352 95.1979 83.443 99.5979C83.941 100.108 84.343 100.678 84.813 101.348L88.099 106.038C88.502 106.608 88.809 107.248 89.144 107.728L61.033 127.448C60.602 127.038 60.132 126.368 59.797 125.888L56.51 121.208C56.174 120.728 55.935 120.178 55.599 119.708C55.465 119.518 55.36 119.158 55.158 118.868C52.569 113.558 52.879 107.488 55.84 102.558C56.776 101.048 56.631 99.0078 55.558 97.4778C55.088 96.8078 54.36 96.1777 53.575 95.8677C53.508 95.7777 53.413 95.8479 53.413 95.8479C52.628 95.5379 51.786 95.5579 50.944 95.5779C47.04 96.3179 43.04 95.6979 39.431 93.8079C38.512 93.3079 37.593 92.8179 36.798 92.0879C36.568 91.9679 36.367 91.6778 36.233 91.4878C35.371 90.6678 34.442 89.7478 33.704 88.6978L30.417 84.0078C30.35 83.9178 30.216 83.7278 30.082 83.5278L58.384 63.6777C58.49 64.0277 58.557 64.1279 58.691 64.3179Z"
                          fill="url(#paint1_linear_4011_15726)"
                        />
                      </g>
                      <path
                        d="M56.5305 83.8087L45.3635 92.4986L39.5955 93.8387C38.6765 93.3387 37.7565 92.8485 36.9625 92.1185C36.7325 91.9985 36.5315 91.7086 36.3965 91.5186C39.4825 86.3586 42.3205 83.0786 50.5765 81.4286C51.9645 81.1686 53.2555 80.9786 54.8055 80.7386C68.6015 79.0586 56.5305 83.8087 56.5305 83.8087Z"
                        fill="#BAC3D1"
                      />
                      <path
                        d="M64.1162 73.0686C65.9492 77.9186 65.2652 83.2486 62.7432 87.5886C62.2752 88.3386 62.0372 89.2185 62.1532 89.9985L62.0573 90.0686C60.5273 91.1386 60.1272 93.4184 61.2012 94.9484L71.1953 109.188L68.4222 111.138L58.3612 96.7985C57.2872 95.2685 55.1052 94.7984 53.4802 95.9384C52.6952 95.6384 51.8532 95.6584 51.0112 95.6784C47.1082 96.4184 43.1072 95.7984 39.4982 93.9084C38.5792 93.4084 37.6602 92.9084 36.8652 92.1884C45.3792 90.4884 48.2452 85.6284 50.4512 81.6584C51.1682 80.4384 51.7882 79.2885 52.4762 78.2385C55.1992 74.1885 59.2172 72.7986 64.1162 73.0686Z"
                        fill="#D5DDEA"
                      />
                      <path
                        d="M84.7178 101.418L88.0048 106.108C88.4068 106.678 88.7138 107.318 89.0488 107.798L63.9968 125.368L59.3948 125.318L56.4428 121.108C56.1078 120.628 55.7728 120.158 55.5328 119.608C55.3988 119.418 55.2928 119.068 55.0918 118.778C55.1878 118.708 55.2548 118.808 55.3498 118.738C55.5128 118.768 55.6088 118.698 55.7038 118.638C65.0218 116.658 67.5138 111.058 69.8728 106.698C70.2448 106.008 70.7128 105.248 71.1528 104.658C74.0378 100.638 78.2188 99.2683 83.2808 99.5783C83.7498 100.238 84.2478 100.748 84.7178 101.418Z"
                        fill="#D5DDEA"
                      />
                      <path
                        d="M60.9895 64.1383L29.6265 86.1383C28.9575 86.6083 27.9815 86.4382 27.5785 85.8582L25.4325 82.7984C24.9625 82.1284 25.2015 81.2484 25.8705 80.7784L57.3285 58.7083C57.9985 58.2383 58.9075 58.3184 59.3765 58.9884L61.4565 61.9483C61.7345 62.7583 61.6585 63.6683 60.9895 64.1383Z"
                        fill="url(#paint2_linear_4011_15726)"
                      />
                      <path
                        d="M92.649 109.269L61.2861 131.269C60.6171 131.739 59.7081 131.659 59.2381 130.989L57.159 128.029C56.689 127.359 56.928 126.479 57.597 126.009L89.055 103.939C89.725 103.469 90.634 103.549 91.103 104.219L93.1831 107.179C93.4611 107.989 93.318 108.799 92.649 109.269Z"
                        fill="url(#paint3_linear_4011_15726)"
                      />
                      <path
                        d="M93.8337 60.4885C93.8337 60.4885 87.0037 57.9384 86.8197 57.6284C86.6307 57.4584 84.9077 55.9685 83.8027 55.0285L84.0947 54.4785C84.2417 54.2085 84.3877 53.9384 84.6177 53.6384C84.7557 53.6484 84.9227 53.5985 85.0897 53.5385C87.3097 53.1985 91.2207 53.6185 93.0877 57.7085L93.8337 60.4885Z"
                        fill="#F1F3F9"
                        stroke="#D6DCE8"
                        stroke-width="1.9781"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <g filter="url(#filter2_d_4011_15726)">
                        <path
                          d="M111.309 42.3281L109.876 44.998C109.467 45.758 109.091 46.328 108.493 46.918C106.637 48.938 103.957 49.878 101.31 49.718C100.842 49.678 100.369 49.7681 100.031 50.0081C99.6379 50.2181 99.2409 50.568 99.0069 50.998C98.5389 51.868 98.6189 52.898 99.1759 53.688C101.063 56.168 101.629 59.4179 100.519 62.3979C100.398 62.7579 100.222 63.078 100.018 63.458L98.5849 66.1279C98.4089 66.4479 98.1789 66.7481 98.0329 67.0181L82.0449 58.428C82.1369 58.128 82.3419 57.738 82.4879 57.468L83.9209 54.8081C84.0669 54.5381 84.2679 54.2881 84.4139 54.0181C84.4719 53.9081 84.6139 53.7779 84.7019 53.6179C86.5989 51.1279 89.5379 49.8381 92.5699 50.0681C93.5069 50.1481 94.4349 49.598 94.9029 48.728C95.1079 48.348 95.2329 47.848 95.1909 47.408C95.2199 47.348 95.1659 47.3181 95.1659 47.3181C95.1239 46.8781 94.9139 46.4881 94.7049 46.0981C93.4289 44.4281 92.7709 42.388 92.8069 40.238C92.8239 39.688 92.8399 39.1281 92.9939 38.5881C92.9979 38.4481 93.0859 38.278 93.1449 38.178C93.3279 37.568 93.5409 36.9181 93.8629 36.3181L95.2959 33.6479C95.3249 33.5979 95.3829 33.4879 95.4419 33.3779L111.539 42.0381C111.396 42.1681 111.367 42.2281 111.309 42.3281Z"
                          fill="url(#paint4_linear_4011_15726)"
                        />
                      </g>
                      <path
                        d="M101.586 45.9377L94.8311 42.7278L92.8301 40.3179C92.8471 39.7679 92.8631 39.2177 93.0181 38.6677C93.0221 38.5277 93.1101 38.3678 93.1681 38.2578C96.3381 38.4878 98.5591 39.0579 101.3 42.5579C101.752 43.1579 102.15 43.7177 102.627 44.3977C106.699 50.5077 101.586 45.9377 101.586 45.9377Z"
                        fill="#BAC3D1"
                      />
                      <path
                        d="M108.463 46.9688C106.608 48.9887 103.928 49.9288 101.281 49.7688C100.812 49.7288 100.34 49.8288 100.001 50.0688L99.9469 50.0388C99.0769 49.5688 97.9059 49.9188 97.4379 50.7888L93.0809 58.8887L91.5039 58.0388L95.8899 49.8887C96.3579 49.0187 96.0609 47.8787 95.1359 47.3787C95.0939 46.9387 94.8849 46.5387 94.6759 46.1487C93.3989 44.4787 92.7409 42.4488 92.7779 40.2888C92.7939 39.7388 92.8109 39.1887 92.9649 38.6387C95.7859 42.2587 98.7629 42.4588 101.164 42.5588C101.908 42.6088 102.598 42.6287 103.259 42.6987C105.818 43.0287 107.429 44.5988 108.463 46.9688Z"
                        fill="#D5DDEA"
                      />
                      <path
                        d="M99.9611 63.4285L98.5281 66.0986C98.3531 66.4286 98.1231 66.7185 97.9771 66.9885L83.7291 59.3286L82.6621 57.1484L83.9481 54.7485C84.0941 54.4785 84.2411 54.2085 84.4411 53.9685C84.5001 53.8585 84.6421 53.7186 84.7301 53.5586C84.7841 53.5886 84.7551 53.6485 84.8091 53.6685C84.8341 53.7585 84.8891 53.7886 84.9431 53.8186C88.0861 57.7486 91.3221 57.5985 93.9441 57.6785C94.3581 57.6885 94.8271 57.7286 95.2121 57.7986C97.7961 58.1986 99.4321 59.8586 100.492 62.3186C100.287 62.6986 100.166 63.0485 99.9611 63.4285Z"
                        fill="#D5DDEA"
                      />
                      <path
                        d="M111.939 43.3786L94.1029 33.7788C93.7219 33.5788 93.5709 33.0788 93.7469 32.7488L94.6819 31.0088C94.8869 30.6288 95.3589 30.5287 95.7399 30.7387L113.631 40.3586C114.012 40.5586 114.192 41.0086 113.987 41.3886L113.081 43.0788C112.767 43.3988 112.32 43.5786 111.939 43.3786Z"
                        fill="url(#paint5_linear_4011_15726)"
                      />
                      <path
                        d="M98.1375 69.038L80.3005 59.4479C79.9205 59.2479 79.7405 58.7979 79.9445 58.4179L80.8515 56.728C81.0555 56.348 81.5285 56.2579 81.9095 56.4579L99.8005 66.0781C100.18 66.2881 100.361 66.7278 100.156 67.1078L99.2495 68.798C98.9365 69.118 98.5185 69.248 98.1375 69.038Z"
                        fill="url(#paint6_linear_4011_15726)"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M60.6811 25.8482C60.0571 25.6382 59.3801 25.9682 59.1691 26.5882C58.9581 27.2182 59.2921 27.8879 59.9161 28.1079C60.5401 28.3179 61.2171 27.9779 61.4281 27.3579C61.6391 26.7279 61.3051 26.0582 60.6811 25.8482ZM58.2221 26.2681C58.6101 25.1281 59.8551 24.508 61.0021 24.898C62.1491 25.288 62.7641 26.528 62.3751 27.678C61.9871 28.828 60.7431 29.4381 59.5961 29.0481C58.4491 28.6581 57.8331 27.4181 58.2221 26.2681Z"
                        fill="#9DA3B1"
                      />
                      <path
                        d="M62.5 20.2285L61 25.2285"
                        stroke="#989FB0"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M62.082 26.9785L65.499 27.2285"
                        stroke="#989FB0"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M63.8021 16.9584C63.7821 16.9684 63.7751 16.9985 63.7851 17.0185C63.7961 17.0385 63.8201 17.0485 63.8401 17.0385C63.8601 17.0285 63.8671 16.9985 63.8571 16.9785C63.8461 16.9585 63.8221 16.9484 63.8021 16.9584ZM62.9131 17.4284C62.6451 16.8984 62.833 16.2785 63.334 16.0385C63.836 15.7985 64.4601 16.0386 64.7291 16.5686C64.9971 17.0986 64.8091 17.7184 64.3071 17.9584C63.8061 18.1984 63.1821 17.9584 62.9131 17.4284Z"
                        fill="#9DA3B1"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M57.0442 36.8981C57.0242 36.9081 57.0172 36.9282 57.0282 36.9482C57.0382 36.9682 57.0632 36.9782 57.0822 36.9682C57.1022 36.9582 57.1092 36.9382 57.0992 36.9182C57.0882 36.8982 57.0642 36.8881 57.0442 36.8981ZM56.1552 37.3681C55.8872 36.8381 56.0752 36.2082 56.5772 35.9682C57.0782 35.7282 57.7022 35.9682 57.9712 36.4982C58.2402 37.0282 58.0512 37.6581 57.5502 37.8981C57.0482 38.1381 56.4242 37.8981 56.1552 37.3681Z"
                        fill="#9DA3B1"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M50.4485 23.5781C50.4285 23.5781 50.4215 23.6079 50.4315 23.6279C50.4425 23.6479 50.4665 23.6579 50.4865 23.6479C50.5065 23.6379 50.5135 23.6181 50.5035 23.5981C50.4925 23.5781 50.4685 23.5681 50.4485 23.5781ZM49.5595 24.048C49.2915 23.508 49.4795 22.8879 49.9815 22.6479C50.4825 22.4079 51.1065 22.6479 51.3755 23.1779C51.6435 23.7079 51.4555 24.3381 50.9535 24.5681C50.4525 24.8081 49.8285 24.578 49.5595 24.048Z"
                        fill="#9DA3B1"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M70.3816 30.3278C70.3626 30.3378 70.3546 30.3676 70.3656 30.3876C70.3756 30.4076 70.4006 30.4177 70.4206 30.4077C70.4396 30.3977 70.4476 30.3678 70.4366 30.3478C70.4266 30.3278 70.4016 30.3178 70.3816 30.3278ZM69.4936 30.7978C69.2246 30.2678 69.4136 29.6477 69.9146 29.4077C70.4156 29.1677 71.0406 29.4077 71.3086 29.9377C71.5776 30.4677 71.3886 31.0878 70.8876 31.3278C70.3866 31.5678 69.7616 31.3278 69.4936 30.7978Z"
                        fill="#9DA3B1"
                      />
                      <path
                        d="M94.8959 82.7385L96.96 80.9085C97.111 80.7785 96.9939 80.5286 96.7969 80.5586L94.0649 80.9385C93.9959 80.9585 93.9299 80.9284 93.8849 80.8784L92.0559 78.8186C91.9259 78.6686 91.6729 78.7885 91.7029 78.9785L92.0859 81.7085C92.0979 81.7785 92.074 81.8385 92.02 81.8885L89.9609 83.7185C89.8109 83.8485 89.9269 84.0986 90.1239 84.0686L92.856 83.6885C92.926 83.6685 92.991 83.6986 93.037 83.7486L94.8679 85.8186C94.9979 85.9686 95.2509 85.8485 95.2209 85.6485L94.835 82.9185C94.818 82.8485 94.8419 82.7885 94.8959 82.7385Z"
                        fill="#FFE27B"
                      />
                      <path
                        d="M12.3006 46.8283L14.9426 46.0282C15.1336 45.9782 15.1336 45.6981 14.9426 45.6381L12.3006 44.8483C12.2326 44.8283 12.1826 44.7782 12.1646 44.7082L11.3676 42.0683C11.3126 41.8783 11.0346 41.8783 10.9796 42.0683L10.1826 44.7082C10.1646 44.7782 10.1146 44.8283 10.0466 44.8483L7.41158 45.6381C7.21958 45.6981 7.21958 45.9782 7.41158 46.0282L10.0536 46.8283C10.1206 46.8483 10.1706 46.8982 10.1886 46.9582L10.9856 49.6081C11.0406 49.7981 11.3186 49.7981 11.3746 49.6081L12.1706 46.9582C12.1826 46.8982 12.2326 46.8483 12.3006 46.8283Z"
                        fill="#FFE27B"
                      />
                      <path
                        d="M96.5566 15.8982L99.2586 16.4582C99.4526 16.5082 99.5856 16.2581 99.4436 16.1181L97.5016 14.1582C97.4506 14.1082 97.4306 14.0483 97.4466 13.9783L98.0046 11.2783C98.0466 11.0883 97.8026 10.9484 97.6626 11.0984L95.7056 13.0283C95.6566 13.0783 95.5896 13.0984 95.5216 13.0884L92.8246 12.5283C92.6296 12.4883 92.4976 12.7281 92.6396 12.8681L94.5816 14.8284C94.6326 14.8784 94.6526 14.9483 94.6356 15.0183L94.0756 17.7182C94.0336 17.9082 94.2776 18.0382 94.4176 17.8982L96.3776 15.9582C96.4206 15.9082 96.4876 15.8882 96.5566 15.8982Z"
                        fill="#FFE27B"
                      />
                      <path
                        d="M73.8728 64.0582L76.1838 63.358C76.3518 63.308 76.3518 63.0681 76.1838 63.0181L73.8728 62.3182C73.8128 62.3082 73.7697 62.2581 73.7537 62.1981L73.0568 59.898C73.0078 59.728 72.7648 59.728 72.7168 59.898L72.0198 62.1981C72.0038 62.2581 71.9607 62.3082 71.9007 62.3182L69.5948 63.0181C69.4268 63.0681 69.4268 63.308 69.5948 63.358L71.9068 64.0582C71.9658 64.0682 72.0087 64.118 72.0247 64.168L72.7218 66.4881C72.7708 66.6481 73.0138 66.6481 73.0618 66.4881L73.7588 64.168C73.7698 64.118 73.8128 64.0682 73.8728 64.0582Z"
                        fill="#FFE27B"
                      />
                      <path
                        d="M29.5126 96.4882L31.8246 95.6982C31.9916 95.6382 31.9916 95.3583 31.8246 95.3083L29.5126 94.5082C29.4526 94.4882 29.4096 94.4381 29.3936 94.3681L28.6966 91.7382C28.6486 91.5482 28.4056 91.5482 28.3566 91.7382L27.6596 94.3681C27.6436 94.4381 27.6006 94.4882 27.5406 94.5082L25.2346 95.3083C25.0676 95.3583 25.0676 95.6382 25.2346 95.6982L27.5466 96.4882C27.6056 96.5082 27.6486 96.5581 27.6656 96.6281L28.3616 99.2682C28.4106 99.4582 28.6536 99.4582 28.7026 99.2682L29.3986 96.6281C29.4096 96.5581 29.4526 96.5082 29.5126 96.4882Z"
                        fill="#FFE27B"
                      />
                      <path
                        d="M120.831 58.4877L122.482 57.9877C122.602 57.9577 122.602 57.7877 122.482 57.7477L120.831 57.2477C120.788 57.2377 120.758 57.2076 120.746 57.1676L120.248 55.5177C120.214 55.3977 120.04 55.3977 120.005 55.5177L119.508 57.1676C119.496 57.2076 119.465 57.2377 119.423 57.2477L117.775 57.7477C117.656 57.7877 117.656 57.9577 117.775 57.9877L119.426 58.4877C119.469 58.4977 119.5 58.5278 119.511 58.5778L120.009 60.2277C120.044 60.3477 120.217 60.3477 120.252 60.2277L120.75 58.5778C120.758 58.5278 120.788 58.4977 120.831 58.4877Z"
                        fill="#FFE27B"
                      />
                      <path
                        d="M13.3074 89.8278L14.9583 89.3378C15.0783 89.2978 15.0783 89.1278 14.9583 89.0878L13.3074 88.5978C13.2644 88.5778 13.2344 88.5477 13.2224 88.5077L12.7244 86.8576C12.6904 86.7376 12.5164 86.7376 12.4814 86.8576L11.9843 88.5077C11.9723 88.5477 11.9414 88.5778 11.8994 88.5978L10.2514 89.0878C10.1324 89.1278 10.1324 89.2978 10.2514 89.3378L11.9034 89.8278C11.9454 89.8378 11.9764 89.8776 11.9874 89.9176L12.4854 91.5678C12.5204 91.6878 12.6933 91.6878 12.7283 91.5678L13.2264 89.9176C13.2344 89.8776 13.2644 89.8378 13.3074 89.8278Z"
                        fill="#FFE27B"
                      />
                      <defs>
                        <filter
                          id="filter0_d_4011_15726"
                          x="22.3262"
                          y="0"
                          width="75.946"
                          height="75.9473"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="11" />
                          <feGaussianBlur stdDeviation="11" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_4011_15726"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_4011_15726"
                            result="shape"
                          />
                        </filter>
                        <filter
                          id="filter1_d_4011_15726"
                          x="8.08203"
                          y="52.6777"
                          width="103.062"
                          height="107.77"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="11" />
                          <feGaussianBlur stdDeviation="11" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_4011_15726"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_4011_15726"
                            result="shape"
                          />
                        </filter>
                        <filter
                          id="filter2_d_4011_15726"
                          x="60.0449"
                          y="22.3779"
                          width="73.4939"
                          height="77.6396"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="11" />
                          <feGaussianBlur stdDeviation="11" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_4011_15726"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_4011_15726"
                            result="shape"
                          />
                        </filter>
                        <linearGradient
                          id="paint0_linear_4011_15726"
                          x1="65.6467"
                          y1="11.1485"
                          x2="55.0587"
                          y2="42.4185"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#FDFEFF" />
                          <stop offset="0.9964" stop-color="#ECF0F5" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_4011_15726"
                          x1="43.51"
                          y1="72.5977"
                          x2="75.412"
                          y2="118.068"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#FDFEFF" />
                          <stop offset="0.9964" stop-color="#ECF0F5" />
                        </linearGradient>
                        <linearGradient
                          id="paint2_linear_4011_15726"
                          x1="26.4905"
                          y1="84.3383"
                          x2="60.4564"
                          y2="60.5182"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#B0BACC" />
                          <stop offset="1" stop-color="#969EAE" />
                        </linearGradient>
                        <linearGradient
                          id="paint3_linear_4011_15726"
                          x1="58.183"
                          y1="129.519"
                          x2="92.1501"
                          y2="105.699"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#B0BACC" />
                          <stop offset="1" stop-color="#969EAE" />
                        </linearGradient>
                        <linearGradient
                          id="paint4_linear_4011_15726"
                          x1="103.796"
                          y1="37.1279"
                          x2="89.8888"
                          y2="62.988"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#FDFEFF" />
                          <stop offset="0.9964" stop-color="#ECF0F5" />
                        </linearGradient>
                        <linearGradient
                          id="paint5_linear_4011_15726"
                          x1="94.2049"
                          y1="31.8787"
                          x2="113.523"
                          y2="42.2588"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#B0BACC" />
                          <stop offset="1" stop-color="#969EAE" />
                        </linearGradient>
                        <linearGradient
                          id="paint6_linear_4011_15726"
                          x1="80.3885"
                          y1="57.5679"
                          x2="99.7065"
                          y2="67.9579"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#B0BACC" />
                          <stop offset="1" stop-color="#969EAE" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </Box>

                  <span>Опыт работы с дедлайнами и планирование работы</span>
                </Grid>
              </Grid>
              <div className={styles.slogan2__btn}>
                <Link to={'/courses'}>
                  <Button variant="containedWhite">Начать обучение</Button>
                </Link>
              </div>
            </section>

            <FaqSection />

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
