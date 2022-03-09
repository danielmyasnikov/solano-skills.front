import React from 'react';
import cn from 'classnames';
import styles from './styles.module.less';

const BurgerMenu = (isShow) => {
  return <div className={cn(styles.menu, { [styles.shown]: isShow === true })}></div>;
};

export default BurgerMenu;
