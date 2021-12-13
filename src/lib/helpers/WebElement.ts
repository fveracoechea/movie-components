type Callback<A, B> = (param: A) => B;

type ChangedAttribute = {
  name: string;
  oldValue: string;
  newValue: string;
};

export type OnAttributeChange = {
  handlers: Record<string, Callback<ChangedAttribute, void>>;
  defaultCase: (values: ChangedAttribute) => void;
} | null;

export interface WebElement {
  onAttributeChange: OnAttributeChange;
  connectedCallback?(): void;
  disconnectedCallback?(): void;
  adoptedCallback?(): void;
}

export class WebElement extends HTMLElement {
  elements: Record<string, HTMLElement>;
  nodeLists: Record<string, NodeListOf<HTMLElement>>;

  constructor() {
    super();
    this.elements = {};
    this.nodeLists = {};
  }

  initialize(html: string) {
    this.attachShadow({ mode: "open" });
    const $template = document.createElement("template");
    $template.innerHTML = html;
    this.shadowRoot!.appendChild($template.content.cloneNode(true));
  }

  noop = (values: ChangedAttribute) => {};

  setElementByClass(className: string, all = false) {
    if (this.isShadowRootDefined(this.shadowRoot)) {
      if (all) {
        this.nodeLists[className] = this.shadowRoot.querySelectorAll(
          `.${className}`
        )!;
      }
      this.elements[className] = this.shadowRoot.querySelector(
        `.${className}`
      )!;
    }
  }

  isShadowRootDefined(
    shadowRoot: ShadowRoot | null = this.shadowRoot
  ): shadowRoot is ShadowRoot {
    if (shadowRoot) {
      return true;
    }
    return false;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (!this.onAttributeChange) return;
    const params = { name, oldValue, newValue };
    if (this.onAttributeChange.handlers.hasOwnProperty(name)) {
      return this.onAttributeChange.handlers[name](params);
    }
    return this.onAttributeChange.defaultCase(params);
  }
}

export default WebElement;
