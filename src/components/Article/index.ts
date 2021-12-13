import WebElement from "../../lib/helpers/WebElement";
import html from "./template.html";

class Article extends WebElement {
  constructor() {
    super();
    this.initialize(html);
  }
}

export default Article;
