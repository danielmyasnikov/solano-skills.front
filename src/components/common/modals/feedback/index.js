import React from 'react';
import Select from 'react-select';
import Button from '@components/mui/button';
import Close from '@assets/Close.js';
import styles from './styles.module.less';

const FeedbackModal = ({ onClose }) => {
  const options = [
    { value: 'variant1', label: 'Тема 1' },
    { value: 'variant2', label: 'Тема 2' },
    { value: 'variant3', label: 'Тема 3' },
    { value: 'variant4', label: 'Тема 4' },
    { value: 'variant5', label: 'Тема 5' },
    { value: 'variant6', label: 'Другое' },
  ];
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.closeModal} onClick={onClose} role="presentation">
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
        <textarea placeholder="Введите текст" />
        <Button className={styles.btn} variant="containedPurple" onClick={() => onClose()}>
          Отправить отзыв
        </Button>
      </div>
    </div>
  );
};

export default FeedbackModal;
