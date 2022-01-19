import { Epic } from "../web-epic/types";
import { Movie } from "../types/Movie";
import { KeywordsEntity } from "../types/Keywords";
import { mergeMap, tap, map, combineLatest, from } from "rxjs";
import tmdb from "../tmdb";
import { Credits } from "../types/Credits";
import { isProduction } from "../helpers/elements";

export type MovieEpic = {
  status: "idle" | "loading" | "done";
  data: Movie | null;
  keywords: KeywordsEntity[] | null;
  credits: Credits | null;
  reviews: any;
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
  credits: null,
  reviews: null,
};

export const epic: Epic<MovieEpic> = ({ ofType, merge, dispatch }) => {
  // fetch action
  const fetch$ = ofType<FetchPayload>("movie/fetch").pipe(
    tap(() => dispatch({ type: "movie/loading" })),
    mergeMap(([{ payload }]) =>
      combineLatest({
        data: tmdb.movie.findOne(payload!.id),
        keywords: tmdb.movie
          .keywords(payload!.id)
          .then(({ keywords }) => keywords || []),
        credits: tmdb.movie.credits(payload!.id),
        reviews: Promise.resolve(null),
      })
    ),
    map((state) => ({
      ...state,
      status: "done" as const,
    }))
  );

  // load reviews

  const reviews$ = ofType<FetchPayload>("movie/reviews").pipe(
    mergeMap(([{ payload }, state]) =>
      from(tmdb.movie.reviews(payload!.id)).pipe(
        map((reviews) => ({ ...state, reviews }))
      )
    )
  );

  // loading actions
  const loading$ = ofType("movie/loading").pipe(
    map(([_, state]) => ({ ...state, status: "loading" as const }))
  );

  return merge(fetch$, loading$, reviews$);
};
