import React from 'react';
import { WrapHeader } from '../common/wrapHeader';
import Profession from './profession';
import styles from './styles.module.less';
import { professionsFromBack } from './data';

export const ProfessionsPage = () => {
  return (
    <div className={styles.wrapper}>
      <WrapHeader variant={'professions'} />
      <div className={styles.professionsList}>
        {professionsFromBack.map(({ title, description, info }) => (
          <Profession title={title} description={description} info={info} />
        ))}
      </div>
    </div>
  );
};
