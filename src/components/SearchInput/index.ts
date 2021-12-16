import template from "./template.hbs";
import WebElement from "../../lib/helpers/WebElement";

const formAction = process.env.NODE_ENV === "production" ? "/movie-components/search.html" : "/search.html";

class Hero extends WebElement {
  static get observedAttributes() {
    return ["heading", "image", "description"];
  }

  constructor() {
    super();
    this.initialize(template({ formAction }));
  }
}

export default Hero;
