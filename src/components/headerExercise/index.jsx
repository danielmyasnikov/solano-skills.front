import React, { useEffect, useState } from 'react';

import { useHistory, useParams, useLocation } from 'react-router';

import { useDispatch, useSelector } from 'react-redux';

import { selectCourse } from '@store/course/selector';
import { getCourse } from '@store/course/actions';
import { selectExercise } from '@store/exercise/selector';
import { selectProfile } from '@store/profile/selector';

import Button from '@components/mui/button';
import CourseContentModal from '../common/modals/courseContent';

import Burger from '@assets/Burger';
import SupportIcon from '@assets/icon/supportIcon.svg';
import Prev from '@assets/Prev.js';
import Next from '@assets/Next.js';
import MenuCourse from '@assets/MenuCourse.js';

import cn from 'classnames';

import styles from './styles.module.less';

const HeaderExercise = ({ handleSidebar, headerRef, onSupport }) => {
  const dispatch = useDispatch();
  const [courseContentIsOpen, setCourseContentIsOpen] = useState(false);
  const { courseId } = useParams();
  const location = useLocation();
  const exercise = useSelector(selectExercise);
  const history = useHistory();

  const courseData = useSelector(selectCourse);
  const profile = useSelector(selectProfile);
  const [course, setCourse] = useState({});

  useEffect(() => setCourse(courseData), [courseData]);

  useEffect(() => {
    dispatch(getCourse(courseId));
  }, [location.pathname]);

  return (
    <div ref={headerRef} className={styles.wrapper}>
      {courseContentIsOpen && (
        <CourseContentModal
          slug={courseId}
          parts={course.parts || []}
          isOpen={courseContentIsOpen}
          coursePartSlug={exercise.course_part_slug}
          onClose={() => setCourseContentIsOpen(!courseContentIsOpen)}
        />
      )}
      <header className={styles.header}>
        <div className={styles.headerItem}>
          <div onClick={handleSidebar} className={styles.burgerMenu}>
            <Burger />
          </div>
        </div>
        <nav className={cn(styles.headerItem, styles.navbarCourse)}>
          <Button
            className={cn(styles.btn, styles.prev, {
              [styles.disabled]: !exercise.prev_exercise_id,
            })}
            disabled={exercise.prev_exercise_id ? false : true}
            variant="outlineBlack"
            onClick={() =>
              history.push(`/courses/${courseId}/exercises/${exercise.prev_exercise_id}`)
            }
          >
            <Prev />
          </Button>
          <Button
            onClick={() => setCourseContentIsOpen(!courseContentIsOpen)}
            className={cn(styles.courseContent, styles.btn)}
            variant="outlineBlack"
          >
            <MenuCourse />
            <span>Содержание курса</span>
          </Button>
          <Button
            onClick={() =>
              history.push(`/courses/${courseId}/exercises/${exercise.next_exercise_id}`)
            }
            disabled={exercise.next_exercise_id ? false : true}
            className={cn(styles.btn, styles.next, {
              [styles.disabled]: !exercise.next_exercise_id,
            })}
            variant="outlineBlack"
          >
            <Next />
          </Button>
        </nav>
        <nav className={cn(styles.headerItem, styles.navbarMenu)}>
          <div className={styles.support} onClick={onSupport}>
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
