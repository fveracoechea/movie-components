import WebComponent from "../../lib/helpers/WebComponent";
import template from "./template.hbs";

class Article extends WebComponent {
  constructor() {
    super();
    this.template = template;
  }
}

export default Article;
