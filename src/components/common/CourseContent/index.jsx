import cn from 'classnames';
import TerminalType from '@assets/TerminalType';
import VideoType from '@assets/VideoType';
import QuizType from '@assets/QuizType';
import { useEffect, useState } from 'react';
import styles from './styles.module.less';
import ArrowDown from '@assets/ArrowDown';
import { TimeGrey } from '@assets/TimeGrey';
import CertificatesBlack from '@assets/CertificatesBlack.svg';
import { useHistory } from 'react-router';
import skillLogo from '@assets/skill.png';
import { useSelector } from 'react-redux';
import { selectRootExercise } from '@src/features/exercises/store/selectors/exercises.selectors';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Success from './assets/success.svg';

const ExerciseTypeImage = ({ type }) => {
  switch (type) {
    case 'normal_exercise':
    case 'single_bascket':
    case 'multiple_bascket':
    case 'bullet_point_exercise':
    case 'quiz_with_script':
      return <TerminalType />;
    case 'video':
      return <VideoType />;
    case 'quiz':
      return <QuizType />;
    default:
      return '';
  }
};

const ListItem = ({ item, isActive, onClick }) => (
  <div
    className={cn(styles.item, {
      [styles.item_notAvailable]: !item.is_available,
      [styles.active]: isActive,
    })}
    onClick={onClick}
  >
    <div className={styles.itemLeft}>
      <div className={styles.itemImg}>
        <ExerciseTypeImage type={item.type} />
      </div>
      <span className={styles.itemTitle}>{item.title}</span>
    </div>
    <div className={styles.openRight}>
      {(item.status === 'untouched' || item.status === 'in_progress') && (
        <div className={styles.point} />
      )}
      {item.status === 'done' && <img src={Success} alt="success" />}
      <span className={`${styles.itemTitle} ${styles.itemTitleXP}`}>{item.xp}</span>
    </div>
  </div>
);

export const CourseContent = ({ variant, onClose, parts, slug }) => {
  const exercise = useSelector(selectRootExercise);
  const history = useHistory();
  const [active, setActive] = useState();

  useEffect(() => {
    setActive(exercise?.course_part_slug);
  }, []);

  return (
    <>
      {((variant === 'skill' || variant === 'profession') && (
        <div>
          {parts.map((partItem, i) => (
            <div key={i} className={styles[variant]}>
              {/*<div className={styles.skill__number}>*/}
              {/*  {(partItem.progress === 100 && <DoneGreen />) || <div>{++i}</div>}*/}
              {/*</div>*/}
              <div className={styles.skill__block}>
                {partItem?.test && <div className={styles.skill__test}>Тестирование</div>}
                <div
                  className={cn(styles.skill__content, {
                    [styles.pb50]: active === partItem.slug,
                  })}
                >
                  <div className={styles.skill__title}>
                    <img src={skillLogo} alt={'Лого'} />
                    <div>{partItem.title}</div>
                  </div>
                  <div className={styles.skill__description}>{partItem.description}</div>
                  <div
                    className={cn(styles.listWrap, {
                      [styles.downOpen]: active === partItem.slug,
                    })}
                  >
                    {/*{partItem.exercises.map((item, i) => (*/}
                    {/*  <div*/}
                    {/*    key={i}*/}
                    {/*    className={cn(styles.item, {*/}
                    {/*      [styles.item_notAvailable]: item.is_available === false,*/}
                    {/*    })}*/}
                    {/*  >*/}
                    {/*    <div className={styles.itemLeft}>*/}
                    {/*      <div className={styles.itemImg}>*/}
                    {/*        <ExerciseTypeImage type={item.type} />*/}
                    {/*      </div>*/}
                    {/*      <span className={styles.itemTitle}>{item.title}</span>*/}
                    {/*    </div>*/}
                    {/*    <div className={styles.openRight}>*/}
                    {/*      <div className={styles.point} />*/}
                    {/*      <span className={styles.itemTitle}>{item.xp}</span>*/}
                    {/*    </div>*/}
                    {/*  </div>*/}
                    {/*))}*/}
                  </div>
                  <div className={styles.skill__info}>
                    {/*{partItem.progress !== 0 && (*/}
                    {/*  <ProgressBar*/}
                    {/*    value={partItem.progress}*/}
                    {/*    height={'12px'}*/}
                    {/*    variant={'skill'}*/}
                    {/*    isShowValue={true}*/}
                    {/*  />*/}
                    {/*)}*/}
                    <div className={styles.skill__info__hour}>
                      <TimeGrey />
                      <div>{partItem.time} часа</div>
                    </div>
                  </div>
                  <Link to={`/courses/${partItem.slug}`}>
                    {partItem.status === 100 ? (
                      <Button variant="completed" disabled className={styles.btn}>
                        Пройти снова
                      </Button>
                    ) : partItem.status === 'untouched' ? (
                      <Button variant="outlinePurple" className={styles.btn}>
                        Изучить курс
                      </Button>
                    ) : (
                      <Button variant="containedPurple" className={styles.btn}>
                        Продолжить
                      </Button>
                    )}
                  </Link>
                  {/*<Button*/}
                  {/*  className={cn(styles.btnContent, {*/}
                  {/*    [styles.btnContentOpen]: active === partItem.slug,*/}
                  {/*  })}*/}
                  {/*  variant="outlineBlack"*/}
                  {/*  onClick={() => {*/}
                  {/*    setActive(partItem.slug !== active ? partItem.slug : '');*/}
                  {/*  }}*/}
                  {/*>*/}
                  {/*  Содержание курса*/}
                  {/*  <ArrowDown />*/}
                  {/*</Button>*/}
                </div>
              </div>
            </div>
          ))}
          {variant === 'profession' && (
            <div className={cn(styles.takeCertificate, styles[variant])}>
              <div className={styles.skill__number}>
                <img src={CertificatesBlack} alt="image" />
              </div>
              <div className={styles.skill__block}>Получение сертификата DeepSkills</div>
            </div>
          )}
        </div>
      )) || (
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
                {partItem.exercises.map((item) => (
                  <ListItem
                    key={item.id}
                    isActive={item.id === exercise?.id}
                    item={item}
                    onClick={() => {
                      history.push(`/courses/${slug}/exercises/${item.id}`);
                      if (onClose) {
                        onClose();
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
