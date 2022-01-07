// types
import { Discover } from "./types/Discover";
import { Keyword } from "./types/Keywords";
import { Movie } from "./types/Movie";
// helpers
import { toQueryString } from "./helpers/elements";
import { Credits } from './types/Credits';

const tmdb = {
  get(path: string) {
    return fetch(`${process.env.TMDB_API_URL}${path}`, {
      cache: "default",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_AUTH_TOKEN}`
      }
    }).then((response) => response.json());
  },
  image(path: string, width = "w500") {
    return `${process.env.TMDB_IMAGE_URL}/${width}${path}`;
  },
  movie: {
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
    }
  }
};

export default tmdb;
