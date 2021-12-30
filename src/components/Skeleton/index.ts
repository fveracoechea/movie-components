import html from "./template.html";
import css from "./styles.scss";
import WebElement, { OnAttributeChange } from "../../lib/WebElement";


const types = ["h2", "h3", "h4", "p", "img"];

class Skeleton extends WebElement {
  static get observedAttributes() {
    return ["variant"];
  }
  constructor() {
    super();
    this.initialize(html, css);
    this.setElementByClass("skeleton");
  }

  onAttributeChange: OnAttributeChange = {
    defaultCase: this.noop,
    handlers: {
      variant: ({ newValue }) => {
        if (types.some((type) => newValue === type)) {
          this.elements.skeleton.classList.add(newValue);
        } else {
          this.elements.skeleton.classList.add("p");
        }
      },
    },
  };
}

export default Skeleton;
