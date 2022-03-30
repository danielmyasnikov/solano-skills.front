import { useDispatch, useSelector } from 'react-redux';
import { tariffs } from '@store/tariffs/selector';
import * as TariffsStore from '@store/tariffs';

import { Dialog } from '@mui/material';
import Close from '@assets/Close';

import styles from './styles.module.less';
import { Tariffs } from '../../../../common/tariff';
import { useEffect } from 'react';

export const ModalTariffSelection = ({ handleClick, open }) => {
  const dispatch = useDispatch();

  const tariffVariants = useSelector(tariffs);

  useEffect(() => {
    dispatch(TariffsStore.Actions.getTariffs());
  }, []);

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
        <Tariffs tariffList={tariffVariants.tariffList} />
      </div>
    </Dialog>
  );
};
