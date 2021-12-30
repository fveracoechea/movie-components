import WebElement, { OnAttributeChange } from "../../lib/WebElement";
import css from "./styles.scss";
import html from "./template.html";

class Score extends WebElement {
  static get observedAttributes() {
    return ["value"];
  }

  constructor() {
    super();
    this.initialize(html, css);
    this.setElementByClass("pie-wrapper");
    this.setElementByClass("score-value");
  }

  onAttributeChange: OnAttributeChange = {
    handlers: {
      value: ({ newValue, oldValue }) => {
        if (
          this.elements["pie-wrapper"].classList.contains(
            `progress-${oldValue}`
          )
        ) {
          this.elements["pie-wrapper"].classList.remove(`progress-${oldValue}`);
        }
        if (
          !this.elements["pie-wrapper"].classList.contains(
            `progress-${newValue}`
          )
        ) {
          this.elements["pie-wrapper"].classList.add(`progress-${newValue}`);
        }
        this.elements["score-value"].textContent = newValue;
      },
    },
    defaultCase: this.noop,
  };
}

export default Score;
