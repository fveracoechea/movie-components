import { distinctUntilChanged, fromEvent, map, tap } from "rxjs";
import WebElement from "../../lib/WebElement";
import html from "./template.html";
import css from "./styles.scss";
import {
  getUrl,
  isProduction,
  removeAllChildNodes,
} from "../../lib/helpers/elements";

const lockBodyScroll = () => {
  const scrollY = document.documentElement.style.getPropertyValue("--scroll-y");
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}`;
};

const unlockBodyScroll = () => {
  const scrollY = document.body.style.top;
  document.body.style.position = "";
  document.body.style.top = "";
  window.scrollTo(0, parseInt(scrollY || "0") * -1);
};

const onScroll = () => {
  document.documentElement.style.setProperty(
    "--scroll-y",
    `${window.scrollY}px`
  );
};

const navLinks = [
  {
    href: "/",
    text: "discover",
    icon: "movie",
  },
  {
    href: "/",
    text: "genres",
    icon: "style",
  },
  {
    href: "/",
    text: "trending",
    icon: "trending_up",
  },
  {
    href: "/",
    text: "people",
    icon: "people",
  },
  {
    href: "/",
    text: "search",
    icon: "search",
  },
].map((link) => ({
  ...link,
  href: getUrl(link.href),
}));

const onWindowScroll$ = fromEvent(window, "scroll").pipe(
  tap(onScroll),
  map(() => {
    if (window.scrollY > 20) {
      return "rgba(0,0,0,.9)";
    }
    return "rgba(0,0,0,0)";
  }),
  distinctUntilChanged()
);

class Article extends WebElement {
  constructor() {
    super();
    this.initialize(html, css);
    this.setElementByClass("nav-bar");
    this.setElementByClass("home-link");
  }

  connectedCallback() {
    this.renderNav();
    this.elements["home-link"].setAttribute(
      "href",
      isProduction() ? "/movie-components/" : "/"
    );
    onWindowScroll$.subscribe({
      next: (backgroundColor) => {
        const nav = this.shadowRoot!.querySelector("nav");
        const h1 = this.shadowRoot!.querySelector("h1");
        nav!.style.backgroundColor = backgroundColor;
        if (backgroundColor === "rgba(0,0,0,.9)") {
          h1!.style.color = "var(--c-primary)";
          h1!.style.fontSize = "1.6rem";
        } else {
          h1!.style.color = "#f2f2f2";
          h1!.style.fontSize = "1.2rem";
        }
      },
    });
    this.$.menuBtn.addEventListener("click", () => {
      this.$.nav.classList.toggle("open");
      const isOpen = this.$.nav.classList.contains("open");
      this.changeMenuIcon(isOpen);
      if (isOpen) {
        lockBodyScroll();
      } else {
        unlockBodyScroll();
      }
    });
  }

  changeMenuIcon(isOpen: boolean) {
    removeAllChildNodes(this.$.menuBtn);
    const span = document.createElement("span");
    span.className = "material-icons";
    span.textContent = isOpen ? "close" : "menu";
    this.$.menuBtn.appendChild(span);
  }

  renderNav() {
    navLinks.forEach(({ href, text, icon: iconName }) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      const span = document.createElement("span");
      const icon = document.createElement("span");
      icon.classList.add("material-icons");

      a.href = href;
      a.textContent = text;
      icon.textContent = iconName;

      li.appendChild(icon);
      li.appendChild(a);
      li.appendChild(span);
      this.elements["nav-bar"].appendChild(li);
    });
  }
}

export default Article;
