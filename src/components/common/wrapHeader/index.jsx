import styles from './styles.module.less';
import { TimeWhite } from '@assets/TimeWhite';
import { CoursesWhite } from '@assets/CoursesWhite';
import { pages, test } from './data';
import { numberDeclension } from '@components/common/helpers/numberDeclension';
import { Button } from '@mui/material';
import { TestWhite } from '@assets/TestWhite';

export const WrapHeader = ({ variant, info }) => {
  return (
    <div className={styles.wrapHeader}>
      <div className={styles.pretitle}>{pages[variant].pretitle}</div>
      <div className={styles.titleBlock}>
        <h1 className={styles.title}>{pages[variant].title}</h1>
        {(variant === 'skill' || variant === 'profession') && (
          <div className={styles.titleBlock__items}>
            <div className={styles.titleBlock__item}>
              <TimeWhite />
              <div>{`${info.hours} ${numberDeclension(info.hours, ['час', 'часа', 'часов'])}`}</div>
            </div>
            <div className={styles.titleBlock__item}>
              <CoursesWhite />
              <div>{`${info.courses} ${numberDeclension(info.courses, [
                'курс',
                'курса',
                'курсов',
              ])}`}</div>
            </div>
            {info.tests && (
              <div className={styles.titleBlock__item}>
                <TestWhite />
                <div>{`${info.tests} ${numberDeclension(info.tests, [
                  'тест',
                  'теста',
                  'тестов',
                ])}`}</div>
              </div>
            )}
            {variant === 'profession' && (
              <div className={styles.titleBlock__item_certificate}>{test.certificate}</div>
            )}
          </div>
        )}
      </div>
      <div className={styles.subtitle}>{pages[variant].subtitle}</div>
      {(variant === 'skill' || variant === 'profession') && (
        <div className={styles.btn}>
          <Button variant={'containedWhite'}>Продолжить обучение</Button>
        </div>
      )}
    </div>
  );
};
