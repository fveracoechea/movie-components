import template from "./template.hbs";
import css from './styles.scss'
import WebElement from "../../lib/helpers/WebElement";
import tmdbLogo from '../../images/tmdb-logo.svg'

const html = template({ tmdbLogo, css });

class Footer extends WebElement {
  static get observedAttributes() {
    return ["heading", "image", "description"];
  }

  constructor() {
    super();
    this.initialize(html);
  }
}

export default Footer;
