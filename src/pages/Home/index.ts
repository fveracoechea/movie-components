import template from "./template.hbs";
import WebElement from "../../lib/helpers/WebElement";
// assets
import heroImage from "../../assets/images/homepage.jpg";
import "../../assets/styles/main.css";
// components
import Article from "../../components/Article";
import Hero from "../../components/Hero";
import Navigation from "../../components/Navigation";

class HomePage extends WebElement {
  constructor() {
    super();
    this.initialize(template({ heroImage }));
  }
}

// * define components
// pages
customElements.define("mc-homepage", HomePage);
// components
customElements.define("mc-article", Article);
customElements.define("mc-hero", Hero);
customElements.define("mc-navigation", Navigation);
