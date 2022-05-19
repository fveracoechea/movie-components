import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";

export type SearchState = {
  status: "idle" | "loading" | "done";
  searchType: "movie" | "person";
  data: any | null;
  query: string;
};

export const initialState: SearchState = {
  status: "idle",
  data: null,
  searchType: "movie",
  query: "",
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(actions.fetchSearch.pending, (state) => {
      state.status = "loading";
    })
    .addCase(actions.fetchSearch.fulfilled, (state, { payload }) => {
      state.query = payload.query;
      state.searchType = payload.searchType;
      state.data = payload.results;
    });
});
