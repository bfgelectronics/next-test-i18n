const MultiloadAdapter = require("i18next-multiload-backend-adapter/cjs");
const HttpBackend = require("i18next-http-backend/cjs");

const isBrowser = typeof window !== "undefined";

/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  // https://www.i18next.com/overview/configuration-options#logging
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"],
  },
  debug: process.env.NODE_ENV === "development",
  reloadOnPrerender: process.env.NODE_ENV === "development",
  defaultNS: ["account", "blog", "cart", "sort_labels"],
  localePath: typeof window === 'undefined'
    ? require('path').resolve('./pages/api/locales')
    : '`/api/translation?lng={{lng}}&ns={{ns}}`',
  preload: ["en"],
  ...(isBrowser && {
    use: [MultiloadAdapter],
    backend: {
      backend: HttpBackend,
      backendOption: {
        loadPath: `http://localhost:3000/api/translation?lng={{lng}}&ns={{ns}}`,
      },
    },
  }),
};
