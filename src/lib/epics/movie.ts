import { Epic } from "../web-epic/types";
import { MovieProxy } from "../types/MovieProxy";
import { mergeMap, from, tap, map } from "rxjs";
import tmdb from "../tmdb";
import { isProduction } from "../helpers/elements";

export type Keyword = { id: number; name: string };

export type MovieEpic = {
  status: "idle" | "loading" | "done";
  data: MovieProxy | null;
  keywords: Keyword[] | null;
};

export const onError = () => {
  const notFound = isProduction() ? "/movie-components/404.html" : "/404.html";
  window.location.replace(notFound);
};

type FetchPayload = {
  id: string;
};

export const initialState: MovieEpic = {
  status: "idle",
  data: null,
  keywords: null,
};

export const epic: Epic<MovieEpic, null> = ({
  ofType,
  merge,
  dispatch,
}) => {
  // fetch action
  const fetch$ = ofType<FetchPayload>("movie/fetch").pipe(
    tap(() => dispatch({ type: "movie/loading" })),
    mergeMap(([{ payload }]) => from(tmdb.movie.findOne(payload!.id))),
    mergeMap((data) =>
      from(tmdb.movie.keywords(String(data.id))).pipe(
        map(({ keywords }) => ({
          status: "done" as const,
          data,
          keywords,
        }))
      )
    )
  );
  // loading actions
  const loading$ = ofType("movie/loading").pipe(
    map(([_, state]) => ({ ...state, status: "loading" as const }))
  );

  return merge(fetch$, loading$);
};
