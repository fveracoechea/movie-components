const fs = require("fs");
const path = require("path");

const pagesPath = path.resolve(__dirname, "src", "pages");

const getPageTS = (page) =>
  path.resolve(__dirname, "src", "pages", page, "index.ts");

const getPageHBS = (page) =>
  path.resolve(__dirname, "src", "pages", page, "page.hbs");

const getPages = () => {
  const pages = fs.readdirSync(pagesPath);

  return pages.reduce(
    (settings, page) => {
      const hasTSfile = fs.existsSync(getPageTS(page));
      const hasHBSfile = fs.existsSync(getPageHBS(page));

      if (!hasTSfile) {
        throw new Error(`Missing typescript file for ${page} page`);
      }
      if (!hasHBSfile) {
        throw new Error(`Missing handlebars file for ${page} page`);
      }
      const pageName = page.toLowerCase()
      const filename =
        page === "Home" ? "index.html" : `${pageName}.html`;

      return {
        entries: {
          ...settings.entries,
          [pageName]: getPageTS(page),
        },  
        pages: [
          ...settings.pages,
          {
            filename,
            template: getPageHBS(page),
            chunks: [pageName],
            templateParameters: {
              title: `${page} - Movie Components`,
              pageName: page,
              filename,
            },
          },
        ],
      };
    },
    { pages: [], entries: {} }
  );
};

module.exports = getPages;
