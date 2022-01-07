import WebElement from "../../lib/WebElement";
import html from "./template.html";
import css from "./styles.scss";
import { CastEntity } from "../../lib/types/Credits";
// import { isProduction, calculateRatio } from '../../lib/helpers/elements';
import tmdb from "../../lib/tmdb";

// const personPageURL = isProduction()
//   ? "/movie-components/person.html"
//   : "/person.html";

// const ratio = calculateRatio()

class PersonCard extends WebElement {
  constructor() {
    super();
    this.initialize(html, css);
  }

  setCard(data: CastEntity) {
    this.$.image.setAttribute("src", tmdb.image(data.profile_path!, "w185"));
    this.$.name.textContent = data.name;
    this.$.character.textContent = data.character;
  }
}

export default PersonCard;
