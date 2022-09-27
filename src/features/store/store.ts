import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { exercicesSlice } from "./exercisesSlice";
import { recordsSlice } from "./recordsSlice";
import { sessionsSlice } from "./sessionsSlice";
// import { createWrapper } from "next-redux-wrapper";

const rootReducer = combineReducers({
  [exercicesSlice.name]: exercicesSlice.reducer,
  [recordsSlice.name]: recordsSlice.reducer,
  [sessionsSlice.name]: sessionsSlice.reducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const store = makeStore();
export const persistor = persistStore(store);

// export const wrapper = createWrapper<AppStore>(makeStore);
