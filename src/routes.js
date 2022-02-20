import ExercisePage from '@components/exercise';
import Profile from '@components/profile';
import { CoursesPage } from '@components/coursesPage';
import { CoursePage } from '@components/coursePage';
import { OnBoardPage } from '@components/onBoard';
import { HomePage } from './components/homePage';
import { Registration } from './components/auth/registration';
import { Authorization } from './components/auth/authorization';

export const routes = [
  {
    path: '/courses',
    component: CoursesPage,
    wrap: true,
    exact: true,
  },
  {
    path: '/',
    component: HomePage,
    wrap: false,
    exact: true,
  },
  {
    path: '/sing-in',
    component: Authorization,
    wrap: false,
    exact: true,
  },
  {
    path: '/registration',
    component: Registration,
    wrap: false,
    exact: true,
  },
  {
    path: '/profile',
    component: Profile,
    wrap: true,
    exact: true,
  },
  {
    path: '/onBoard',
    component: OnBoardPage,
    wrap: false,
    exact: true,
  },
  {
    path: '/courses/:courseId',
    component: CoursePage,
    wrap: true,
    exact: true,
  },
  {
    path: '/courses/:courseId/exercises/:exerciseId',
    component: ExercisePage,
    headerVariant: 'exercise',
    wrap: true,
    exact: true,
  },
];
