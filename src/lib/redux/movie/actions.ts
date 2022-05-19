import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import tmdb from "../../tmdb";
import { Credits } from "../../types/Credits";
import { KeywordsEntity } from "../../types/Keywords";
import { Movie } from "../../types/Movie";
import { Reviews } from "../../types/Reviews";

type MovieResultData = {
  data: Movie;
  keywords: KeywordsEntity[] | null;
  credits: Credits;
};

// Actions
export const movieAdded = createAction<MovieResultData>("movie/added");

export const loadingUpdated = createAction<{ loading: boolean }>(
  "movie/loadingUpdated"
);

export const reviewsFetched = createAction<{ reviews: any }>(
  "movie/loadingUpdated"
);

// Async Actions

export const fetchMovieById = createAsyncThunk<MovieResultData, { id: string }>(
  "movie/fetchById",
  async ({ id }) => {
    const data = await tmdb.movie.findOne(id);
    const { keywords = [] } = await tmdb.movie.keywords(id);
    const credits = await tmdb.movie.credits(id);

    return { data, keywords, credits };
  }
);

export const fetchReviewsById = createAsyncThunk<Reviews, { id: string }>(
  "movie/fetchReviewsById",
  async ({ id }) => {
    const reviews = await tmdb.movie.reviews(id);

    return reviews;
  }
);
