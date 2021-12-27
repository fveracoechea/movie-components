// components
import Article from "./Article";
import Hero from "./Hero";
import Navigation from "./Navigation";
import Footer from "./Footer";
import SearchInput from "./SearchInput";
import MovieCard from "./MovieCard";
import MostPopulars from "./MostPopulars";
import MovieBanner from "./MovieBanner";
import Button from "./Button";
import Loader from "./Loader";
import Score from "./Score";

// global styles
import '../global.css'

export const defineComponents = () => {
  // initialization
  customElements.define("mc-article", Article);
  customElements.define("mc-hero", Hero);
  customElements.define("mc-navigation", Navigation);
  customElements.define("mc-search-input", SearchInput);
  customElements.define("mc-footer-content", Footer);
  customElements.define("mc-movie-card", MovieCard);
  customElements.define("mc-most-populars", MostPopulars);
  customElements.define("mc-movie-banner", MovieBanner);
  customElements.define("mc-button", Button);
  customElements.define("mc-loader", Loader);
  customElements.define("mc-score", Score);

  return { Article, Hero, Navigation, Footer, SearchInput, Button };
};
