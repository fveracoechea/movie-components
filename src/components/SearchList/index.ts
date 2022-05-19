import tmdb from "../../lib/tmdb";
import WebElement, { OnStateChange } from "../../lib/WebElement";
import MovieCard from "../MovieCard";
import PersonCard from "../PersonCard";
import css from "./styles.scss";
import html from "./template.html";

class SearchList extends WebElement {
  static placeholder = `
  <div id="placeholder">
    <span class="material-icons">search</span>
    <p>Search what you are looking for...</p>
  </div>
  `;

  constructor() {
    super();
    this.initialize(html, css);
  }

  connectedCallback() {
    this.subscribe("search", "search");
    this.subscribe("searchType", "search.searchType");
  }

  onStateChange: OnStateChange = (key, value: any) => {
    if (key === "search" && value) {
      const results = (value?.data?.results || []) as any[];
      console.log(results);
      if (!results.length) {
        WebElement.removeAllChildNodes(this.$.listWrapper);
        this.$.listWrapper.insertAdjacentHTML(
          "afterbegin",
          SearchList.placeholder
        );
        return;
      }
      if (value.searchType === "movie") {
        this.renderMovies(results);
        return;
      }
      if (value.searchType === "person") {
        this.renderPeople(results);
        return;
      }
    }
  };

  renderMovies(data: any[]) {
    WebElement.removeAllChildNodes(this.$.listWrapper);
    data.forEach((movie) => {
      const card = document.createElement("mc-movie-card") as MovieCard;
      card.setMovieCard({
        title: movie.title,
        date: movie.release_date,
        poster: tmdb.image(movie.poster_path),
        id: movie.id,
        vote_average: movie.vote_average,
      });
      this.$.listWrapper.appendChild(card);
    });
  }

  renderPeople(data: any[]) {
    WebElement.removeAllChildNodes(this.$.listWrapper);
    data.forEach((person) => {
      const card = document.createElement("mc-person-card") as PersonCard;
      const div = document.createElement("div");
      card.setCard(person);
      div.appendChild(card);
      this.$.listWrapper.appendChild(div);
    });
  }
}

export default SearchList;
