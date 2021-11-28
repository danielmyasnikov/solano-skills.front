import React, { useEffect, useState } from 'react';
import styles from './styles.module.less';
import Prev from '@assets/Prev.js';
import Next from '@assets/Next.js';
import MenuCourse from '@assets/MenuCourse.js';
import Menu from '@components/mui/menu';
import Button from '@components/mui/button';
import cn from 'classnames';
import Burger from '@assets/Burger';
import CourseContentModal from '../common/modals/courseContent';
import { selectCourse } from '@store/course/selector';
import { getCourse } from '@store/course/actions';
import { selectExercise } from '@store/exercise/selector';
import { useHistory, useParams, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

const HeaderExercise = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [courseContentIsOpen, setCourseContentIsOpen] = useState(false);
  const { courseId } = useParams();
  const location = useLocation();
  const exercise = useSelector(selectExercise);
  const history = useHistory();

  const courseData = useSelector(selectCourse);
  const [course, setCourse] = useState({});

  useEffect(() => {
    setCourse(courseData);
  }, [courseData]);

  useEffect(() => {
    dispatch(getCourse(courseId));
  }, [location.pathname]);

  return (
    <div className={styles.wrapper}>
      {courseContentIsOpen && (
        <CourseContentModal
          slug={courseId}
          parts={course.parts || []}
          isOpen={courseContentIsOpen}
          onClose={() => setCourseContentIsOpen(!courseContentIsOpen)}
        />
      )}
      <Menu className={styles.drawer} isOpen={isOpen} />
      <header className={styles.header}>
        <div className={styles.headerItem}>
          <div onClick={() => setIsOpen(!isOpen)} className={styles.burgerMenu}>
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
          <span className={styles.dailyXp}>Ежедневный опыт</span>
          <div className={styles.xp}>100 xp</div>
        </nav>
      </header>
    </div>
  );
};

export default HeaderExercise;