import React, { useState } from 'react';
import styles from './styles.module.less';
import Prev from '@assets/Prev.js';
import Next from '@assets/Next.js';
import MenuCourse from '@assets/MenuCourse.js';
import Menu from '@components/mui/menu';
import Button from '@components/mui/button';
import cn from 'classnames';
import Burger from '@assets/Burger';
import CourseContentModal from '../common/modals/courseContent';

const HeaderExercise = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [courseContentIsOpen, setCourseContentIsOpen] = useState(false);
  return (
    <div className={styles.wrapper}>
      {courseContentIsOpen && (
        <CourseContentModal
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
            className={cn(styles.btn, styles.prev, styles.disabled)}
            disabled={true}
            variant="outlineBlack"
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
          <Button className={cn(styles.btn, styles.next)} variant="outlineBlack">
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
