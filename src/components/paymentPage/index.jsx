import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import SmallLogo from './assets/smallLogo.svg';
import CompanyName from './assets/companyName.svg';
import Visa from './assets/visa.svg';
import Mastercard from './assets/mastercard.svg';
import Mir from './assets/mir.svg';

import { PaymentData } from './paymentData';
import { PurchaseInformation } from './purchaseInformation';
import { PaymentStep } from './paymentStep';
import { PaymentErrorModal } from './paymentErrorModal';
import { PaymentAgreement } from './paymentAgreement';
import { RepeatedPayment } from './repeatedPayment';

import styles from './styles.module.less';
import { SuccessPayment } from './successPayment';
import { PurchaseInformationMobile } from './purchaseInformationMobile';

export const PaymentPage = () => {
  const [nextStep, setNextStep] = useState(false);
  const [cardsInMemory, setCardsInMemory] = useState(false);
  const [successPayment, setSuccessPayment] = useState(false);
  const [width, setWidth] = useState(0);

  const location = useLocation();
  const title = location.state.title;
  const price = location.state.price;

  const stepHandle = () => setNextStep(!nextStep);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {(successPayment && <SuccessPayment />) || (
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
            <span className={styles.mainText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </span>
            <div className={styles.paymentContainer}>
              {(cardsInMemory && (
                <div className={styles.paymentContainerMain}>
                  <div className={styles.paymentContainerWay}>
                    <RepeatedPayment onAddCard={() => setCardsInMemory(!cardsInMemory)} />
                  </div>
                </div>
              )) || (
                <div className={styles.paymentContainerMain}>
                  {(nextStep && (
                    <>
                      <PaymentStep stepNumber={1} text="Способ оплаты" marginBottom="21px" />
                      <div className={styles.paymentContainerWay}>
                        <div className={styles.paymentContainerWayHeader}>
                          <div className={styles.wayContainer}>
                            <div className={styles.wayContainerPoint}>2</div>
                            <div className={styles.wayContainerText}>Проверка и подтверждение</div>
                          </div>
                        </div>
                        <PaymentAgreement />
                      </div>
                    </>
                  )) || (
                    <>
                      <div className={styles.paymentContainerWay}>
                        <div className={styles.paymentContainerWayHeader}>
                          <div className={styles.wayContainer}>
                            <div className={styles.wayContainerPoint}>1</div>
                            <div className={styles.wayContainerText}>Способ оплаты</div>
                          </div>
                          <div className={styles.paymentMethodsContainer}>
                            <img src={Mir} alt="mir" />
                            <img src={Visa} alt="visa" />
                            <img src={Mastercard} alt="mastercard" />
                          </div>
                        </div>
                        <PaymentData onStep={stepHandle} />
                      </div>
                      <PaymentStep stepNumber={2} text="Проверка и подтверждение" />
                    </>
                  )}
                </div>
              )}
              {width >= 1184 && <PurchaseInformation title={title} price={price} />}
            </div>
          </div>
        </div>
      )}
      {width < 1184 && <PurchaseInformationMobile title={title} price={price} />}
      <PaymentErrorModal />
    </>
  );
};
