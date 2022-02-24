import { defineComponents } from "../../components";
import { addStyles } from "../../lib/helpers/elements";
import { fetchSearch } from "../../lib/redux/search/actions";
import { store } from "../../lib/redux/store";
import css from "./styles.scss";

addStyles(css);
defineComponents();

const search = new URLSearchParams(window.location.search);
const query = search.get("query");

if (query) {
  store.dispatch(fetchSearch({ query, searchType: "movie" }));
}

window.addEventListener("load", () => {
  const searchComponent = document.querySelector("mc-search-input") as any;
  if (searchComponent) {
    searchComponent.setPlaceholder("Type what are you looking for...");
  }
});
