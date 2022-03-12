import { useMemo, useState } from 'react';

import cn from 'classnames';

import RadioButton from '@components/mui/radioButton';
import Button from '@components/mui/button';

import { cardList } from './constants';

import styles from './styles.module.less';

export const RepeatedPayment = ({ onAddCard }) => {
  const [cardNumber, setCardNumber] = useState('');

  const choiceCardhandler = (cardNumber) => setCardNumber(cardNumber);

  const Card = ({ children, addCard = false }) => (
    <div className={cn(styles.cardWrapper, { [styles.cardWrapperPurple]: addCard })}>
      {children}
    </div>
  );

  const cardRender = useMemo(() => {
    return cardList.map(({ id, number }) => (
      <Card key={id}>
        <RadioButton
          className={cn({ [styles.radioButtonPurple]: number === cardNumber })}
          checked={number === cardNumber}
          value={`Банковская карта *${number}`}
          onChange={() => choiceCardhandler(number)}
        />
      </Card>
    ));
  }, [cardNumber]);

  const addCardHandler = () => onAddCard();

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperList}>{cardRender}</div>
      <Card addCard={true}>
        <span onClick={addCardHandler}>+ добавить способ оплаты</span>
      </Card>
      <div className={styles.paymentButton}>
        <Button variant="containedPurple">Оплатить сейчас</Button>
      </div>
    </div>
  );
};
