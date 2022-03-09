import { Dialog } from '@mui/material';
import Close from '@assets/Close.js';
import { Tariffs } from './Tariffs';

import styles from './styles.module.less';

export const ModalTariffSelection = ({ handleClick, open }) => {
  return (
    <Dialog
      PaperProps={{
        style: {
          borderRadius: '34px',
        },
      }}
      maxWidth="lg"
      fullWidth
      open={open}
      onClose={handleClick}
    >
      <div className={styles.wrapper}>
        <div className={styles.closeButton} onClick={handleClick}>
          <Close />
        </div>
        <div className={styles.dialogTitle}>
          <div className={styles.header}>
            <span className={styles.headerTitle}>Выберите свой тарифный план</span>
          </div>
          <span className={styles.headerText}>
            Благодаря DeepSkills Вы сможете изучать навыки работы с данными, необходимые для
            продвижения по карьерной лестнице.
          </span>
        </div>
        <Tariffs />
      </div>
    </Dialog>
  );
};
