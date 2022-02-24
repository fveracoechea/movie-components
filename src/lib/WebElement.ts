import _get from "lodash/get";
import isEqual from "lodash/isEqual";
import { store, RootState } from "./redux/store";
import { AnyAction, Unsubscribe } from "redux";
import { ThunkAction } from "@reduxjs/toolkit";

function get<
  ObjecType extends object,
  Path extends string,
  OrElse extends unknown
>(
  obj: ObjecType,
  path: Path,
  orElse?: OrElse
): ResolveType<ObjecType, Path, OrElse> {
  return _get(obj, path, orElse);
}

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

export type OnStateChange<Value = unknown> = (
  key: string,
  value: Value,
  getState: () => unknown
) => void;

export interface WebElement {
  onAttributeChange: OnAttributeChange;
  onStateChange?: OnStateChange;
  connectedCallback?(): void;
  disconnectedCallback?(): void;
  adoptedCallback?(): void;
}

export class WebElement extends HTMLElement {
  elements: Record<string, HTMLElement>;
  $: Record<string, HTMLElement>;
  nodeLists: Record<string, NodeListOf<HTMLElement>>;
  subscriptions: Record<string, Unsubscribe> = {};
  state: Record<string, unknown> = {};

  constructor() {
    super();
    this.elements = {};
    this.nodeLists = {};
    this.$ = {};
  }

  initialize(html: string, css?: string) {
    this.attachShadow({ mode: "open" });
    const $template = document.createElement("template");
    if (css) {
      $template.innerHTML = `<style>
        @import "styles/global.css";
        ${css}
      </style>
      ${html}`;
    } else {
      $template.innerHTML = html;
    }
    if (this.shadowRoot) {
      this.shadowRoot.appendChild($template.content.cloneNode(true));
      const elements = this.shadowRoot.querySelectorAll<HTMLElement>("*[id]");
      elements.forEach((el) => (this.$[el.id] = el));
    }
  }

  dispatch<R>(action: AnyAction | ThunkAction<R, RootState, undefined, AnyAction>) {
    return store.dispatch(action);
  }

  getState() {
    return store.getState();
  }

  subscribe(key: string, path?: string) {
    const currentState = store.getState();

    this.state[key] = path
      ? get(currentState, path, null)
      : currentState[key as keyof RootState] || null;

    this.subscriptions[key] = store.subscribe(() => {
      const state = store.getState();
      const newValue = path
        ? get(state, path, null)
        : state[key as keyof RootState] || null;

      if (!isEqual(this.state[key], newValue)) {
        this.state[key] = newValue;
        if (this.onStateChange) {
          this.onStateChange(key, newValue, store.getState);
        }
      }
    });
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
