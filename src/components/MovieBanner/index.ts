import template from "./template.hbs";
import css from "./styles.scss";
import WebElement, { OnStateChange } from "../../lib/WebElement";
import { MovieEpic } from "../../lib/epics/movie";
import tmdb from "../../lib/tmdb";

const html = template({ css });

class MovieBanner extends WebElement {
  constructor() {
    super();
    this.initialize(html);
    this.setElementByClass("heading");
    this.setElementByClass("tagline");
    this.setElementByClass("wrapper");
    this.setElementByClass("overview");
    this.setElementByClass("content");
    this.setElementByClass("poster");
    this.setElementByClass("poster-img");
  }

  connectedCallback() {
    this.subscribe("movie");
  }

  onStateChange: OnStateChange = (key, value) => {
    switch (key) {
      case "movie":
        const { status, data } = value as MovieEpic;
        if (status !== "done") {
          this.setLoader(true);
        } else if (data) {
          this.setLoader(false);
          this.elements.heading.textContent = data.title;
          this.elements.tagline.textContent = data.tagline;
          this.elements.overview.textContent = data.overview;
          this.elements["poster-img"].setAttribute(
            "src",
            tmdb.image(data.poster_path, "w500")
          );
          this.elements["poster-img"].setAttribute("alt", data.title);
          this.elements.wrapper.style.backgroundImage = `url(${tmdb.image(
            data.backdrop_path,
            "original"
          )})`;
        }
        break;

      default:
        break;
    }
  };

  setLoader(show = true) {
    if (show && this.shadowRoot) {
      this.shadowRoot.querySelector("mc-loader")?.remove();
      this.elements.poster.style.display = "none";
      this.elements.content.style.display = "none";
      const loader = document.createElement("mc-loader");
      this.elements.wrapper.appendChild(loader);
    } else if (this.shadowRoot) {
      this.shadowRoot.querySelector("mc-loader")?.remove();
      this.elements.poster.style.display = "block";
      this.elements.content.style.display = "flex";
    }
  }
}

export default MovieBanner;
