import { Link } from 'react-router-dom';
import { CheckboxBtn } from '@components/mui/checkbox';
import styles from './styles.module.less';

const Content = () => (
  <div>
    Я принимаю условия
    <Link className={styles.infoLink} to="/">
      {' Пользовательского соглашения '}
    </Link>
    и даю своё согласие на обработку персональных данных на условиях, определенных
    <Link className={styles.infoLink} to="/">
      {' Политикой конфиденциальности '}
    </Link>
    .
  </div>
);

const Terms = ({ handleChecked, checked, checkedError, isPhoneNumber }) => (
  <div className={styles.infoWrapper}>
    <CheckboxBtn
      name="registration-terms"
      error={!!checkedError}
      value={checked}
      handleChange={handleChecked}
    />
    <div className={styles.info} onClick={() => handleChecked} role="presentation">
      {(isPhoneNumber && (
        <span>
          Я даю согласие на передачу ООО &quot;Ромашка&quot; своих персональных данных и обработку
          на условиях Политики конфиденциальности, а также на получение сообщений информационного и
          рекламного характера в виде SMS и эл. писем
        </span>
      )) || <Content />}
    </div>
  </div>
);

export default Terms;
