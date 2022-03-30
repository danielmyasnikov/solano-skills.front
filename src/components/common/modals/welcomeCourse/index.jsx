import { useHistory, useParams, useLocation, Link } from 'react-router-dom';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Button from '@components/mui/button';
import Close from '@assets/Close.js';

import styles from './styles.module.less';

/*
 * TODO: refactoring. Not working with useModal: does not have an onClose prop
 */
export const WelcomeCourse = ({ open, handleClick, logo }) => {
  const useQuery = () => new URLSearchParams(useLocation().search);

  const query = useQuery();

  const returnUrl = query.get('returnUrl');

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
          <Link to={returnUrl || '/courses'}>
            <Button variant="containedPurple">Начинаем!</Button>
          </Link>
        </DialogActions>
      </div>
    </Dialog>
  );
};
