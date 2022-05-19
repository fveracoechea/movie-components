import html from "./template.html";
import css from "./styles.scss";
import WebElement from "../../lib/WebElement";
import { OnStateChange } from "../../lib/WebElement";
import { Reviews } from "../../lib/types/Reviews";
import { removeAllChildNodes } from "../../lib/helpers/elements";
import { format } from "date-fns";
import { fetchReviewsById } from "../../lib/redux/movie/actions";

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
      this.dispatch(fetchReviewsById({ id: value as string }));
    }

    if (key === "reviews" && value) {
      this.renderList(value as Reviews);
    }
  };

  private renderList(reviews: Reviews) {
    if (reviews?.results?.length) {
      removeAllChildNodes(this.$.content);
      reviews.results.slice().reverse().forEach((review) => {
        const div = document.createElement("div");
        const h4 = document.createElement("h4");
        const p = document.createElement("p");
        div.className = "review";
        div.id = `review:${review.id}`;
        h4.innerHTML = `Written by <b>${review.author}</b> <span> on ${format(
          new Date(review.created_at),
          "MMMM d, yyyy"
        )}</span>`;
        p.textContent = review.content;
        div.appendChild(h4);
        div.appendChild(p);
        this.$.content.appendChild(div);
      });
    }
  }
}

export default MovieReviews;
