import template from "./template.hbs";
import css from "./styles.scss";
import WebElement from "../../lib/WebElement";

const html = template({ css });

class MovieLoader extends WebElement {
  constructor() {
    super();
    this.initialize(html);
  }
}

export default MovieLoader;
