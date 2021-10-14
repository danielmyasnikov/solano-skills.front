import React from "react";
import styles from "./styles.module.less";
import InstructionSvg from "assets/Instruction.svg";

const Instructions = () => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left__side}>
          <InstructionSvg />
          <span className={styles.title}>Инструкции</span>
        </div>
        <div className={styles.right__side}><div className={styles.experience}>100 xp</div></div>
      </div>
      <div className={styles.instructions}>
        <ul className={styles.disc}>
          <li>Экспериментируйте в оболочке IPython; введите   5/8  , например.</li>
          <li>Добавьте еще одну строку кода в скрипт Python в правом верхнем углу (не в оболочке):  <code>print (7 + 10)</code></li>
          <li>Экспериментируйте в оболочке IPython; введите   5/8  , например.</li>
        </ul>
      </div>
    </>
  );
};

export default Instructions;
