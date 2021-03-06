import { createSlice } from '@reduxjs/toolkit';
import { getExerciseById } from '../actions/exercises.actions';

const initialState: {
  exercise: {
    id: number;
    type: string;
    is_graph_required: boolean;
    multy_console: boolean;
    presentation_url: string;
  };

  code: string;

  completed: boolean;
  error: string;

  type: string;
  stackType: string;

  xp: number;

  quizVariants: any[];

  ranging: {
    baskets: any[];
    orderIds?: string;
  };

  hints: {
    feedback: boolean;
    hintUsefulness: boolean;

    hint: {
      used: boolean;
      content: string;
      value: number;
    };
    solution: {
      used: boolean;
      content: string;
      value: number;
    };
  };
} = {
  exercise: {
    id: NaN,
    type: '',
    is_graph_required: false,
    multy_console: false,
    presentation_url: '',
  },

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
    feedback: false,
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
};

export const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
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

      if ((exercise.type === 'quiz' || exercise.type === 'quiz_with_script') && exercise.answers) {
        state.quizVariants = exercise.answers.map((answer: any) => ({
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
          baskets: exercise.basckets.basckets.map((e: any) => ({
            id: `board-${e.id}`,
            label: e.title,
            isMain: e.is_main,
            items:
              e.items?.map((u: any) => ({
                id: `item-${u.id}`,
                basketId: `board-${u.bascket_id}`,
                label: u.text,
                errorMessage: u.error_message,
              })) || [],
          })),
        };
      }

      if (exercise.type === 'single_bascket') {
        state.ranging = {
          orderIds: exercise.ids_order,
          baskets: [
            {
              id: `board-${exercise.basckets.basckets[0].id}`,
              label: exercise.basckets.basckets[0].title,
              isSingle: true,
              isIdent: exercise.statements.filter((e: any) => e.spaces_count > 0).length > 0,
              limit: Math.max(...exercise.statements.map((e: any) => e.spaces_count)),
              items: exercise.statements.map((e: any) => ({
                id: `item-${e.id}`,
                label: e.text,
                spaces: e.spaces_count,
                currentSpaces: 0,
                errorMessage: e.error_message,
                number: e.number,
              })),
            },
          ],
        };
      }

      state.hints = {
        feedback: false,
        hintUsefulness: false,
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

    updateBaskets: (state, action) => {
      state.ranging.baskets = action.payload;
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
        state.error = '???????????????? ??????????';
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
    [getExerciseById.fulfilled.type]: (state, action) => {
      if (action.payload.type === 'bullet_point_exercise') {
        exerciseSlice.caseReducers.put(state, {
          payload: action.payload.nested_exercises[0],
        } as any);
      } else {
        exerciseSlice.caseReducers.put(state, action);
      }
    },
  },
});
