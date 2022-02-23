import React from 'react';
import { Modal } from '@mui/material';
import { Registration } from '@components/auth/registration';
import styles from './styles.module.less';

const RegistrationModal = () => (
  <Modal open>
    <div className={styles.registration}>
      <Registration isModal />
    </div>
  </Modal>
);

export default RegistrationModal;
