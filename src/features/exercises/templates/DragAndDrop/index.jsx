import React, { useEffect, useState, useRef } from 'react';
import Button from '@components/mui/button';
import Draggable from '@components/common/draggable';
import { FeedbackModal } from '@components/common/modals/feedback';
import RegistrationModal from '@components/common/modals/registration/registrationModal';
import DndBlock from './DndBlock';
import cn from 'classnames';
import { v4 as uuid } from 'uuid';
import styles from './styles.module.less';

const DragAndDropExercise = () => {
  exercise.basckets = exercise.basckets.map((basket) => ({
    ...backet,
    id: String(basket.id),
  }));
  exercise.statements = exercise.statements.map((statement) => ({
    ...statement,
    id: String(statement.id),
  }));

  const checkAnswer = (baskets) => {
    console.log(baskets);
  };

  return (
    <>
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
