declare module '*.css' {
  const content: string;
  export default content;
}

declare module '*.html' {
  const content: string;
  export default content;
}

declare module '*.hbs' {
  import { TemplateDelegate } from 'handlebars'
  export default hbs.compile();
}
declare module '*.jpg' {
  const content: string;
  export default content;
}