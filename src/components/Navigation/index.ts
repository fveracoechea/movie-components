import { distinctUntilChanged, fromEvent, map } from "rxjs";
import WebElement from "../../lib/WebElement";
import template from "./template.hbs";
import css from './styles.scss'

const navLinks = [
  {
    href: "/",
    text: "discover",
  },
  {
    href: "/",
    text: "genres",
  },
  {
    href: "/",
    text: "trending",
  },
  {
    href: "/",
    text: "people",
  },
  {
    href: "/",
    text: "search",
  },
].map((link) =>
  process.env.NODE_ENV === "production"
    ? {
        ...link,
        href: `/movie-components${link.href}`,
      }
    : link
);

const html = template({ navLinks, css })

const onWindowScroll$ = fromEvent(window, "scroll").pipe(
  map(() => {
    if (window.scrollY > 480) {
      return "rgba(0,0,0,.8)";
    }
    return "rgba(0,0,0,0)";
  }),
  distinctUntilChanged()
);

class Article extends WebElement {
  constructor() {
    super();
    this.initialize(html);
  }

  connectedCallback() {
    onWindowScroll$.subscribe({
      next: (backgroundColor) => {
        const nav = this.shadowRoot!.querySelector("nav");
        const h1 = this.shadowRoot!.querySelector("h1");
        nav!.style.backgroundColor = backgroundColor;
        if (backgroundColor === "rgba(0,0,0,.8)") {
          h1!.style.color = "var(--c-primary)";
          h1!.style.fontSize = "1.6rem";
        } else {
          h1!.style.color = "#f2f2f2";
          h1!.style.fontSize = "1.2rem";
        }
      },
    });
  }
}

export default Article;
