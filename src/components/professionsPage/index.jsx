import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { WrapHeader } from '../common/wrapHeader';
import Profession from './profession';
import * as AuthStore from '@store/auth';
import { getProfessions } from '@store/api/professions';
import styles from './styles.module.less';

export const ProfessionsPage = () => {
  const [professions, setProfessions] = useState([]);
  const { headers } = useSelector(AuthStore.Selectors.getAuth);

  const asyncGetProfessions = async () => {
    setProfessions(await getProfessions(headers));
  };

  useEffect(() => {
    asyncGetProfessions();
  }, []);

  return (
    <div className={styles.wrapper}>
      <WrapHeader variant={'professions'} />
      <div className={styles.professionsList}>
        {professions.map(({ title, description, info }, i) => (
          <Profession key={i} title={title} description={description} info={info} />
        ))}
      </div>
    </div>
  );
};
