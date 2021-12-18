import WebElement from "../../lib/helpers/WebElement";
import template from "./template.hbs";

const html = template({})

class Article extends WebElement {
  constructor() {
    super();
    this.initialize(html);
  }
}

export default Article;
