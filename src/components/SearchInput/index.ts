import debounce from "lodash/debounce";
import html from "./template.html";
import css from "./styles.scss";
import WebElement, { OnStateChange } from "../../lib/WebElement";
import { fetchSearch, SearchObserver } from "../../lib/redux/search/actions";

const formAction =
  process.env.NODE_ENV === "production"
    ? "/movie-components/search.html"
    : "/search.html";

class SearchInput extends WebElement {
  searchPromise: any = null;
  mounted: boolean = false;

  private dispatchSearch = debounce(
    (args: SearchObserver) => this.dispatch(fetchSearch(args)),
    300
  );

  constructor() {
    super();
    this.initialize(html, css);
    this.$.searchForm.setAttribute("action", formAction);
  }

  connectedCallback() {
    this.subscribe("searchQuery", "search.query");
    this.setEventListener();
  }

  onStateChange: OnStateChange = (key, value) => {
    if (key === "searchQuery" && !this.mounted) {
      this.$.searchInput.setAttribute("value", String(value));
      this.mounted = true;
    }
  };

  setPlaceholder(placeholder: string) {
    this.$.searchInput.setAttribute("placeholder", placeholder);
  }

  private setEventListener() {
    this.$.searchInput.addEventListener("input", (e) => {
      const input = e.target as HTMLInputElement;
      const query = input.value;
      if (!query) return;
      const searchType = this.getState().search.searchType;
      if (this.searchPromise) {
        this.searchPromise.abort();
      }
      this.searchPromise = this.dispatchSearch({ searchType, query });
      this.dispatchEvent(
        new CustomEvent("on-change", {
          detail: { query },
        })
      );
    });
  }
}

export default SearchInput;
