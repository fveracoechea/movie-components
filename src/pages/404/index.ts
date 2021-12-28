import { defineComponents } from "../../components"
import heroImage from "../../images/404.jpg"

const { Hero } = defineComponents();

window.addEventListener("load", async () => {
  const hero = document.querySelector("mc-hero");
  if (hero instanceof Hero) {
    hero.setImage(heroImage);
  }
});