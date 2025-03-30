const path = require("path");
const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer");

module.exports = withPlugins([
  withBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
  }),
  {
    async headers() {
      return [
        {
          source: "/:path*",
          headers: [{ key: "Cache-Control", value: "no-store, max-age=0" }],
        },
        {
          source: "/_next/static/:path*",
          headers: [{ key: "Cache-Control", value: "no-store, max-age=0" }],
        },
      ];
    },
    generateEtags: false,
    trailingSlash: true,
    reactStrictMode: false,
    images: {
      loader: "default",
      unoptimized: true,
      remotePatterns: [
        {
          protocol: "https",
          hostname: "cdn.ubumtu.com.br",
          port: "",
          pathname: "/**",
        },
      ],
    },
    experimental: {
      // esmExternals: false,
    },
    publicRuntimeConfig: {
      ENV: process.env.ENV,
      API_PORT: process.env.API_PORT,

    },
    webpack: (config:any) => {
      config.resolve.alias = {
        ...config.resolve.alias,
        apexcharts: path.resolve(
          __dirname,
          "./node_modules/apexcharts-clevision"
        ),
      };
      config.resolve.alias["@"] = path.join(__dirname, "src");
      return config;
    },
  },
]);
