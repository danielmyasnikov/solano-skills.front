export const selectExerciseSidebar = ({ exercises }: RootState) => exercises.sidebar;
export const selectRootExercise = ({ exercises }: RootState) => exercises.exercise;
// @ts-ignore  TODO
export const selectRootExerciseType = ({ exercises }: RootState) => exercises.exercise.type;
export const selectExercisesStatus = ({ exercises }: RootState) => exercises.status;
export const selectSteps = ({ exercises }: RootState) => exercises.steps;
