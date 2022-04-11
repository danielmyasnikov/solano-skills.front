import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Close from '@assets/Close';

import styles from './styles.module.less';
import { Button } from '@mui/material';
import { getProfile } from '@store/profile/actions';
import { unsubscribe } from '@src/features/payment/store/actions';
import { selectPaymentStatus } from '@src/features/payment/store/selectors';
import { selectProfile } from '@store/profile/selector';

export interface UnsubscribeModalProps {
  onClose: () => void;
}

const UnsubscribeModal = ({ onClose }: UnsubscribeModalProps) => {
  const [sendError, setSendError] = useState(false);
  const [endSubscribeDate, setEndSubscribeDate] = useState('');

  const status = useSelector(selectPaymentStatus);
  const profile = useSelector(selectProfile);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(unsubscribe());
  };

  const successSendFeedback = () => {
    return (
      <div className={styles.contentForm}>
        <h2>Подписка отменена</h2>
        <span>Ваша подписка будет отменена по окончании текущего расчетного периода.</span>
      </div>
    );
  };

  useEffect(() => {
    if (status === 'success') {
      dispatch(getProfile());
      setSendError(true);
    } else if (status === 'failure') {
      setSendError(false);
    }
  }, [status]);

  useEffect(() => {
    if (profile.payed_till) {
      const date = new Date(profile.payed_till);
      const dateSrc = date.toLocaleString('ru-RU', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });
      setEndSubscribeDate(dateSrc);
    }
  }, [profile]);

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.closeModal} onClick={onClose}>
          <Close />
        </div>
        {(sendError && successSendFeedback()) || (
          <div className={styles.contentForm}>
            <h2>Отмена подписки</h2>
            <span>
              Вы уверены, что хотите отменить подписку?
              <br />У Вас останется доступ к курсам до {endSubscribeDate}.
            </span>
            <div>
              {/* @ts-ignore */}
              <Button type="submit" className={styles.btn} variant="outlineRed" onClick={onClose}>
                Нет
              </Button>
              <Button
                type="submit"
                className={styles.btn}
                /* @ts-ignore */
                variant="outlinePurple"
                onClick={handleSubmit}
              >
                Да
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default UnsubscribeModal;
