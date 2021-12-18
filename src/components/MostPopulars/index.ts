import WebElement from "../../lib/helpers/WebElement";
import tmdb from "../../lib/tmdb";
import MovieCard from "../MovieCard";
import template from "./template.hbs";
import css from "./styles.scss";

const html = template({ css });

type MovieData = {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
};

class MostPopulars extends WebElement {
  constructor() {
    super();
    this.initialize(html);
    this.setElementByClass("cardsWrapper");
  }

  async connectedCallback() {
    const { results } = await tmdb.movie.mostPopular();
    this.addCards(results);
  }

  addCards(data: MovieData[]) {
    data.forEach((movie) => {
      const card = document.createElement("mc-movie-card") as MovieCard;
      card.setMovieCard({
        title: movie.title,
        date: movie.release_date,
        poster: tmdb.image(movie.poster_path),
        id: movie.id,
      });
      this.elements.cardsWrapper.appendChild(card);
    });
  }
}

export default MostPopulars;
