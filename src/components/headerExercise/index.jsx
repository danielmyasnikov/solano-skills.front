import React, { useState } from 'react';
import styles from './styles.module.less';
import Prev from '@assets/Prev.js';
import Next from '@assets/Next.js';
import MenuCourse from '@assets/MenuCourse.js';
import Menu from '@components/mui/menu';
import Button from '@components/mui/button';
import cn from 'classnames';
import Burger from '@assets/Burger';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className={styles.wrapper}>
      <Menu isOpen={isMenuOpen} />
      <header className={styles.header}>
        <div className={styles.burgerMenu}>
          <div className={styles.menuToggle} onClick={() => setIsMenuOpen(isMenuOpen === false ? true : false)}>
            <Burger />
          </div>
        </div>
        <nav className={styles.navbarCourse}>
          <Button
            className={cn(styles.btn, styles.prev, styles.disabled)}
            disabled={true}
            variant="outlineBlack"
          >
            <Prev />
          </Button>
          <Button className={cn(styles.courseContent, styles.btn)} variant="outlineBlack">
            <MenuCourse />
            <span>Содержание курса</span>
          </Button>
          <Button className={cn(styles.btn, styles.next)} variant="outlineBlack">
            <Next />
          </Button>
        </nav>
        <nav className={styles.navbarMenu}>
          <span className={styles.dailyXp}>Ежедневный опыт</span>
          <div className={styles.xp}>100 xp</div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
