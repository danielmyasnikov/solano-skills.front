import cn from 'classnames';
import Button from '@components/mui/button';
import TerminalType from '@assets/TerminalType';
import VideoType from '@assets/VideoType';
import QuizType from '@assets/QuizType';
import React, { useState } from 'react';
import styles from './styles.module.less';
import { temp } from './temp';
import { useHistory } from 'react-router';

export const CourseContent = ({ onClose }) => {
  const history = useHistory();
  const [open, setOpen] = useState();
  const ExerciseTypeImage = ({ type }) => {
    switch (type) {
      case 'normal_exercise':
        return <QuizType />;
      case 'video':
        return <VideoType />;
      case 'quiz':
        return <QuizType />;
      default:
        break;
    }
  };
  return (
    <React.Fragment>
      {temp.parts.map((partItem, i) => (
        <div key={partItem.title} className={styles.courseWrap}>
          <div className={styles.courseHead}>
            <div className={styles.info}>
              <div className={styles.courseTitle}>
                <span>{i + 1}.</span>
                <span>&nbsp;{partItem.title}</span>
                {partItem.isFree && <span className={styles.free}>Бесплатно</span>}
              </div>
              <span className={styles.courseDescription}>{partItem.description}</span>
            </div>
            <div className={styles.btnWrap}>
              <Button
                variant="containedPurple"
                onClick={() => {
                  history.push(`/courses/${partItem.course_id}/exercises/1`);
                  if (onClose) {
                    onClose();
                  }
                }}
                className={styles.btn}
              >
                Изучать раздел
              </Button>
              <Button
                variant="outlineBlack"
                onClick={() => setOpen(partItem.course_id !== open ? partItem.course_id : '')}
              >
                Содержание раздела
              </Button>
            </div>
          </div>
          <div className={cn(styles.listWrap, { [styles.downOpen]: open === partItem.course_id })}>
            {partItem.exercises.map((item) => (
              <div
                key={item.title}
                onClick={() => {
                  history.push(`/courses/${partItem.course_id}/exercises/${item.exercise_id}`);
                  if (onClose) {
                    onClose();
                  }
                }}
                className={styles.item}
              >
                <div className={styles.itemLeft}>
                  <ExerciseTypeImage type={item.type} />
                  <span className={styles.itemTitle}>{item.title}</span>
                </div>
                <div className={styles.openRight}>
                  <div className={styles.point} />
                  <span className={styles.itemTitle}>{item.xp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};
