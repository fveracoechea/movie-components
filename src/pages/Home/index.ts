import WebComponent from "../../lib/helpers/WebComponent";
import template from "./template.hbs";
import heroImage from "../../assets/images/homepage.jpg";

class HomePage extends WebComponent<{ heroImage: string }> {
  constructor() {
    super();
    this.template = template;
    this.state = {
      heroImage,
    };
  }
}

export default HomePage;
