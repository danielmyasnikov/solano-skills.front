import React, { useEffect, useState } from "react";
import Container from "../common/container";
import styles from "./styles.module.less";
import tempInfo from "../../tempJSON.json";
import Terminal from "../terminal";
import Exercise from "../exercise";
import Instructions from "../instruction";
import Button from "../common/button";
import cn from "classnames";
import { useSelector } from "react-redux";

function CourseExercise() {
  const [hint, setHint] = useState();
  const [sampleCode, setSampleCode] = useState();
  const [solution, setSolution] = useState();
  const [activeTab, setActiveTab] = useState("script");
  const output = useSelector((state) => state.terminal.data.output);
  useEffect(() => {
    setSampleCode(tempInfo.sample_code);
  }, []);
  return (
    <Container>
      <div className={styles.exerciseContainer}>
        <div className={styles.content}>
          <div className={styles.sidebar}>
            <Exercise {...tempInfo} />
            <Instructions />
          </div>
          <div className={styles.hint}>
            {hint && (
              <>
                <div className={styles.hintInfo}>
                  <h6>Подсказка</h6>
                  <p dangerouslySetInnerHTML={{ __html: hint }}></p>
                </div>
                <div className={styles.feedback}>
                  <p>Вам помогла эта подсказка?</p>
                  <div className={styles.feedbackAnswer}>
                    <Button variant="outline">Нет</Button>
                    <Button variant="outline">Да</Button>
                  </div>
                </div>
              </>
            )}
            <Button
              className={styles.btn}
              variant="outline"
              onClick={() => {
                if (hint) {
                  setSolution(tempInfo.solution);
                  setActiveTab('solution')
                } else {
                  setHint(tempInfo.hint);
                }
              }}
            >
              {!hint ? "Подсказка (-30 XP)" : "Показать ответ (-70 XP)"}
            </Button>
          </div>
        </div>
        <div className={styles.terminal}>
          <div className={styles.terminalHeader}>
            <div
              onClick={() => setActiveTab("script")}
              className={cn(
                activeTab === "script" ? styles.tabActive : "",
                styles.tab
              )}
            >
              script.py
            </div>
            {solution && (
              <div
                onClick={() => setActiveTab("solution")}
                className={cn(
                  activeTab === "solution" ? styles.tabActive : "",
                  styles.tab
                )}
              >
                solution.py
              </div>
            )}
          </div>
          <Terminal
            sampleCode={activeTab === 'solution' ? solution : sampleCode}
            readonly={activeTab === 'solution' ? true : false}
          />
          <p>{output}</p>
        </div>
      </div>
    </Container>
  );
}

export default CourseExercise;
