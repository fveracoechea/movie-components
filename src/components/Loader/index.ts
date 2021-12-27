import WebElement from "../../lib/WebElement";
import css from "./styles.scss";
import template from "./template.hbs";

const items = new Array(4).fill(1).map((_, i) => i + 1);

const html = template({ css, items });

class Loader extends WebElement {
  constructor() {
    super();
    this.initialize(html);
  }
}

export default Loader;
