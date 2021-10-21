import React from 'react';
import Select from 'react-select';
import Button from '../../button';
import styles from './styles.module.less';
import Close from '../../../../../assets/Close.svg';

const CompletedTask = ({onClick}) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <Close />
        <span>+10 XP</span>
        
      </div>
    </div>
  );
};

export default CompletedTask;
