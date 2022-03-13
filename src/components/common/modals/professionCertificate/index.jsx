import { Modal } from '@mui/material';
import React from 'react';
import styles from './styles.module.less';
import Close from '@assets/Close.js';
import Statement from '@assets/homepage/statement.png';
import CodingModal from '@assets/CodingModal.svg';
import CertificatesModal from '@assets/CertificatesModal.svg';
import TestingModal from '@assets/TestingModal.svg';
import TimeModal from '@assets/TimeModal.svg';
import { DoneGreen } from '@assets/DoneGreen';

export const ProfessionCertificateModal = ({ isOpen, modalHandler }) => {
  return (
    <Modal open={isOpen} className={styles.scroll}>
      <div className={styles.wrapper}>
        <div className={styles.exit} onClick={() => modalHandler()}>
          <Close />
        </div>
        <div className={styles.pretitle}>Станьте сертифицированным специалистом</div>
        <div className={styles.maintitle}>Освойте профессию и получите сертификат</div>
        <div className={styles.block}>
          <div className={styles.cetificate}>
            <img src={Statement} alt="Сертификат" />
          </div>
          <div className={styles.when}>
            <div className={styles.title}>Когда вы получаете сертификат</div>
            <div className={styles.subtitle}>
              Освойте новую профессию, выполняя быстрые ежедневные задания на компьютере или в
              мобильном приложении DeepSkills. Отточите свои навыки, выполняя быстрые ежедневные
              задания на компьютере или в мобильном приложении DeepSkills.
            </div>
            <div className={styles.when__list}>
              <div className={styles.when__item}>
                <div className={styles.when__item__number}>
                  <DoneGreen />
                </div>
                <div className={styles.when__item__text}>
                  Освойте новую профессию, выполняя быстрые ежедневные задания на компьютере или в
                  мобильном приложении DeepSkills.
                </div>
              </div>
              <div className={styles.when__item}>
                <div className={styles.when__item__number}>
                  <DoneGreen />
                </div>
                <div className={styles.when__item__text}>
                  Освойте новую профессию, выполняя быстрые ежедневные задания.
                </div>
              </div>
              <div className={styles.when__item}>
                <div className={styles.when__item__number}>
                  <DoneGreen />
                </div>
                <div className={styles.when__item__text}>
                  Освойте новую профессию, выполняя быстрые ежедневные задания на компьютере или в
                  мобильном приложении DeepSkills. Отточите свои навыки, выполняя быстрые ежедневные
                  задания
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles.how}>
            <div className={styles.title}>Как вы получаете сертификат</div>
            <div className={styles.subtitle}>
              Докажите, что ваши навыки готовы к работе с нашей профессиональной сертификацией в
              области науки о данных.
            </div>
            <div className={styles.how__list}>
              <div className={styles.how__item}>
                <img src={TimeModal} alt={''} />
                <div className={styles.how__item__text}>Оценка времени</div>
                <div className={styles.how__item__number}>1</div>
              </div>
              <div className={styles.how__item}>
                <img src={CodingModal} alt={''} />
                <div className={styles.how__item__text}>Кодирование</div>
                <div className={styles.how__item__number}>2</div>
              </div>
              <div className={styles.how__item}>
                <img src={TestingModal} alt={''} />
                <div className={styles.how__item__text}>Тестирование</div>
                <div className={styles.how__item__number}>3</div>
              </div>
              <div className={styles.how__item}>
                <img src={CertificatesModal} alt={''} />
                <div className={styles.how__item__text}>Сертификат</div>
                <div className={styles.how__item__number}>4</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
