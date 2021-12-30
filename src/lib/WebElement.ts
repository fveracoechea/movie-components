import get from "lodash/get";
import isEqual from "lodash/isEqual";
import { distinctUntilChanged, Subscription, of, switchMap } from "rxjs";
import { Action } from "./web-epic/types";
import store from "./store";

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

export type OnStateChange = (
  key: string,
  value: unknown,
  getState: () => unknown
) => void;

export interface WebElement {
  onAttributeChange: OnAttributeChange;
  onStateChange?: OnStateChange;
  connectedCallback?(): void;
  disconnectedCallback?(): void;
  adoptedCallback?(): void;
}

const subscribe = (key: string, next: (state: any) => void, path?: string) => {
  return store.state$
    .pipe(
      switchMap((state) => {
        return of(
          path
            ? get(state, path, null)
            : state[key as keyof typeof state] || null
        );
      }),
      distinctUntilChanged((prev, current) => isEqual(prev, current))
    )
    .subscribe({
      next,
    });
};

export class WebElement extends HTMLElement {
  elements: Record<string, HTMLElement>;
  nodeLists: Record<string, NodeListOf<HTMLElement>>;
  subscriptions: Record<string, Subscription> = {};
  state: Record<string, unknown> = {};

  constructor() {
    super();
    this.elements = {};
    this.nodeLists = {};
  }

  initialize(html: string, css?: string) {
    this.attachShadow({ mode: "open" });
    const $template = document.createElement("template");
    if (css) {
      $template.innerHTML = `
        <link rel="stylesheet" href="styles/global.css">
        <link rel="stylesheet" href="${css}">
        ${html}
      `;
    } else {
      $template.innerHTML = html;
    }
    this.shadowRoot!.appendChild($template.content.cloneNode(true));
  }

  dispatch<P = unknown>(action: Action<P>) {
    store.dispatch(action);
  }

  subscribe(key: string, path?: string) {
    const next = (state: any) => {
      this.state[key] = state;
      if (this.onStateChange) {
        this.onStateChange(key, state, store.getState);
      }
    };
    this.subscriptions[key] = subscribe(key, next, path);
  }

  noop = (values: ChangedAttribute) => {};

  getElement(selector: string, name: string) {
    if (this.shadowRoot) {
      this.elements[name] = this.shadowRoot.querySelector(selector)!;
    }
  }

  getElementList(selector: string, name: string) {
    if (this.shadowRoot) {
      this.nodeLists[name] = this.shadowRoot.querySelectorAll(selector)!;
    }
  }

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

  setElementByTagName(tag: string) {
    if (this.isShadowRootDefined(this.shadowRoot)) {
      this.elements[tag] = this.shadowRoot.querySelector(tag)!;
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
