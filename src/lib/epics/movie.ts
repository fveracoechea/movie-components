import { Epic } from "../web-epic/types";
import { MovieProxy } from "../types/MovieProxy";
import { mergeMap, from, tap } from "rxjs";
import tmdb from "../tmdb";
import { withoutFlickering } from "../helpers/fetch";
import { isProduction } from "../helpers/elements";

export type MovieEpic = {
  status: "idle" | "loading" | "done";
  data: MovieProxy | null;
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
};

const findById = (id: string) => withoutFlickering(() => tmdb.movie.findOne(id))();

export const epic: Epic<MovieEpic, null> = ({
  ofType,
  map,
  merge,
  dispatch,
}) => {
  // fetch action
  const fetch$ = ofType<FetchPayload>("movie/fetch").pipe(
    tap(() => dispatch({ type: "movie/loading" })),
    mergeMap(([{ payload }]) =>
      from(findById(payload!.id)).pipe(
        map((data) => ({
          status: "done" as const,
          data,
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
