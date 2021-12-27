window.addEventListener("load", async () => {
  const { defineComponents } = await import("../../components");
  const { default: heroImage } = await import("../../images/homepage.jpg");

  const { Hero } = defineComponents();

  const hero = document.querySelector("mc-hero");
  if (hero instanceof Hero) {
    hero.setImage(heroImage);
  }
});
