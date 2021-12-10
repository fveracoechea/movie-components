import html from "./template.html";

const template = document.createElement("template");
template.innerHTML = html;

class SerachPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }
}

export default SerachPage;
