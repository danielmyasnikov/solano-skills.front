import React, { useState } from 'react';
import Select from 'react-select';
import Button from '@components/mui/button';
import styles from './styles.module.less';
import Close from '@assets/Close.js';

const FeedbackModal = ({ onClose }) => {
  const [proplem, setProblem] = useState('');

  const options = [
    { value: 'variant1', label: 'Тема 1' },
    { value: 'variant2', label: 'Тема 2' },
    { value: 'variant3', label: 'Тема 3' },
    { value: 'variant4', label: 'Тема 4' },
    { value: 'variant5', label: 'Тема 5' },
    { value: 'variant6', label: 'Другое' },
  ];

  const inputHandler = (e) => setProblem(e.target.value);

  const disabledButtonHandler = () => {
    if (proplem) {
      return false;
    }
    return true;
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
          className={styles.select}
          placeholder="Ваша проблема есть здесь"
          options={options}
        />
        <textarea onChange={(e) => inputHandler(e)} placeholder="Введите текст"></textarea>
        <Button
          disabled={disabledButtonHandler()}
          className={styles.btn}
          variant="containedPurple"
          onClick={() => onClose()}
        >
          Отправить отзыв
        </Button>
      </div>
    </div>
  );
};

export default FeedbackModal;
