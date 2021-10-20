import React from 'react';
import Select from 'react-select';
import Button from '../../button';
import styles from './styles.module.less';
import Close from '../../../../../assets/close.svg';

const FeedbackModal = ({onClick}) => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
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
        <Button className={styles.btn} variant="fillPurple" onClick={() => console.log('some action')}>
          Отправить отзыв
        </Button>
      </div>
    </div>
  );
};

export default FeedbackModal;
