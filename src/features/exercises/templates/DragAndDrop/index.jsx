import React, { useEffect, useState, useRef } from 'react';
import Button from '@components/mui/button';
import Draggable from '@components/common/draggable';
import { FeedbackModal } from '@components/common/modals/feedback';
import RegistrationModal from '@components/common/modals/registration/registrationModal';
import DndBlock from './DndBlock';
import cn from 'classnames';
import { v4 as uuid } from 'uuid';
import styles from './styles.module.less';

const DragAndDropExercise = ({ onSubmit }) => {
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [completedTaskModalOpen, setCompletedTaskModalOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const [hint, setHint] = useState();
  const [correct, setCorrect] = useState(false);
  const [solution, setSolution] = useState();
  const [answer, setAnswer] = useState({ value: '', correct: false, error: 'Выберите ответ' });
  const [withoutHint, setWithoutHint] = useState(false);
  const [xp, setXp] = useState(0);
  const [isWarningHidden, setIsWarningHidden] = useState(true);
  const errorRef = useRef();
  const contentRef = useRef();
  const layoutRef = useRef();

  exercise.basckets = exercise.basckets.map((basket) => ({
    ...backet,
    id: String(basket.id),
  }));
  exercise.statements = exercise.statements.map((statement) => ({
    ...statement,
    id: String(statement.id),
  }));

  useEffect(() => {
    setXp(exercise.xp);
    setHeight(contentRef?.current?.offsetHeight);
    if (!localStorage.getItem('warning')) {
      setIsWarningHidden(false);
    }
  }, []);

  useEffect(() => {
    setWithoutHint(!!exercise.hint);
    setHint(false);
    setAnswer({ value: '', correct: false, error: 'Выберите ответ' });
  }, [exercise]);

  const checkAnswer = (baskets) => {
    console.log(baskets);
  };

  const helpHandler = (val) => {
    setHint(true);
    setXp(xp - val);
  };

  return (
    <>
      {feedbackModalOpen && <FeedbackModal onClose={() => setFeedbackModalOpen(false)} />}
      {registrationModalOpen && <RegistrationModal />}
      <div ref={layoutRef} className={styles.layout}>
        <div ref={contentRef} className={styles.content}>
          <div className={styles.sidebar}>
            <Exercise exercise={exercise} />
            <NormalInstruction xp={exercise.xp} onSubmit={() => setCompletedTaskModalOpen(true)}>
              <div
                dangerouslySetInnerHTML={{ __html: exercise.instruction }}
                className={styles.instructions}
              />
              <NormalHint
                hint={hint}
                onClick={() => {
                  setFeedbackModalOpen(true);
                }}
                onAnswer={() => helpHandler(70)}
                solution={true}
                onSetSolution={() => setSolution(exercise.solution)}
              />
            </NormalInstruction>
            {completedTaskModalOpen && (
              <CompletedTask
                correctMessage={exercise?.correct_message}
                onClose={() => {
                  setCorrect(false);
                  setCompletedTaskModalOpen(false);
                }}
                onClick={() => {
                  onSubmit();
                  setCompletedTaskModalOpen(false);
                }}
              />
            )}
            <Draggable parentContainer={contentRef} resizeContainer={layoutRef} height={height} />
            <div ref={errorRef} />
          </div>
        </div>
        <div className={styles.btnContainer}>
          {!hint === false ||
            (withoutHint === false && (
              <Button className={styles.btn} variant="outlinePurple" onClick={() => setHint(true)}>
                Подсказка (-30 XP)
              </Button>
            ))}
        </div>
      </div>
      <div className={cn(styles.exerciseWrap, styles[exercise.type])}>
        {(exercise.type === 'single_basket' && (
          <DndBlock
            key={exercise.type}
            variant={exercise.type}
            initBasckets={[
              {
                id: uuid(),
                is_main: true,
                title: exercise.title,
                statements: [],
                ids_order: exercise.ids_order,
              },
            ]}
            initStatements={exercise.statements}
            checkAnswer={checkAnswer}
          />
        )) || (
          <DndBlock
            key={exercise.type}
            variant={exercise.type}
            initBasckets={exercise.baskets}
            initStatements={exercise.statements}
            checkAnswer={checkAnswer}
          />
        )}
      </div>
    </>
  );
};

export default DragAndDropExercise;
