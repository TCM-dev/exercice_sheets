import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import slugify from "slugify";
import { AppState } from "./store";
import shortid from "shortid";
// import { HYDRATE } from "next-redux-wrapper";

// Initial state
const initialState: Sheets.Record[] = [];

type PushRecordPayload = Sheets.RecordFormDTO & {
  exerciceSlug: string;
};

// Actual Slice
export const recordsSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    // Action to set the authentication status
    pushRecord(state, action: PayloadAction<PushRecordPayload>) {
      state.push({
        ...action.payload,
        createdAt: new Date().getTime(),
        id: shortid.generate(),
      });
    },

    updateRecord(
      state,
      action: PayloadAction<{ id: string; form: Sheets.RecordFormDTO }>
    ) {
      return state.map((record) => {
        if (record.id === action.payload.id) {
          return { ...record, ...action.payload.form };
        }
        return record;
      });
    },

    removeRecord(state, action: PayloadAction<string>) {
      return state.filter((record) => record.id !== action.payload);
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

export const { pushRecord, updateRecord, removeRecord } = recordsSlice.actions;

export const selectRecords = (slug: string) => (state: AppState) =>
  state.records.filter((record) => record.exerciceSlug === slug);

export const selectRecord = (id: string) => (state: AppState) =>
  state.records.find((record) => record.id === id);

export default recordsSlice.reducer;
