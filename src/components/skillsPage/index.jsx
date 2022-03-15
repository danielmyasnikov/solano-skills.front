import React from 'react';
import { WrapHeader } from '../common/wrapHeader';
import Skill from './skill';
import styles from './styles.module.less';
import { skillsFromBack } from './data';

export const SkillsPage = () => {
  return (
    <div className={styles.wrapper}>
      <WrapHeader variant={'skills'} />
      <div className={styles.skillsList}>
        {skillsFromBack.map(({ title, description, info }) => (
          <Skill title={title} description={description} info={info} />
        ))}
      </div>
    </div>
  );
};
