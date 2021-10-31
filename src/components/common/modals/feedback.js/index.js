import React from 'react';
import Select from 'react-select';
import Button from '../../../mui/button';
import styles from './styles.module.less';
import Close from 'assets/Close.svg';

const FeedbackModal = ({onClick}) => {
  const options = [
    { value: 'variant1', label: '1 Вариант' },
    { value: 'variant2', label: '2 Вариант' },
  ];
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <Close className={styles.closeModal} onClick={onClick} />
        <h2>Обратная связь</h2>
        <span>Пожалуйста, опишите свою проблему и расскажите нам о вашем предложении.</span>
        <Select
          classNamePrefix="customFeedback"
          className={styles.select}
          placeholder="Ваша проблема описана здесь"
          options={options}
        />
        <textarea placeholder="Введите текст"></textarea>
        <Button className={styles.btn} variant="containedPurple" onClick={() => console.log('some action')}>
          Отправить отзыв
        </Button>
      </div>
    </div>
  );
};

export default FeedbackModal;
