import css from "./styles.scss";
import html from "./template.html";
import WebElement from "../../lib/WebElement";
import { fetchSearch } from "../../lib/redux/search/actions";

class Switch extends WebElement {
  constructor() {
    super();
    this.initialize(html, css);
  }

  connectedCallback() {
    this.getElementList('input[type="radio"][name="switch"]', "inputs");
    this.setEvents();
  }

  private setEvents() {
    this.nodeLists.inputs.forEach((ratio) =>
      ratio.addEventListener("change", (e) => {
        const input = e.target as HTMLInputElement;
        const searchType = input.value as "movie" | "person";
        const query = this.getState().search.query;
        this.dispatch(fetchSearch({ searchType, query }));
        this.dispatchEvent(
          new CustomEvent("on-change", {
            detail: { value: searchType },
          })
        );
      })
    );
  }
}

export default Switch;
