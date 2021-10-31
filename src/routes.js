import ExercisePage from './components/pages/exercise'

export const routes = [
  {
    path: '/courses/:courseId/exercises/:exerciseId',
    component: ExercisePage,
    exact: true,
  },
];
