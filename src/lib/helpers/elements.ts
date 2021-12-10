type Callback<A, B> = (param: A) => B;
type ChangedAttribute = {
  name: string;
  oldValue: string;
  newValue: string;
};

const noop = (values: ChangedAttribute) => {};

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
