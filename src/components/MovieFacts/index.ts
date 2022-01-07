import html from "./template.html";
import css from "./styles.scss";
import WebElement from "../../lib/WebElement";
import { OnStateChange } from "../../lib/WebElement";
import { removeAllChildNodes } from "../../lib/helpers/elements";

class MovieFacts extends WebElement {
  constructor() {
    super();
    this.initialize(html, css);
  }

  connectedCallback() {
    this.subscribe("status", "movie.data.status");
    this.subscribe("original_language", "movie.data.original_language");
    this.subscribe("budget", "movie.data.budget");
    this.subscribe("revenue", "movie.data.revenue");
  }

  onStateChange: OnStateChange = (key, value) => {
    this.renderData(key, value as string);
  };

  private renderData(key: string, value: string) {
    if (value) {
      removeAllChildNodes(this.$[key]);
      const p = document.createElement("p");
      if (Number(value)) {
        p.textContent =
          "$" +
          Number(value)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,");
      } else {
        p.textContent = value;
      }
      this.$[key].appendChild(p);
    }
  }
}

export default MovieFacts;
