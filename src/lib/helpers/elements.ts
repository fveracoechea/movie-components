type Callback<A, B> = (param: A) => B;
type ChangedAttribute = {
  name: string;
  oldValue: string;
  newValue: string;
};

export const isProduction = () => process.env.NODE_ENV === "production";

export const toQueryString = (query: Record<string, string | number>) => {
  return Object.entries(query).reduce((qs, [key, value], i, entries) => {
    return i === entries.length - 1
      ? `${qs}${key}=${value}`
      : `${qs}${key}=${value}&`;
  }, "?");
};

export const getUrl = (path: string, query: Record<string, string | number> = {}) => {
  const url = isProduction() ? `/movie-components${path}.html` : `${path}.html`;
  return `${url}${toQueryString(query)}`;
};

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
