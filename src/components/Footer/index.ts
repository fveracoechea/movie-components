import html from "./template.html";
import css from './styles.scss'
import WebElement from "../../lib/WebElement";


class Footer extends WebElement {
  static get observedAttributes() {
    return ["heading", "image", "description"];
  }

  constructor() {
    super();
    this.initialize(html, css);
  }
}

export default Footer;
