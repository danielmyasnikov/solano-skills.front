import ExercisePage from '@src/features/exercises/Page';
import Profile from './features/profile';
import { CoursesPage } from './features/courses/pages/Courses';
import { CoursePage } from './features/courses/pages/Course';
import CertificatesPage from '@src/features/certificates/pages/Certificates';
import CertificatePage from '@src/features/certificates/pages/Certificate';
import { HomePage } from '@components/landings/HomePage';
import { TariffsPage } from '@components/landings/TariffsPage';
import { LearningPage } from '@components/landings/LearningPage';
import { Registration } from '@components/auth/signUp';
import { Authorization } from '@components/auth/authorization';
import { PaymentPage } from './features/payment/Page';
import SkillsPage from '@src/features/skills/pages/SkillsPage';
import SkillPage from '@src/features/skills/pages/SkillPage';
import ProfessionsPage from '@src/features/professions/pages/ProfessionsPage';
import ProfessionPage from '@src/features/professions/pages/ProfessionPage';
import { ProgressPage } from '@components/progressPage';
import Settings from './features/profile/settings';
import { PasswordResetPage } from '@components/auth/forgotPassword/passwordResetPage';
import { OnBoardPage } from './features/onBoard';
import { SuccessPayment } from '@src/features/payment/SuccessPayment';
import { FailPaymentPage } from '@src/features/payment/Fail';

export const routes = [
  {
    path: '/',
    component: HomePage,
    wrap: false,
    exact: true,
  },
  {
    path: '/tariffs',
    component: TariffsPage,
    wrap: false,
    exact: true,
  },
  {
    path: '/learning',
    component: LearningPage,
    wrap: false,
    exact: true,
  },
  {
    path: '/courses',
    component: CoursesPage,
    wrap: true,
    exact: true,
  },
  {
    path: '/failed-payment',
    component: FailPaymentPage,
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
    path: '/reset-password/:resetToken',
    component: PasswordResetPage,
    wrap: false,
    exact: true,
  },
  {
    path: '/professions',
    component: ProfessionsPage,
    wrap: true,
    exact: true,
  },
  {
    path: '/professions/:professionId',
    component: ProfessionPage,
    wrap: true,
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
    path: '/sign-up',
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
    path: '/certificates/:certificateId',
    component: CertificatePage,
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
  {
    path: '/success-payment',
    component: SuccessPayment,
    wrap: false,
    exact: true,
  },
];
