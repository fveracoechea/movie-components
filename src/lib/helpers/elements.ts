type Callback<A, B> = (param: A) => B;
type ChangedAttribute = {
  name: string;
  oldValue: string;
  newValue: string;
};

export const isProduction = () => process.env.NODE_ENV === "production";

const noop = (values: ChangedAttribute) => {};

export function removeAllChildNodes(parent: ShadowRoot | HTMLElement) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export const createAttributeChangeCallback =
  (
    handlers: Record<string, Callback<ChangedAttribute, void>>,
    defaultCase = noop
  ) =>
  (name: string, oldValue: string, newValue: string) => {
    const params = { name, oldValue, newValue };
    if (handlers.hasOwnProperty(name)) {
      return handlers[name](params);
    }
    return defaultCase(params);
  };
