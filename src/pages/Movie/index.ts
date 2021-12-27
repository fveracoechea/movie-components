window.addEventListener("load", async () => {
  const { defineComponents } = await import("../../components");
  const { default: store } = await import("../../lib/store");

  const {} = defineComponents();

  const search = new URLSearchParams(window.location.search);
  const id = search.get("id");
  if (id) {
    store.dispatch({ type: "movie/fetch", payload: { id } });
  }
});
