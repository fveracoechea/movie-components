import WebElement from "../../lib/helpers/WebElement";
import template from "./template.hbs";
import css from "./styles.scss";

const html = template({ css });

// console.`log({ styles })`

type MovieCardData = {
  poster: string;
  title: string;
  date: string;
  id: number;
};

class MovieCard extends WebElement {
  constructor() {
    super();
    this.initialize(html);
    this.setElementByClass("poster");
    this.setElementByClass("title");
    this.setElementByClass("date");
  }

  setMovieCard(data: MovieCardData) {
    this.elements.poster.setAttribute("src", data.poster);
    this.elements.poster.setAttribute("atl", data.title);
    this.elements.title.textContent = data.title;
    this.elements.date.textContent = data.date;
    this.id = `movie-card:${data.id}`;
  }
}

export default MovieCard;
