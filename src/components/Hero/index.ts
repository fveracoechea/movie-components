import template from "./template.hbs";
import css from './styles.scss'
import WebElement, { OnAttributeChange } from "../../lib/helpers/WebElement";

const html = template({ css })

class Hero extends WebElement {
  static get observedAttributes() {
    return ["heading", "image", "description"];
  }

  constructor() {
    super();
    this.initialize(html);
    this.setElementByClass("heading");
    this.setElementByClass("wrapper");
    this.setElementByClass("description");
  }

  onAttributeChange: OnAttributeChange = {
    handlers: {
      heading: ({ name, newValue }) => {
        this.elements.heading.textContent = newValue;
      },
      description: ({ name, newValue }) => {
        this.elements.description.textContent = newValue;
      },
      image: ({ newValue }) => {
        this.elements.wrapper.style.backgroundImage = `url(${newValue})`;
      }
    },
    defaultCase: this.noop,
  };

  setImage(url: string) {
    this.elements.wrapper.style.backgroundImage = `url(${url})`;
  }
}

export default Hero;
