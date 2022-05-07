import { FC, useState } from 'react';

import Footer from '@components/Layout/footers/Footer';
import HeaderHome from '@components/Layout/headers/HomeHeader';

import { useDispatch } from 'react-redux';

import { openFeedbackModal } from '@store/global/modals';

import styles from './styles.module.less';
import { Requisites } from './Requisites';
import Helmet from 'react-helmet';

export const AboutPage: FC = ({}) => {
  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch();

  const requisitesRender = (name: string, value: string) => {
    return (
      <div className={styles.wrapper__requisites}>
        <span>{name}</span>
        <span>{value}</span>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Helmet title="О Нас">
        <meta name="description" content="Информация и контакты." />
      </Helmet>
      <HeaderHome handleBurger={() => setShowMenu(!showMenu)} />
      <div className={styles.wrapper}>
        <h1 className={styles.wrapper__title}>Контакты</h1>
        <span className={styles.wrapper__sub_title}>Связаться с нами</span>
        <span className={styles.wrapper__feedback} onClick={() => dispatch(openFeedbackModal())}>
          Обратная связь
        </span>
        <span className={styles.wrapper__sub_title}>Электронная почта</span>
        <a className={styles.wrapper__email} href="mailto:support@solanoskills.ru">
          support@solanoskills.ru
        </a>
        <span className={styles.wrapper__sub_title}>Реквизиты</span>
        <Requisites />
        <span className={`${styles.wrapper__sub_title} ${styles.wrapper__sub_title_last}`}>
          Условия возврата денежных средств
        </span>
        <span className={styles.wrapper__terms}>
          Система подписки не предусматривает возврат денежных средств. Вы можете отказаться от
          подписки в любой момент, услуга будет предоставляться до истечения срока действия
          подписки.
        </span>
      </div>
      <Footer />
    </div>
  );
};
