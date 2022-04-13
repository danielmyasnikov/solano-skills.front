import cn from 'classnames';
import styles from './styles.module.less';
import { Input } from '@components/mui/Input';
import Terms from '../terms';
import { InputPassword } from '../../mui/Password';

export const RegistrationByEmail = ({
  variant,
  handleChecked,
  handleChange,
  email,
  password,
  passwordConfirmation,
  errors,
  checkedError,
  checked,
  handleAuthMethod,
}) => {
  return (
    <div
      className={cn(
        { [styles.home]: variant === 'home_offer' || variant === 'home_end' },
        { [styles.offer]: variant === 'home_offer' },
        { [styles.end]: variant === 'home_end' },
      )}
    >
      <div className={cn({ [styles.flex]: variant === 'home_end' })}>
        <div className={cn({ [styles.block]: variant === 'home_end' })}>
          <span className={cn(styles.subTitile, { [styles.subTitileError]: errors.emailError })}>
            E-mail
          </span>
          <div
            className={cn(styles.inputWrapper, { [styles.inputWrapperError]: errors.emailError })}
          >
            <Input
              value={email}
              handleChange={handleChange}
              name="email"
              placeholder={'Email@gmail.com'}
            />
            {errors.emailError && <span className={styles.error}>{errors.emailError}</span>}
          </div>
        </div>
        <div onClick={() => handleAuthMethod()} className={styles.link}>
          {/* Регистрация по номеру телефона */}
        </div>
        <div className={cn({ [styles.block]: variant === 'home_end' })}>
          <span className={cn(styles.subTitile, { [styles.subTitileError]: errors.passwordError })}>
            Пароль
          </span>
          <div
            className={cn(styles.inputWrapper, {
              [styles.inputWrapperError]: errors.passwordError,
            })}
          >
            <InputPassword
              value={password}
              handleChange={handleChange}
              name="password"
              placeholder={'Введите пароль'}
            />
            {errors.passwordError && <span className={styles.error}>{errors.passwordError}</span>}
          </div>
        </div>
      </div>
      <div
        className={cn(styles.inputWrapper, {
          [styles.inputWrapperError]: errors.passwordConfirmationError,
        })}
      >
        <InputPassword
          value={passwordConfirmation}
          handleChange={handleChange}
          name="passwordConfirmation"
          placeholder={'Введите пароль повторно'}
        />
        {errors.passwordConfirmationError && (
          <span className={styles.error}>{errors.passwordConfirmationError}</span>
        )}
      </div>
      <Terms
        variant={variant}
        handleChecked={handleChecked}
        checked={checked}
        checkedError={checkedError}
      />
    </div>
  );
};
