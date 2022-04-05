import ExercisePage from '@src/features/exercises/Page';
import Profile from '@src/features/profile';
import { CoursesPage } from '@src/features/courses/pages/Courses';
import { CoursePage } from '@src/features/courses/pages/Course';
import CertificatesPage from '@src/features/certificates/pages/Certificates';
import CertificatePage from '@src/features/certificates/pages/Certificate';
import { HomePage } from '@components/landings/HomePage';
import { TariffsPage } from '@components/landings/TariffsPage';
import { LearningPage } from '@components/landings/LearningPage';
import { Registration } from '@components/auth/signUp';
import { Authorization } from '@components/auth/authorization';
import { PaymentPage } from '@src/features/payment/Page';
import SkillsPage from '@src/features/skills/pages/SkillsPage';
import SkillPage from '@src/features/skills/pages/SkillPage';
import ProfessionsPage from '@src/features/professions/pages/ProfessionsPage';
import ProfessionPage from '@src/features/professions/pages/ProfessionPage';
import { ProgressPage } from '@components/progressPage';
import Settings from '@src/features/profile/settings';
import { PasswordResetPage } from '@components/auth/forgotPassword/passwordResetPage';
import { OnBoardPage } from '@src/features/onBoard';
import { SuccessPayment } from '@src/features/payment/SuccessPayment';

import { Instructors } from '@src/features/instructors';

import { FailPaymentPage } from '@src/features/payment/Fail';
import { ElementType } from 'react';
import { AboutPage } from '@components/landings/AboutPage';
import { KnowledgePage } from '@components/landings/KnowledgePage';

export const routes: {
  path: string;
  Component: ElementType;
  headerVariant?: string;
  wrap: boolean;
  exact: boolean;
}[] = [
  {
    path: '/',
    Component: HomePage,
    wrap: false,
    exact: true,
  },
  {
    path: '/tariffs',
    Component: TariffsPage,
    wrap: false,
    exact: true,
  },
  {
    path: '/knowledge/:tab?',
    Component: KnowledgePage,
    wrap: false,
    exact: true,
  },
  {
    path: '/learning',
    Component: LearningPage,
    wrap: false,
    exact: true,
  },
  {
    path: '/courses',
    Component: CoursesPage,
    wrap: true,
    exact: true,
  },
  {
    path: '/about',
    Component: AboutPage,
    wrap: false,
    exact: true,
  },
  {
    path: '/failed-payment',
    Component: FailPaymentPage,
    wrap: true,
    exact: true,
  },
  {
    path: '/skills',
    Component: SkillsPage,
    wrap: true,
    exact: true,
  },
  {
    path: '/skills/:skillId',
    Component: SkillPage,
    wrap: true,
    exact: true,
  },
  {
    path: '/reset-password/:resetToken',
    Component: PasswordResetPage,
    wrap: false,
    exact: true,
  },
  {
    path: '/professions',
    Component: ProfessionsPage,
    wrap: true,
    exact: true,
  },
  {
    path: '/professions/:professionId',
    Component: ProfessionPage,
    wrap: true,
    exact: true,
  },
  {
    path: '/settings',
    Component: Settings,
    wrap: true,
    exact: true,
  },
  {
    path: '/sign-in',
    Component: Authorization,
    wrap: false,
    exact: true,
  },
  {
    path: '/sign-up',
    Component: Registration,
    wrap: false,
    exact: true,
  },
  {
    path: '/profile',
    Component: Profile,
    wrap: true,
    exact: true,
  },
  {
    path: '/progress',
    Component: ProgressPage,
    wrap: true,
    exact: true,
  },
  // {
  //   path: '/onBoard',
  //   Component: OnBoardPage,
  //   wrap: false,
  //   exact: true,
  // },
  {
    path: '/certificates',
    Component: CertificatesPage,
    wrap: true,
    exact: true,
  },
  {
    path: '/instructors',
    Component: Instructors,
    wrap: true,
    exact: true,
  },
  {
    path: '/certificates/:certificateId',
    Component: CertificatePage,
    wrap: true,
    exact: true,
  },
  {
    path: '/courses/:courseId',
    Component: CoursePage,
    wrap: true,
    exact: true,
  },
  {
    path: '/courses/:courseId/exercises/:exerciseId',
    Component: ExercisePage,
    headerVariant: 'exercise',
    wrap: true,
    exact: true,
  },

  {
    path: '/payment',
    Component: PaymentPage,
    wrap: false,
    exact: true,
  },
  {
    path: '/success-payment',
    Component: SuccessPayment,
    wrap: false,
    exact: true,
  },
];
