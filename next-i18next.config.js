const ChainedBackend = require("i18next-chained-backend").default;
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

  reloadOnPrerender: process.env.NODE_ENV === "development",
  defaultNS: ["account", "blog", "cart", "sort_labels"],
  allowMultiLoading: true,

  preload: ["en"],
  ...(isBrowser && {
    use: [ChainedBackend],
    backend: {
      allowMultiLoading: true,

      backends: [HttpBackend],
      backendOptions: [
        {
          allowMultiLoading: true,

          loadPath: `http://localhost:3000/api/translation?lang={{lng}}&&ns={{ns}}`,
          parse: (data, _, namespaces) => {
            const parsedData = JSON.parse(data);
            console.log(`Parsing namespace: ${namespaces}`);

            if (typeof namespaces === "string") {
              return parsedData[namespaces];
            }

            // handles 'file.json' and any other unknown cases
            return parsedData;
          },
        },
      ],
    },
  }),
};
