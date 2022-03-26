import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { WrapHeader } from '../common/wrapHeader';
import * as AuthStore from '@store/auth';
import { getSkills } from '@store/api/skills';
import Skill from './skill';
import styles from './styles.module.less';

export const SkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const { headers } = useSelector(AuthStore.Selectors.getAuth);

  const asyncGetSkills = async () => {
    setSkills(await getSkills(headers));
  };

  useEffect(() => {
    asyncGetSkills();
  }, []);

  return (
    <div className={styles.wrapper}>
      <WrapHeader variant={'skills'} />
      <div className={styles.skillsList}>
        {skills.map(({ title, description, info }) => (
          <Skill key={title} title={title} description={description} info={info} />
        ))}
      </div>
    </div>
  );
};
