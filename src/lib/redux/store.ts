import { configureStore } from "@reduxjs/toolkit";
// reducers
import movie from "./movie/reducer";
import search from "./search/reducer";

export const store = configureStore({
  reducer: {
    movie,
    search,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
