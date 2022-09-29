import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import slugify from "slugify";
import { AppState } from "./store";

// Initial state
const initialState: Sheets.Exercice[] = [];

// Actual Slice
export const exercicesSlice = createSlice({
  name: "exercices",
  initialState,
  reducers: {
    pushExercice(state, action: PayloadAction<Sheets.ExerciceFormDTO>) {
      state.push({
        ...action.payload,
        slug: slugify(action.payload.name, {
          lower: true,
        }),
      });
    },

    updateExercice(
      state,
      action: PayloadAction<{ slug: string; form: Sheets.ExerciceFormDTO }>
    ) {
      return state.map((exercice) => {
        if (exercice.slug === action.payload.slug) {
          return { ...exercice, ...action.payload.form };
        }
        return exercice;
      });
    },

    removeExercice(state, action: PayloadAction<string>) {
      return state.filter((exercice) => exercice.slug !== action.payload);
    },

    // // Special reducer for hydrating the state. Special case for next-redux-wrapper
    // extraReducers: {
    //   [HYDRATE]: (state, action) => {
    //     return {
    //       ...state,
    //       ...action.payload.auth,
    //     };
    //   },
    // },
  },
});

export const { pushExercice, updateExercice, removeExercice } =
  exercicesSlice.actions;

export const selectExercices = (state: AppState) =>
  [...state.exercices].sort((exerciceA, exerciceB) =>
    exerciceA.name.localeCompare(exerciceB.name)
  );

export const selectExercice = (slug: string) => (state: AppState) =>
  state.exercices.find((exercice) => exercice.slug === slug);

export default exercicesSlice.reducer;
