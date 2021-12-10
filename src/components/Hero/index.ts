import template from "./template.hbs";
import WebComponent from "../../lib/helpers/WebComponent";

type State = {
  heading: string;
  description: string;
  image: string;
};

class Hero extends WebComponent<State> {
  static get observedAttributes() {
    return ["heading", "image", "description"];
  }

  constructor() {
    super();
    this.template = template;
  }

  connectedCallback() {
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.onAttributeChange(name, oldValue, newValue);
  }
}

export default Hero;
