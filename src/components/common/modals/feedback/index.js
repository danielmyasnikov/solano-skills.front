import React from 'react';
import Select from 'react-select';
import Button from '@components/mui/button';
import styles from './styles.module.less';
import Close from '@assets/Close.js';

const FeedbackModal = ({ onClose }) => {
  const options = [
    { value: 'variant1', label: '1 Вариант' },
    { value: 'variant2', label: '2 Вариант' },
  ];
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
          placeholder="Ваша проблема описана здесь"
          options={options}
        />
        <textarea placeholder="Введите текст"></textarea>
        <Button
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
