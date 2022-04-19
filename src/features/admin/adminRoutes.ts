import { ElementType } from 'react';
import AdminPage from '@src/features/admin/Page';
import CoursePage from '@src/features/admin/course/Page';
import ExercisePage from '@src/features/admin/exercise/Page';
import CoursesPage from '@src/features/admin/courses/Page';
import UsersPage from '@src/features/admin/users/Page';
import UserPage from '@src/features/admin/user/Page';

export const adminRoutes: {
  path: string;
  Component: ElementType;
  headerVariant?: string;
  wrap: boolean;
  exact: boolean;
}[] = [
  {
    path: '/admin',
    Component: AdminPage,
    wrap: true,
    exact: true,
  },
  {
    path: '/admin/courses',
    Component: CoursesPage,
    wrap: true,
    exact: true,
  },
  {
    path: '/admin/courses/:courseId',
    Component: CoursePage,
    wrap: true,
    exact: true,
  },
  {
    path: '/admin/courses/:courseId/exercise/:exerciseId',
    Component: ExercisePage,
    wrap: true,
    exact: true,
  },
  {
    path: '/admin/users',
    Component: UsersPage,
    wrap: true,
    exact: true,
  },
  {
    path: '/admin/users/:userId',
    Component: UserPage,
    wrap: true,
    exact: true,
  },
];
