declare module '*.css' {
  const content: string;
  export default content;
}

declare module '*.scss' {
  const content: string;
  export default content;
}

declare module '*.html' {
  const content: string;
  export default content;
}

declare module '*.hbs' {
  import hbs from 'handlebars'
  export default hbs.compile();
}
declare module '*.jpg' {
  const content: string;
  export default content;
}
declare module '*.png' {
  const content: string;
  export default content;
}
declare module '*.svg' {
  const content: string;
  export default content;
}