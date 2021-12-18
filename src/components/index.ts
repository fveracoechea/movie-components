// components
import Article from "./Article";
import Hero from "./Hero";
import Navigation from "./Navigation";
import Footer from "./Footer";
import SearchInput from "./SearchInput";
import MovieCard from "./MovieCard";
import MostPopulars from "./MostPopulars";

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

  return { Article, Hero, Navigation, Footer, SearchInput };
};
