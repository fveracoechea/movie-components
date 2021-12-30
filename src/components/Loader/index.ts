import WebElement from "../../lib/WebElement";
import css from "./styles.scss";
import html from "./template.html";

class Loader extends WebElement {
  constructor() {
    super();
    this.initialize(html, css);
  }
}

export default Loader;
