import html from "./template.html";
import css from "./styles.scss";
import WebElement from "../../lib/WebElement";

const formAction =
  process.env.NODE_ENV === "production"
    ? "/movie-components/search.html"
    : "/search.html";

class SearchInput extends WebElement {
  constructor() {
    super();
    this.initialize(html, css);
    this.getElement("#search-form", 'form');
    this.elements.form.setAttribute('action', formAction)
  }
}

export default SearchInput;
