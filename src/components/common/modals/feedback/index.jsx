import React, { useState } from 'react';
import Select from 'react-select';

import ReactInputMask from 'react-input-mask';

import { useDispatch, useSelector } from 'react-redux';

import * as AuthStore from '@store/auth';
import { sendFeedback } from '@store//feedback/actions';

import Button from '@components/mui/button';
import Close from '@assets/Close.js';

import SuccessIcon from './assets/successIcon.svg';

import { VariantsList } from './constants';

import styles from './styles.module.less';

export const FeedbackModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('');
  const [proplemDescription, setProblemDescription] = useState('');
  const [sendError, setSendError] = useState(false);

  const dispatch = useDispatch();

  const { headers } = useSelector(AuthStore.Selectors.getAuth);

  const disabledButtonHandler = () => {
    if (headers.hasOwnProperty('uid')) {
      return !(proplemDescription && reason);
    }
    return !(proplemDescription && reason && email);
  };

  const handleSubmit = () => {
    if (headers.hasOwnProperty('uid')) {
      dispatch(sendFeedback(proplemDescription, reason, null, null, headers));
    } else {
      dispatch(sendFeedback(proplemDescription, reason, phone, email));
    }
    setSendError(!sendError);
  };

  const successSendFeedback = () => {
    return (
      <div className={styles.contentForm}>
        <img src={SuccessIcon} alt="Success Icon" />
        <h2>Спасибо за обратную связь</h2>
        <span>В ближайшее время мы проверим и устраним ошибку, которую вы указали.</span>
      </div>
    );
  };

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.closeModal} onClick={onClose}>
          <Close />
        </div>
        {(sendError && successSendFeedback()) || (
          <div className={styles.contentForm}>
            <h2>Обратная связь</h2>
            <span>Пожалуйста, опишите свою проблему и расскажите нам о вашем предложении.</span>
            {!headers.hasOwnProperty('uid') && (
              <>
                <input
                  className={styles.inputCustom}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ваш E-mail"
                />
                <ReactInputMask
                  value={phone}
                  className={styles.inputCustom}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (___) ___-__-__"
                  mask={'+7 (999) 999-99-99'}
                />
              </>
            )}
            <Select
              classNamePrefix="customFeedback"
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  boxShadow: 'none',
                  border: state.isFocused && 'none',
                }),
                menu: (provided, state) => ({
                  ...provided,
                  border: 'none',
                  boxShadow: 'none',
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused && 'lightgray',
                }),
              }}
              className={styles.select}
              onChange={(e) => setReason(e.label)}
              placeholder="Ваша проблема есть здесь"
              options={VariantsList}
            />
            <textarea
              onChange={(e) => setProblemDescription(e.target.value)}
              placeholder="Введите текст"
            />
            <Button
              type="submit"
              disabled={disabledButtonHandler()}
              className={styles.btn}
              variant="containedPurple"
              onClick={handleSubmit}
            >
              Отправить отзыв
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
