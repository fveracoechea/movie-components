import html from "./template.html";
import css from "./styles.scss";
import WebElement from "../../lib/WebElement";

class MovieLoader extends WebElement {
  constructor() {
    super();
    this.initialize(html, css);
  }
}

export default MovieLoader;
