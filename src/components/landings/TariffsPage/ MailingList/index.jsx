import { Input } from '@components/mui/Input';
import { useState } from 'react';
import { Button } from '@mui/material';
import { CheckboxBtn } from '@components/mui/Checkbox';
import styles from './styles.module.less';
import { Link } from 'react-router-dom';
import Envelope from './assets/envelope.svg';

export const MailingList = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [accept, setAccept] = useState(false);

  const subscribeHandler = () => {};

  return (
    <div className={styles.wrapper}>
      <img className={styles.wrapper__img} src={Envelope} alt="Иконка конверта" />
      <span className={styles.wrapper__title}>Будьте в курсе!</span>
      <span className={styles.wrapper__text}>Вы можете подписаться на рассылку, чтобы первым</span>
      <span>получать новости о solanoskills.</span>
      <span className={styles.wrapper__text}>А также мы будем рассказывать Вам о появлении</span>
      <span>новых курсов, акциях и скидках.</span>
      <div className={styles.inputsContainer}>
        <Input value={name} handleChange={(e) => setName(e.target.value)} placeholder="Ваше имя" />
        <Input
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
          placeholder="Ваш e-mail"
        />
      </div>
      <Button variant="containedPurple" onClick={subscribeHandler}>
        Хочу быть в курсе
      </Button>
      <div className={styles.accept}>
        <CheckboxBtn value={accept} handleChange={(e) => setAccept(e.target.checked)} />
        <span>
          Я принимаю условия <Link to="/knowledge">Пользовательского соглашения</Link> и даю своё
          согласие на обработку персональных данных на условиях, определенных&nbsp;
          <Link to="/knowledge/privacy-policy/">Политикой конфиденциальности</Link>.
        </span>
      </div>
    </div>
  );
};
