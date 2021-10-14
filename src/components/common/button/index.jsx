import React from "react";
import styles from "./styles.module.less";
import cn from 'classnames'

const Button = ({ children, variant, className }) => {
  return (
    <button type="button" className={cn(styles.btn, styles[variant], className)}>
      {children}
    </button>
  );
};

export default Button;
