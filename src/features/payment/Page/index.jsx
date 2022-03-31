import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import SmallLogo from '../assets/smallLogo.svg';
import CompanyName from '../assets/companyName.svg';

import { PaymentAgreement } from '../PaymentAgreement';

import styles from './styles.module.less';
import { PurchaseInformation } from './PurchaseInformation';
import { PurchaseInformationMobile } from './PurchaseInformation/Mobile';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '@store/profile/selector';

export const PaymentPage = () => {
  const [width, setWidth] = useState(0);
  const isAuth = useSelector(selectIsAuth);
  const location = useLocation();

  const id = location.state?.id;
  const title = location.state?.title;
  const price = location.state?.price;
  const oldPrice = location.state?.oldPrice;
  const totalPrice = location.state?.totalPrice;
  const description = location.state?.description;
  const confirmationText = location.state?.confirmationText;
  const cycle = location.state?.cycle;

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isAuth) {
    return <Redirect to="/sign-up" />;
  }

  if (!id) {
    return <Redirect to="/404" />;
  }

  return (
    <>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className={styles.headerImgContainer}>
            <img src={SmallLogo} alt="logo" />
            <img src={CompanyName} alt="company_name" />
          </div>
          <div className={styles.headerReportContainer}>
            <div className={styles.headerReportContainerAttention}>!</div>
            <span className={styles.headerReportContainerText}>Сообщить о проблеме</span>
          </div>
        </header>
        <div className={styles.main}>
          <span className={styles.mainTitle}>{title} план</span>
          <span className={styles.mainText}>{description}</span>
          <div className={styles.paymentContainer}>
            <div className={styles.paymentContainerMain}>
              <div className={styles.paymentContainerWay}>
                <div className={styles.paymentContainerWayHeader}>
                  <div className={styles.wayContainer}>
                    <div className={styles.wayContainerText}>Проверка и подтверждение</div>
                  </div>
                </div>
                <PaymentAgreement confirmationText={confirmationText} cycle={cycle} id={id} />
              </div>
            </div>
            {width >= 1184 && (
              <PurchaseInformation
                totalPrice={totalPrice}
                oldPrice={oldPrice}
                title={title}
                price={price}
              />
            )}
          </div>
        </div>
      </div>
      {width < 1184 && (
        <PurchaseInformationMobile
          totalPrice={totalPrice}
          oldPrice={oldPrice}
          title={title}
          price={price}
        />
      )}
    </>
  );
};
