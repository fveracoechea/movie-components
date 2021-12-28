import { defineComponents } from "../../components";
import store from "../../lib/store";
import { isProduction } from "../../lib/helpers/elements";

const {} = defineComponents();

const search = new URLSearchParams(window.location.search);
const id = search.get("id");

if (id) {
  store.dispatch({ type: "movie/fetch", payload: { id } });
} else {
  const notFound = isProduction() ? "/movie-components/404.html" : "/404.html";
  window.location.replace(notFound);
}
