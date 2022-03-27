import { createSlice } from '@reduxjs/toolkit';
import { getExerciseById } from '@src/features/exercises/store/actions';

export const exerciseSlice = createSlice({
  name: 'exercise',
  initialState: {
    exercise: null,

    completed: false,
    error: '',

    type: '',
    stackType: '',

    xp: 0,

    quizVariants: [],

    hints: {
      hintUsefulness: false,

      hint: {
        used: false,
        content: '',
        value: 0,
      },
      solution: {
        used: false,
        content: '',
        value: 0,
      },
    },
  },
  reducers: {
    put: (state, action) => {
      const exercise = action.payload;

      state.exercise = exercise;

      state.completed = false;
      state.error = '';

      state.type = exercise.type;
      state.stackType = exercise.stack_type || 'python';

      state.xp = exercise.xp;

      if (exercise.type === 'quiz' && exercise.answers) {
        state.quizVariants = exercise.answers.map((answer) => ({
          id: `${answer.correct}_${answer.error}_${answer.value}`,
          correct: answer.correct,
          error: answer.error,
          content: answer.value,
          checked: false,
        }));
      } else {
        state.quizVariants = [];
      }

      state.hints = {
        feedback: false,
        hint: {
          used: false,
          content: exercise.hint,
          value: Math.ceil(exercise.xp * 0.3),
        },
        solution: {
          used: false,
          content: exercise.solution,
          value: exercise.xp - Math.ceil(exercise.xp * 0.3),
        },
      };
    },

    useHintFeedback: (state) => {
      state.hints.feedback = true;
    },
    useHint: (state) => {
      state.hints.hint.used = true;
      state.xp -= state.hints.hint.value;
    },
    useSolution: (state) => {
      state.hints.solution.used = true;
      state.xp -= state.hints.solution.value;
    },

    onQuizSelect: (state, action) => {
      state.quizVariants = state.quizVariants.map((e) => ({
        ...e,
        checked: e.id === action.payload,
      }));
    },

    onQuizAnswer: (state) => {
      const checkedVariant = state.quizVariants.find((e) => e.checked);

      if (!checkedVariant) {
        state.error = 'Выберите ответ';
      } else {
        if (checkedVariant.correct) {
          state.error = '';
          state.completed = true;
        } else {
          state.error = checkedVariant.error;
        }
      }
    },
    onComplete: (state) => {
      state.completed = true;
    },
    onError: (state, action) => {
      state.error = action.payload;
    },
  },

  extraReducers: {
    [getExerciseById.fulfilled]: (state, action) => {
      if (action.payload.type === 'bullet_point_exercise') {
        exerciseSlice.caseReducers.put(state, { payload: action.payload.nested_exercises[0] });
      } else {
        exerciseSlice.caseReducers.put(state, action);
      }
    },
  },
});
