import React, { useState } from "react";
import Container from "../common/container";
import styles from "./styles.module.less";
import tempInfo from "../../tempJSON.json";
import Terminal from "../terminal";
import Exercise from "../exercise";
import Instructions from "../instruction";
import Button from "../common/button";

function CourseExercise() {
  return (
    <Container>
      <div className={styles.exerciseContainer}>
        <div className={styles.content}>
          <div className={styles.sidebar}>
            <Exercise {...tempInfo} />
            <Instructions />
          </div>
          <div className={styles.hint}>
            <Button variant="outline">Подсказка (-30 XP)</Button>
          </div>
        </div>
        <div className={styles.terminal}>
          <Terminal />
        </div>
      </div>
    </Container>
  );
}

export default CourseExercise;
