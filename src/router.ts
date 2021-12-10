import { Router } from "@vaadin/router";

console.log(process.env.NODE_ENV)
export const router = new Router(document.getElementById("app"));

export const setRoutes = () => {
  router.setRoutes([
    { path: "/", component: "mc-home-page" },
    { path: "/search", component: "mc-search-page" },
    { path: "(.*)", component: "x-not-found-view" },
  ]);
};
