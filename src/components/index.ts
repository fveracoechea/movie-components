// components
import Article from "./Article";
import Hero from "./Hero";
import Navigation from "./Navigation";
import Footer from "./Footer";
import SearchInput from "./SearchInput";
import MovieCard from "./MovieCard";
import MostPopulars from "./MostPopulars";
import MovieBanner from "./MovieBanner";
import MovieLoader from "./MovieLoader";
import Button from "./Button";
import Loader from "./Loader";
import Score from "./Score";
import Skeleton from "./Skeleton";
import MovieKeywords from "./MovieKeywords";
import PersonCard from "./PersonCard";
import MovieCast from "./MovieCast";
import MovieFacts from "./MovieFacts";
import MovieReviews from "./MovieReviews";
import Switch from "./Switch";

export const defineComponents = () => {
  // define components
  customElements.define("mc-article", Article);
  customElements.define("mc-hero", Hero);
  customElements.define("mc-navigation", Navigation);
  customElements.define("mc-search-input", SearchInput);
  customElements.define("mc-footer-content", Footer);
  customElements.define("mc-movie-card", MovieCard);
  customElements.define("mc-person-card", PersonCard);
  customElements.define("mc-most-populars", MostPopulars);
  customElements.define("mc-movie-loader", MovieLoader);
  customElements.define("mc-movie-banner", MovieBanner);
  customElements.define("mc-button", Button);
  customElements.define("mc-loader", Loader);
  customElements.define("mc-score", Score);
  customElements.define("mc-skeleton", Skeleton);
  customElements.define("mc-movie-keywords", MovieKeywords);
  customElements.define("mc-movie-cast", MovieCast);
  customElements.define("mc-movie-facts", MovieFacts);
  customElements.define("mc-movie-reviews", MovieReviews);
  customElements.define("mc-switch", Switch);

  return { Article, Hero, Navigation, Footer, SearchInput, Button };
};
