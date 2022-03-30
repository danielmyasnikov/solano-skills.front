import { createSlice } from '@reduxjs/toolkit';
import { getExerciseById } from '@src/features/exercises/store/actions';
import { reorder } from '@src/features/exercises/utils/dnd';

export const exerciseSlice = createSlice({
  name: 'exercise',
  initialState: {
    exercise: null,

    code: '',

    completed: false,
    error: '',

    type: '',
    stackType: '',

    xp: 0,

    quizVariants: [],

    ranging: {
      baskets: [],
      orderIds: '',
    },

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

      state.code = exercise.sample_code;

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
      if (exercise.type === 'multiple_bascket') {
        state.ranging = {
          baskets: exercise.basckets.map((e) => ({
            id: `board-${e.id}`,
            label: e.title,
            isMain: e.is_main,
            items: e.is_main
              ? exercise.statements.map((u) => ({
                  id: `item-${u.id}`,
                  basketId: `board-${u.bascket_id}`,
                  label: u.text,
                  errorMessage: u.error_message,
                }))
              : [],
          })),
        };
      }
      if (exercise.type === 'single_bascket') {
        state.ranging = {
          baskets: exercise.basckets.map((e) => ({
            id: `board-${e.id}`,
            label: e.title,
            isSingle: e.is_main,
            items: exercise.statements.map((u) => ({
              id: `item-${u.id}`,
              basketId: `board-${u.bascket_id}`,
              label: u.text,
              errorMessage: u.error_message,
            })),
          })),
        };
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

    updateErrorIds: (state, action) => {
      state.ranging.items.map((e, i) => ({
        ...e,
        isError: action.payload.find((e) => e === i + 1) !== undefined,
      }));
    },
    updateItems: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;

      state.ranging.items = reorder(
        state.ranging.items.map((e) => ({ ...e, isError: false })),
        sourceIndex,
        destinationIndex,
      );
    },
    updateCode: (state, action) => {
      state.code = action.payload;
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
