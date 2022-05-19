// dependencies
import { fromFetch } from "rxjs/fetch";
// types
import { Discover } from "./types/Discover";
import { Keyword } from "./types/Keywords";
import { Movie } from "./types/Movie";
// helpers
import { toQueryString } from "./helpers/elements";
import { Credits } from "./types/Credits";
import { Reviews } from "./types/Reviews";

const tmdb = {
  get(path: string, signal?: AbortSignal) {
    return fetch(`${process.env.TMDB_API_URL}${path}`, {
      cache: "default",
      signal,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_AUTH_TOKEN}`,
      },
    }).then((response) => response.json());
  },
  fetch(path: string) {
    return fromFetch(`${process.env.TMDB_API_URL}${path}`, {
      selector: (response) => response.json(),
      cache: "default",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_AUTH_TOKEN}`,
      },
    });
  },
  image(path: string, width = "w500") {
    return `${process.env.TMDB_IMAGE_URL}/${width}${path}`;
  },
  search(type: "movie" | "person", params: Record<string, string>, signal?: AbortSignal) {
    return tmdb.get(`/search/${type}${toQueryString(params)}`, signal);
  },
  movie: {
    reviews(movieID: string): Promise<Reviews> {
      return tmdb.get(`/movie/${movieID}/reviews`);
    },
    credits(movieID: string): Promise<Credits> {
      return tmdb.get(`/movie/${movieID}/credits`);
    },
    findOne(movieID: string): Promise<Movie> {
      return tmdb.get(`/movie/${movieID}`);
    },
    keywords(movieID: string): Promise<Keyword> {
      return tmdb.get(`/movie/${movieID}/keywords`);
    },
    discover(query: Record<string, string>) {
      return tmdb.get(`/discover/movie${toQueryString(query)}`);
    },
    mostPopular(): Promise<Discover> {
      return tmdb.get("/movie/popular");
    },
    nowPlaying(query: Record<string, string> = {}): Promise<Discover> {
      return tmdb.get(`/movie/now_playing${toQueryString(query)}`);
    },
    topRated(query: Record<string, string> = {}): Promise<Discover> {
      return tmdb.get(`/movie/top_rated${toQueryString(query)}`);
    },
    upComing(query: Record<string, string> = {}): Promise<Discover> {
      return tmdb.get(`/movie/upcoming${toQueryString(query)}`);
    },
  },
};

export default tmdb;
