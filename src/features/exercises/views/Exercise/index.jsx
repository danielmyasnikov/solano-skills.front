import { useDispatch, useSelector } from 'react-redux';

import cn from 'classnames';

import styles from './styles.module.less';
import { Sidebar } from '@src/features/exercises/views/Exercise/Sidebar';
import { selectKernelId } from '../../store/selectors/terminal.selector';
import ErrorMessage from '@src/features/exercises/views/Exercise/ErrorMessage';
import CompletedTaskModal from '@src/features/exercises/views/Exercise/CompletedTaskModal';

import Stack from './Stack';
import WarningMobile from '@src/features/exercises/views/Exercise/WarningMobile';
import Hint from '@src/features/exercises/views/Exercise/Hints/Hint';
import HintFeedback from '@src/features/exercises/views/Exercise/Hints/HintFeedback';
import SolutionHint from '@src/features/exercises/views/Exercise/Hints/SolutionHint';
import {
  selectExerciseSidebar,
  selectRootExercise,
  selectRootExerciseType,
  selectSteps,
} from '@src/features/exercises/store/selectors/exercises.selectors';
import {
  selectExerciseContext,
  selectHint,
} from '@src/features/exercises/store/selectors/exercise.selectors';
import { exercisesSlice } from '../../store/slices/exercises.slice';
import { useEffect, useRef, useState } from 'react';
import {
  getExerciseById,
  sendAnswer,
} from '@src/features/exercises/store/actions/exercises.actions';
import { exerciseSlice } from '@src/features/exercises/store/slices/exercise.slice.ts';
import { getProfile } from '@store/profile/actions';
import { bashSlice } from '@src/features/exercises/store/slices/bash.slice.ts';
import { terminalSlice } from '@src/features/exercises/store/slices/terminal.slice.ts';

function Exercise({ goNext }) {
  const dispatch = useDispatch();
  const wrapperRef = useRef();

  const bottom = useRef();

  const { error } = useSelector(selectExerciseContext);

  const kernelId = useSelector(selectKernelId);

  const [completeModalClosed, setCompleteModalClosed] = useState(false);
  const type = useSelector(selectRootExerciseType);
  const { active, total, totalDone, code: stepsCode } = useSelector(selectSteps);
  const { nested_exercises } = useSelector(selectRootExercise);

  const { open: sidebarOpen } = useSelector(selectExerciseSidebar);
  const { completed, exercise, xp, code } = useSelector(selectExerciseContext);
  const { used: hintUsed } = useSelector(selectHint);

  async function sendXp() {
    await dispatch(
      sendAnswer({ exerciseId: exercise.slug, courseId: exercise.course_slug, xp }),
    ).then(() => {
      dispatch(getProfile());
    });
  }

  async function setStep(step) {
    if (step !== active) {
      let value = nested_exercises[step - 1];
      if (stepsCode[step]) {
        value = {
          ...value,
          sample_code: stepsCode[step],
        };
      }

      await dispatch(exerciseSlice.actions.put(value));
      await dispatch(exercisesSlice.actions.setStep({ step, code: { id: active, code } }));
    }
  }

  useEffect(() => {
    if (completed) {
      if (type === 'bullet_point_exercise') {
        if (active <= total) {
          if (active > totalDone) {
            dispatch(exercisesSlice.actions.onStepComplete({ xp }));

            if (active < total) {
              setStep(active + 1);
            }
          }
        }
      }

      sendXp();
    }
  }, [completed]);

  useEffect(() => {
    if (!!error) {
      bottom.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [error]);
  useEffect(() => {
    if (!completed && hintUsed) {
      bottom.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hintUsed, completed]);

  return (
    <>
      <WarningMobile />

      <div className={cn(styles.layout, { [styles.folded]: !sidebarOpen })} ref={wrapperRef}>
        <div className={styles.content}>
          <Sidebar wrapperRef={wrapperRef} goNext={goNext} />
          <ErrorMessage />

          <div ref={bottom} style={{ float: 'left', clear: 'both' }} />
          {sidebarOpen &&
            (kernelId ||
              exercise.type === 'single_bascket' ||
              exercise.type === 'multiple_bascket') && (
              <>
                <Hint />
                <HintFeedback />
                <SolutionHint />
              </>
            )}
        </div>
        {!completeModalClosed &&
          completed &&
          (type !== 'bullet_point_exercise' || active === total) && (
            <CompletedTaskModal
              onClick={goNext}
              onClose={() => {
                setCompleteModalClosed(true);

                dispatch(bashSlice.actions.clear());
                dispatch(terminalSlice.actions.clear());

                dispatch(
                  getExerciseById({ courseId: exercise.course_slug, exerciseId: exercise.id }),
                );
              }}
            />
          )}
      </div>

      <Stack />
    </>
  );
}

export default Exercise;
