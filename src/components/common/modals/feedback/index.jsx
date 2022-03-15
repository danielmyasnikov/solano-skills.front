import React, { useState } from 'react';
import Select from 'react-select';
import Button from '@components/mui/button';
import styles from './styles.module.less';
import Close from '@assets/Close.js';
import { VariantsList } from './constants';

export const FeedbackModal = ({ onClose }) => {
  const [reason, setReason] = useState('');
  const [proplemDescription, setProblemDescription] = useState('');

  const disabledButtonHandler = () => {
    if (proplemDescription && reason) {
      return false;
    }
    return true;
  };

  const handleSubmit = (reason, problem) => {
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.closeModal} onClick={onClose}>
          <Close />
        </div>
        <h2>Обратная связь</h2>
        <span>Пожалуйста, опишите свою проблему и расскажите нам о вашем предложении.</span>
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
        ></textarea>
        <Button
          type="submit"
          disabled={disabledButtonHandler()}
          className={styles.btn}
          variant="containedPurple"
          onClick={() => handleSubmit(reason, proplemDescription)}
        >
          Отправить отзыв
        </Button>
      </div>
    </div>
  );
};
