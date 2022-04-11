import { useDispatch, useSelector } from 'react-redux';

import {
  selectExerciseSidebar,
  selectRootExercise,
} from '@src/features/exercises/store/selectors/exercises.selectors';
import {
  selectCurrentExercise,
  selectExerciseContext,
  selectExerciseType,
  selectHint,
  selectQuizVariants,
} from '@src/features/exercises/store/selectors/exercise.selectors';

import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import { exerciseSlice } from '@src/features/exercises/store/slices/exercise.slice';
import RadioButton from '@components/mui/RadioButton';
import { selectIsAuth, selectProfile } from '@store/profile/selector';
import { openPleasePayModal, openSignUpModal } from '@store/global/modals';

const Content = styled(Box)`
  margin-top: 35px;

  padding-bottom: 15px;
  padding-left: 20px;
  padding-right: 10px;

  word-break: break-word;

  &:empty {
    display: none;
  }

  p {
    margin: 20px 0;
  }

  ol {
    margin-left: 20px;
  }

  ul {
    margin-left: 20px;
    list-style-type: disc;
    li {
      margin: 20px 0;
    }
  }

  p,
  li,
  code {
    font-size: 16px;
  }
`;

const ButtonWrapper = styled(Box)`
  display: flex;
  justify-content: flex-end;
  gap: 15px;

  margin: 15px 20px 5px;
  padding-bottom: 15px;
`;

const Quiz = styled(Box)`
  margin-bottom: 20px;
  padding-left: 20px;
  padding-right: 10px;
  word-break: break-word;

  p {
    margin: 20px 0;
  }

  ol {
    margin-left: 20px;
  }

  ul {
    margin-left: 20px;
    list-style-type: disc;
    li {
      margin: 20px 0;
    }
  }

  p,
  li,
  code {
    font-size: 16px;
  }
`;

const QuizRadioButton = styled(RadioButton)`
  margin: 20px 0;

  cursor: pointer;

  &:first-child {
    margin-top: 0;
  }

  label {
    cursor: pointer;

    font-size: 16px;
    align-items: flex-start;
  }

  span {
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    line-height: normal;
    letter-spacing: normal;
  }
`;

export default function InstructionBody({ goNext }) {
  const dispatch = useDispatch();

  const rootExercise = useSelector(selectRootExercise);
  const profile = useSelector(selectProfile);
  const type = useSelector(selectExerciseType);
  const { instruction } = useSelector(selectCurrentExercise);
  const { instructionFolded } = useSelector(selectExerciseSidebar);
  const { completed } = useSelector(selectExerciseContext);
  const quizVariants = useSelector(selectQuizVariants);
  const isAuth = useSelector(selectIsAuth);

  const { used: hintUsed, content: hintContent, value: hintValue } = useSelector(selectHint);

  if (instructionFolded) {
    return null;
  }

  function onAnswer() {
    if (completed) {
      goNext();
    } else {
      if (isAuth) {
        if (rootExercise.is_free || !!profile.subscription_type) {
          dispatch(exerciseSlice.actions.onQuizAnswer({}));
        } else {
          dispatch(openPleasePayModal());
        }
      } else {
        dispatch(openSignUpModal());
      }
    }
  }

  return (
    <>
      <Content dangerouslySetInnerHTML={{ __html: instruction }} />
      {type === 'quiz' && !instruction && <div style={{ height: '28px' }} />}

      {(type === 'quiz' || type === 'quiz_with_script') && (
        <Quiz>
          {quizVariants.map((variant) => (
            <QuizRadioButton
              key={variant.id}
              checked={variant.checked}
              onChange={() => dispatch(exerciseSlice.actions.onQuizSelect(variant.id))}
              value={variant.content}
            />
          ))}
        </Quiz>
      )}

      {(type === 'quiz' || type === 'quiz_with_script') && (
        <ButtonWrapper>
          {!hintUsed && !!hintContent && (
            <Button
              variant="outlinePurple"
              onClick={() => dispatch(exerciseSlice.actions.useHint({}))}
            >
              Подсказка (-{hintValue} XP)
            </Button>
          )}

          <Button variant="containedPurple" onClick={onAnswer}>
            Ответить
          </Button>
        </ButtonWrapper>
      )}
    </>
  );
}
