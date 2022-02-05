import { Fragment } from 'react';
import styles from './styles.module.less';

export const ModalHead = () => {
  return (
    <Fragment>
      <div className={styles.box}>
        Выберите свой <br />
        тарифный план
      </div>
      <p className={styles.text}>
        We've done it carefully and simply. Combined with the ingredients <br /> makes for beautiful
        landings.
      </p>
    </Fragment>
  );
};
