import SidebarHeader from '@components/exercise/views/Simple/Sidebar/Header';
import InstructionHeader from '@components/exercise/common/InstructionHeader';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import { InstructionQuizPart } from '@components/parts/instruction';
import styles from '@components/exercise/templates/Quiz/styles.module.less';
import Button from '@components/mui/button';
import BulletInstructionHeader from '@components/exercise/common/BulletInstructionHeader';
import RadioButton from '@components/mui/radioButton';
import { sendAnswer } from '@store/exercise/actions';
import { useDispatch } from 'react-redux';

const Root = styled(Box)`
  overflow-x: hidden;
  background: var(--color-white);
  box-shadow: 0 0 35px rgba(0, 0, 0, 0.04);
  border-radius: 15px;

  &.folded {
    width: 44px;
    border-radius: 4px;
    height: 100%;
  }
`;

const SidebarWrapper = styled(Box)`
  padding-top: 46px;

  overflow-y: auto;
`;

const Content = styled(Box)`
  height: 50%;
  padding: 15px 20px 40px;

  p {
    margin-top: 20px;

    & > img {
      display: block;
      width: 100%;
    }
  }

  p,
  li,
  code {
    font-size: 16px;
  }

  li {
    margin-left: 20px;
    list-style-type: decimal;
  }
`;

const Instructions = styled(Box)`
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

export const Sidebar = ({
  open,
  toggleSidebar,
  exercise,
  xp,
  answer,
  handleAnswer,
  setCompleted,
  setErrorMessage,
  handleHelp,
  hintValue,
  isAuth,
  headers,
  hint,
  withoutHint,
  showHint,
  checkAnswer,
  point,
  total,
  nestedExercise,
  onSetActiveExercise,
  doneExercises,
  isQuiz,
  setAnswer,
}) => {
  const [headerFolded, setHeaderFolded] = useState(false);
  const [instructionFolded, setInstructionFolded] = useState(false);

  const toggleHeaderFolded = () => setHeaderFolded(!headerFolded);
  const toggleInstructionFolded = () => setInstructionFolded(!instructionFolded);

  return (
    <Root className={open ? '' : 'folded'}>
      <SidebarHeader open={open} toggleSidebar={toggleSidebar} onClick={toggleHeaderFolded} />
      <SidebarWrapper>
        {open && (
          <>
            {!headerFolded && (
              <Content>
                <h1
                  dangerouslySetInnerHTML={{
                    __html: exercise?.title || 'Заголовок не задан',
                  }}
                />
                <div dangerouslySetInnerHTML={{ __html: exercise?.description }} />
              </Content>
            )}
            <BulletInstructionHeader
              onClick={toggleInstructionFolded}
              xp={xp}
              point={point}
              total={total}
              nestedExercise={nestedExercise}
              onSetActiveExercise={onSetActiveExercise}
              doneExercisesIds={[...doneExercises]}
            />
            {!instructionFolded && (
              <>
                <Instructions
                  dangerouslySetInnerHTML={{
                    __html: exercise?.instruction,
                  }}
                />
                {isQuiz && (
                  <>
                    <div className={styles.quiz}>
                      {exercise?.answers?.map((item) => (
                        <RadioButton
                          key={item.value}
                          checked={answer.value === item.value}
                          className={styles.quizItem}
                          isHtml
                          onChange={() => {
                            setAnswer(item);
                          }}
                          value={item.value}
                        />
                      ))}
                    </div>
                    <div className={styles.btnContainer}>
                      {(hint || withoutHint) && (
                        <Button className={styles.btn} variant="outlinePurple" onClick={handleHelp}>
                          Подсказка (-{hintValue} XP)
                        </Button>
                      )}
                      <Button
                        variant="containedPurple"
                        onClick={() => {
                          checkAnswer();
                        }}
                      >
                        Ответить
                      </Button>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </SidebarWrapper>
    </Root>
  );
};
