import styles from './styles.module.less';
import { CheckboxBtn } from '@components/mui/Checkbox';
import cn from 'classnames';

const Terms = ({ variant, handleChecked, checked, checkedError, isPhoneNumber }) => {
  const Content = () => {
    if (isPhoneNumber) {
      return 'Я даю согласие на передачу ООО "Ромашка" своих персональных данных и обработку на условиях Политики конфиденциальности, а также на получение сообщений информационного и рекламного характера в виде SMS и эл. писем.';
    } else {
      return (
        <>
          Я принимаю условия
          <a className={styles.infoLink} target={'_blank'} href="/knowledge/">
            {' Пользовательского соглашения '}
          </a>
          и даю своё согласие на обработку персональных данных на условиях, определенных
          <a className={styles.infoLink} target={'_blank'} href="/knowledge/privacy-policy/">
            {' Политикой конфиденциальности'}
          </a>
          .
        </>
      );
    }
  };

  return (
    <div
      className={cn(
        styles.infoWrapper,
        { [styles.offer]: variant === 'home_offer' },
        { [styles.end]: variant === 'home_end' },
      )}
    >
      <CheckboxBtn
        variant={variant}
        name="registration-terms"
        error={!!checkedError}
        value={checked}
        handleChange={handleChecked}
      />
      <div className={styles.info} onClick={() => handleChecked()}>
        <Content />
      </div>
    </div>
  );
};

export default Terms;
