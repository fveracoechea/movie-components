import {
  createAttributeChangeCallback,
  // removeAllChildNodes,
} from "../../lib/helpers/elements.js";

const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <section class="wrapper">
    <h2 id="list-heading"></h2>
    <div id="banner-list"></div>
  </section>
`;

class BannerGroup extends HTMLElement {
  static get observedAttributes() {
    return ["banners", "list-heading"];
  }

  // properties
  heading: string = "";
  bannerList: string[] = [];
  // elements
  $heading: HTMLElement | null;
  $listWrapper: HTMLElement | null;

  onAttributeChange = createAttributeChangeCallback({
    banners: ({ newValue }) => {
      this.bannerList = newValue.split(",");
      this.addBanners();
    },
    "list-heading": ({ newValue }) => {
      if (this.$heading) {
        this.$heading.innerText = newValue;
      }
    },
  });

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.$heading = this.shadowRoot?.querySelector("#list-heading") || null;
    this.$listWrapper = this.shadowRoot?.querySelector("#banner-list") || null;
  }

  connectedCallback() {
    if (!this.hasAttribute("banners")) {
      this.setAttribute("banners", ["banner 1", "banner 2"].join(","));
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.onAttributeChange(name, oldValue, newValue);
  }

  addBanners() {
    if (!this.$listWrapper) return;
    // removeAllChildNodes(this.$listWrapper);
    this.$listWrapper.innerHTML = "";
    this.bannerList.forEach((heading) => {
      const banner = document.createElement("wc-banner");
      banner.setAttribute("banner-heading", heading);
      this.$listWrapper?.appendChild(banner);
    });
  }
}

export default BannerGroup;
