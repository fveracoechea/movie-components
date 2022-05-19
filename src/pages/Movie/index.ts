import { defineComponents } from "../../components";
import { store } from "../../lib/redux/store";
import { isProduction } from "../../lib/helpers/elements";
import { fetchMovieById } from "../../lib/redux/movie/actions";

const {} = defineComponents();

const search = new URLSearchParams(window.location.search);
const id = search.get("id");

if (id) {
  store.dispatch(fetchMovieById({ id }));
} else {
  const notFound = isProduction() ? "/movie-components/404.html" : "/404.html";
  window.location.replace(notFound);
}
