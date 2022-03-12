import cn from 'classnames';
import Button from '@components/mui/button';
import TerminalType from '@assets/TerminalType';
import VideoType from '@assets/VideoType';
import QuizType from '@assets/QuizType';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.less';
import ArrowDown from '@assets/ArrowDown';
import DoneIcon from '@mui/icons-material/Done';
import { DoneGreen } from '@assets/DoneGreen';
import { TimeGrey } from '@assets/TimeGrey';
import { useHistory } from 'react-router';
import ProgressBar from '@components/mui/progressBar';
import skillLogo from '@assets/skill.png';

export const CourseContent = ({ variant, onClose, parts, slug, coursePartSlug }) => {
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
      {variant === 'skill' ? (
        <div>
          {parts.map((partItem, i) => (
            <div key={partItem.slug} className={styles.skill}>
              <div className={styles.skill__number}>
                {partItem.progress === 100 ? <DoneGreen /> : <div>{++i}</div>}
              </div>
              <div className={styles.skill__block}>
                {partItem.test && <div className={styles.skill__test}>Тестирование</div>}
                <div
                  className={cn(styles.skill__content, { [styles.pb50]: active === partItem.slug })}
                >
                  <div className={styles.skill__title}>
                    <img src={skillLogo} alt={skillLogo} />
                    <div>{partItem.title}</div>
                  </div>
                  <div className={styles.skill__description}>{partItem.description}</div>
                  <div
                    className={cn(styles.listWrap, { [styles.downOpen]: active === partItem.slug })}
                  >
                    {partItem.exercises.map((item, i) => (
                      <div
                        key={item.title}
                        className={cn(styles.item, {
                          [styles.item_notAvailable]: item.is_available === false,
                        })}
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
                  <div className={styles.skill__info}>
                    {partItem.progress !== 0 && (
                      <ProgressBar
                        value={partItem.progress}
                        height={'12px'}
                        variant={'skill'}
                        isShowValue={true}
                      />
                    )}
                    <div className={styles.skill__info__hour}>
                      <TimeGrey />
                      <div>4 часа</div>
                    </div>
                  </div>
                  {partItem.progress === 100 ? (
                    <Button variant="containedBlack" disabled={true} className={styles.btn}>
                      Пройти снова
                    </Button>
                  ) : partItem.progress === 0 ? (
                    <Button variant="outlinePurple" className={styles.btn}>
                      Изучить курс
                    </Button>
                  ) : (
                    <Button variant="containedPurple" className={styles.btn}>
                      Продолжить
                    </Button>
                  )}

                  <Button
                    className={cn(styles.btnContent, {
                      [styles.btnContentOpen]: active === partItem.slug,
                    })}
                    variant="outlineBlack"
                    onClick={() => {
                      setActive(partItem.slug !== active ? partItem.slug : '');
                    }}
                  >
                    Содержание курса
                    <ArrowDown />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
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
                      history.push(
                        `/courses/${slug}/exercises/${partItem.exercises[0].exercise_id}`,
                      );
                      if (onClose) {
                        onClose();
                      }
                    }}
                    className={styles.btn}
                  >
                    Изучать раздел
                  </Button>
                  <Button
                    className={cn(styles.btnContent, {
                      [styles.btnContentOpen]: active === partItem.slug,
                    })}
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
                      history.push(`/courses/${slug}/exercises/${item.id}`);
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
        </div>
      )}
    </React.Fragment>
  );
};
