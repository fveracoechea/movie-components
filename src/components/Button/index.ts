import WebElement from "../../lib/WebElement";
import css from "./styles.scss";
import html from "./template.html";

class Button extends WebElement {
  clickEvent: CustomEvent = new CustomEvent("button-click");

  constructor() {
    super();
    this.initialize(html, css);
    const $button = this.shadowRoot?.querySelector("button");
    if ($button) {
      this.elements.button = $button;
    }

    this.onClick = this.onClick.bind(this);
  }

  connectedCallback() {
    this.clickEvent = new CustomEvent("button-click", {
      detail: {
        name: this.getAttribute("name"),
      },
    });
    if (this.getAttribute("active") === "true") {
      this.activate();
    }
    this.elements.button.addEventListener("click", this.onClick);
  }

  disconnectedCallback() {
    this.elements.button.removeEventListener("click", this.onClick);
  }

  onClick() {
    this.dispatchEvent(this.clickEvent);
  }

  isActive() {
    return this.elements.button.classList.contains("active");
  }

  activate() {
    if (!this.isActive()) {
      this.elements.button.classList.add("active");
    }
  }

  inactivate() {
    this.elements.button.classList.remove("active");
  }
}

export default Button;
