/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},  // O Autoprefixer é útil para garantir a compatibilidade entre navegadores
  },
};

export default config;
