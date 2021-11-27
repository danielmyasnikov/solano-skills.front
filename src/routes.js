import ExercisePage from './components/exercise';
import { CoursesPage } from '@components/coursesPage';
import { CoursePage } from '@components/coursePage';

export const routes = [
  {
    path: '/courses',
    component: CoursesPage,
    exact: true,
  },
  {
    path: '/courses/:courseId',
    component: CoursePage,
    exact: true,
  },
  {
    path: '/courses/:courseId/exercises/:exerciseId',
    component: ExercisePage,
    headerVariant: 'exercise',
    exact: true,
  },
];
