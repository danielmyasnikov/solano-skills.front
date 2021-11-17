import cn from 'classnames';
import Button from '@components/mui/button';
import React, { useState } from 'react';
import styles from './styles.module.less';
import { temp } from './temp';
import { useHistory } from 'react-router';

export const CourseContent = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.courseWrap}>
      {temp.parts.map((partItem, i) => (
        <React.Fragment key={partItem.title}>
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
              <Button variant="containedPurple" className={styles.btn}>
                Изучать раздел
              </Button>
              <Button variant="outlineBlack" onClick={() => setOpen(!open)}>
                Содержание раздела
              </Button>
            </div>
          </div>

          <div className={cn(styles.listWrap, { [styles.downOpen]: open })}>
            {partItem.exercises.map((item) => (
              <div
                key={item.title}
                onClick={() =>
                  history.push(`/courses/${partItem.course_id}/exercises/${item.exercise_id}`)
                }
                className={styles.item}
              >
                <div className={styles.itemLeft}>
                  <span className={styles.itemTitle}>{item.title}</span>
                </div>
                <div className={styles.openRight}>
                  <div className={styles.point} />
                  <span className={styles.itemTitle}>{item.xp}</span>
                </div>
              </div>
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
