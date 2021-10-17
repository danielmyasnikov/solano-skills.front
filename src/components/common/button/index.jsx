import React from "react";
import styles from "./styles.module.less";
import cn from "classnames";

const Button = ({ children, variant, className, onClick }) => {
  return (
    <button
      type="button"
      className={cn(styles.btn, styles[variant], className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
