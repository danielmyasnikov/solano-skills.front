import { Dialog } from '@mui/material';
import Close from '@assets/Close';

import styles from './styles.module.less';
import { Tariffs } from './Tariffs';
import { useGetTariffsQuery } from '@src/features/payment/store/tariffs.api';

const TariffsModal = ({ onClose }) => {
  const { data: tariffs, isLoading } = useGetTariffsQuery();

  if (isLoading) {
    return null;
  }

  return (
    <Dialog
      PaperProps={{
        style: {
          borderRadius: '34px',
        },
      }}
      maxWidth="lg"
      fullWidth
      open={true}
      onClose={onClose}
    >
      <div className={styles.wrapper}>
        <div className={styles.closeButton} onClick={onClose}>
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
        <Tariffs tariffList={tariffs} isTariffs />
      </div>
    </Dialog>
  );
};
export default TariffsModal;
