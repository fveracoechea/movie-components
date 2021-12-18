// assets
import heroImage from "../../images/homepage.jpg";
// components
import { defineComponents } from "../../components";

const { Hero } = defineComponents()

const hero = document.querySelector("mc-hero");
if (hero instanceof Hero) {
  hero.setImage(heroImage);
}
