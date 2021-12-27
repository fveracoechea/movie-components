import template from "./template.hbs";
import css from './styles.scss'
import WebElement from "../../lib/WebElement";

const formAction =
  process.env.NODE_ENV === "production"
    ? "/movie-components/search.html"
    : "/search.html";

const html = template({ formAction, css });

class SearchInput extends WebElement {
  static get observedAttributes() {
    return ["heading", "image", "description"];
  }

  constructor() {
    super();
    this.initialize(html);
  }
}

export default SearchInput;
