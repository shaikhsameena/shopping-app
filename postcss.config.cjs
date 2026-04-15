module.exports = {
  plugins: [
    require('@tailwindcss/postcss')(), // 👈 updated plugin
    require('autoprefixer'),
  ],
};
