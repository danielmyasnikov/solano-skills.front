import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './styles.module.less';
import { ModalHead } from './heade';
import { ModalItems } from './items';
export const Modal = ({ handleClick, open }) => {
  return (
    <Dialog
      maxWidth="lg"
      fullWidth
      open={open}
      onClose={handleClick}
      className={styles.dialog}
      sx={{
        '.MuiPaper-root': {
          borderRadius: '34px',
          boxShadow: 'unset',
          alignItems: 'flex-end',
          scrollbarWidth: 'none',
          paddingBottom: '70px',
          minHeight: '70%',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      }}
    >
      <DialogTitle className={styles.dialogTitle}>
        <CloseIcon onClick={handleClick} />
      </DialogTitle>

      <DialogContent className={styles.dialogContent}>
        <ModalHead />
        <ModalItems />
      </DialogContent>
    </Dialog>
  );
};
