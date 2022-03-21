import { useHistory } from 'react-router-dom';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Button from '@components/mui/button';
import Close from '@assets/Close.js';

import styles from './styles.module.less';

export const WelcomeCourse = ({ open, handleClick, logo }) => {
  const history = useHistory();
  const routeChange = () => {
    const path = `/courses`;
    history.push(path);
  };

  return (
    <Dialog
      PaperProps={{
        style: {
          borderRadius: '20px',
        },
      }}
      maxWidth="sm"
      fullWidth
      open={open}
      onClose={handleClick}
    >
      <div className={styles.dialog}>
        <div className={styles.closeButton} onClick={handleClick}>
          <Close />
        </div>
        <DialogTitle className={styles.dialogTitle}>
          <img className={styles.dialogTitleLogo} src={logo} alt="logo" />
          <span className={styles.dialogTitleTitle}>Добро пожаловать!</span>
        </DialogTitle>
        <DialogContent className={styles.dialogContent}>
          <span>Мы поможем вам начать свое обучение в первых блоках.</span>
          <span>
            <strong>Завершите 3 упражнения</strong> и перейдите на следующий раздел для
            самостоятельного изучения
          </span>
        </DialogContent>
        <DialogActions className={styles.dialogActions}>
          <Button variant="containedPurple" onClick={routeChange}>
            Начинаем!
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};
