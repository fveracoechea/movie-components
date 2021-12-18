const toQueryString = (query: Record<string, string>) => {
  return Object.entries(query).reduce((qs, [key, value], i, entries) => {
    return i === entries.length - 1
      ? `${qs}${key}=${value}`
      : `${qs}${key}=${value}&`;
  }, "?");
};

const tmdb = {
  get(path: string) {
    return fetch(`${process.env.TMDB_API_URL}${path}`, {
      cache: "default",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_AUTH_TOKEN}`,
      },
    }).then((response) => response.json());
  },
  image(path: string, width = "w500") {
    return `${process.env.TMDB_IMAGE_URL}/${width}${path}`;
  },
  movie: {
    discover(query: Record<string, string>) {
      return tmdb.get(`/discover/movie${toQueryString(query)}`);
    },
    mostPopular() {
      return tmdb.get("/discover/movie?sort_by=popularity.desc");
    },
  },
};

export default tmdb;
