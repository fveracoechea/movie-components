declare module "*.css" {
  const content: string;
  export default content;
}

declare module "*.scss" {
  const content: string;
  export default content;
}

declare module "*.html" {
  const content: string;
  export default content;
}

declare module "*.hbs" {
  import hbs from "handlebars";
  export default hbs.compile();
}
declare module "*.jpg" {
  const content: string;
  export default content;
}
declare module "*.png" {
  const content: string;
  export default content;
}
declare module "*.svg" {
  const content: string;
  export default content;
}

/**
 * It tries to resolve the path of the given object, otherwise it will return OrElse
 */
declare type ResolveType<
  ObjectType,
  Path extends string,
  OrElse
> = Path extends keyof ObjectType
  ? ObjectType[Path]
  : Path extends `${infer LeftSide}.${infer RightSide}`
  ? LeftSide extends keyof ObjectType
    ? ResolveType<ObjectType[LeftSide], RightSide, OrElse>
    : Path extends `${infer LeftSide}[${number}].${infer RightSide}`
    ? LeftSide extends keyof ObjectType
      ? ObjectType[LeftSide] extends Array<infer U>
        ? ResolveType<U, RightSide, OrElse>
        : OrElse
      : OrElse
    : OrElse
  : Path extends `${infer LeftSide}[${number}]`
  ? LeftSide extends keyof ObjectType
    ? ObjectType[LeftSide] extends Array<infer U>
      ? U
      : OrElse
    : OrElse
  : OrElse;
