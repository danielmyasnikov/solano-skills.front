import ExercisePage from '@components/exercise';
import Profile from '@components/profile';
import { CoursesPage } from '@components/coursesPage';
import { CoursePage } from '@components/coursePage';
import { CertificatesPage } from '@components/certificatesPage';
import { StatementPage } from '@components/statementPage';
import { OnBoardPage } from '@components/onBoard';
import { HomePage } from './components/homePage';
import { Registration } from './components/auth/registration';
import { Authorization } from './components/auth/authorization';
import { PaymentPage } from './components/paymentPage';
import { SkillsPage } from './components/skillsPage';
import { SkillPage } from './components/skillPage';
import { ProgressPage } from './components/progressPage';
import Settings from './components/settings';

export const routes = [
  {
    path: '/courses',
    component: CoursesPage,
    wrap: true,
    exact: true,
  },
  {
    path: '/skills',
    component: SkillsPage,
    wrap: true,
    exact: true,
  },
  {
    path: '/skills/:skillId',
    component: SkillPage,
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
    path: '/settings',
    component: Settings,
    wrap: true,
    exact: true,
  },
  {
    path: '/sign-in',
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
    path: '/progress',
    component: ProgressPage,
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
    path: '/certificates',
    component: CertificatesPage,
    wrap: true,
    exact: true,
  },
  {
    path: '/certificates/:userId/:courseId',
    component: StatementPage,
    wrap: true,
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
  {
    path: '/payment',
    component: PaymentPage,
    wrap: false,
    exact: true,
  },
];
