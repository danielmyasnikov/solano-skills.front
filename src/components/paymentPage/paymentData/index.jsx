import { createRef, useMemo, useState } from 'react';

import RadioButton from '@components/mui/radioButton';
import Button from '@components/mui/button';

import { PaymentTypes, PaymentMasks, PaymentPlaceholders } from './constants';

import cn from 'classnames';

import { PaymentInput } from '../paymentInput';
import { PaymentDropdown } from '../paymentDropdown/paymentDropdown';

import styles from './styles.module.less';

export const PaymentData = ({ onStep }) => {
  const [payment, setPayment] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');

  const selectRef = createRef();

  const changePaymentHandler = (code) => setPayment(code);

  const renderPaymentTypes = useMemo(() => {
    return PaymentTypes.map(({ id, type, code }) => (
      <RadioButton
        className={cn(styles.paymentRadioButton, {
          [styles.paymentRadioButtonPurple]: code === payment,
        })}
        key={id}
        checked={code === payment}
        value={type}
        onChange={() => changePaymentHandler(code)}
      />
    ));
  }, [payment]);

  const handleInputChange = (val, type) => {
    switch (type) {
      case 'card':
        setCardNumber(val);
        break;
      case 'name':
        if (val === '') {
          setName(val);
        } else if (/^((?:[A-Za-z]+ ?){1,3})$/.test(val)) {
          setName(val);
        }
        break;
      case 'date':
        setDate(val);
        break;
      case 'cvc':
        setCvc(val);
        break;
      case 'zipCode':
        setZipCode(val);
        break;
      case 'address':
        setAddress(val);
        break;
      case 'country':
        setCountry(val);
        break;
      case 'sity':
        setCity(val);
        break;
      default:
        break;
    }
  };

  const isFormValid = () => {
    if (
      !cardNumber.includes('_') &&
      !date.includes('_') &&
      !cvc.includes('_') &&
      name.length &&
      name.length > 3
    ) {
      return false;
    }
    return true;
  };

  return (
    <div className={styles.paymentData}>
      <span className={styles.paymentDataTitle}>Выберите способ оплаты</span>
      <div className={styles.checkboxContainer}>{renderPaymentTypes}</div>
      <div className={styles.fieldsContainerFirst}>
        <PaymentInput
          label="Номер карты"
          type="card"
          value={cardNumber}
          onChange={handleInputChange}
          mask={PaymentMasks[0]}
          placeholder={PaymentPlaceholders[0]}
        />
        <PaymentInput
          type="name"
          value={name}
          onChange={handleInputChange}
          label="Имя владельца"
          placeholder={PaymentPlaceholders[1]}
        />
      </div>
      <div className={styles.fieldsContainerSecond}>
        <PaymentInput
          width="31%"
          type="date"
          value={date}
          onChange={handleInputChange}
          label="Срок действия"
          mask={PaymentMasks[2]}
          placeholder={PaymentPlaceholders[2]}
        />
        <PaymentInput
          width="31%"
          type="cvc"
          value={cvc}
          onChange={handleInputChange}
          label="CVV/CVC"
          mask={PaymentMasks[3]}
          placeholder={PaymentPlaceholders[3]}
        />
      </div>

      {/* Закомментил пока не будет четкого понимания о ненужности этих полей */}

      {/* <div ref={selectRef} className={styles.fieldsContainerDropdown}>
        <PaymentDropdown
          onChange={handleInputChange}
          type="country"
          placeholder="Не выбрана"
          label="Страна"
        />
        <PaymentDropdown
          onChange={handleInputChange}
          type="city"
          placeholder="Не выбран"
          label="Область, город"
        />
      </div>
      <div className={styles.fieldsContainerAddress}>
        <PaymentInput
          onChange={handleInputChange}
          type="address"
          label="Адрес"
          placeholder={PaymentPlaceholders[5]}
        />
        <PaymentInput
          type="zipCode"
          label="Почтовый индекс"
          onChange={handleInputChange}
          mask={PaymentMasks[4]}
          placeholder={PaymentPlaceholders[4]}
        />
      </div> */}
      <div className={styles.btn}>
        <Button disabled={isFormValid()} variant="containedPurple" onClick={() => onStep()}>
          Продолжить {isFormValid}
        </Button>
      </div>
    </div>
  );
};
