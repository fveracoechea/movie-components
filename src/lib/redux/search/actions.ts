import { createAsyncThunk } from "@reduxjs/toolkit";
import tmdb from "../../tmdb";
import { RootState } from "../store";

type Options = { state: RootState };

export type SearchObserver = {
  query: string;
  searchType: "movie" | "person";
  signal?: AbortSignal;
};

type SearchResult = {
  results: any;
  query: string;
  searchType: "movie" | "person";
};

// const sendSearch = debounce(tmdb.search, 200);

export const fetchSearch = createAsyncThunk<SearchResult, SearchObserver, Options>(
  "search/fetch",
  async ({ query, searchType }, thunkAPI) => {
    const results = await tmdb.search(searchType, { query }, thunkAPI.signal);

    return { results, query, searchType };
  }
);
