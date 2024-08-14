/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "postcss-import": {},
    "@csstools/postcss-global-data": {
      files: ["./src/lib/styles/breakpoints.css"],
    },
    tailwindcss: {},
    cssnano: {},
    "postcss-preset-env": {},
  },
};

export default config;
