import React, { useState } from "react";
import styles from "./styles.module.less";
import TerminalSvg from "assets/Terminal.svg";
import SideBarArrowLeft from "assets/SideBarArrowLeft.svg";

function Exercise(props) {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left__side}>
          <TerminalSvg />
          <span className={styles.title}>Упражнение</span>
        </div>
        <div className={styles.right__side}>
          <SideBarArrowLeft />
        </div>
      </div>
      <div className={styles.exercise}>
        <h1>{props.title}</h1>
        <p>{props.description}</p>
        <ul className={styles.decimal}>
          {props.list &&
            props.list.map((item) => (
              <li
                key={item.text}
                dangerouslySetInnerHTML={{ __html: item.text }}
              ></li>
            ))}
        </ul>
        <p>
          Обратите внимание, что у каждого модуля есть стандартный псевдоним,
          который позволяет вам получить доступ к инструментам внутри модуля, не
          набирая столько символов. Например, сглаживание позволяет сократить{" "}
          <code>seaborn.scatterplot ()</code> до{" "}
          <code>sns.scatterplot ().</code>
        </p>
      </div>
    </>
  );
}

export default Exercise;
