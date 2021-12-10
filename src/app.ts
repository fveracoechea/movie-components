// styles
import "./main.css";
// pages
import HomePage from "./pages/Home";
import SerachPage from "./pages/Search";
// components
import Article from "./components/Article";
import Hero from "./components/Hero";
import Navigation from "./components/Navigation";
// router
import { setRoutes } from "./router";

// define components
const defineComponents = () => {
  // pages
  customElements.define("mc-home-page", HomePage);
  customElements.define("mc-search-page", SerachPage);

  // components
  customElements.define("mc-article", Article);
  customElements.define("mc-hero", Hero);
  customElements.define("mc-navigation", Navigation);
};

// intialize app
defineComponents();
setRoutes();
