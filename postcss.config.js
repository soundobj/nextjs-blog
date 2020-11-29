module.exports = {
  plugins: [
    "tailwindcss",
    "autoprefixer",
    "postcss-import",
    "postcss-simple-vars",
    "postcss-extend",
    "postcss-nested",
    "postcss-mixins",
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
        },
        stage: 3,
        features: {
          "custom-properties": false,
        },
      },
    ],
  ],
};
