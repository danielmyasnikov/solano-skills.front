import { useEffect, useState } from 'react';

import { CheckboxBtn } from '@components/mui/Checkbox';

import styles from './styles.module.less';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfileNew } from '../../store/selectors';
import { deleteAccount } from '../../store/actions';
import { useHistory } from 'react-router';

export const SettingsDeleteAccount = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [checkedError, setCheckedError] = useState(false);

  const dispatch = useDispatch();

  const history = useHistory();

  const status = useSelector(selectProfileNew);

  const handleAreement = () => {
    setIsChecked(!isChecked);
    setCheckedError(false);
  };

  const deleteProfile = () => {
    dispatch(deleteAccount());
  };

  useEffect(() => {
    if (status === 'success') {
      localStorage.clear();
      history.push('/');
    } else if (status === 'failure') {
    }
  }, [status]);

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
        <Button disabled={!isChecked} onClick={deleteProfile} variant="containedRed">
          Удалить аккаунт
        </Button>
      </div>
    </div>
  );
};
