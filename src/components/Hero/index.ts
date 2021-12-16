import template from "./template.hbs";
import WebElement, { OnAttributeChange } from "../../lib/helpers/WebElement";

class Hero extends WebElement {
  static get observedAttributes() {
    return ["heading", "image", "description"];
  }

  constructor() {
    super();
    this.initialize(template({}));
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
      image: ({ name, newValue }) => {
        this.elements.wrapper.style.backgroundImage = `url(${newValue})`;
      },
    },
    defaultCase: this.noop,
  };
}

export default Hero;
