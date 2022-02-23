import React from 'react';
import styles from './styles.module.less';
import { Modal } from '@mui/material';
import { Registration } from '@components/auth/registration';

const RegistrationModal = ({}) => {
  return (
    <Modal open={true}>
      <div className={styles.registration}>
        <Registration isModal={true} />
      </div>
    </Modal>
  );
};

export default RegistrationModal;
