import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import slugify from "slugify";
import { AppState } from "./store";
import shortid from "shortid";
// import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export type Record = {
  id: string;
  exerciceSlug: string;
  description?: string;
  amount: number;
  weight: number;
  createdAt: number;
};

// Initial state
const initialState: Record[] = [];

// Actual Slice
export const recordsSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    // Action to set the authentication status
    push(state, action: PayloadAction<Record>) {
      state.push({
        ...action.payload,
        createdAt: new Date().getTime(),
        id: shortid.generate(),
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

export const { push } = recordsSlice.actions;

export const selectRecords = (slug: string) => (state: AppState) =>
  state.records.filter((record) => record.exerciceSlug === slug);

export const selectRecord = (id: string) => (state: AppState) =>
  state.records.find((record) => record.id === id);

export default recordsSlice.reducer;
