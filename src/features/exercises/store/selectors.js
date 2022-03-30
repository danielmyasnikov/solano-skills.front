export const selectExerciseContext = ({ exercise }) => exercise;

export const selectExerciseType = ({ exercise }) => exercise.exercise.type;
export const selectCurrentExercise = ({ exercise }) => exercise.exercise;
export const selectExerciseId = ({ exercise }) => exercise.exercise.id;
export const selectHint = ({ exercise }) => exercise.hints.hint;
export const selectOrderIds = ({ exercise }) => exercise.ranging.orderIds;
export const selectBaskets = ({ exercise }) => exercise.ranging.baskets;
export const selectSolutionHint = ({ exercise }) => exercise.hints.solution;
export const selectHintFeedback = ({ exercise }) => exercise.hints.feedback;
export const selectQuizVariants = ({ exercise }) => exercise.quizVariants;
export const selectStackType = ({ exercise }) => exercise.stackType;

export const selectExerciseSidebar = ({ exercises }) => exercises.sidebar;
export const selectRootExercise = ({ exercises }) => exercises.exercise;
export const selectRootExerciseType = ({ exercises }) => exercises.exercise.type;
export const selectExercisesStatus = ({ exercises }) => exercises.status;
export const selectSteps = ({ exercises }) => exercises.steps;

export const selectFeedbackModal = ({ exercises }) => exercises.modals.feedback;
export const selectSignupModal = ({ exercises }) => exercises.modals.signup;
