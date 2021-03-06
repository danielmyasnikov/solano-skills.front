import { Modal } from '@mui/material';
import styles from './styles.module.less';
import Close from '@assets/Close';
import Statement from '@assets/homepage/statement.png';
import { DoneGreen } from '@assets/DoneGreen';
import { howItems, whenItems, images } from './data';

/*
 * TODO: refactoring. Not working with useModal: does not have an onClose prop
 */
export const ProfessionCertificateModal = ({ isOpen, modalHandler }) => {
  const renderImage = (src) => images[src];

  const renderHowItems = () => {
    return howItems.map(({ text, number, src }, i) => (
      <div key={i} className={styles.how__item}>
        <img src={renderImage(src)} alt="Иконка" />
        <div className={styles.how__item__text}>{text}</div>
        <div className={styles.how__item__number}>{number}</div>
      </div>
    ));
  };

  const renderWhenItems = () => {
    return whenItems.map((text, i) => (
      <div key={i} className={styles.when__item}>
        <div className={styles.when__item__number}>
          <DoneGreen />
        </div>
        <div className={styles.when__item__text}>{text}</div>
      </div>
    ));
  };

  return (
    <Modal open={isOpen} className={styles.scroll}>
      <div className={styles.wrapper}>
        <div className={styles.exit} onClick={() => modalHandler()}>
          <Close />
        </div>
        <div className={styles.pretitle}>Станьте сертифицированным специалистом</div>
        <div className={styles.maintitle}>Освойте профессию и получите сертификат</div>
        <div className={styles.block}>
          <div className={styles.certificate}>
            <img src={Statement} alt="Сертификат" />
          </div>
          <div className={styles.when}>
            <div className={styles.title}>Когда вы получаете сертификат</div>
            <div className={styles.subtitle}>
              Освойте новую профессию, выполняя быстрые ежедневные задания на компьютере или в
              мобильном приложении solanoskills. Отточите свои навыки, выполняя быстрые ежедневные
              задания на компьютере или в мобильном приложении solanoskills.
            </div>
            <div className={styles.when__list}>{renderWhenItems()}</div>
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles.how}>
            <div className={styles.title}>Как вы получаете сертификат</div>
            <div className={styles.subtitle}>
              Докажите, что ваши навыки готовы к работе с нашей профессиональной сертификацией в
              области науки о данных.
            </div>
            <div className={styles.how__list}>{renderHowItems()}</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
