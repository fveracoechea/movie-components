import html from "./template.html";
import css from "./styles.scss";
import WebElement from "../../lib/WebElement";
import { OnStateChange } from "../../lib/WebElement";
import PersonCard from "../PersonCard/index";
import { Credits } from "../../lib/types/Credits";

class MovieCast extends WebElement {
  constructor() {
    super();
    this.initialize(html, css);
  }

  connectedCallback() {
    this.subscribe("credits", "movie.credits");
  }

  onStateChange: OnStateChange = async (key, value) => {
    if (key === "credits" && value) {
      WebElement.removeAllChildNodes(this.$.list);
      this.addCast(value as Credits);
    }
  };

  addCast({ cast }: Credits) {
    if (!cast) return;
    cast
      .filter((person) => person.profile_path)
      .filter((person) => !person.character.includes("(uncredited)"))
      .filter((person) => !person.character.includes("(archive footage)"))
      .forEach((person) => {
        const card = document.createElement("mc-person-card") as PersonCard;
        const li = document.createElement("li");
        card.setCard(person);
        li.appendChild(card);
        this.$.list.appendChild(li);
      });
  }
}

export default MovieCast;
