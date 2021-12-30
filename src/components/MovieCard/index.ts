import WebElement from "../../lib/WebElement";
import html from "./template.html";
import css from "./styles.scss";
import { format } from "date-fns";
import { isProduction } from "../../lib/helpers/elements";

const moviePageURL = isProduction()
  ? "/movie-components/movie.html"
  : "/movie.html";

type MovieCardData = {
  poster: string;
  title: string;
  date: string;
  id: number;
  vote_average: number;
};

class MovieCard extends WebElement {
  constructor() {
    super();
    this.initialize(html, css);
    this.setElementByClass("poster");
    this.setElementByClass("title");
    this.setElementByClass("date");
    this.setElementByTagName("mc-score");
    this.setElementByClass('movie-link', true);
  }

  async setMovieCard(data: MovieCardData) {
    this.elements.poster.setAttribute("src", data.poster);
    this.elements.poster.setAttribute("atl", data.title);
    this.elements.title.textContent = data.title;
    this.elements.date.textContent = format(
      new Date(data.date),
      "MMMM d, yyyy"
    );
    this.elements["mc-score"].setAttribute(
      "value",
      String(data.vote_average * 10)
    );
    this.nodeLists['movie-link'].forEach(link => {
      link.setAttribute('href', `${moviePageURL}?id=${data.id}`)
    });
    this.id = `movie-card:${data.id}`;
  }
}

export default MovieCard;
