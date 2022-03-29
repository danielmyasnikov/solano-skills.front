import { useState } from 'react';

import Modal from '@mui/material/Modal';
import Button from '@components/mui/button';

import SuccessIcon from '@assets/successIcon.svg';

import { Root } from './styled.js';

export const CongratulationsModal = ({ submit, isShow }) => {
  const [open, setOpen] = useState(isShow);

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Root>
          <img src={SuccessIcon} alt="icon" />
          <h1>Поздравляем! Курс завершен!</h1>
          <span>За успешно пройденный курс вы можете получить сертификат</span>
          <Button onClick={submit} variant="containedPurple">
            Перейти к сертификату
          </Button>
        </Root>
      </Modal>
    </div>
  );
};
