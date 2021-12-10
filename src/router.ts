import "@appnest/web-router";

console.log(process.env.NODE_ENV);
const router = document.querySelector("router-slot");

customElements.whenDefined("router-slot").then(async () => {
  if(!router) return;
  router.add([
    {
      path: "home",
      component: () => import("./pages/Home"), // Lazy loaded
    },
    {
      path: "search",
      component: () => import("./pages/Search"), // Not lazy loaded
    },
    {
      path: "**",
      redirectTo: "home",
    },
  ]);
});
