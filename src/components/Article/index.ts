import WebElement from "../../lib/WebElement";
import html from "./template.html";

class Article extends WebElement {
  constructor() {
    super();
    this.initialize(html);
  }
}

export default Article;
