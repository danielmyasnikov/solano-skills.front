import cn from 'classnames';
import Button from '@components/mui/button';
import TerminalType from '@assets/TerminalType';
import VideoType from '@assets/VideoType';
import QuizType from '@assets/QuizType';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.less';
import ArrowDown from '@assets/ArrowDown';
import { useHistory } from 'react-router';

export const CourseContent = ({ onClose, parts, slug, coursePartSlug }) => {
  const history = useHistory();
  const [active, setActive] = useState();
  useEffect(() => {
    setActive(coursePartSlug);
  }, []);
  const ExerciseTypeImage = ({ type }) => {
    switch (type) {
      case 'normal_exercise':
        return <TerminalType />;
      case 'bullet_point_exercise':
        return <TerminalType />;
      case 'video':
        return <VideoType />;
      case 'quiz':
        return <QuizType />;
      default:
        return '';
    }
  };
  return (
    <React.Fragment>
      {parts.map((partItem, i) => (
        <div key={partItem.title} className={styles.courseWrap}>
          <div className={styles.courseHead}>
            <div className={styles.info}>
              <div className={styles.courseTitle}>
                <span>{i + 1}. </span>
                <span>&nbsp;{partItem.name}</span>
                {partItem.is_free && <span className={styles.free}>Бесплатно</span>}
              </div>
              <span className={styles.courseDescription}>{partItem.description}</span>
            </div>
            <div className={styles.btnWrap}>
              <Button
                variant="containedPurple"
                onClick={() => {
                  history.push(`/courses/${slug}/exercises/${partItem.exercises[0].exercise_id}`);
                  if (onClose) {
                    onClose();
                  }
                }}
                className={styles.btn}
              >
                Изучать раздел
              </Button>
              <Button
                className={cn(styles.btnContent, { [styles.btnContentOpen]: active === partItem.slug })}
                variant="outlineBlack"
                onClick={() => {
                  setActive(partItem.slug !== active ? partItem.slug : '');
                }}
              >
                Содержание раздела
                <ArrowDown />
              </Button>
            </div>
          </div>
          <div className={cn(styles.listWrap, { [styles.downOpen]: active === partItem.slug })}>
            {partItem.exercises.map((item, i) => (
              <div
                key={item.title}
                onClick={() => {
                  history.push(`/courses/${slug}/exercises/${item.exercise_id}`);
                  if (onClose) {
                    onClose();
                  }
                }}
                className={styles.item}
              >
                <div className={styles.itemLeft}>
                  <div className={styles.itemImg}>
                    <ExerciseTypeImage type={item.type} />
                  </div>
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
