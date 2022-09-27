import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import slugify from "slugify";
import { AppState } from "./store";
import shortid from "shortid";
// import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export type Session = {
  id: string;
  exerciceSlug: string;
  description?: string;
  createdAt: number;
};

// Initial state
const initialState: Session[] = [];

// Actual Slice
export const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    // Action to set the authentication status
    push(state, action: PayloadAction<Session>) {
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

export const { push } = sessionsSlice.actions;

export const selectSessions = (slug: string) => (state: AppState) =>
  state.sessions.filter((session) => session.exerciceSlug === slug);

export const selectSession = (id: string) => (state: AppState) =>
  state.sessions.find((session) => session.id === id);

export default sessionsSlice.reducer;
