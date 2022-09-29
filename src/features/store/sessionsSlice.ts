import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import slugify from "slugify";
import { AppState } from "./store";
import shortid from "shortid";

// Initial state
const initialState: Sheets.Session[] = [];

type PushSessionPayload = Sheets.SessionFormDTO & {
  exerciceSlug: string;
};

// Actual Slice
export const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    // Action to set the authentication status
    pushSession(state, action: PayloadAction<PushSessionPayload>) {
      state.push({
        ...action.payload,
        createdAt: new Date().getTime(),
        id: shortid.generate(),
      });
    },

    updateSession(
      state,
      action: PayloadAction<{ id: string; form: Sheets.SessionFormDTO }>
    ) {
      return state.map((session) => {
        if (session.id === action.payload.id) {
          return { ...session, ...action.payload.form };
        }
        return session;
      });
    },

    removeSession(state, action: PayloadAction<string>) {
      return state.filter((session) => session.id !== action.payload);
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

export const { pushSession, updateSession, removeSession } =
  sessionsSlice.actions;

export const selectSessions = (slug: string) => (state: AppState) =>
  [...state.sessions]
    .filter((session) => session.exerciceSlug === slug)
    .sort((sessionA, sessionB) => sessionB.createdAt - sessionA.createdAt);

export const selectSession = (id: string) => (state: AppState) =>
  state.sessions.find((session) => session.id === id);

export default sessionsSlice.reducer;
