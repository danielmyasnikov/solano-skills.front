import { useState } from 'react';

import { CheckboxBtn } from '@components/mui/Checkbox';

import styles from './styles.module.less';
import { Button } from '@mui/material';

export const SettingsDeleteAccount = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [checkedError, setCheckedError] = useState(false);

  const handleAreement = () => {
    setIsChecked(!isChecked);
    setCheckedError(false);
  };

  const deleteProfile = () => {
    if (isChecked) {
    } else {
      setCheckedError(true);
    }
  };

  return (
    <div className={styles.deleteAccount}>
      <div className={styles.title}>Удалить аккаунт</div>
      <div className={styles.wrap}>
        <span className={styles.grey}>
          Когда вы удаляете свою учетную запись, вы теряете доступ к службам учетной записи Front, и
          мы безвозвратно удаляем ваши личные данные. Вы можете отменить удаление в течение 14 дней.
        </span>
        <div className={styles.agreement}>
          <CheckboxBtn error={!!checkedError} value={isChecked} handleChange={handleAreement} />
          <span className={styles.grey}>Подтверждаю, что я хочу удалить свою учетную запись.</span>
        </div>
        <Button onClick={deleteProfile} variant="containedRed">
          Удалить аккаунт
        </Button>
      </div>
    </div>
  );
};
