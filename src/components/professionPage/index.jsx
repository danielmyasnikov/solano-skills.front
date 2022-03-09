import React from 'react';
import { WrapHeader } from '../common/wrapHeader';
import { CourseList } from '../coursePage/courseList';
import { CourseSidebar } from '../coursePage/courseSidebar';
import styles from './styles.module.less';

export const ProfessionPage = () => {
  const course = {
    parts: [
      {
        title: 'Введение в Python',
        description:
          'Введение в основные концепции Python. Узнайте, как использовать Python в интерактивном режиме и с помощью сценария. Создайте свои первые переменные и познакомьтесь с основными типами данных Python.',
        progress: 100,
        slug: 0,
        exercises: [
          {
            title: 'Test',
            type: 'normal_exercise',
            xp: 50,
          },
          {
            title: 'Test',
            type: 'normal_exercise',
            xp: 50,
          },
          {
            title: 'Test',
            type: 'normal_exercise',
            xp: 50,
          },
          {
            title: 'Test',
            type: 'normal_exercise',
            xp: 50,
          },
        ],
      },
      {
        title: 'Введение в Python',
        description:
          'Введение в основные концепции Python. Узнайте, как использовать Python в интерактивном режиме и с помощью сценария. Создайте свои первые переменные и познакомьтесь с основными типами данных Python.',
        progress: 20,
        slug: 1,
        exercises: [
          {
            title: 'Test',
            is_available: true,
            type: 'normal_exercise',
            xp: 50,
          },
          {
            title: 'Test',
            is_available: true,
            type: 'normal_exercise',
            xp: 50,
          },
          {
            title: 'Test',
            is_available: false,
            type: 'normal_exercise',
            xp: 50,
          },
          {
            title: 'Test',
            is_available: false,
            type: 'normal_exercise',
            xp: 50,
          },
        ],
      },
      {
        title: 'Введение в Python',
        description:
          'Введение в основные концепции Python. Узнайте, как использовать Python в интерактивном режиме и с помощью сценария. Создайте свои первые переменные и познакомьтесь с основными типами данных Python.',
        progress: 0,
        slug: 2,
        exercises: [],
      },
      {
        title: 'Введение в Python',
        description:
          'Введение в основные концепции Python. Узнайте, как использовать Python в интерактивном режиме и с помощью сценария. Создайте свои первые переменные и познакомьтесь с основными типами данных Python.',
        progress: 0,
        slug: 3,
        exercises: [],
      },
      {
        title: 'Введение в Python',
        description:
          'Введение в основные концепции Python. Узнайте, как использовать Python в интерактивном режиме и с помощью сценария. Создайте свои первые переменные и познакомьтесь с основными типами данных Python.',
        progress: 0,
        slug: 4,
        exercises: [],
      },
      {
        title: 'Введение в Python',
        description:
          'Введение в основные концепции Python. Узнайте, как использовать Python в интерактивном режиме и с помощью сценария. Создайте свои первые переменные и познакомьтесь с основными типами данных Python.',
        progress: 0,
        slug: 5,
        exercises: [],
      },
      {
        title: 'Введение в Python',
        description:
          'Введение в основные концепции Python. Узнайте, как использовать Python в интерактивном режиме и с помощью сценария. Создайте свои первые переменные и познакомьтесь с основными типами данных Python.',
        progress: 0,
        slug: 6,
        exercises: [
          {
            title: 'Test',
            type: 'normal_exercise',
            xp: 50,
          },
          {
            title: 'Test',
            type: 'normal_exercise',
            xp: 50,
          },
          {
            title: 'Test',
            type: 'normal_exercise',
            xp: 50,
          },
          {
            title: 'Test',
            type: 'normal_exercise',
            xp: 50,
          },
        ],
        test: true,
      },
    ],
    progress: 40,
    mentors: ['Александров Александр Александрович', 'Ширшов Олег Игоревич'],
  };

  return (
    <div className={styles.wrapper}>
      <WrapHeader variant={'profession'} />
      <div className={styles.contentWrap}>
        <CourseList variant={'skill'} parts={course.parts || []} />
        <CourseSidebar variant={'skill'} progress={course.progress} mentors={course.mentors} />
      </div>
    </div>
  );
};
