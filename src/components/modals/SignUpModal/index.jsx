import styles from './styles.module.less';
import { Modal } from '@mui/material';
import { Registration } from '@components/auth/signUp';

const SignUpModal = ({ onClose }) => {
  return (
    <Modal open onClose={onClose}>
      <div className={styles.registration}>
        <Registration onClose={onClose} isModal />
      </div>
    </Modal>
  );
};

export default SignUpModal;
