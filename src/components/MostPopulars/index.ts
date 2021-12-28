import WebElement from "../../lib/WebElement";
import tmdb from "../../lib/tmdb";
import MovieCard from "../MovieCard";
import template from "./template.hbs";
import css from "./styles.scss";
import Button from "../Button";
import { removeAllChildNodes } from "../../lib/helpers/elements";
import { ResultsEntityProxy } from "../../lib/types/MoviesProxy";

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
    slot: "In Theatres",
  },
  {
    active: false,
    name: "top_rated",
    slot: "Top Rated",
  },
  {
    active: false,
    name: "upcoming",
    slot: "Upcoming",
  },
];

const html = template({ css, buttons });

const isDefined = (btn: any): btn is Button => {
  return Boolean(btn);
};

class MostPopulars extends WebElement {
  onClickHandlers: ((e: any) => void)[] = [];

  constructor() {
    super();
    this.initialize(html);
    this.setElementByClass("cardsWrapper");
  }

  connectedCallback() {
    this.setLoader();
    this.setButtonListeners();
    this.fetchMovies("initialize").then(({ results }) => {
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

  async fetchMovies(type: FetchType) {
    switch (type) {
      case "now_playing":
        return tmdb.movie.nowPlaying();

      case "top_rated":
        return tmdb.movie.topRated();

      case "upcoming":
        return tmdb.movie.upComing();

      default:
        const [result] = await Promise.all([
          tmdb.movie.nowPlaying(),
          tmdb.movie.topRated(),
          tmdb.movie.upComing(),
        ]);
        return result;
    }
  }

  createOnClickHandler(btn: Button, index: number, btns: Button[]) {
    return (e: any) => {
      btns.forEach((b) => b.inactivate());
      btn.activate();
      this.fetchMovies(e.detail.name).then(({ results }) => {
        if (results) {
          this.addCards(results);
        }
      });
    };
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
    this.elements.cardsWrapper.style.display = "block";
    const loader = document.createElement("mc-loader");
    this.elements.cardsWrapper.appendChild(loader);
  }

  addCards(data: ResultsEntityProxy[]) {
    removeAllChildNodes(this.elements.cardsWrapper);
    this.elements.cardsWrapper.style.display = "flex";
    data.forEach((movie) => {
      const card = document.createElement("mc-movie-card") as MovieCard;
      card.setMovieCard({
        title: movie.title,
        date: movie.release_date,
        poster: tmdb.image(movie.poster_path),
        id: movie.id,
        vote_average: movie.vote_average,
      });
      this.elements.cardsWrapper.appendChild(card);
    });
  }
}

export default MostPopulars;
