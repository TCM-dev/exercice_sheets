import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import slugify from "slugify";
import { AppState } from "./store";
// import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export type Exercice = {
  slug: string;
  name: string;
  description?: string;
};

// Initial state
const initialState: Exercice[] = [];

// Actual Slice
export const exercicesSlice = createSlice({
  name: "exercices",
  initialState,
  reducers: {
    // Action to set the authentication status
    push(state, action: PayloadAction<Omit<Exercice, "slug">>) {
      state.push({
        ...action.payload,
        slug: slugify(action.payload.name, {
          lower: true,
        }),
      });
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

export const { push } = exercicesSlice.actions;

export const selectExercices = (state: AppState) => state.exercices;

export const selectExercice = (slug: string) => (state: AppState) =>
  state.exercices.find((exercice) => exercice.slug === slug);

export default exercicesSlice.reducer;
