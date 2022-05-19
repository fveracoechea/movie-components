import WebElement from "../../lib/WebElement";
import tmdb from "../../lib/tmdb";
import MovieCard from "../MovieCard";
import html from "./template.html";
import css from "./styles.scss";
import Button from "../Button";
import { removeAllChildNodes } from "../../lib/helpers/elements";
import { ResultsEntity } from "../../lib/types/Discover";

type FetchType = "now_playing" | "top_rated" | "upcoming" | "initialize";

type ButtonData = {
  active: boolean;
  slot: string;
  name: FetchType;
};

const buttons: ButtonData[] = [
  {
    active: true,
    name: "now_playing",
    slot: "In Theatres"
  },
  {
    active: false,
    name: "top_rated",
    slot: "Top Rated"
  },
  {
    active: false,
    name: "upcoming",
    slot: "Upcoming"
  }
];

const isDefined = (btn: any): btn is Button => {
  return Boolean(btn);
};

class MostPopulars extends WebElement {
  onClickHandlers: ((e: any) => void)[] = [];

  request = {
    type: "initialize" as FetchType,
    page: 1
  };

  constructor() {
    super();
    this.initialize(html, css);
    this.setElementByClass("cardsWrapper");
    this.setElementByClass("buttons");
    this.getElement("#most-populars", "section");
    this.getElement('mc-button[name="load_more"]', "loadMoreBtn");
    this.getElement('mc-button[name="go-up"]', "goUpBtn");

    this.onLoadMore = this.onLoadMore.bind(this);
    this.onGoUp = this.onGoUp.bind(this);
  }

  connectedCallback() {
    this.setLoader();
    this.renderButtons();
    this.setButtonListeners();
    this.elements.loadMoreBtn.addEventListener("button-click", this.onLoadMore);
    this.elements.goUpBtn.addEventListener("button-click", this.onGoUp);
    this.fetchMovies(this.request.type).then(({ results }) => {
      if (results) {
        this.addCards(results);
      }
    });
  }

  disconnectedCallback() {
    this.getButtons().forEach((btn, i) => {
      btn.removeEventListener("button-click", this.onClickHandlers[i]);
    });
  }

  setButtonListeners() {
    if (!this.shadowRoot) {
      return;
    }

    this.onClickHandlers = this.getButtons().map((btn, i, btns) => {
      const handler = this.createOnClickHandler(btn, i, btns);
      btn.addEventListener("button-click", handler);
      return handler;
    });
  }

  async fetchMovies(type: FetchType, query?: Record<string, string>) {
    switch (type) {
      case "now_playing":
        return tmdb.movie.nowPlaying(query);

      case "top_rated":
        return tmdb.movie.topRated(query);

      case "upcoming":
        return tmdb.movie.upComing(query);

      default:
        const [result] = await Promise.all([
          tmdb.movie.nowPlaying(),
          tmdb.movie.topRated(),
          tmdb.movie.upComing()
        ]);
        return result;
    }
  }

  createOnClickHandler(btn: Button, index: number, btns: Button[]) {
    return (e: any) => {
      btns.forEach((b) => b.inactivate());
      btn.activate();
      this.request.type = e.detail.name;
      this.fetchMovies(e.detail.name).then(({ results }) => {
        if (results) {
          this.addCards(results);
        }
      });
    };
  }

  renderButtons() {
    buttons.forEach((b) => {
      const button = document.createElement("mc-button");
      button.setAttribute("active", String(b.active));
      button.setAttribute("name", b.name);
      button.textContent = b.slot;
      this.elements.buttons.appendChild(button);
    });
  }

  getButtons() {
    return buttons
      .map((btn) =>
        this.shadowRoot!.querySelector<Button>(`mc-button[name="${btn.name}"]`)
      )
      .filter(isDefined);
  }

  setLoader() {
    removeAllChildNodes(this.elements.cardsWrapper);
    const loader = document.createElement("mc-loader");
    this.elements.cardsWrapper.appendChild(loader);
  }

  addCards(data: ResultsEntity[], removeChildNodes = true) {
    if (removeChildNodes) {
      removeAllChildNodes(this.elements.cardsWrapper);
    }
    data.forEach((movie) => {
      const card = document.createElement("mc-movie-card") as MovieCard;
      card.setMovieCard({
        title: movie.title,
        date: movie.release_date,
        poster: tmdb.image(movie.poster_path),
        id: movie.id,
        vote_average: movie.vote_average
      });
      this.elements.cardsWrapper.appendChild(card);
    });
  }

  onLoadMore() {
    this.request.page++;
    const { type, page } = this.request;
    this.fetchMovies(type === "initialize" ? "now_playing" : type, {
      page: String(page)
    }).then(({ results }) => {
      if (results) {
        this.addCards(results, false);
      }
    });
  }

  onGoUp() {
    const offset = 76
    const top =
      this.elements.section.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default MostPopulars;
