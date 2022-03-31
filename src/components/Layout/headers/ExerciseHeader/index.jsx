import { useHistory, useParams } from 'react-router';

import { useDispatch, useSelector } from 'react-redux';

import { selectProfile } from '@store/profile/selector';

import Burger from '@assets/Burger';
import SupportIcon from '@assets/icon/supportIcon.svg';
import Prev from '@assets/Prev';
import Next from '@assets/Next';
import MenuCourse from '@assets/MenuCourse';

import cn from 'classnames';

import styles from './styles.module.less';
import { getExerciseById } from '@src/features/exercises/store/actions';
import { selectRootExercise } from '@src/features/exercises/store/selectors';
import { toggleSidebar } from '@store/global/layout';
import { openCourseContentModal, openFeedbackModal } from '@store/global/modals';
import { Button } from '@mui/material';

const HeaderExercise = ({ headerRef }) => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const exercise = useSelector(selectRootExercise);
  const history = useHistory();

  const profile = useSelector(selectProfile);

  return (
    <div ref={headerRef} className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.headerItem}>
          <div onClick={() => dispatch(toggleSidebar({}))} className={styles.burgerMenu}>
            <Burger />
          </div>
        </div>
        <nav className={cn(styles.headerItem, styles.navbarCourse)}>
          <Button
            className={cn(styles.btn, styles.prev, {
              [styles.disabled]: !exercise?.prev_exercise_id,
            })}
            disabled={!exercise?.prev_exercise_id}
            variant="outlineBlack"
            onClick={() => {
              history.push(`/courses/${courseId}/exercises/${exercise?.prev_exercise_id}`);
              dispatch(getExerciseById({ courseId, exerciseId: exercise?.prev_exercise_id }));
            }}
          >
            <Prev />
          </Button>
          <Button
            onClick={() => dispatch(openCourseContentModal({}))}
            className={cn(styles.courseContent, styles.btn)}
            variant="outlineBlack"
          >
            <MenuCourse />
            <span>Содержание курса</span>
          </Button>
          <Button
            onClick={() => {
              history.push(`/courses/${courseId}/exercises/${exercise?.next_exercise_id}`);
              dispatch(getExerciseById({ courseId, exerciseId: exercise?.next_exercise_id }));
            }}
            disabled={!exercise?.next_exercise_id}
            className={cn(styles.btn, styles.next, {
              [styles.disabled]: !exercise?.next_exercise_id,
            })}
            variant="outlineBlack"
          >
            <Next />
          </Button>
        </nav>
        <nav className={cn(styles.headerItem, styles.navbarMenu)}>
          <div className={styles.support} onClick={() => dispatch(openFeedbackModal({}))}>
            <img src={SupportIcon} alt="support" />
          </div>
          {profile.hasOwnProperty('name') && (
            <>
              <span className={styles.dailyXp}>Ваш опыт</span>
              <div className={styles.xp}>{profile.xp} XP</div>
            </>
          )}
        </nav>
      </header>
    </div>
  );
};

export default HeaderExercise;
