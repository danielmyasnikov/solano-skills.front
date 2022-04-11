export const selectExerciseContext = ({ exercise }: RootState) => exercise;

export const selectExerciseType = ({ exercise }: RootState) => exercise.exercise.type;
export const selectCurrentExercise = ({ exercise }: RootState) => exercise.exercise;
export const selectExerciseId = ({ exercise }: RootState) => exercise.exercise.id;
export const selectHint = ({ exercise }: RootState) => exercise.hints.hint;
export const selectOrderIds = ({ exercise }: RootState) => exercise.ranging.orderIds;
export const selectBaskets = ({ exercise }: RootState) => exercise.ranging.baskets;
export const selectSolutionHint = ({ exercise }: RootState) => exercise.hints.solution;
export const selectHintFeedback = ({ exercise }: RootState) => exercise.hints.feedback;
export const selectQuizVariants = ({ exercise }: RootState) => exercise.quizVariants;
export const selectStackType = ({ exercise }: RootState) => exercise.stackType;
