import React from 'react';
import cn from 'classnames'
import { LinearProgress } from '@mui/material';
import styles from './styles.module.less';

const ProgressBar = ({ value, height, variant, top, isShowValue }) => {
  return (
    <div style={{ height, marginTop: top }} className={cn(styles.progress, styles[variant])}>
      {isShowValue && <span>{value}%</span>}
      <LinearProgress
        className={styles[variant]}
        style={{ height }}
        variant="determinate"
        value={value}
      />
    </div>
  );
};

export default ProgressBar;
