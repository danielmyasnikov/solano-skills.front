import cn from 'classnames';
import styles from './styles.module.less';
import { Input } from '@components/mui/Input';
import { CheckboxBtn } from '@components/mui/Checkbox';
import { InputPassword } from '../../mui/Password';
export const AuthorizationByEmail = ({
  handleChange,
  email,
  password,
  rememberMe,
  handleRemberMe,
  errors,
  handleAuthMethod,
  onForgotPassword,
}) => {
  const forgotPasswordHandler = () => onForgotPassword();

  return (
    <>
      <span className={cn(styles.subTitile, { [styles.subTitileError]: errors.errorMassege })}>
        E-mail
      </span>
      <div className={cn(styles.inputWrapper, { [styles.inputWrapperError]: errors.errorMassege })}>
        <Input value={email} handleChange={handleChange} name="email" placeholder="Ваш e-mail" />
      </div>
      <div onClick={() => handleAuthMethod()} className={styles.link}>
        {/* Авторизоваться по номеру телефона */}
      </div>
      <span className={cn(styles.subTitile, { [styles.subTitileError]: errors.errorMassege })}>
        Пароль
      </span>
      <div className={cn(styles.inputWrapper, { [styles.inputWrapperError]: errors.errorMassege })}>
        <InputPassword
          value={password}
          handleChange={handleChange}
          name="password"
          placeholder="Введите пароль"
        />
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.rememberMe}>
          <CheckboxBtn value={rememberMe} handleChange={handleRemberMe} />
          <div className={styles.rememberMeInfo} onClick={() => handleRemberMe()}>
            Запомнить меня
          </div>
        </div>
        <div className={styles.forgotPassword} onClick={forgotPasswordHandler}>
          Забыли пароль?
        </div>
      </div>
    </>
  );
};
