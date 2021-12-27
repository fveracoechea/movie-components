import * as movie from "./epics/movie";
import { createStore } from "./web-epic/createStore";

const store = createStore({
  movie,
});

export default store;
