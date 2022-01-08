import html from "./template.html";
import css from "./styles.scss";
import WebElement, { OnStateChange } from "../../lib/WebElement";
import { MovieEpic } from "../../lib/epics/movie";
import tmdb from "../../lib/tmdb";
import { Movie } from "../../lib/types/Movie";
import { getUrl } from "../../lib/helpers/elements";
import { format } from "date-fns";
import { timeConvert } from "../../lib/helpers/date";

class MovieBanner extends WebElement {
  private loaded = false;

  constructor() {
    super();
    this.initialize(html, css);
    this.setElementByClass("heading");
    this.setElementByClass("tagline");
    this.setElementByClass("wrapper");
    this.setElementByClass("overview");
    this.setElementByClass("content");
    this.setElementByClass("poster");
    this.setElementByClass("poster-img");
    this.setElementByClass("fatcs");
    this.setElementByClass("duration");
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
        } else if (data && !this.loaded) {
          console.log("data ", data);
          this.setLoader(false);
          this.elements.heading.textContent = data.title;
          this.elements.overview.textContent = data.overview;
          if (data.tagline) {
            this.elements.tagline.textContent = `${timeConvert(
              data.runtime
            )} - ${data.tagline}`;
          } else {
            this.elements.tagline.textContent = timeConvert(data.runtime);
          }
          this.addImages(data);
          this.addReleaseData(data);
          this.addGenres(data);
          this.loaded = true;
        }
        break;

      default:
        break;
    }
  };

  setLoader(show = true) {
    if (show && this.shadowRoot) {
      this.shadowRoot.querySelector("mc-movie-loader")?.remove();
      this.elements.wrapper.style.display = "none";
      const loader = document.createElement("mc-movie-loader");
      this.shadowRoot.appendChild(loader);
    } else if (this.shadowRoot) {
      this.shadowRoot.querySelector("mc-movie-loader")?.remove();
      this.elements.wrapper.style.display = "flex";
    }
  }

  private addImages(data: Movie) {
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

  private addReleaseData(data: Movie) {
    const element = document.createElement("span");
    element.className = "release-date";
    element.textContent = format(new Date(data.release_date), "MMMM d, yyyy");
    this.elements.fatcs.appendChild(element);
  }

  private addGenres(data: Movie) {
    if (data?.genres) {
      const element = document.createElement("span");
      element.className = "genres";
      data.genres.forEach(({ name, id }) => {
        const link = document.createElement("a");
        link.className = "genre-link";
        link.href = getUrl("/genre", { id });
        link.textContent = name;
        element.appendChild(link);
      });
      this.elements.fatcs.appendChild(element);
    }
  }
}

export default MovieBanner;
