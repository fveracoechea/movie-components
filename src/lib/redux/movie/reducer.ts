import { Movie } from "../../types/Movie";
import { Credits } from "../../types/Credits";
import { KeywordsEntity } from "../../types/Keywords";
import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { Reviews } from "../../types/Reviews";

export type MovieState = {
  status: "idle" | "loading" | "done";
  data: Movie | null;
  keywords: KeywordsEntity[] | null;
  credits: Credits | null;
  reviews: Reviews | null;
};

export const initialState: MovieState = {
  status: "idle",
  data: null,
  keywords: null,
  credits: null,
  reviews: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(actions.fetchMovieById.pending, (state, { payload }) => {
      state.status = "loading";
    })
    .addCase(actions.fetchMovieById.fulfilled, (state, { payload }) => {
      state.data = payload.data;
      state.credits = payload.credits;
      state.keywords = payload.keywords;
      state.status = "done";
    })
    .addCase(actions.fetchReviewsById.fulfilled, (state, { payload }) => {
      state.reviews = payload;
    })
    .addCase(actions.loadingUpdated, (state, { payload }) => {
      state.status = payload.loading ? "loading" : "done";
    });
});
