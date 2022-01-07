import html from "./template.html";
import css from "./styles.scss";
import WebElement from "../../lib/WebElement";
import { OnStateChange } from "../../lib/WebElement";
import { KeywordsEntity } from "../../lib/types/Keywords";
import { removeAllChildNodes } from "../../lib/helpers/elements";

class MovieKeywords extends WebElement {
  constructor() {
    super();
    this.initialize(html, css);

    this.toKeywordItem = this.toKeywordItem.bind(this);
  }

  connectedCallback() {
    this.subscribe("keywords", "movie.keywords");
  }

  onStateChange: OnStateChange = (key, value) => {
    if (key === "keywords" && Array.isArray(value) && value.length > 0) {
      this.addKeywords(value as KeywordsEntity[]);
    }
  };

  toKeywordItem(item: KeywordsEntity) {
    const li = document.createElement("li");
    li.textContent = item.name;
    li.id = `keyword:${item.id}`;
    return li;
  }

  addKeywords(data: KeywordsEntity[]) {
    removeAllChildNodes(this.$.list);
    data.map(this.toKeywordItem).forEach((li) => this.$.list.appendChild(li));
  }
}

export default MovieKeywords;
