import ExercisePage from './components/exercise'

export const routes = [
  {
    path: '/courses/:courseId/exercises/:exerciseId',
    component: ExercisePage,
    exact: true,
  },
];
