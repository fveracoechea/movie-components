import html from "./template.html";
import css from "./styles.scss";
import WebElement from "../../lib/WebElement";
import { OnStateChange } from "../../lib/WebElement";

class MovieReviews extends WebElement {
  constructor() {
    super();
    this.initialize(html, css);
  }

  connectedCallback() {
    this.subscribe("movieId", "movie.data.id");
    this.subscribe("reviews", "movie.reviews");
  }

  onStateChange: OnStateChange = (key, value) => {
    if (key === "movieId" && value) {
      this.dispatch({ type: "movie/reviews", payload: { id: value } });
    }

    if (key === "reviews" && value) {
      console.log("review", value);
    }
  };
}

export default MovieReviews;
