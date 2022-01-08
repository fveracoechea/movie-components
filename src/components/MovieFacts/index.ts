import html from "./template.html";
import css from "./styles.scss";
import WebElement from "../../lib/WebElement";
import { OnStateChange } from "../../lib/WebElement";
import { removeAllChildNodes } from "../../lib/helpers/elements";
import { ProductionCompaniesEntity } from "../../lib/types/Movie";

class MovieFacts extends WebElement {
  constructor() {
    super();
    this.initialize(html, css);
  }

  connectedCallback() {
    this.subscribe("status", "movie.data.status");
    this.subscribe("original_language", "movie.data.original_language");
    this.subscribe("budget", "movie.data.budget");
    this.subscribe("revenue", "movie.data.revenue");
    this.subscribe("companies", "movie.data.production_companies");
  }

  onStateChange: OnStateChange = (key, value) => {
    this.renderData(key, value as string);
  };

  private renderData(key: string, value: string) {
    if (key === "companies") {
      return this.addCompanies(value as any);
    }

    removeAllChildNodes(this.$[key]);
    const p = document.createElement("p");

    if (value) {
      if (Number(value)) {
        p.textContent =
          "$" +
          Number(value)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,");
      } else {
        p.textContent = value;
      }
    } else {
      p.textContent = "-";
    }

    this.$[key].appendChild(p);
  }

  private addCompanies(companies: ProductionCompaniesEntity[]) {
    removeAllChildNodes(this.$.companies);
    if (companies?.length) {
      companies.forEach((c) => {
        const li = document.createElement("li");
        li.textContent = c.name;
        li.id = `production_company:${c.id}`;
        this.$.companies.appendChild(li);
      });
    } else {
      const li = document.createElement("li");
      li.textContent = "no production company found";
      this.$.companies.appendChild(li);
    }
  }
}

export default MovieFacts;
